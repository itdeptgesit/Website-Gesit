import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { createClient } from '@/lib/supabase-server';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const maxDuration = 60; // Allow enough time for large video processing

// Allowed MIME types for upload
const ALLOWED_TYPES = [
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif',
    'video/mp4', 'video/webm', 'video/ogg'
];

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

export async function POST(request) {
    try {
        // Auth Check — only authenticated users can upload
        const supabase = await createClient();
        if (!(await isAuthorized(request, supabase))) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const fileName = request.headers.get('x-file-name') || 'upload';
        const contentType = request.headers.get('content-type') || 'application/octet-stream';

        // File type validation
        if (!ALLOWED_TYPES.includes(contentType)) {
            return NextResponse.json({ 
                error: `File type not allowed. Accepted: images (jpeg, png, webp, gif, avif) and videos (mp4, webm, ogg).` 
            }, { status: 400 });
        }

        // Read raw binary body to bypass Next.js multipart parsing limits
        const arrayBuffer = await request.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (!buffer || buffer.length === 0) {
            return NextResponse.json({ error: 'No data received' }, { status: 400 });
        }

        // Direct stream upload to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'gesit_news',
                    filename_override: fileName,
                    use_filename: true,
                },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary Upload Error:', error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
            uploadStream.end(buffer);
        });

        return NextResponse.json({ url: uploadResponse.secure_url });
    } catch (error) {
        console.error('Upload Error:', error.message);
        return NextResponse.json({
            error: 'Upload failed. Please try again.',
        }, { status: 500 });
    }
}
