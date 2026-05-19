'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, Mail, Settings, Activity, ArrowRight, Server, Eye, TrendingUp, LayoutDashboard, Users, Clock, MousePointer2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import WorldMap from '@/components/dashboard/WorldMap';

export default function DashboardOverviewPage() {
    const [stats, setStats] = useState({
        newsCount: 0,
        contactCount: 0,
        maintenance: false,
        analytics: [],
        countries: [],
        timeFilter: 'Month',
        liveTraffic: 24,
        loading: true
    });
    const supabase = createClient();

    const fetchStats = useCallback(async (filter) => {
        try {
            setStats(prev => ({ ...prev, loading: true }));
            
            const { count: newsC } = await supabase.from('news').select('*', { count: 'exact', head: true });
            const { count: contactC } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true });
            const { data: seoData } = await supabase.from('seo_settings').select('maintenance_mode').eq('id', 1).single();

            let startDate = new Date();
            if (filter === 'Today') startDate.setHours(0, 0, 0, 0);
            else if (filter === 'Week') startDate.setDate(startDate.getDate() - 7);
            else if (filter === 'Month') startDate.setDate(startDate.getDate() - 30);
            else if (filter === 'Year') startDate.setFullYear(startDate.getFullYear() - 1);
            else startDate = new Date(0);

            const { data: logs } = await supabase.from('traffic_logs')
                .select('*')
                .gte('created_at', filter !== 'All Time' ? startDate.toISOString() : new Date(0).toISOString());

            let processedAnalytics = [];
            let processedCountries = [];

            if (logs && logs.length > 0) {
                const pathMap = {};
                const countryMap = {};
                logs.forEach(log => {
                    pathMap[log.path] = (pathMap[log.path] || 0) + 1;
                    if (log.country_code) {
                        const cityPrefix = log.city && log.city !== 'Unknown' && log.city !== 'Unknown City' && log.city !== 'unknown' ? `${log.city}, ` : '';
                        const countryDisplayName = `${cityPrefix}${log.country_name}`;
                        const key = log.city && log.city !== 'Unknown' && log.city !== 'Unknown City' && log.city !== 'unknown' 
                            ? `${log.country_code}-${log.city}` 
                            : log.country_code;

                        if (!countryMap[key]) {
                            countryMap[key] = { 
                                country_code: log.country_code, 
                                country_name: countryDisplayName, 
                                visitor_count: 0 
                            };
                        }
                        countryMap[key].visitor_count++;
                    }
                });

                processedAnalytics = Object.entries(pathMap)
                    .map(([path, views]) => ({ path, views, name: path === '/' ? 'Home Page' : path.split('/').pop() }))
                    .sort((a, b) => b.views - a.views).slice(0, 5);

                processedCountries = Object.values(countryMap)
                    .sort((a, b) => b.visitor_count - a.visitor_count).slice(0, 5);
            } else {
                // Fallback to cumulative data if logs empty
                const { data: altAnalytics } = await supabase.from('page_analytics').select('*').order('views', { ascending: false }).limit(5);
                const { data: altCountries } = await supabase.from('country_analytics').select('*').order('visitor_count', { ascending: false }).limit(5);
                processedAnalytics = altAnalytics || [];
                processedCountries = altCountries || [];
            }

            // Calculate real "Live Traffic" based on logs from the last 15 minutes
            const fifteenMinsAgo = new Date(Date.now() - 15 * 60000).toISOString();
            const { count: liveCount } = await supabase
                .from('traffic_logs')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', fifteenMinsAgo);

            setStats(prev => ({
                ...prev,
                newsCount: newsC || 0,
                contactCount: contactC || 0,
                maintenance: seoData?.maintenance_mode || false,
                analytics: processedAnalytics,
                countries: processedCountries,
                liveTraffic: liveCount || 0,
                loading: false,
                timeFilter: filter
            }));
        } catch (err) {
            console.error("Dashboard error:", err);
            setStats(prev => ({ ...prev, loading: false }));
        }
    }, [supabase]);

    useEffect(() => {
        fetchStats(stats.timeFilter);
        // Refresh stats periodically instead of faking data
        const interval = setInterval(() => fetchStats(stats.timeFilter), 60000); // 1 minute refresh
        return () => clearInterval(interval);
    }, [stats.timeFilter, fetchStats]);

    const cards = [
        { title: 'News Articles', count: stats.newsCount, icon: Newspaper, href: '/dashboard/news', color: 'text-blue-600', bg: 'bg-blue-50', label: 'Total Published' },
        { title: 'Contact Inbox', count: stats.contactCount, icon: Mail, href: '/dashboard/contacts', color: 'text-orange-600', bg: 'bg-orange-50', label: 'Inbound Messages' },
        { title: 'System Status', count: stats.maintenance ? 'MAINTENANCE' : 'ACTIVE', icon: Settings, href: '/dashboard/settings', color: stats.maintenance ? 'text-red-600' : 'text-emerald-600', bg: stats.maintenance ? 'bg-red-50' : 'bg-emerald-50', label: 'Infrastructure' }
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Page Header - Clean & Sharp */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-[#103065]">
                        Dashboard Overview
                    </h1>
                    <p className="text-slate-500 text-sm">Monitor performance metrics and global traffic.</p>
                </div>
                
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border shadow-sm text-slate-400 font-medium text-xs">
                    <Clock className="w-4 h-4" />
                    <span>Last updated: {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {/* Stats Cards - Clean Shadcn Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <Link href={card.href} key={idx} className="group">
                            <Card className="border ring-1 ring-slate-200/50 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden bg-white">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-lg ${card.bg} ${card.color}`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#bc9c33] transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-3xl font-bold tracking-tight text-slate-900">{card.count}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                                        {card.title}
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#bc9c33] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            {/* Map Card - Clean Shadcn Style */}
            <Card className="border shadow-sm ring-1 ring-slate-200/50 rounded-xl overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-xl font-bold text-[#103065]">Geographic Analytics</CardTitle>
                        <CardDescription className="text-xs">Real-time visualization of global visitor density.</CardDescription>
                    </div>
                    <div className="flex bg-white rounded-lg border p-1 gap-1">
                        {['Today', 'Week', 'Month', 'All Time'].map((f) => (
                            <button
                                key={f}
                                onClick={() => fetchStats(f)}
                                className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all
                                    ${stats.timeFilter === f 
                                        ? 'bg-[#103065] text-white' 
                                        : 'text-slate-400 hover:bg-slate-50'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className={`p-6 transition-opacity ${stats.loading ? 'opacity-50' : 'opacity-100'}`}>
                    <WorldMap countries={stats.countries} />
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Engagement Table - Clean Shadcn Style */}
                <Card className="lg:col-span-2 border shadow-sm ring-1 ring-slate-200/50 rounded-xl overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b p-6">
                        <CardTitle className="text-lg">Page Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50/30">
                                <TableRow className="hover:bg-transparent border-slate-100">
                                    <TableHead className="pl-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Page Name</TableHead>
                                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Path</TableHead>
                                    <TableHead className="text-right pr-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Views</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stats.analytics?.length > 0 ? stats.analytics.map((page, i) => (
                                    <TableRow key={i} className="hover:bg-slate-50/30 transition-colors border-slate-100">
                                        <TableCell className="pl-6 py-4">
                                            <span className="font-bold text-slate-800 text-sm">{page.name}</span>
                                        </TableCell>
                                        <TableCell>
                                            <code className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded">{page.path}</code>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <span className="text-sm font-bold text-[#103065]">{page.views.toLocaleString()}</span>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-12 text-slate-400 text-xs">No analytics data available for this period.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Right Panel - System Stats */}
                <div className="space-y-6">
                    <Card className="border shadow-sm ring-1 ring-slate-200/50 rounded-xl overflow-hidden">
                        <CardHeader className="p-6 pb-3">
                            <CardTitle className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Traffic</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="flex items-end gap-3 mb-4">
                                <h2 className="text-5xl font-bold text-slate-900 leading-none">{stats.liveTraffic}</h2>
                                <span className="text-emerald-500 text-[10px] font-bold uppercase animate-pulse mb-1 flex items-center">
                                    <Activity className="w-3 h-3 mr-1" /> Live
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed">Active global user sessions monitored.</p>
                            
                            <div className="mt-6 pt-4 border-t flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inquiry Rate</span>
                                <span className="text-sm font-bold text-[#103065]">12.4%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className={`p-6 rounded-xl border ring-1 ${stats.maintenance ? 'ring-red-100 bg-red-50/30' : 'ring-slate-100 bg-[#103065] text-white'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${stats.maintenance ? 'bg-red-100 text-red-600' : 'bg-white/10 text-[#bc9c33]'}`}>
                                <Server className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className={`text-[10px] font-bold uppercase tracking-widest ${stats.maintenance ? 'text-red-900' : 'text-white/50'}`}>Infrastructure</h4>
                                <p className={`text-[11px] font-medium ${stats.maintenance ? 'text-red-700' : 'text-white/80'}`}>
                                    {stats.maintenance ? "Maintenance Mode" : "All Systems Operational"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

