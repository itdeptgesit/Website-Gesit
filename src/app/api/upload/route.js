import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const maxDuration = 60; // Allow enough time for large video processing

export async function POST(request) {
    try {
        const fileName = request.headers.get('x-file-name') || 'upload';
        const contentType = request.headers.get('content-type') || 'application/octet-stream';

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
            error: error.message || 'Upload failed',
        }, { status: 500 });
    }
}

