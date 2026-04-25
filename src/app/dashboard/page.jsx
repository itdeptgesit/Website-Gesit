'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Newspaper, Mail, Settings, Activity, ArrowRight, Server } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';

export default function DashboardOverviewPage() {
    const [stats, setStats] = useState({
        newsCount: 0,
        contactCount: 0,
        maintenance: false
    });
    const supabase = createClient();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // News Count
                const { count: newsC } = await supabase.from('news').select('*', { count: 'exact', head: true });

                // Contacts Count
                const { count: contactC, error: contactErr } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true });

                // SEO Settings
                const { data: seoData } = await supabase.from('seo_settings').select('maintenance_mode').eq('id', 1).single();

                setStats({
                    newsCount: newsC || 0,
                    contactCount: contactErr && contactErr.code === '42P01' ? 0 : (contactC || 0),
                    maintenance: seoData?.maintenance_mode || false
                });
            } catch (err) {
                console.error("Failed to load global stats:", err);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        {
            title: 'Manage News',
            count: stats.newsCount,
            label: 'Total Articles',
            icon: Newspaper,
            href: '/dashboard/news',
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            title: 'Inbox Messages',
            count: stats.contactCount,
            label: 'Unread Inquiries',
            icon: Mail,
            href: '/dashboard/contacts',
            color: 'text-orange-600',
            bg: 'bg-orange-50'
        },
        {
            title: 'System Settings',
            count: stats.maintenance ? 'ON' : 'OFF',
            label: 'Maintenance Mode',
            icon: Settings,
            href: '/dashboard/settings',
            color: stats.maintenance ? 'text-red-600' : 'text-green-600',
            bg: stats.maintenance ? 'bg-red-50' : 'bg-green-50'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 font-sans pb-10">
            {/* Header */}
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-[#103065]" style={{ fontFamily: 'Georgia, serif' }}>
                    Dashboard Overview
                </h1>
                <p className="text-slate-500">Welcome to The Gesit Companies Administrative Portal.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <Link href={card.href} key={idx} className="block group">
                            <Card className="border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full bg-white relative overflow-hidden">
                                {/* Decorative Gradient */}
                                <div className={`absolute top-0 right-0 w-32 h-32 opacity-20 rounded-bl-full ${card.bg} -mx-8 -my-8 group-hover:scale-110 transition-transform`}></div>

                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-4xl font-bold tracking-tight text-slate-800">{card.count}</h3>
                                        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">{card.label}</p>
                                    </div>

                                    <div className="mt-6 flex items-center text-sm font-semibold text-[#bc9c33] group-hover:text-[#8b7222] transition-colors">
                                        Open {card.title} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            {/* System Status Banner */}
            <div className={`mt-8 p-6 rounded-xl border ${stats.maintenance ? 'bg-red-50/50 border-red-100' : 'bg-slate-50 border-slate-100'} flex items-center gap-4`}>
                <div className={`p-3 rounded-full ${stats.maintenance ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    <Activity className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800">System Status</h4>
                    <p className="text-sm text-slate-500">
                        {stats.maintenance
                            ? "Website is currently offline to the public (Maintenance Mode Active)."
                            : "All systems operational. The website is live and receiving public traffic."}
                    </p>
                </div>
            </div>
        </div>
    );
}
