import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Simple in-memory rate limiting cache to prevent DB flooding
const rateLimitCache = new Map();

export async function POST(request) {
    try {
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const now = Date.now();
        const lastHit = rateLimitCache.get(ip);
        
        // Rate Limit: Allow only 1 hit per 10 seconds per IP
        if (ip !== 'unknown' && lastHit && (now - lastHit < 10000)) {
            // Return 200 silently so the bot doesn't know it's blocked
            return NextResponse.json({ success: true, message: 'Rate limited' });
        }
        
        rateLimitCache.set(ip, now);
        // Clean up cache to prevent memory leak over time
        if (rateLimitCache.size > 1000) rateLimitCache.clear();

        // Safely parse JSON body
        let body;
        try {
            const text = await request.text();
            if (!text) return NextResponse.json({ success: true, message: 'Empty body' });
            body = JSON.parse(text);
        } catch (e) {
            console.error('Failed to parse analytics body:', e.message);
            return NextResponse.json({ success: true, message: 'Invalid JSON' });
        }

        const { path, name } = body;
        
        // Detect country from Vercel headers (fallback to 'Local Development' if localhost)
        const isLocal = request.headers.get('host')?.includes('localhost');
        const countryCode = isLocal ? 'DEV' : (request.headers.get('x-vercel-ip-country') || 'INT');
        const countryName = isLocal 
            ? 'Local Development'
            : countryCode === 'INT' 
                ? 'International' 
                : new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) || 'International';

        const safeDecode = (str) => {
            try {
                return str ? decodeURIComponent(str) : '';
            } catch (e) {
                return str || '';
            }
        };

        const city = isLocal ? 'Local Dev Office' : safeDecode(request.headers.get('x-vercel-ip-city') || 'Unknown City');
        const region = isLocal ? 'Local Region' : safeDecode(request.headers.get('x-vercel-ip-country-region') || 'Unknown Region');

        if (!path) return NextResponse.json({ error: 'Path is required' }, { status: 400 });

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // 1. Update Page Analytics
        const { data: currentData, error: fetchError } = await supabase
            .from('page_analytics')
            .select('views')
            .eq('path', path)
            .single();

        if (fetchError && fetchError.code === 'PGRST116') {
            await supabase.from('page_analytics').insert([{ path, name: name || path, views: 1, last_visited: new Date().toISOString() }]);
        } else {
            await supabase.from('page_analytics').update({ views: (currentData?.views || 0) + 1, last_visited: new Date().toISOString() }).eq('path', path);
        }

        // 2. Update Country Analytics
        const { data: countryData, error: cFetchError } = await supabase
            .from('country_analytics')
            .select('visitor_count')
            .eq('country_code', countryCode)
            .single();

        if (cFetchError && cFetchError.code === 'PGRST116') {
            await supabase.from('country_analytics').insert([{ country_code: countryCode, country_name: countryName, visitor_count: 1, last_visit: new Date().toISOString() }]);
        } else {
            await supabase.from('country_analytics').update({ visitor_count: (countryData?.visitor_count || 0) + 1, last_visit: new Date().toISOString() }).eq('country_code', countryCode);
        }
        
        // 3. Log individual visit for historical analysis
        try {
            const { error: insertErr } = await supabase.from('traffic_logs').insert([{
                path,
                country_code: countryCode,
                country_name: countryName,
                city,
                region
            }]);
            
            if (insertErr) {
                // Fallback: If column city/region doesn't exist yet, insert without them
                await supabase.from('traffic_logs').insert([{
                    path,
                    country_code: countryCode,
                    country_name: countryName
                }]);
            }
        } catch (err) {
            await supabase.from('traffic_logs').insert([{
                path,
                country_code: countryCode,
                country_name: countryName
            }]);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Analytics tracking error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
