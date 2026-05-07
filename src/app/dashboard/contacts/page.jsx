'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, Trash2, Search, Calendar, Eye, X, MessageSquare, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createClient } from '@/lib/supabase-client';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactsInboxPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data, error } = await supabase
                    .from('contact_messages')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(100); // Prevent memory leak on large datasets

                if (error) {
                    if (error.code === '42P01') {
                        setMessages([]);
                    } else {
                        throw error;
                    }
                } else {
                    setMessages(data || []);
                }
            } catch (err) {
                console.error("Failed to fetch messages:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        const confirmMsg = "Hapus pesan ini secara permanen?";
        if (!window.confirm(confirmMsg)) return;

        try {
            const { error } = await supabase.from('contact_messages').delete().eq('id', id);
            if (error) throw error;
            setMessages(messages.filter(m => m.id !== id));
            toast.success("Pesan dihapus");
        } catch (error) {
            toast.error("Gagal menghapus pesan");
        }
    };

    const filteredMessages = messages.filter(m =>
        m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#bc9c33]" />
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Memuat Inbox...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Page Header - Serif Font like News Management */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-[#103065]">
                        Visitor Inquiries
                    </h1>
                    <p className="text-slate-500 text-sm">View, sort, and manage all visitor communications.</p>
                </div>
                
                <div className="bg-white px-4 py-3 rounded-lg border shadow-sm flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total Inbox</p>
                        <p className="text-xl font-bold text-[#103065] leading-none">{messages.length}</p>
                    </div>
                    <div className="w-8 h-8 rounded-md bg-slate-50 flex items-center justify-center text-[#bc9c33]">
                        <Mail className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Quick Stats Banner (Optional, keeping it clean like News) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <Card className="shadow-sm border ring-1 ring-slate-200/50 rounded-xl overflow-hidden">
                    <CardHeader className="py-4">
                        <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Latest Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-bold text-[#103065] truncate">
                            {messages[0]?.name || 'No Messages'}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content List - Matches News Management "Article Database" style */}
            <Card className="shadow-sm border ring-1 ring-slate-200/50 rounded-xl overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <CardTitle className="text-xl">Communications Inbox</CardTitle>
                        <div className="relative w-full max-w-md group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Search records..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-10 bg-white rounded-lg border-slate-200 text-sm"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    {filteredMessages.length === 0 ? (
                        <div className="text-center py-24">
                            <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-700">Inbox Kosong</h3>
                            <p className="text-slate-400 text-sm mt-1">Belum ada pesan yang masuk saat ini.</p>
                        </div>
                    ) : (
                        <div className="min-w-[800px]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/30">
                                        <TableHead className="py-5 px-6 font-bold text-slate-700">Sender Information</TableHead>
                                        <TableHead className="font-bold text-slate-700">Contact Details</TableHead>
                                        <TableHead className="font-bold text-slate-700">Date Received</TableHead>
                                        <TableHead className="text-right px-6 font-bold text-slate-700">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredMessages.map((msg) => (
                                        <TableRow key={msg.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                                            <TableCell className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[#103065] text-sm">{msg.name}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">New Message</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1 flex flex-col">
                                                    <span className="text-slate-500 text-xs flex items-center gap-2">
                                                        <Mail className="w-3 h-3 text-[#bc9c33]" /> {msg.email}
                                                    </span>
                                                    <span className="text-slate-400 text-[10px] flex items-center gap-2">
                                                        <Phone className="w-3 h-3" /> {msg.phone || 'N/A'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-slate-700 text-xs font-bold">
                                                        {new Date(msg.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400">
                                                        {new Date(msg.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right px-6">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-slate-400 hover:text-[#103065] hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                                                        onClick={() => {
                                                            setSelectedMessage(msg);
                                                            setIsModalOpen(true);
                                                        }}
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
                                                        onClick={() => handleDelete(msg.id)}
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

            {/* Message Detail Modal - Matches News Confirmation style */}
            <AnimatePresence>
                {isModalOpen && selectedMessage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.98, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.98, opacity: 0, y: 10 }}
                            className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-slate-200"
                            onClick={e => e.stopPropagation()}
                        >
                             <div className="bg-[#103065] px-8 py-8 text-white flex justify-between items-center">
                                <div>
                                    <h3 className="font-serif text-2xl tracking-tight leading-none mb-2">{selectedMessage.name}</h3>
                                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-[.2em] flex items-center gap-2">
                                        <Calendar className="w-3 h-3" />
                                        Diterima pada {new Date(selectedMessage.created_at).toLocaleString('en-GB')}
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10 rounded-lg" onClick={() => setIsModalOpen(false)}>
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                             <div className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                                        <p className="text-slate-800 text-sm font-medium flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-[#bc9c33]" /> {selectedMessage.email}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                                        <p className="text-slate-800 text-sm font-medium flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-[#bc9c33]" /> {selectedMessage.phone || 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 border-t pt-6">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Message Content</p>
                                    <div className="bg-slate-50 p-6 rounded-lg border text-slate-700 text-sm leading-relaxed whitespace-pre-wrap italic">
                                        "{selectedMessage.message}"
                                    </div>
                                </div>
                            </div>

                             <div className="px-8 py-6 bg-slate-50/80 border-t flex justify-end">
                                <Button 
                                    className="bg-[#103065] hover:bg-[#0c244b] text-white px-8 rounded-lg text-xs font-bold uppercase tracking-widest" 
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Tutup Pesan
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

