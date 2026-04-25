'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, Trash2, Search, User, Phone, Calendar, Eye, X } from 'lucide-react';
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
                    .order('created_at', { ascending: false });

                if (error) {
                    if (error.code === '42P01') {
                        setMessages([]);
                        toast.info("Database table 'contact_messages' not found. Please create it to receive actual messages.");
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
        const confirmMsg = "Are you sure you want to delete this message?";
        if (!window.confirm(confirmMsg)) return;

        try {
            const { error } = await supabase.from('contact_messages').delete().eq('id', id);
            if (error) throw error;
            setMessages(messages.filter(m => m.id !== id));
            toast.success("Message deleted");
        } catch (error) {
            toast.error("Failed to delete message");
        }
    };

    const filteredMessages = messages.filter(m =>
        m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#bc9c33]" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Mail className="w-8 h-8 text-[#bc9c33]" />
                    <h1 className="text-3xl font-bold tracking-tight text-[#103065]" style={{ fontFamily: 'Georgia, serif' }}>
                        Contact Messages
                    </h1>
                </div>
            </div>

            <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="border-b bg-slate-50/50 pb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl">Visitor Messages</CardTitle>
                            <CardDescription>Structured list of all messages sent from the Contact Us page.</CardDescription>
                        </div>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="Search by name, email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {filteredMessages.length === 0 ? (
                        <div className="py-20 text-center text-slate-500">
                            <Mail className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p className="text-lg">No messages found in your inbox.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow>
                                    <TableHead className="w-[80px]">Date</TableHead>
                                    <TableHead>Sender</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="hidden md:table-cell">Phone</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMessages.map((msg) => (
                                    <TableRow key={msg.id} className="hover:bg-slate-50/80 transition-colors">
                                        <TableCell className="font-medium text-slate-500 text-xs">
                                            {new Date(msg.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-semibold text-[#103065]">{msg.name}</div>
                                        </TableCell>
                                        <TableCell className="text-slate-600">{msg.email}</TableCell>
                                        <TableCell className="hidden md:table-cell text-slate-500 text-xs">{msg.phone}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
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
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
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
                    )}
                </CardContent>
            </Card>

            {/* Message Detail Modal */}
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
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="bg-[#103065] p-6 text-white flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                                        {selectedMessage.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{selectedMessage.name}</h3>
                                        <p className="text-white/70 text-xs">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setIsModalOpen(false)}>
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                                        <p className="text-slate-700 flex items-center gap-2"><Mail className="w-4 h-4 text-[#bc9c33]" /> {selectedMessage.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                                        <p className="text-slate-700 flex items-center gap-2"><Phone className="w-4 h-4 text-[#bc9c33]" /> {selectedMessage.phone || '-'}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message Content</p>
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-slate-800 leading-relaxed whitespace-pre-wrap">
                                        {selectedMessage.message}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 border-t flex justify-end">
                                <Button className="bg-[#103065] hover:bg-[#1e4b8a]" onClick={() => setIsModalOpen(false)}>
                                    Done Reading
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
