/**
 * Compress an image File using the Canvas API.
 * @param {File} file - Original image file
 * @param {Object} options
 * @param {number} options.maxWidth  - Max width in pixels (default 1920)
 * @param {number} options.maxHeight - Max height in pixels (default 1080)
 * @param {number} options.quality  - JPEG/WebP quality 0-1 (default 0.75)
 * @returns {Promise<File>} - Compressed image as a File object
 */
export async function compressImage(file, {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.75
} = {}) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);

            let { width, height } = img;

            // Scale down proportionally if too large
            if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error('Canvas compression failed'));
                        return;
                    }
                    // Keep original filename, use webp for better compression
                    const compressedFile = new File(
                        [blob],
                        file.name.replace(/\.[^.]+$/, '.webp'),
                        { type: 'image/webp', lastModified: Date.now() }
                    );
                    resolve(compressedFile);
                },
                'image/webp',
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load image for compression'));
        };

        img.src = url;
    });
}

