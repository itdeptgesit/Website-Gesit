'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Loader2, Trash2, Save, UploadCloud, AlertTriangle,
    GripVertical, Plus, Images, CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

// ── Confirm Dialog ──────────────────────────────────────────────────────────
function ConfirmDialog({ open, title, description, onConfirm, onCancel, confirmLabel = 'Yes, continue', confirmVariant = 'destructive' }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 space-y-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 text-base">{title}</h3>
                        <p className="text-sm text-slate-500 mt-1">{description}</p>
                    </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={onCancel} className="border-slate-300 text-slate-700 hover:bg-slate-100">Cancel</Button>
                    <Button
                        variant={confirmVariant === 'destructive' ? 'destructive' : 'default'}
                        className={confirmVariant !== 'destructive' ? 'bg-[#103065] text-white hover:bg-[#0c244b]' : ''}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ── Page Options — ordered to match website header navigation ───────────────
const PAGE_OPTIONS = [
    { value: 'home',              label: 'Home' },
    { value: 'property',          label: 'Our Business – Property' },
    { value: 'trading-services',  label: 'Our Business – Trading & Services' },
    { value: 'manufacturing',     label: 'Our Business – Manufacturing' },
    { value: 'natural-resources', label: 'Our Business – Natural Resources' },
    { value: 'csr',               label: 'CSR' },
    { value: 'news',              label: 'News' },
    { value: 'career',            label: 'Career' },
    { value: 'contact-us',        label: 'Contact Us' },
];

// ── Main Component ──────────────────────────────────────────────────────────
export default function HeroesDashboard() {
    const supabase = createClient();
    const [loading,          setLoading]          = useState(true);
    const [saving,           setSaving]           = useState(false);
    const [selectedPage,     setSelectedPage]     = useState('home');
    const [images,           setImages]           = useState([]);
    const [uploadingId,      setUploadingId]      = useState(null);
    const [draggedIndex,     setDraggedIndex]     = useState(null);
    const [hasChanges,       setHasChanges]       = useState(false);
    const [confirmDialog,    setConfirmDialog]    = useState({ open: false });

    const closeConfirm = () => setConfirmDialog(d => ({ ...d, open: false }));

    // ── Fetch ───────────────────────────────────────────────────────────────
    const fetchImages = useCallback(async () => {
        setLoading(true);
        setHasChanges(false);
        const { data, error } = await supabase
            .from('hero_images')
            .select('*')
            .eq('page_name', selectedPage)
            .order('display_order');
        if (error) toast.error('Failed to load images');
        setImages(data || []);
        setLoading(false);
    }, [selectedPage]);

    useEffect(() => { fetchImages(); }, [fetchImages]);

    // ── Upload helpers ──────────────────────────────────────────────────────
    const uploadFile = async (file) => {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: file,
            headers: { 'x-file-name': file.name, 'content-type': file.type },
        });
        if (!response.ok) throw new Error('Upload failed');
        const data = await response.json();
        return data.url;
    };

    // Add new slide(s) – supports multiple files
    const handleAddSlides = async (files) => {
        if (!files || files.length === 0) return;
        setUploadingId('new');
        let added = 0;
        for (const file of Array.from(files)) {
            try {
                const url = await uploadFile(file);
                setImages(prev => [
                    ...prev,
                    { id: 'temp-' + Date.now() + '-' + Math.random(), image_url: url, page_name: selectedPage, display_order: prev.length },
                ]);
                added++;
            } catch {
                toast.error(`Failed to upload: ${file.name}`);
            }
        }
        if (added > 0) {
            toast.success(`${added} slide${added > 1 ? 's' : ''} added! Click "Save" to publish.`);
            setHasChanges(true);
        }
        setUploadingId(null);
    };

    // Replace existing slide
    const handleReplace = async (file, itemId) => {
        setUploadingId(itemId);
        try {
            const url = await uploadFile(file);
            setImages(prev => prev.map(img => img.id === itemId ? { ...img, image_url: url } : img));
            setHasChanges(true);
            toast.success('Image replaced! Click "Save" to publish.');
        } catch {
            toast.error('Failed to upload replacement image');
        }
        setUploadingId(null);
    };

    // Remove a slide (instant DB delete for saved items, local remove for temp)
    const handleRemove = async (id) => {
        if (!id.startsWith('temp-')) {
            const { error } = await supabase.from('hero_images').delete().eq('id', id);
            if (error) { toast.error('Failed to remove'); return; }
        }
        setImages(prev => prev.filter(img => img.id !== id));
        setHasChanges(true);
        toast.success('Slide removed');
    };

    const showRemoveConfirm = (id) => {
        setConfirmDialog({
            open: true,
            title: 'Remove this slide?',
            description: 'This image will be permanently removed from the slider.',
            onConfirm: () => { handleRemove(id); closeConfirm(); },
        });
    };

    const showReplaceConfirm = (file, itemId) => {
        setConfirmDialog({
            open: true,
            title: 'Replace this image?',
            description: 'The current photo will be replaced with the new one.',
            confirmLabel: 'Yes, Replace',
            confirmVariant: 'primary',
            onConfirm: () => { handleReplace(file, itemId); closeConfirm(); },
        });
    };

    // ── Drag & Drop ─────────────────────────────────────────────────────────
    const handleDragStart = (e, index) => {
        e.dataTransfer.effectAllowed = 'move';
        setDraggedIndex(index);
    };

    const handleDragEnter = (e, targetIndex) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetIndex) return;
        setImages(prev => {
            const arr = [...prev];
            const [moved] = arr.splice(draggedIndex, 1);
            arr.splice(targetIndex, 0, moved);
            return arr;
        });
        setDraggedIndex(targetIndex);
        setHasChanges(true);
    };

    // ── Save ────────────────────────────────────────────────────────────────
    const saveAll = async () => {
        setSaving(true);
        try {
            for (let i = 0; i < images.length; i++) {
                const item = images[i];
                if (!item.image_url) continue;
                if (item.id.startsWith('temp-')) {
                    await supabase.from('hero_images').insert({ page_name: selectedPage, image_url: item.image_url, display_order: i });
                } else {
                    await supabase.from('hero_images').update({ image_url: item.image_url, display_order: i }).eq('id', item.id);
                }
            }
            toast.success('Hero slider saved successfully!');
            setHasChanges(false);
            fetchImages();
        } catch {
            toast.error('Error saving changes');
        }
        setSaving(false);
    };

    const selectedLabel = PAGE_OPTIONS.find(p => p.value === selectedPage)?.label ?? selectedPage;

    return (
        <div className="space-y-6 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#103065] flex items-center gap-2">
                        <Images className="w-6 h-6" /> Hero Sliders Management
                    </h1>
                    <p className="text-sm text-slate-500 mt-0.5">Manage the top banner slides for each page. Drag to reorder, upload to add, trash to remove.</p>
                </div>
                {hasChanges && (
                    <Button
                        onClick={saveAll}
                        disabled={saving}
                        className="gap-2 bg-[#BC9C33] text-white hover:bg-[#a68a2d] px-6 shadow-md"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </Button>
                )}
            </div>

            <Card className="shadow-sm">
                {/* Toolbar */}
                <CardHeader className="border-b border-slate-100 pb-4">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Page selector */}
                        <div className="flex-1 min-w-[220px]">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Select Page</label>
                            <select
                                value={selectedPage}
                                onChange={(e) => setSelectedPage(e.target.value)}
                                className="w-full bg-white border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-[#BC9C33] focus:border-[#BC9C33] px-3 py-2.5 shadow-sm"
                            >
                                {PAGE_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Add button */}
                        <div className="relative mt-5">
                            <Button
                                type="button"
                                disabled={uploadingId === 'new'}
                                className="bg-[#103065] hover:bg-[#0c244b] text-white gap-2 px-5"
                            >
                                {uploadingId === 'new'
                                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</>
                                    : <><Plus className="w-4 h-4" /> Add Slide(s)</>
                                }
                            </Button>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    if (e.target.files?.length) { handleAddSlides(e.target.files); e.target.value = ''; }
                                }}
                            />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-6">
                    {/* Slide count + hint */}
                    {!loading && images.length > 0 && (
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm text-slate-500">
                                <span className="font-semibold text-slate-700">{images.length}</span> slide{images.length !== 1 ? 's' : ''} · {selectedLabel}
                            </p>
                            <p className="text-xs text-slate-400 hidden sm:block">↔ Drag cards to reorder · Hover for actions</p>
                        </div>
                    )}

                    {/* Loading */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-48 gap-3 text-slate-400">
                            <Loader2 className="w-8 h-8 animate-spin" />
                            <span className="text-sm">Loading slides…</span>
                        </div>
                    ) : images.length === 0 ? (
                        /* Empty state */
                        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 gap-3">
                            <UploadCloud className="w-10 h-10 text-slate-300" />
                            <p className="font-medium">No slides for this page yet</p>
                            <p className="text-sm">Click <strong>"Add Slide(s)"</strong> to upload your first hero image.</p>
                        </div>
                    ) : (
                        /* Grid */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {images.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`relative group rounded-xl overflow-hidden border-2 bg-slate-100 aspect-video transition-all duration-200 cursor-grab active:cursor-grabbing
                                        ${draggedIndex === index
                                            ? 'border-[#BC9C33] opacity-50 scale-95 shadow-xl'
                                            : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                                        }`}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDragEnter={(e) => handleDragEnter(e, index)}
                                    onDragEnd={() => setDraggedIndex(null)}
                                >
                                    {/* Image */}
                                    <img
                                        src={item.image_url}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover pointer-events-none"
                                    />

                                    {/* Slide number badge */}
                                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full pointer-events-none select-none">
                                        Slide {index + 1}
                                    </div>

                                    {/* Drag handle hint */}
                                    <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        <GripVertical className="w-3.5 h-3.5" />
                                    </div>

                                    {/* Hover overlay with actions */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end pb-4 gap-2">
                                        {/* Replace button */}
                                        <div className="relative">
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="w-28 text-xs gap-1"
                                                disabled={!!uploadingId}
                                            >
                                                {uploadingId === item.id
                                                    ? <><Loader2 className="w-3 h-3 animate-spin" /> Uploading…</>
                                                    : <><UploadCloud className="w-3 h-3" /> Replace</>
                                                }
                                            </Button>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={(e) => {
                                                    if (e.target.files?.[0]) {
                                                        showReplaceConfirm(e.target.files[0], item.id);
                                                        e.target.value = '';
                                                    }
                                                }}
                                            />
                                        </div>

                                        {/* Remove button */}
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="w-28 text-xs gap-1"
                                            onClick={() => showRemoveConfirm(item.id)}
                                        >
                                            <Trash2 className="w-3 h-3" /> Remove
                                        </Button>
                                    </div>

                                    {/* Uploading overlay */}
                                    {uploadingId === item.id && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <Loader2 className="w-8 h-8 animate-spin text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Upload-more card */}
                            <div className="relative rounded-xl border-2 border-dashed border-slate-200 hover:border-[#BC9C33] bg-slate-50 hover:bg-amber-50/30 aspect-video flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-[#BC9C33] transition-all cursor-pointer group">
                                {uploadingId === 'new'
                                    ? <Loader2 className="w-8 h-8 animate-spin" />
                                    : <>
                                        <Plus className="w-8 h-8" />
                                        <span className="text-sm font-medium">Add more slides</span>
                                        <span className="text-xs text-center px-4 text-slate-300 group-hover:text-amber-400/70">Select multiple files to batch upload</span>
                                    </>
                                }
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        if (e.target.files?.length) { handleAddSlides(e.target.files); e.target.value = ''; }
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Save bar (sticky bottom) */}
                    {hasChanges && (
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                            <p className="text-sm text-amber-600 flex items-center gap-1.5">
                                <AlertTriangle className="w-4 h-4" /> You have unsaved changes.
                            </p>
                            <div className="flex gap-3">
                                <Button variant="outline" onClick={fetchImages} disabled={saving}>Discard</Button>
                                <Button
                                    onClick={saveAll}
                                    disabled={saving}
                                    className="gap-2 bg-[#BC9C33] text-white hover:bg-[#a68a2d] px-6"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                    Save & Publish
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <ConfirmDialog
                open={confirmDialog.open}
                title={confirmDialog.title}
                description={confirmDialog.description}
                onConfirm={confirmDialog.onConfirm}
                onCancel={closeConfirm}
                confirmLabel={confirmDialog.confirmLabel}
                confirmVariant={confirmDialog.confirmVariant}
            />
        </div>
    );
}
