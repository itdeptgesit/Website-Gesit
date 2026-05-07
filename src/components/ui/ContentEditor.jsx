'use client';

import { useRef, useState, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Image as ImageIcon, Video, Link2, Film } from 'lucide-react';
import { compressImage } from '@/lib/compressImage';

const ToolbarBtn = ({ onClick, title, children, active }) => (
    <button
        type="button"
        title={title}
        onMouseDown={(e) => e.preventDefault()} // CRITICAL: Prevents loss of focus
        onClick={onClick}
        className={`w-8 h-8 flex items-center justify-center rounded text-sm transition-colors ${active ? 'bg-navy-deep text-white' : 'hover:bg-slate-100 text-slate-600'
            }`}
    >
        {children}
    </button>
);

const Divider = () => <div className="w-px h-5 bg-slate-200 mx-1" />;

export default function ContentEditor({ value, onChange }) {
    const editorRef = useRef(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [videoUploadProgress, setVideoUploadProgress] = useState(0);

    const exec = (command, val = null) => {
        editorRef.current?.focus();
        // Small delay to ensure focus is restored if the browser was slow
        setTimeout(() => {
            if (val) {
                document.execCommand(command, false, val);
            } else {
                document.execCommand(command, false, null);
            }
            syncContent();
        }, 0);
    };

    const [editorHtml, setEditorHtml] = useState(value || '');

    // Synchronize external value with editor only if it's a real change from outside
    useEffect(() => {
        if (value !== undefined && editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value;
            setEditorHtml(value);
        }
    }, [value]);

    const syncContent = () => {
        if (editorRef.current) {
            const currentHtml = editorRef.current.innerHTML;
            if (currentHtml !== editorHtml) {
                setEditorHtml(currentHtml);
                onChange(currentHtml);
            }
        }
    };

    const handleKeyUp = () => syncContent();

    const insertLink = () => {
        const selection = window.getSelection();
        const selectedText = selection ? selection.toString() : '';

        const url = prompt('Enter URL:', selectedText.startsWith('http') ? selectedText : 'https://');
        if (!url) return;

        if (selectedText.length > 0) {
            exec('createLink', url);
        } else {
            const html = `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#bc9c33;text-decoration:underline;cursor:pointer">${url}</a>`;
            exec('insertHTML', html);
        }
    };

    const linkVideo = () => {
        const url = prompt('Masukkan URL video (YouTube, Vimeo, atau link .mp4):');
        if (!url) return;

        let html = '';
        const isDirectVideo = /\.(mp4|webm|ogg)$/i.test(url);

        if (isDirectVideo) {
            html = `<div class="video-container" style="margin:1.5rem 0;border-radius:8px;overflow:hidden;background:#000;box-shadow:0 10px 30px -10px rgba(0,0,0,0.3)"><video src="${url}" controls style="width:100%;height:auto;display:block"></video></div>`;
        } else {
            // High-fidelity YouTube Regex (matches long, short, mobile, shorts, and embed URLs)
            const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
            const ytMatch = url.match(ytRegex);
            const videoId = ytMatch ? ytMatch[1] : null;

            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                html = `<div class="video-wrapper" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;margin:1.5rem 0;border-radius:12px;box-shadow:0 20px 40px -15px rgba(0,0,0,0.4)"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;border:none" src="${embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
            } else if (url.includes('vimeo.com')) {
                const vimeoId = url.split('/').pop().split('?')[0];
                html = `<div class="video-wrapper" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;margin:1.5rem 0;border-radius:12px;box-shadow:0 20px 40px -15px rgba(0,0,0,0.4)"><iframe src="https://player.vimeo.com/video/${vimeoId}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
            } else {
                // Generic Link fallback
                html = `<div style="margin:1.5rem 0;padding:1rem;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:8px;text-align:center"><a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#bc9c33;font-weight:bold;text-decoration:underline">${url}</a></div>`;
            }
        }

        if (html) {
            editorRef.current?.focus();
            document.execCommand('insertHTML', false, html);
            syncContent();
        }
    };

    const uploadVideo = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/mp4,video/webm,video/ogg';
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            if (file.size > 50 * 1024 * 1024) {
                alert('File video terlalu besar (Maksimal 50MB). Gunakan link YouTube untuk video berdurasi panjang.');
                return;
            }

            setUploadingVideo(true);
            setVideoUploadProgress(0);

            try {
                await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', '/api/upload');

                    // Send file metadata via headers to avoid multipart/form-data parsing issues
                    xhr.setRequestHeader('x-file-name', file.name);
                    xhr.setRequestHeader('content-type', file.type);

                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable) {
                            const pct = Math.round((event.loaded / event.total) * 100);
                            setVideoUploadProgress(pct);
                        }
                    };

                    xhr.onload = () => {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            const data = JSON.parse(xhr.responseText);
                            if (editorRef.current) {
                                const videoHtml = `<div class="video-container" style="margin:1.5rem 0;border-radius:8px;overflow:hidden;background:#f8fafc;border:1px solid #e2e8f0;box-shadow:0 4px 20px -5px rgba(0,0,0,0.2)"><video src="${data.url}" controls style="width:100%;height:auto;display:block"></video></div><p><br></p>`;
                                editorRef.current.innerHTML += videoHtml;
                                const updatedHtml = editorRef.current.innerHTML;
                                setEditorHtml(updatedHtml);
                                onChange(updatedHtml);
                            }
                            resolve();
                        } else {
                            reject(new Error('Upload failed: ' + xhr.statusText));
                        }
                    };

                    xhr.onerror = () => reject(new Error('Network error during upload.'));
                    xhr.send(file); // Send raw binary file
                });
            } catch (err) {
                alert('Gagal upload video: ' + err.message);
            } finally {
                setUploadingVideo(false);
                setVideoUploadProgress(0);
            }
        };
    };


    const insertImage = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            setUploadingImage(true);
            try {
                // Compress to max 1200px at 75% WebP quality before upload
                const compressed = await compressImage(file, { maxWidth: 1200, maxHeight: 900, quality: 0.75 });

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                        'x-file-name': file.name,
                        'content-type': file.type
                    },
                    body: compressed
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);

                const html = `<figure style="margin:1.5rem 0;text-align:center"><img src="${data.url}" alt="Inserted image" style="max-width:100%;border-radius:8px;height:auto"/></figure>`;
                editorRef.current?.focus();
                document.execCommand('insertHTML', false, html);
                syncContent();
            } catch (err) {
                alert('Gagal upload gambar: ' + err.message);
            } finally {
                setUploadingImage(false);
            }
        };
    };

    const setHeading = (level) => {
        if (level === 'p') {
            document.execCommand('formatBlock', false, '<p>');
        } else {
            document.execCommand('formatBlock', false, `<h${level}>`);
        }
        syncContent();
    };

    return (
        <div className="border rounded-lg overflow-hidden bg-white shadow-sm relative">
            {/* Video Upload Progress Overlay */}
            {uploadingVideo && (
                <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <span className="w-5 h-5 border-2 border-navy-deep border-t-transparent rounded-full animate-spin" />
                        <span className="font-bold text-navy-deep text-sm">
                            {videoUploadProgress < 100 ? `Uploading... ${videoUploadProgress}%` : 'Processing...'}
                        </span>
                    </div>
                    <div className="w-64 h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#103065] rounded-full transition-all duration-200"
                            style={{ width: `${videoUploadProgress}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-400">Harap tunggu, jangan tutup halaman ini</p>
                </div>
            )}
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-slate-50/80">
                {/* Headings */}
                <select
                    onMouseDown={(e) => e.stopPropagation()} // Allow click but manage focus
                    onChange={(e) => setHeading(e.target.value)}
                    className="h-8 px-2 text-sm border border-slate-200 rounded bg-white text-slate-700 cursor-pointer hover:border-slate-300 transition-colors"
                    defaultValue="p"
                >
                    <option value="p">Paragraf</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                    <option value="4">Heading 4</option>
                </select>

                <Divider />
                <ToolbarBtn onClick={() => exec('bold')} title="Bold (Ctrl+B)"><Bold size={14} /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec('italic')} title="Italic (Ctrl+I)"><Italic size={14} /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec('underline')} title="Underline (Ctrl+U)"><Underline size={14} /></ToolbarBtn>

                <Divider />
                <ToolbarBtn onClick={() => exec('insertUnorderedList')} title="Bullet List"><List size={14} /></ToolbarBtn>
                <ToolbarBtn onClick={() => exec('insertOrderedList')} title="Numbered List"><ListOrdered size={14} /></ToolbarBtn>

                <Divider />
                <ToolbarBtn onClick={insertLink} title="Insert Link"><Link2 size={14} /></ToolbarBtn>
                <ToolbarBtn onClick={insertImage} title={uploadingImage ? 'Uploading...' : 'Insert Image'}>
                    {uploadingImage
                        ? <span className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                        : <ImageIcon size={14} />
                    }
                </ToolbarBtn>
                <ToolbarBtn onClick={linkVideo} title="Link Video (YouTube/URL)"><Video size={14} /></ToolbarBtn>
                <ToolbarBtn onClick={uploadVideo} title={uploadingVideo ? 'Uploading...' : 'Upload Video (.mp4)'}>
                    {uploadingVideo
                        ? <span className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                        : <Film size={14} />
                    }
                </ToolbarBtn>
            </div>

            {/* Editable Content Area */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onKeyUp={handleKeyUp}
                onBlur={syncContent}
                onInput={syncContent}
                className="min-h-[380px] p-5 text-[15px] text-slate-700 leading-relaxed focus:outline-none prose max-w-none"
                style={{ minHeight: '380px' }}
                data-placeholder="Mulai tulis konten artikel di sini..."
            />

            <style jsx>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #94a3b8;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}

