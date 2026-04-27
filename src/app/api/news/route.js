import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

const normalizePath = (url) => {
    if (!url) return url;
    // Handle legacy WordPress paths
    if (url.includes('wp-content/uploads/')) {
        const filename = url.split('/').pop();
        const ext = filename.split('.').pop().toLowerCase();
        if (['mp4', 'webm', 'ogg'].includes(ext)) {
            return `/video/${filename}`;
        } else if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) {
            // Check if it's stored in /news or /images
            return `/news/${filename}`;
        }
    }
    // Remove domain if it's internal
    return url.replace(/^https?:\/\/(dev\.)?gesit\.co\.id/i, '');
};

const normalizeNewsItem = (item) => {
    let normalizedContent = item.content || '';

    // Normalize paths inside HTML content
    if (normalizedContent.includes('wp-content/uploads/')) {
        // Replace video paths in content
        normalizedContent = normalizedContent.replace(
            /https?:\/\/(?:dev\.)?gesit\.co\.id\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/([^"']+\.(?:mp4|webm|ogg))/gi,
            '/video/$1'
        );
        // Replace image paths in content
        normalizedContent = normalizedContent.replace(
            /https?:\/\/(?:dev\.)?gesit\.co\.id\/wp-content\/uploads\/[0-9]{4}\/[0-9]{2}\/([^"']+\.(?:jpg|jpeg|png|webp|gif))/gi,
            '/news/$1'
        );
        // Catch-all for relative paths or others
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
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const supabase = await createClient();
        const body = await request.json();
        const { data, error } = await supabase
            .from('news')
            .insert([body])
            .select();

        if (error) throw error;
        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const supabase = await createClient();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const body = await request.json();
        const { data, error } = await supabase
            .from('news')
            .update(body)
            .eq('id', id)
            .select();

        if (error) throw error;
        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const supabase = await createClient();
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
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
