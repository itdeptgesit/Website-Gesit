'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Plus, Trash2, Save, GripVertical, UploadCloud, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

// Reusable Confirm Dialog
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
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
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

export default function CSRDashboard() {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [uploadingImageId, setUploadingImageId] = useState(null);
    const [galleryPage, setGalleryPage] = useState(1);
    const GALLERY_PER_PAGE = 10;

    // Confirm dialog state
    const [confirmDialog, setConfirmDialog] = useState({ open: false, title: '', description: '', onConfirm: null, pendingFile: null, pendingItemId: null });
    const closeConfirm = () => setConfirmDialog(d => ({ ...d, open: false }));
    const showRemoveConfirm = (table, id, state, setState, storyNum) => {
        setConfirmDialog({
            open: true,
            title: `Remove Story ${storyNum}?`,
            description: 'This photo will be removed from the gallery. You still need to press Save Gallery to apply changes.',
            onConfirm: () => { handleDelete(table, id, state, setState); closeConfirm(); },
        });
    };
    const showReplaceConfirm = (file, itemId, storyNum) => {
        setConfirmDialog({
            open: true,
            title: `Replace Story ${storyNum}?`,
            description: 'The current photo will be replaced with the new one you selected. Press Save Gallery afterward to apply changes.',
            onConfirm: () => { uploadToCloudinary(file, itemId); closeConfirm(); },
            confirmVariant: 'primary',
            confirmLabel: 'Yes, Replace',
        });
    };
    
    const [draggedGalleryIndex, setDraggedGalleryIndex] = useState(null);

    const handleGalleryDragStart = (e, globalIndex) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', globalIndex.toString());
        setDraggedGalleryIndex(globalIndex);
    };

    const handleGalleryDragEnter = (e, targetGlobalIndex) => {
        e.preventDefault();
        if (draggedGalleryIndex === null || draggedGalleryIndex === targetGlobalIndex) return;
        setGallery(prev => {
            const newGallery = [...prev];
            const item = newGallery[draggedGalleryIndex];
            newGallery.splice(draggedGalleryIndex, 1);
            newGallery.splice(targetGlobalIndex, 0, item);
            return newGallery;
        });
        setDraggedGalleryIndex(targetGlobalIndex);
    };

    // State for Gallery
    const [gallery, setGallery] = useState([]);
    // State for Ongoing Programs
    const [ongoing, setOngoing] = useState([]);
    // State for Initiatives
    const [initiatives, setInitiatives] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [galleryRes, ongoingRes, initRes] = await Promise.all([
                supabase.from('csr_gallery').select('*').order('display_order'),
                supabase.from('csr_ongoing_programs').select('*').order('display_order'),
                supabase.from('csr_initiatives').select('*').order('display_order')
            ]);
            
            if (galleryRes.data) setGallery(galleryRes.data);
            if (ongoingRes.data) setOngoing(ongoingRes.data);
            if (initRes.data) {
                // Ensure content_json is always an array for the form builder
                const formatted = initRes.data.map(item => ({
                    ...item,
                    content_json: Array.isArray(item.content_json) ? item.content_json : []
                }));
                setInitiatives(formatted);
            }
        } catch (error) {
            toast.error("Failed to fetch data");
        }
        setLoading(false);
    };

    // ==========================================
    // CLOUDINARY UPLOAD LOGIC
    // ==========================================
    const uploadToCloudinary = async (file, itemId) => {
        setUploadingImageId(itemId);
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: file,
                headers: {
                    'x-file-name': file.name,
                    'content-type': file.type
                }
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            
            // Update gallery item with new URL
            const newGallery = [...gallery];
            const index = newGallery.findIndex(g => g.id === itemId);
            if (index !== -1) {
                newGallery[index].image_url = data.url;
                setGallery(newGallery);
            }
            toast.success("Image uploaded to Cloudinary!");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image");
        } finally {
            setUploadingImageId(null);
        }
    };

    const uploadToCloudinaryAndCreateNew = async (file) => {
        setUploadingImageId('new_upload');
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: file,
                headers: {
                    'x-file-name': file.name,
                    'content-type': file.type
                }
            });

            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            
            setGallery(prev => [{ id: 'temp-' + Date.now(), image_url: data.url, display_order: 0 }, ...prev]);
            setGalleryPage(1); // jump to first page to see new photo
            toast.success("New image uploaded! Saved to Story 1.");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload new image");
        } finally {
            setUploadingImageId(null);
        }
    };

    // ==========================================
    // ADD/DELETE HANDLERS
    // ==========================================
    const handleAddGallery = () => {
        setGallery([...gallery, { id: 'temp-' + Date.now(), image_url: '', display_order: gallery.length }]);
    };
    const handleAddOngoing = () => {
        setOngoing([...ongoing, { id: 'temp-' + Date.now(), description: '', display_order: ongoing.length }]);
    };
    const handleAddInitiative = () => {
        setInitiatives([...initiatives, { id: 'temp-' + Date.now(), title: 'New Initiative', content_json: [], display_order: initiatives.length }]);
    };

    const handleDelete = async (table, id, state, setState) => {
        if (!id.startsWith('temp-')) {
            const { error } = await supabase.from(table).delete().eq('id', id);
            if (error) {
                toast.error("Failed to delete");
                return;
            }
        }
        setState(state.filter(item => item.id !== id));
        toast.success("Item deleted");
    };

    // ==========================================
    // INITIATIVE FORM BUILDER HANDLERS
    // ==========================================
    const updateInitiative = (initIndex, updatedInitiative) => {
        const newInit = [...initiatives];
        newInit[initIndex] = updatedInitiative;
        setInitiatives(newInit);
    };

    const addBlock = (initIndex) => {
        const init = initiatives[initIndex];
        updateInitiative(initIndex, { ...init, content_json: [...init.content_json, { subtitle: '', items: [] }] });
    };

    const removeBlock = (initIndex, blockIndex) => {
        const init = initiatives[initIndex];
        const newBlocks = [...init.content_json];
        newBlocks.splice(blockIndex, 1);
        updateInitiative(initIndex, { ...init, content_json: newBlocks });
    };

    const updateBlockSubtitle = (initIndex, blockIndex, value) => {
        const init = initiatives[initIndex];
        const newBlocks = [...init.content_json];
        newBlocks[blockIndex].subtitle = value;
        updateInitiative(initIndex, { ...init, content_json: newBlocks });
    };

    const addStringItem = (initIndex, blockIndex) => {
        const init = initiatives[initIndex];
        const newBlocks = [...init.content_json];
        newBlocks[blockIndex].items.push("");
        updateInitiative(initIndex, { ...init, content_json: newBlocks });
    };

    const addObjectItem = (initIndex, blockIndex) => {
        const init = initiatives[initIndex];
        const newBlocks = [...init.content_json];
        newBlocks[blockIndex].items.push({ text: "", subItems: [] });
        updateInitiative(initIndex, { ...init, content_json: newBlocks });
    };

    const removeItem = (initIndex, blockIndex, itemIndex) => {
        const init = initiatives[initIndex];
        const newBlocks = [...init.content_json];
        newBlocks[blockIndex].items.splice(itemIndex, 1);
        updateInitiative(initIndex, { ...init, content_json: newBlocks });
    };

    const updateStringItem = (initIndex, blockIndex, itemIndex, value) => {
        const init = initiatives[initIndex];
        const newBlocks = [...init.content_json];
        newBlocks[blockIndex].items[itemIndex] = value;
        updateInitiative(initIndex, { ...init, content_json: newBlocks });
    };

    const updateObjectItemText = (initIndex, blockIndex, itemIndex, value) => {
        const init = initiatives[initIndex];
        const newBlocks = [...init.content_json];
        newBlocks[blockIndex].items[itemIndex].text = value;
        updateInitiative(initIndex, { ...init, content_json: newBlocks });
    };

    const addSubItem = (initIndex, blockIndex, itemIndex) => {
        const init = initiatives[initIndex];
        const newBlocks = [...init.content_json];
        newBlocks[blockIndex].items[itemIndex].subItems.push("");
        updateInitiative(initIndex, { ...init, content_json: newBlocks });
    };

    const updateSubItem = (initIndex, blockIndex, itemIndex, subIndex, value) => {
        const init = initiatives[initIndex];
        const newBlocks = [...init.content_json];
        newBlocks[blockIndex].items[itemIndex].subItems[subIndex] = value;
        updateInitiative(initIndex, { ...init, content_json: newBlocks });
    };

    const removeSubItem = (initIndex, blockIndex, itemIndex, subIndex) => {
        const init = initiatives[initIndex];
        const newBlocks = [...init.content_json];
        newBlocks[blockIndex].items[itemIndex].subItems.splice(subIndex, 1);
        updateInitiative(initIndex, { ...init, content_json: newBlocks });
    };

    // ==========================================
    // SAVE HANDLERS
    // ==========================================
    const saveGallery = async () => {
        setLoading(true);
        try {
            for (let i = 0; i < gallery.length; i++) {
                const item = gallery[i];
                if (!item.image_url) continue;
                if (item.id.startsWith('temp-')) {
                    await supabase.from('csr_gallery').insert({ image_url: item.image_url, display_order: i });
                } else {
                    await supabase.from('csr_gallery').update({ image_url: item.image_url, display_order: i }).eq('id', item.id);
                }
            }
            toast.success("Gallery saved successfully");
            fetchData();
        } catch (e) {
            toast.error("Error saving gallery");
        }
        setLoading(false);
    };

    const saveOngoing = async () => {
        setLoading(true);
        try {
            for (let i = 0; i < ongoing.length; i++) {
                const item = ongoing[i];
                if (!item.description) continue;
                if (item.id.startsWith('temp-')) {
                    await supabase.from('csr_ongoing_programs').insert({ description: item.description, display_order: i });
                } else {
                    await supabase.from('csr_ongoing_programs').update({ description: item.description, display_order: i }).eq('id', item.id);
                }
            }
            toast.success("Ongoing programs saved successfully");
            fetchData();
        } catch (e) {
            toast.error("Error saving ongoing programs");
        }
        setLoading(false);
    };

    const saveInitiatives = async () => {
        setLoading(true);
        try {
            for (let i = 0; i < initiatives.length; i++) {
                const item = initiatives[i];
                // Clean up empty strings or nulls if needed, but for now we save as is
                if (item.id.startsWith('temp-')) {
                    await supabase.from('csr_initiatives').insert({ title: item.title, content_json: item.content_json, display_order: i });
                } else {
                    await supabase.from('csr_initiatives').update({ title: item.title, content_json: item.content_json, display_order: i }).eq('id', item.id);
                }
            }
            toast.success("Initiatives saved successfully");
            fetchData();
        } catch (e) {
            toast.error("Error saving initiatives");
        }
        setLoading(false);
    };

    if (loading && gallery.length === 0 && ongoing.length === 0 && initiatives.length === 0) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-[#103065]" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#103065]">CSR Content Management</h1>
                    <p className="text-sm text-slate-500">Update CSR Gallery, Ongoing Programs, and Initiatives.</p>
                </div>
            </div>

            <Tabs defaultValue="gallery" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
                    <TabsTrigger value="ongoing">Ongoing Programs</TabsTrigger>
                    <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
                </TabsList>

                {/* GALLERY TAB */}
                <TabsContent value="gallery">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Photo Gallery</CardTitle>
                                <CardDescription>
                                    {gallery.length} photos total. Images automatically convert to WebP upon upload.
                                </CardDescription>
                            </div>
                            <div className="relative overflow-hidden shrink-0">
                                <Button type="button" variant="default" disabled={uploadingImageId === 'new_upload'} className="bg-[#103065] hover:bg-[#0c244b] gap-2">
                                    {uploadingImageId === 'new_upload' ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                                    Upload New Photo
                                </Button>
                                <input 
                                    type="file" 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                            uploadToCloudinaryAndCreateNew(e.target.files[0]);
                                        }
                                    }}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Pagination Info */}
                            {gallery.length > 0 && (
                                <div className="flex items-center justify-between mb-4 text-sm text-slate-500">
                                    <span>
                                        Showing Story {(galleryPage - 1) * GALLERY_PER_PAGE + 1} - {Math.min(galleryPage * GALLERY_PER_PAGE, gallery.length)} of {gallery.length}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={galleryPage <= 1}
                                            onClick={() => setGalleryPage(p => p - 1)}
                                            className="h-8 px-3"
                                        >
                                            &larr; Prev
                                        </Button>
                                        {Array.from({ length: Math.ceil(gallery.length / GALLERY_PER_PAGE) }, (_, i) => (
                                            <Button
                                                key={i + 1}
                                                variant={galleryPage === i + 1 ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setGalleryPage(i + 1)}
                                                className={`h-8 w-8 p-0 ${galleryPage === i + 1 ? 'bg-[#103065] text-white' : ''}`}
                                            >
                                                {i + 1}
                                            </Button>
                                        ))}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={galleryPage >= Math.ceil(gallery.length / GALLERY_PER_PAGE)}
                                            onClick={() => setGalleryPage(p => p + 1)}
                                            className="h-8 px-3"
                                        >
                                            Next &rarr;
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {gallery
                                    .slice((galleryPage - 1) * GALLERY_PER_PAGE, galleryPage * GALLERY_PER_PAGE)
                                    .map((item, pageIndex) => {
                                        const globalIndex = (galleryPage - 1) * GALLERY_PER_PAGE + pageIndex;
                                        return (
                                            <div 
                                                key={item.id} 
                                                className={`relative group bg-slate-100 rounded-lg aspect-square overflow-hidden border ${draggedGalleryIndex === globalIndex ? 'border-[#BC9C33] opacity-60 scale-95 shadow-md' : 'border-slate-200'} transition-all cursor-move`}
                                                draggable
                                                onDragStart={(e) => handleGalleryDragStart(e, globalIndex)}
                                                onDragOver={(e) => e.preventDefault()}
                                                onDragEnter={(e) => handleGalleryDragEnter(e, globalIndex)}
                                                onDragEnd={() => setDraggedGalleryIndex(null)}
                                            >
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={`Story ${globalIndex + 1}`} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-2 text-center text-xs">
                                                        <UploadCloud className="w-6 h-6 mb-2 opacity-50" />
                                                        Empty Slot
                                                    </div>
                                                )}

                                                {/* Story Number Badge */}
                                                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm pointer-events-none">
                                                    Story {globalIndex + 1}
                                                </div>

                                                {/* Overlay Actions */}
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                    <div className="shrink-0">
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            className="w-24 h-8 text-xs font-semibold gap-1"
                                                            disabled={uploadingImageId === item.id}
                                                            onClick={() => {
                                                                // trigger hidden file input programmatically via ref trick â€” we store pending then confirm
                                                                document.getElementById(`replace-input-${item.id}`)?.click();
                                                            }}
                                                        >
                                                            {uploadingImageId === item.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <UploadCloud className="w-3 h-3" />}
                                                            Replace
                                                        </Button>
                                                        <input
                                                            id={`replace-input-${item.id}`}
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                if (e.target.files?.[0]) {
                                                                    showReplaceConfirm(e.target.files[0], item.id, globalIndex + 1);
                                                                    e.target.value = ''; // reset so same file can trigger again
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => showRemoveConfirm('csr_gallery', item.id, gallery, setGallery, globalIndex + 1)}
                                                        className="w-24 h-8 text-xs font-semibold gap-1"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            
                            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                                <Button onClick={saveGallery} disabled={loading} className="gap-2 bg-[#BC9C33] text-white hover:bg-[#a68a2d] px-8">
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Gallery
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ONGOING PROGRAMS TAB */}
                <TabsContent value="ongoing">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Ongoing Programs</CardTitle>
                                <CardDescription>List of current CSR ongoing programs.</CardDescription>
                            </div>
                            <Button onClick={handleAddOngoing} size="sm" variant="outline" className="gap-2">
                                <Plus className="w-4 h-4" /> Add Program
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {ongoing.map((item, index) => (
                                <div key={item.id} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <GripVertical className="w-5 h-5 text-slate-400 mt-2 cursor-move" />
                                    <div className="flex-1">
                                        <Textarea 
                                            placeholder="Enter program description..."
                                            value={item.description}
                                            onChange={(e) => {
                                                const newOngoing = [...ongoing];
                                                newOngoing[index].description = e.target.value;
                                                setOngoing(newOngoing);
                                            }}
                                            className="min-h-[80px] bg-white"
                                        />
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete('csr_ongoing_programs', item.id, ongoing, setOngoing)} className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0 mt-1">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button onClick={saveOngoing} disabled={loading} className="w-full gap-2 bg-[#103065] text-white hover:bg-[#0c244b]">
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Programs
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* INITIATIVES TAB */}
                <TabsContent value="initiatives">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>CSR Initiatives</CardTitle>
                                <CardDescription>Manage the complex nested data for CSR Initiatives using the dynamic form builder.</CardDescription>
                            </div>
                            <Button onClick={handleAddInitiative} size="sm" variant="outline" className="gap-2">
                                <Plus className="w-4 h-4" /> Add Initiative
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-12">
                            {initiatives.map((init, initIndex) => (
                                <div key={init.id} className="bg-slate-50 p-5 rounded-xl border-2 border-slate-200 relative">
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete('csr_initiatives', init.id, initiatives, setInitiatives)} className="absolute -top-3 -right-3">
                                        <Trash2 className="w-4 h-4 mr-2" /> Delete Initiative
                                    </Button>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-sm font-bold text-[#103065] mb-2 block">Initiative Section Title</Label>
                                            <Input 
                                                value={init.title}
                                                onChange={(e) => updateInitiative(initIndex, { ...init, title: e.target.value })}
                                                className="bg-white font-bold text-lg"
                                            />
                                        </div>

                                        <div className="space-y-4 mt-6">
                                            <Label className="text-sm font-bold text-slate-700 block border-b pb-2">Content Blocks</Label>
                                            
                                            {init.content_json.map((block, blockIndex) => (
                                                <div key={`block-${blockIndex}`} className="bg-white p-4 rounded-lg border border-slate-200 ml-4 space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1">
                                                            <Label className="text-xs text-slate-500 mb-1 block">Subtitle (Optional)</Label>
                                                            <Input 
                                                                placeholder="e.g. Pandemic"
                                                                value={block.subtitle || ''}
                                                                onChange={(e) => updateBlockSubtitle(initIndex, blockIndex, e.target.value)}
                                                            />
                                                        </div>
                                                        <Button variant="ghost" size="icon" onClick={() => removeBlock(initIndex, blockIndex)} className="text-red-500 mt-5">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="space-y-2 ml-4">
                                                        <Label className="text-xs font-bold text-slate-700">Bullet Points</Label>
                                                        {block.items.map((item, itemIndex) => (
                                                            <div key={`item-${itemIndex}`} className="flex items-start gap-2">
                                                                {typeof item === 'string' ? (
                                                                    <div className="flex-1 flex gap-2">
                                                                        <div className="w-2 h-2 rounded-full bg-[#BC9C33] mt-3 shrink-0" />
                                                                        <Textarea 
                                                                            value={item}
                                                                            onChange={(e) => updateStringItem(initIndex, blockIndex, itemIndex, e.target.value)}
                                                                            className="min-h-[40px] text-sm"
                                                                            placeholder="Bullet point text..."
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex-1 bg-slate-50 p-3 rounded border border-slate-100">
                                                                        <div className="flex gap-2 mb-3">
                                                                            <div className="w-2 h-2 rounded-full bg-[#BC9C33] mt-3 shrink-0" />
                                                                            <Textarea 
                                                                                value={item.text}
                                                                                onChange={(e) => updateObjectItemText(initIndex, blockIndex, itemIndex, e.target.value)}
                                                                                className="min-h-[40px] text-sm bg-white"
                                                                                placeholder="Parent bullet point text..."
                                                                            />
                                                                        </div>
                                                                        <div className="ml-8 space-y-2">
                                                                            {item.subItems && item.subItems.map((sub, subIndex) => (
                                                                                <div key={`sub-${subIndex}`} className="flex items-center gap-2">
                                                                                    <span className="text-slate-400">-</span>
                                                                                    <Input 
                                                                                        value={sub}
                                                                                        onChange={(e) => updateSubItem(initIndex, blockIndex, itemIndex, subIndex, e.target.value)}
                                                                                        className="h-8 text-sm bg-white"
                                                                                        placeholder="Sub-bullet point..."
                                                                                    />
                                                                                    <Button variant="ghost" size="icon" onClick={() => removeSubItem(initIndex, blockIndex, itemIndex, subIndex)} className="text-red-400 h-8 w-8">
                                                                                        <Trash2 className="w-3 h-3" />
                                                                                    </Button>
                                                                                </div>
                                                                            ))}
                                                                            <Button variant="outline" size="sm" onClick={() => addSubItem(initIndex, blockIndex, itemIndex)} className="h-7 text-xs">
                                                                                <Plus className="w-3 h-3 mr-1" /> Add Sub-bullet
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <Button variant="ghost" size="icon" onClick={() => removeItem(initIndex, blockIndex, itemIndex)} className="text-red-400 mt-1">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                        
                                                        <div className="flex gap-2 pt-2">
                                                            <Button variant="secondary" size="sm" onClick={() => addStringItem(initIndex, blockIndex)} className="text-xs">
                                                                <Plus className="w-3 h-3 mr-1" /> Add Simple Bullet
                                                            </Button>
                                                            <Button variant="secondary" size="sm" onClick={() => addObjectItem(initIndex, blockIndex)} className="text-xs">
                                                                <Plus className="w-3 h-3 mr-1" /> Add Nested Bullet
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <Button variant="outline" size="sm" onClick={() => addBlock(initIndex)} className="w-full border-dashed">
                                                <Plus className="w-4 h-4 mr-2" /> Add Content Block
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Button onClick={saveInitiatives} disabled={loading} className="w-full gap-2 bg-[#103065] text-white hover:bg-[#0c244b] text-lg py-6 mt-4">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Save All Initiatives
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Confirm Dialog */}
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
