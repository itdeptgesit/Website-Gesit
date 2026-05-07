import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import xss from 'xss';

const normalizePath = (url) => {
    if (!url) return url;
    if (url.includes('wp-content/uploads/')) {
        const filename = url.split('/').pop();
        const ext = filename.split('.').pop().toLowerCase();
        if (['mp4', 'webm', 'ogg'].includes(ext)) {
            return `/video/${filename}`;
        } else if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) {
            return `/news/${filename}`;
        }
    }
    return url.replace(/^https?:\/\/(dev\.)?gesit\.co\.id/i, '');
};

const normalizeNewsItem = (item) => {
    let normalizedContent = item.content || '';
    if (normalizedContent.includes('wp-content/uploads/')) {
        normalizedContent = normalizedContent.replace(
            /https?:\/\/(?:dev\.)?gesit\.co\.id\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/([^"']+\.(?:mp4|webm|ogg))/gi,
            '/video/$1'
        );
        normalizedContent = normalizedContent.replace(
            /https?:\/\/(?:dev\.)?gesit\.co\.id\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/([^"']+\.(?:jpg|jpeg|png|webp|gif))/gi,
            '/news/$1'
        );
        normalizedContent = normalizedContent.replace(
            /\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/([^"']+\.(?:mp4|webm|ogg))/gi,
            '/video/$1'
        );
        normalizedContent = normalizedContent.replace(
            /\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/([^"']+\.(?:jpg|jpeg|png|webp|gif))/gi,
            '/news/$1'
        );
    }

    return {
        ...item,
        image_url: normalizePath(item.image_url),
        video_url: normalizePath(item.video_url),
        content: normalizedContent
    };
};

// Security Helper
async function isAuthorized(request, supabase) {
    // 1. Check Session
    const { data: { user } } = await supabase.auth.getUser();
    if (user) return true;

    // 2. Check Secret API Key (for external tools)
    const apiKey = request.headers.get('x-api-key');
    const validKey = process.env.GESIT_API_SECRET;
    if (apiKey && validKey && apiKey === validKey) return true;

    return false;
}

export async function GET() {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const normalizedData = data.map(normalizeNewsItem);
        return NextResponse.json(normalizedData);
    } catch (error) {
        console.error("GET News Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const supabase = await createClient();
        if (!(await isAuthorized(request, supabase))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        
        // Input Sanitization
        if (body.content) body.content = xss(body.content);
        if (body.title) body.title = xss(body.title);
        if (body.meta_title) body.meta_title = xss(body.meta_title);
        if (body.meta_description) body.meta_description = xss(body.meta_description);

        const { data, error } = await supabase
            .from('news')
            .insert([body])
            .select();

        if (error) throw error;
        return NextResponse.json(data[0]);
    } catch (error) {
        console.error("POST News Error:", error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const supabase = await createClient();
        if (!(await isAuthorized(request, supabase))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const body = await request.json();
        
        // Input Sanitization
        if (body.content) body.content = xss(body.content);
        if (body.title) body.title = xss(body.title);
        if (body.meta_title) body.meta_title = xss(body.meta_title);
        if (body.meta_description) body.meta_description = xss(body.meta_description);

        const { data, error } = await supabase
            .from('news')
            .update(body)
            .eq('id', id)
            .select();

        if (error) throw error;
        return NextResponse.json(data[0]);
    } catch (error) {
        console.error("PATCH News Error:", error);
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const supabase = await createClient();
        if (!(await isAuthorized(request, supabase))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('news')
            .delete()
            .match({ id });

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE News Error:", error);
        return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
    }
}

