'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Upload, FileText, Calendar, User, Tag, Image as ImageIcon, ArrowLeft, Pencil, AlertTriangle, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ContentEditor from '@/components/ui/ContentEditor';
import { compressImage } from '@/lib/compressImage';

// ── Custom Delete Confirmation Modal ─────────────────────────────────
function ConfirmDeleteModal({ article, onConfirm, onCancel, loading }) {
    if (!article) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Hapus Artikel?</h2>
                        <p className="text-sm text-slate-500 mt-0.5">Tindakan ini tidak dapat dibatalkan.</p>
                    </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border">
                    <p className="text-sm font-semibold text-slate-700 line-clamp-2">{article.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{article.slug}</p>
                </div>
                <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={onCancel} disabled={loading}>Batal</Button>
                    <Button
                        onClick={onConfirm}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        Ya, Hapus
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function NewsDashboard() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState(null); // null = create mode, id = edit mode
    const [submitting, setSubmitting] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null); // article to confirm-delete
    const [deleting, setDeleting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        category: 'News',
        author: 'Gesit',
        content: '',
        video_url: '',
        source_url: ''
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await fetch('/api/news');
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setNews(data);
        } catch (err) {
            console.error('Failed to fetch news:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            setFile(null);
            setPreview(null);
            return;
        }
        try {
            const compressed = await compressImage(selectedFile, { maxWidth: 1920, maxHeight: 1080, quality: 0.75 });
            setFile(compressed);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(compressed);
        } catch {
            // Fallback: use original file if compression fails
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let imageUrl = editingId ? (preview && !file ? preview : '') : '';
            // Upload Hero Image if a new file was selected
            if (file) {
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                        'x-file-name': file.name || 'hero-image',
                        'content-type': file.type || 'image/jpeg'
                    },
                    body: file
                });
                const uploadData = await uploadRes.json();
                if (!uploadRes.ok) throw new Error(uploadData.error);
                imageUrl = uploadData.url;
            }

            const payload = { ...formData, ...(imageUrl ? { image_url: imageUrl } : {}) };
            const isEditing = !!editingId;

            const newsRes = await fetch(isEditing ? `/api/news?id=${editingId}` : '/api/news', {
                method: isEditing ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const newsData = await newsRes.json();
            if (!newsRes.ok) throw new Error(newsData.error);

            if (isEditing) {
                setNews(news.map(item => item.id === editingId ? newsData : item));
            } else {
                setNews([newsData, ...news]);
            }

            // Reset form
            setFormData({
                title: '',
                slug: '',
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                category: 'News',
                author: 'Gesit',
                content: '',
                video_url: '',
                source_url: ''
            });
            setFile(null);
            setPreview(null);
            setEditingId(null);
            setIsCreating(false);

            alert(isEditing ? 'Artikel berhasil diperbarui!' : 'Artikel berhasil diterbitkan!');
        } catch (err) {
            alert('Gagal: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (article) => {
        setEditingId(article.id);
        setFormData({
            title: article.title || '',
            slug: article.slug || '',
            date: article.date || '',
            category: article.category || 'News',
            author: article.author || 'Gesit',
            content: article.content || '',
            video_url: article.video_url || '',
            source_url: article.source_url || ''
        });
        setFile(null);
        setPreview(article.image_url || null);
        setIsCreating(true);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/news?id=${deleteTarget.id}`, { method: 'DELETE' });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setNews(news.filter(item => item.id !== deleteTarget.id));
            setDeleteTarget(null);
        } catch (err) {
            alert('Gagal menghapus artikel: ' + err.message);
        } finally {
            setDeleting(false);
        }
    };

    // If in Create Mode
    if (isCreating) {
        return (
            <div className="space-y-6 pb-20">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => setIsCreating(false)} className="rounded-full shadow-sm hover:bg-slate-100">
                        <ArrowLeft className="w-5 h-5 text-navy-deep" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-navy-deep">Write News Article</h1>
                        <p className="text-slate-500">Draft your content and manage rich media uploads.</p>
                    </div>
                </div>

                <Card className="shadow-md border-none ring-1 ring-slate-200 mt-8">
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-8 pt-8">
                            {/* General Information */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label htmlFor="title" className="flex items-center gap-2 font-bold text-navy-deep">
                                        <FileText className="w-4 h-4" /> Article Title
                                    </Label>
                                    <Input
                                        id="title"
                                        required
                                        placeholder="Enter an engaging title..."
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })}
                                        className="h-12 text-lg"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="slug" className="font-bold text-navy-deep">URL Slug (Auto-generated)</Label>
                                    <Input
                                        id="slug"
                                        required
                                        className="bg-slate-50 text-slate-500 h-12"
                                        value={formData.slug}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-100">
                                <div className="space-y-2">
                                    <Label htmlFor="date" className="flex items-center gap-2 font-medium">
                                        <Calendar className="w-4 h-4 text-slate-400" /> Publish Date
                                    </Label>
                                    <Input
                                        id="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="flex items-center gap-2 font-medium">
                                        <Tag className="w-4 h-4 text-slate-400" /> Category
                                    </Label>
                                    <Input
                                        id="category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="author" className="flex items-center gap-2 font-medium">
                                        <User className="w-4 h-4 text-slate-400" /> Author / Publisher
                                    </Label>
                                    <Input
                                        id="author"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="source_url" className="flex items-center gap-2 font-medium">
                                        <FileText className="w-4 h-4 text-slate-400" /> Source Link / Ref
                                    </Label>
                                    <Input
                                        id="source_url"
                                        placeholder="https://..."
                                        value={formData.source_url}
                                        onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Hero Media Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 font-bold text-navy-deep">
                                        <ImageIcon className="w-4 h-4" /> Primary Banner / Hero Image
                                    </Label>
                                    <div className="flex flex-col gap-4 border rounded-lg p-4 bg-slate-50/50">
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="cursor-pointer bg-white"
                                        />
                                        {preview ? (
                                            <div className="w-full aspect-video rounded-md overflow-hidden ring-1 ring-slate-200 bg-slate-100">
                                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-full aspect-video rounded-md border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 bg-white">
                                                <ImageIcon className="w-6 h-6 mb-2 opacity-50" />
                                                <span className="text-xs">No image selected</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label htmlFor="video_url" className="flex items-center gap-2 font-bold text-navy-deep">
                                        <Film className="w-4 h-4" /> Feature Video (YouTube/MP4 URL)
                                    </Label>
                                    <div className="flex flex-col gap-4 border rounded-lg p-4 bg-slate-50/50 h-auto">
                                        <Input
                                            id="video_url"
                                            placeholder="Paste YouTube or MP4 link here..."
                                            value={formData.video_url}
                                            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                                            className="bg-white"
                                        />
                                        <div className="w-full aspect-video rounded-md border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 bg-white overflow-hidden relative">
                                            {formData.video_url ? (
                                                <div className="absolute inset-0 bg-navy-deep flex items-center justify-center text-white text-center p-4">
                                                    <div className="space-y-2">
                                                        <Film className="w-8 h-8 mx-auto opacity-50" />
                                                        <p className="text-xs font-bold">Video Link Detected</p>
                                                        <p className="text-[10px] opacity-70 truncate max-w-full px-4">{formData.video_url}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <Film className="w-6 h-6 mb-2 opacity-50" />
                                                    <span className="text-xs">Optional video link</span>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-500 italic">This video will replace the static image banner on the article page.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Rich Text Content */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <Label htmlFor="content" className="font-bold text-navy-deep">Comprehensive Article Content</Label>
                                <p className="text-sm text-slate-500 pb-2">Format teks, sisipkan gambar inline, atau embed video YouTube langsung ke dalam konten artikel.</p>
                                <ContentEditor
                                    value={formData.content}
                                    onChange={(val) => setFormData({ ...formData, content: val })}
                                />
                            </div>
                        </CardContent>

                        <CardFooter className="bg-slate-50/80 border-t p-6 rounded-b-lg flex justify-end gap-4 mt-8">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsCreating(false)}
                                disabled={submitting}
                                className="min-w-[120px]"
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={submitting}
                                type="submit"
                                size="lg"
                                className="bg-navy-deep hover:bg-navy-deep/90 text-white font-bold min-w-[200px] lg:w-auto"
                            >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                                {submitting ? 'Publishing...' : 'Publish Article'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        );
    }

    // Default view: Table Data
    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-navy-deep">News Management</h1>
                    <p className="text-slate-500">View, sort, and manage all public news announcements.</p>
                </div>
                <Button
                    onClick={() => setIsCreating(true)}
                    className="bg-navy-deep hover:bg-gold hover:text-navy-deep text-white transition-all shadow-md shrink-0"
                >
                    <Plus className="w-4 h-4 mr-2" /> Create News
                </Button>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="shadow-sm border-none ring-1 ring-slate-200">
                    <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Published Articles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-navy-deep">{news.length}</div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-none ring-1 ring-slate-200">
                    <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium text-slate-500">Latest Publication</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold text-navy-deep">{news[0]?.date || '—'}</div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-none ring-1 ring-slate-200 bg-[#bc9c33]/5">
                    <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium text-navy-deep flex gap-2">
                            <Tag className="w-4 h-4" /> Tip
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-slate-600">The primary image uploaded will function as the main hero banner on the exact article page.</div>
                    </CardContent>
                </Card>
            </div>

            {/* News List */}
            <Card className="shadow-md border-none ring-1 ring-slate-200 overflow-hidden flex flex-col">
                <CardHeader className="bg-slate-50/50 border-b">
                    <CardTitle className="text-xl">Article Database</CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto w-full">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <Loader2 className="animate-spin text-navy-deep w-10 h-10" />
                            <p className="text-slate-500 font-medium">Fetching database records...</p>
                        </div>
                    ) : news.length === 0 ? (
                        <div className="text-center py-24">
                            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-700">No articles found</h3>
                            <p className="text-slate-400 mt-1 mb-6">You haven't published any news articles yet.</p>
                            <Button variant="outline" onClick={() => setIsCreating(true)}>Write Your First Article</Button>
                        </div>
                    ) : (
                        <div className="min-w-[800px]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/30">
                                        <TableHead className="py-5 px-6 font-bold text-slate-700">Article Title</TableHead>
                                        <TableHead className="font-bold text-slate-700">Publish Date</TableHead>
                                        <TableHead className="font-bold text-slate-700">Category / Author</TableHead>
                                        <TableHead className="text-right font-bold text-slate-700">Status</TableHead>
                                        <TableHead className="text-right px-6 font-bold text-slate-700">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {news.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="px-6 py-4">
                                                <p className="font-bold text-navy-deep text-sm line-clamp-2 max-w-[400px]">
                                                    {item.title}
                                                </p>
                                                <p className="text-xs text-slate-400 mt-1">/{item.slug}</p>
                                            </TableCell>
                                            <TableCell className="text-slate-500 text-sm">
                                                <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {item.date}</span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1 items-start">
                                                    <span className="px-2.5 py-0.5 rounded-sm text-[10px] font-bold bg-[#bc9c33]/15 text-[#bc9c33] uppercase">
                                                        {item.category}
                                                    </span>
                                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                                        <User className="w-3 h-3" /> {item.author}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <span className="inline-flex items-center justify-end gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs border border-emerald-100">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Published
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right px-6">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-slate-400 hover:text-navy-deep hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
                                                        onClick={() => setDeleteTarget(item)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Render Delete Confirmation */}
            <ConfirmDeleteModal
                article={deleteTarget}
                loading={deleting}
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </div>
    );
}
