'use client';

import { useState, useEffect } from 'react';
import { 
    Plus, Trash2, Loader2, Upload, FileText, Calendar, User, Tag, 
    Image as ImageIcon, ArrowLeft, Pencil, AlertTriangle, Film, 
    Save, Globe, Eye, Settings, ShieldCheck, Star, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import ContentEditor from '@/components/ui/ContentEditor';
import { compressImage } from '@/lib/compressImage';
import { createClient } from '@/lib/supabase-client';
import { cn } from '@/lib/utils';

// ── Custom Delete Confirmation Modal ─────────────────────────────────
function ConfirmDeleteModal({ article, onConfirm, onCancel, loading }) {
    if (!article) return null;
    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onCancel} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Delete Article?</h2>
                        <p className="text-sm text-slate-500 mt-0.5">This action is permanent and cannot be undone.</p>
                    </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border">
                    <p className="text-sm font-semibold text-slate-700 line-clamp-2">{article.title}</p>
                </div>
                <div className="flex gap-3 justify-end">
                    <Button variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
                    <Button onClick={onConfirm} disabled={loading} className="bg-red-600 hover:bg-red-700 text-white gap-2">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        Confirm Delete
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
    const [editingId, setEditingId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const supabase = createClient();

    // Filters, Search, and Pagination States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    // Reset pagination to page 1 on query/category change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);

    const categories = ['All', ...new Set(news.map(item => item.category || 'News'))];

    const filteredNews = news.filter(item => {
        const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.author?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.max(1, Math.ceil(filteredNews.length / ITEMS_PER_PAGE));
    const paginatedNews = filteredNews.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );


    const recordLog = async (target, action) => {
        try {
            await supabase.from('activity_logs').insert([{ target, action }]);
        } catch (error) {
            console.error("Failed to write log", error);
        }
    };

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        category: 'News',
        author: 'Gesit',
        content: '',
        video_url: '',
        source_url: '',
        status: 'published',
        is_featured: false,
        meta_title: '',
        meta_description: ''
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
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
        if (!selectedFile) return;
        try {
            const compressed = await compressImage(selectedFile, { maxWidth: 1920, quality: 0.8 });
            setFile(compressed);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(compressed);
        } catch (e) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setSubmitting(true);

        try {
            let imageUrl = editingId ? (preview && !file ? preview : '') : '';
            if (file) {
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'x-file-name': file.name, 'content-type': file.type },
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

            await recordLog('News Management', `${isEditing ? 'Updated' : 'Published'} article: "${formData.title}"`);
            
            // Success reset
            fetchNews();
            setIsCreating(false);
            setEditingId(null);
        } catch (err) {
            alert('Failed: ' + err.message);
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
            source_url: article.source_url || '',
            status: article.status || 'published',
            is_featured: article.is_featured || false,
            meta_title: article.meta_title || '',
            meta_description: article.meta_description || ''
        });
        setPreview(article.image_url || null);
        setFile(null);
        setIsCreating(true);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/news?id=${deleteTarget.id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error("Delete failed");
            await recordLog('News Management', `Permanently deleted article: "${deleteTarget.title}"`);
            setNews(news.filter(n => n.id !== deleteTarget.id));
            setDeleteTarget(null);
        } catch (err) {
            alert(err.message);
        } finally {
            setDeleting(false);
        }
    };

    if (isCreating) {
        return (
            <div className="min-h-screen bg-slate-50/50 -mt-8 -mx-8 px-8 pt-8 pb-20">
                {/* Fixed Top Header */}
                <div className="sticky top-0 z-40 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md border-b border-slate-200 -mx-8 px-8 py-4 mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setIsCreating(false)} className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                                {editingId ? 'Edit Article' : 'New Publication'}
                            </h1>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Article Editor v2.0</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={() => setIsCreating(false)} className="text-xs font-bold uppercase tracking-widest">
                            Dismiss
                        </Button>
                        <Button 
                            onClick={handleSubmit} 
                            disabled={submitting}
                            className="bg-[#1b365d] hover:bg-[#152e50] text-white text-xs font-bold uppercase tracking-widest min-w-[140px]"
                        >
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            {editingId ? 'Save Changes' : 'Publish Now'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[1fr,360px] gap-8 max-w-[1400px] mx-auto">
                    {/* Left Panel: Content */}
                    <div className="space-y-8">
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b pb-4">
                                <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Core Content</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-500 uppercase">Article Headline</Label>
                                    <Input 
                                        placeholder="Enter a compelling title..."
                                        value={formData.title}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setFormData({ 
                                                ...formData, 
                                                title: val, 
                                                slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') 
                                            });
                                        }}
                                        className="text-2xl font-bold h-16 border-slate-200 focus:border-[#bc9c33] focus:ring-[#bc9c33]/20"
                                    />
                                    <div className="flex items-center gap-2 text-xs text-slate-400 font-medium px-1">
                                        <Globe className="w-3 h-3" />
                                        <span>Permalink: gesit.co.id/news/</span>
                                        <span className="text-[#bc9c33] font-bold">{formData.slug || 'your-slug-here'}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6">
                                    <Label className="text-xs font-bold text-slate-500 uppercase">Body Content</Label>
                                    <ContentEditor 
                                        value={formData.content}
                                        onChange={(val) => setFormData({ ...formData, content: val })}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* SEO Card */}
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b pb-4 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest">Search Optimization</CardTitle>
                                <div className="flex items-center gap-2 text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-bold uppercase tracking-widest">
                                    <Search className="w-3 h-3" /> SEO Ready
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-xs font-bold text-slate-500 uppercase">Custom Meta Title</Label>
                                    <Input 
                                        placeholder="Defaults to article title if empty..."
                                        value={formData.meta_title}
                                        onChange={e => setFormData({ ...formData, meta_title: e.target.value })}
                                        className="bg-slate-50/50"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-xs font-bold text-slate-500 uppercase">Meta Description</Label>
                                    <textarea 
                                        rows={3}
                                        placeholder="A brief summary for search results (approx 160 chars)..."
                                        className="w-full rounded-md border border-slate-200 bg-slate-50/50 p-3 text-sm focus:outline-none focus:border-[#bc9c33]"
                                        value={formData.meta_description}
                                        onChange={e => setFormData({ ...formData, meta_description: e.target.value })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Panel: Sidebar Settings */}
                    <div className="space-y-6">
                        {/* Status & Featured */}
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Featured Article</Label>
                                        <p className="text-[10px] text-slate-400">Display in top banners</p>
                                    </div>
                                    <Switch 
                                        checked={formData.is_featured}
                                        onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                                    />
                                </div>
                                <div className="space-y-3 pt-2 border-t">
                                    <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Publish Status</Label>
                                    <select 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm font-semibold text-slate-700"
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Article Details */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="bg-slate-50/50 border-b py-3">
                                <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Article Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase">Publish Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <Input className="pl-10 text-sm" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase">Category</Label>
                                    <div className="relative">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <Input className="pl-10 text-sm" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase">Author / Publication</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <Input className="pl-10 text-sm" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2 border-t">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase">Source News Link</Label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <Input 
                                            placeholder="https://source-news-link.com" 
                                            className="pl-10 text-sm" 
                                            value={formData.source_url} 
                                            onChange={e => setFormData({ ...formData, source_url: e.target.value })} 
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Featured Media */}
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-slate-50/50 border-b py-3">
                                <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hero Banner</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="relative group">
                                    {preview ? (
                                        <div className="w-full aspect-video rounded-md overflow-hidden bg-slate-100 border relative">
                                            <img src={preview} alt="" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Label htmlFor="media-upload" className="cursor-pointer bg-white text-slate-800 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest">
                                                    Change Image
                                                </Label>
                                            </div>
                                        </div>
                                    ) : (
                                        <Label htmlFor="media-upload" className="w-full aspect-video rounded-md border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors">
                                            <ImageIcon className="w-6 h-6 text-slate-300" />
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload Banner</span>
                                        </Label>
                                    )}
                                    <input id="media-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </div>
                                <div className="space-y-2 pt-2 border-t mt-4">
                                    <Label className="text-[10px] font-bold text-slate-500 uppercase">Alternative Video URL</Label>
                                    <div className="relative">
                                        <Film className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <Input 
                                            placeholder="YouTube / MP4 Link..." 
                                            className="pl-10 text-xs" 
                                            value={formData.video_url}
                                            onChange={e => setFormData({ ...formData, video_url: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-[#1b365d]" style={{ fontFamily: 'Georgia, serif' }}>News Management</h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Global Content Hub</p>
                </div>
                <Button onClick={() => {
                    setEditingId(null);
                    setFormData({
                        title: '',
                        slug: '',
                        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                        category: 'News',
                        author: 'Gesit',
                        content: '',
                        video_url: '',
                        source_url: '',
                        status: 'published',
                        is_featured: false,
                        meta_title: '',
                        meta_description: ''
                    });
                    setPreview(null);
                    setFile(null);
                    setIsCreating(true);
                }} className="bg-[#1b365d] hover:bg-[#152e50] text-white shadow-lg shadow-blue-900/10 h-12 px-6 font-bold text-xs uppercase tracking-widest">
                    <Plus className="w-4 h-4 mr-2" /> Write Article
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Stories</p>
                            <h3 className="text-2xl font-bold text-slate-800">{news.length}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                            <Star className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Featured</p>
                            <h3 className="text-2xl font-bold text-slate-800">{news.filter(n => n.is_featured).length}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                            <h3 className="text-2xl font-bold text-slate-800">Operational</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-slate-50/50 border-b py-5 px-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">Article Repository</CardTitle>
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                            {/* Category Filter Select */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="bg-white border border-slate-200 rounded-lg text-xs font-semibold px-3 h-10 w-full sm:w-40 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#bc9c33]"
                            >
                                <option value="All">All Categories</option>
                                {categories.filter(c => c !== 'All').map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>

                            {/* Search Query Input */}
                            <div className="relative w-full sm:w-60 group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="Search stories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-10 bg-white rounded-lg border-slate-200 text-xs font-medium w-full"
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="animate-spin text-[#1b365d] w-10 h-10" />
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Synchronizing Records...</p>
                        </div>
                    ) : filteredNews.length === 0 ? (
                        <div className="text-center py-24">
                            <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-700">No Articles Found</h3>
                            <p className="text-slate-400 text-sm mt-1">Try adjusting your search query or category filters.</p>
                        </div>
                    ) : (
                        <div>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50/20 border-b">
                                            <TableHead className="py-5 px-8 font-bold text-slate-700">Publication Details</TableHead>
                                            <TableHead className="font-bold text-slate-700">Metadata</TableHead>
                                            <TableHead className="font-bold text-slate-700">Status</TableHead>
                                            <TableHead className="text-right px-8 font-bold text-slate-700">Options</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedNews.map((item) => (
                                            <TableRow key={item.id} className="hover:bg-slate-50/30 transition-colors border-b last:border-0">
                                                <TableCell className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                                                            <img src={item.image_url || '/placeholder.jpg'} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <h4 className="font-bold text-[#1b365d] text-[15px] leading-snug line-clamp-2">{item.title}</h4>
                                                            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                                                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
                                                                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {item.author}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{item.category}</span>
                                                        {item.is_featured && (
                                                            <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-100 uppercase tracking-wider">Featured</span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cn(
                                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                                                        item.status === 'published' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-500 border-slate-200"
                                                    )}>
                                                        <div className={cn("w-1.5 h-1.5 rounded-full", item.status === 'published' ? "bg-emerald-500" : "bg-slate-400")} />
                                                        {item.status || 'Published'}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right px-8">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="h-9 w-9 text-slate-400 hover:text-[#1b365d] hover:bg-slate-100">
                                                            <Pencil className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(item)} className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination Navigation Footer */}
                            <div className="px-8 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                                <p className="text-xs font-semibold text-slate-500">
                                    Showing <span className="text-[#1b365d] font-bold">{Math.min(filteredNews.length, (currentPage - 1) * ITEMS_PER_PAGE + 1)}</span> to <span className="text-[#1b365d] font-bold">{Math.min(filteredNews.length, currentPage * ITEMS_PER_PAGE)}</span> of <span className="text-[#1b365d] font-bold">{filteredNews.length}</span> publications
                                </p>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="h-8 text-xs font-semibold"
                                    >
                                        Previous
                                    </Button>
                                    <span className="text-xs font-bold text-slate-700 px-3 py-1 bg-white border rounded-md">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="h-8 text-xs font-semibold"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <ConfirmDeleteModal 
                article={deleteTarget} 
                loading={deleting} 
                onConfirm={handleDelete} 
                onCancel={() => setDeleteTarget(null)} 
            />
        </div>
    );
}
