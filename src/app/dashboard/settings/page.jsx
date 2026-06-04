'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Search, Plus, Users, Image as ImageIcon, Phone, RotateCcw, Zap, Globe, Loader2, ShieldCheck, Key, RefreshCw, AlertCircle, Eye, EyeOff, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase-client';
import { cn } from "@/lib/utils";

export default function HighFidelitySettingsPage() {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Logs Data
    const [logs, setLogs] = useState([]);
    const [logsPage, setLogsPage] = useState(1);
    const LOGS_PER_PAGE = 8;


    // 1. SEO Manager State
    const [activeSegment, setActiveSegment] = useState('HOME');
    const segments = ['HOME', 'ABOUT US', 'PROPERTY', 'TRADING & SERVICES', 'MANUFACTURING', 'NATURAL RESOURCES', 'CAREERS', 'NEWS ARCHIVE', 'CONTACT'];
    const [seoData, setSeoData] = useState({ title: '', description: '', keywords: '' });

    // 2. Identity & System State
    const [identityData, setIdentityData] = useState({
        site_title: '',
        logo_url: '',
        favicon_url: '',
        contact_phone: '',
        contact_map_url: '',
        contact_address: '',
        maintenance_mode: false,
        maintenance_until: null,
        email_2fa_enabled: false,
        ga_tracking_id: '',
        fb_pixel_id: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    // 3. Security State
    const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
    const [showPass, setShowPass] = useState(false);

    // 4. Admin Invite
    const [inviteEmail, setInviteEmail] = useState('');

    // --- LOGIC: FETCH DATA --- 
    const fetchData = async () => {
        setLoading(true);
        try {
            // Load Per-Page SEO for active segment
            const { data: pageSeo } = await supabase
                .from('page_seo')
                .select('*')
                .eq('segment', activeSegment)
                .single();

            if (pageSeo) {
                setSeoData({ title: pageSeo.title || '', description: pageSeo.description || '', keywords: pageSeo.keywords || '' });
            } else {
                setSeoData({ title: '', description: '', keywords: '' });
            }

            // Load Global Identity (from seo_settings)
            const { data: globalSettings } = await supabase.from('seo_settings').select('*').eq('id', 1).single();
            if (globalSettings) {
                setIdentityData({
                    site_title: globalSettings.site_title || '',
                    logo_url: globalSettings.logo_url || '',
                    favicon_url: globalSettings.favicon_url || '',
                    contact_phone: globalSettings.contact_phone || '',
                    contact_map_url: globalSettings.contact_map_url || '',
                    contact_address: globalSettings.contact_address || '',
                    maintenance_mode: globalSettings.maintenance_mode || false,
                    email_2fa_enabled: globalSettings.email_2fa_enabled || false,
                    ga_tracking_id: globalSettings.ga_tracking_id || '',
                    fb_pixel_id: globalSettings.fb_pixel_id || ''
                });
            }

            // Load Activity Logs
            const { data: activityLogs } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(100);
            if (activityLogs) {
                setLogs(activityLogs);
            }
        } catch (error) {
            console.error("Fetch Data Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeSegment]); // Refetch when segment changes to load specific SEO data

    // --- LOGIC: HELPER TO RECORD LOG ---
    const recordLog = async (target, action) => {
        try {
            const { data } = await supabase.from('activity_logs').insert([{ target, action }]).select().single();
            if (data) setLogs([data, ...logs]);
        } catch (error) {
            console.error("Failed to write log", error);
        }
    };

    // --- LOGIC: SAVE SEO ---
    const handleSeoUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const { error } = await supabase.from('page_seo').upsert({
                segment: activeSegment,
                title: seoData.title,
                description: seoData.description,
                keywords: seoData.keywords,
                updated_at: new Date().toISOString()
            });
            if (error) throw error;
            toast.success(`${activeSegment} page identity updated successfully.`);
            await recordLog('Page SEO Manager', `Updated search identity for segment: "${activeSegment}"`);
        } catch (err) {
            toast.error("Failed to update SEO. Have you run the SQL script?");
        } finally {
            setSaving(false);
        }
    };

    // --- LOGIC: SAVE IDENTITY & CONTACT ---
    const handleIdentityUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const { error } = await supabase.from('seo_settings').upsert({
                id: 1, // Global ID
                ...identityData
            });
            if (error) throw error;
            toast.success(`Identity assets and contact nodes updated.`);
            await recordLog('Identity & Nodes', 'Modified primary symbol, icons, or contact details');
        } catch (err) {
            toast.error("Failed to update Identity Data.");
        } finally {
            setSaving(false);
        }
    };

    // --- LOGIC: UPDATE PASSWORD ---
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return toast.error("Passwords do not match");
        }
        if (passwordData.newPassword.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        setSaving(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: passwordData.newPassword });
            if (error) throw error;
            toast.success("Password updated successfully");
            await recordLog('Security', 'Updated administrative account password');
            setPasswordData({ newPassword: '', confirmPassword: '' });
        } catch (err) {
            toast.error("Failed to update password: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // --- LOGIC: TOGGLE MAINTENANCE ---
    const [maintenanceDuration, setMaintenanceDuration] = useState('none');

    const handleMaintenanceToggle = async () => {
        const newState = !identityData.maintenance_mode;
        let until = null;

        if (newState && maintenanceDuration !== 'none') {
            const now = new Date();
            const hours = maintenanceDuration === '1h' ? 1 : 
                          maintenanceDuration === '3h' ? 3 : 
                          maintenanceDuration === '6h' ? 6 : 
                          maintenanceDuration === '12h' ? 12 : 
                          maintenanceDuration === '1d' ? 24 : 0;
            
            if (hours > 0) {
                until = new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();
            }
        }

        setSaving(true);
        try {
            const { data, error } = await supabase.from('seo_settings')
                .update({ 
                    maintenance_mode: newState,
                    maintenance_until: until 
                })
                .eq('id', 1)
                .select()
                .single();

            if (error) {
                console.error("Toggle Error Details:", JSON.stringify(error, null, 2));
                throw new Error(error.message || error.details || error.hint || JSON.stringify(error));
            }

            setIdentityData({ 
                ...identityData, 
                maintenance_mode: data.maintenance_mode,
                maintenance_until: data.maintenance_until 
            });
            
            toast.success(`Maintenance Mode turned ${data.maintenance_mode ? 'ON' : 'OFF'}`);
            await recordLog('System Control', `Switched Maintenance Mode to ${data.maintenance_mode ? 'ENABLED' : 'DISABLED'} (Until: ${until || 'N/A'})`);
        } catch (err) {
            console.error("Toggle Catch:", err);
            toast.error("Failed to toggle maintenance mode: " + (err?.message || "Unknown error"));
        } finally {
            setSaving(false);
        }
    };

    // --- LOGIC: INVITE ADMIN ---
    const handleInviteAdmin = async () => {
        if (!inviteEmail) return;
        toast.info("Sending invitation...", { id: "invite" });
        try {
            await recordLog('Access Control', `Queued invitation for new admin: "${inviteEmail}"`);
            toast.success(`Invitation queued for ${inviteEmail}`, { id: "invite" });
            setInviteEmail('');
        } catch (err) {
            toast.error("Could not invite admin.");
        }
    };

    // --- LOGIC: EMAIL 2FA ---
    const handleEmail2FAToggle = async () => {
        const newState = !identityData.email_2fa_enabled;
        setSaving(true);
        try {
            const { error } = await supabase.from('seo_settings')
                .update({ email_2fa_enabled: newState })
                .eq('id', 1);
            if (error) throw error;
            setIdentityData({ ...identityData, email_2fa_enabled: newState });
            toast.success(`Email 2FA security ${newState ? 'Enabled' : 'Disabled'}`);
            await recordLog('Security', `${newState ? 'Enabled' : 'Disabled'} Email Two-Factor Authentication`);
        } catch (err) {
            toast.error("Could not update 2FA status: " + (err.message || "Unknown error"));
        } finally {
            setSaving(false);
        }
    };


    if (loading && logs.length === 0) {
        return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-[#1b365d]" /></div>;
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-20 font-sans">
            <Tabs defaultValue="seo" className="w-full">
                <TabsList className="bg-transparent border-b border-slate-200 w-full justify-start h-auto p-0 mb-8 rounded-none">
                    <TabsTrigger value="seo" className="data-[state=active]:border-b-2 data-[state=active]:border-[#bc9c33] data-[state=active]:text-[#103065] rounded-none py-3 px-6 text-sm font-bold uppercase tracking-wider text-slate-500 bg-transparent">SEO Manager</TabsTrigger>
                    <TabsTrigger value="access" className="data-[state=active]:border-b-2 data-[state=active]:border-[#bc9c33] data-[state=active]:text-[#103065] rounded-none py-3 px-6 text-sm font-bold uppercase tracking-wider text-slate-500 bg-transparent">Access Control</TabsTrigger>
                    <TabsTrigger value="assets" className="data-[state=active]:border-b-2 data-[state=active]:border-[#bc9c33] data-[state=active]:text-[#103065] rounded-none py-3 px-6 text-sm font-bold uppercase tracking-wider text-slate-500 bg-transparent">Identity & Contact</TabsTrigger>
                    <TabsTrigger value="logs" className="data-[state=active]:border-b-2 data-[state=active]:border-[#bc9c33] data-[state=active]:text-[#103065] rounded-none py-3 px-6 text-sm font-bold uppercase tracking-wider text-slate-500 bg-transparent">Activity Logs</TabsTrigger>
                </TabsList>

                {/* 1. PER-PAGE SEO MANAGER */}
                <TabsContent value="seo" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="w-full bg-[#1b365d] rounded-lg p-8 md:p-12 mb-8 shadow-sm flex flex-col xl:flex-row justify-between items-start gap-8">
                        <div className="max-w-md">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-3 bg-[#e8a317]"></div>
                                <span className="text-[#e8a317] text-xs font-bold tracking-widest uppercase">Advanced Optimization</span>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                                Per-Page SEO<br />Manager
                            </h1>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Configure unique search engine identities for individual sections.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4 xl:max-w-xl xl:justify-end">
                            {segments.map(seg => (
                                <button
                                    key={seg}
                                    onClick={() => setActiveSegment(seg)}
                                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all duration-200 ${activeSegment === seg
                                        ? 'bg-[#f09a1a] text-white shadow-md'
                                        : 'bg-[#264473] hover:bg-[#345283] text-slate-200'
                                        }`}
                                >
                                    {seg}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {loading && activeSegment ? (
                            <div className="flex justify-center p-20 col-span-2"><Loader2 className="w-8 h-8 animate-spin text-[#1b365d]" /></div>
                        ) : (
                            <>
                                <form onSubmit={handleSeoUpdate} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest text-[#a8b1c5] uppercase">Meta Title Tag</label>
                                        <Input
                                            className="bg-slate-50 border-slate-200 h-14 text-slate-700 font-medium"
                                            placeholder="Title shown in browser tab & search results..."
                                            value={seoData.title}
                                            onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest text-[#a8b1c5] uppercase">Meta Description</label>
                                        <Textarea
                                            className="bg-slate-50 border-slate-200 min-h-[140px] text-slate-700 font-medium resize-none overflow-y-auto"
                                            placeholder="Brief snippet describing this page's content..."
                                            value={seoData.description}
                                            onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest text-[#a8b1c5] uppercase">Focus Keywords</label>
                                        <Input
                                            className="bg-slate-50 border-slate-200 h-14 text-slate-700"
                                            placeholder="comma-separated, search-terms..."
                                            value={seoData.keywords}
                                            onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                                        />
                                    </div>
                                    <div className="pt-2">
                                        <Button type="submit" disabled={saving} className="w-full bg-[#1b365d] hover:bg-[#152e50] text-white h-14 font-bold tracking-widest uppercase text-xs rounded-md shadow-sm">
                                            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            Update Page Identity
                                        </Button>
                                    </div>
                                </form>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold tracking-widest text-[#a8b1c5] uppercase">Google Search Preview</label>
                                    <Card className="bg-slate-50/50 border-slate-100 shadow-sm p-6 lg:p-10 h-[calc(100%-24px)] min-h-[300px]">
                                        <div className="max-w-[600px]">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center">
                                                    <Search className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <div className="text-xs font-bold text-slate-500 tracking-wider">
                                                    GESIT.CO.ID
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#1a0dab] mb-2 hover:underline cursor-pointer" style={{ fontFamily: 'Georgia, serif' }}>
                                                {seoData.title || `${activeSegment === 'HOME' ? 'Home' : activeSegment.charAt(0) + activeSegment.slice(1).toLowerCase()} | The Gesit Companies`}
                                            </h3>
                                            <p className="text-[#4d5156] text-sm leading-relaxed max-w-[480px]">
                                                {seoData.description || "No description provided. Search engines will generate a snippet from page content."}
                                            </p>
                                        </div>
                                    </Card>
                                </div>
                            </>
                        )}
                    </div>
                </TabsContent>

                {/* 2. ACCESS CONTROL */}
                <TabsContent value="access" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="w-full bg-[#1b365d] rounded-lg p-8 md:p-12 mb-8 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-8">
                        <div className="max-w-md w-full">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-1 h-3 bg-[#e8a317]"></div>
                                <span className="text-[#e8a317] text-xs font-bold tracking-widest uppercase">Access Control</span>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                                Manage Team<br />Access
                            </h1>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Control who has access to the admin dashboard. Admins listed here have full read/write access to the platform.
                            </p>
                        </div>

                        <div className="w-full max-w-md lg:ml-auto">
                            <div className="bg-[#264473]/30 p-6 rounded-lg border border-[#345283] relative overflow-hidden">
                                <div className="absolute top-2 right-2 bg-[#e8a317] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest">
                                    Coming Soon
                                </div>
                                <label className="text-xs font-bold tracking-widest text-[#a8b1c5] uppercase block mb-3 opacity-50">Invite New Admin</label>
                                <div className="flex gap-2 opacity-50 pointer-events-none">
                                    <Input
                                        className="bg-[#1b365d] border-[#345283] text-white placeholder:text-slate-500 h-12 flex-1 focus-visible:ring-[#e8a317]"
                                        placeholder="colleague@gesit.co.id"
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleInviteAdmin(); }}
                                        disabled
                                    />
                                    <Button onClick={handleInviteAdmin} disabled className="h-12 w-12 bg-[#a38629] hover:bg-[#8b7222] text-white shrink-0 p-0 border border-[#bfa245]">
                                        <Plus className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Authorized Admins List */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 px-2">
                                <ShieldCheck className="w-5 h-5 text-[#1b365d]" />
                                <h2 className="text-xl font-bold text-[#1b365d]" style={{ fontFamily: 'Georgia, serif' }}>Authorized Administrators</h2>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { name: 'admin@gesit.co.id', role: 'SUPER_ADMIN', initials: 'AD' },
                                    { name: 'rudi.siarudin@gesit.co.id', role: 'SUPER_ADMIN', initials: 'RU' }
                                ].map((admin, idx) => (
                                    <div key={idx} className="bg-white border-l-4 border-l-[#1b365d] border border-slate-100 shadow-sm p-4 flex items-center gap-4 transition-transform hover:translate-x-1">
                                        <div className="w-10 h-10 rounded-full bg-[#1b365d] text-white flex items-center justify-center font-bold text-xs shrink-0">
                                            {admin.initials}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-sm">{admin.name}</h3>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{admin.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Account Security Form */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 px-2">
                                <Key className="w-5 h-5 text-[#bc9c33]" />
                                <h2 className="text-xl font-bold text-[#1b365d]" style={{ fontFamily: 'Georgia, serif' }}>Account Security</h2>
                            </div>

                            <Card className="p-6 border-slate-100 bg-slate-50/50 shadow-sm">
                                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Update Access Password</label>
                                        <div className="relative">
                                            <Input
                                                type={showPass ? "text" : "password"}
                                                className="bg-white pr-10"
                                                placeholder="Enter new strong password..."
                                                value={passwordData.newPassword}
                                                onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPass(!showPass)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                            >
                                                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Input
                                            type={showPass ? "text" : "password"}
                                            className="bg-white"
                                            placeholder="Confirm new password..."
                                            value={passwordData.confirmPassword}
                                            onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        />
                                    </div>
                                    <Button type="submit" disabled={saving} className="w-full bg-[#1b365d] hover:bg-[#152e50] text-xs font-bold tracking-widest uppercase">
                                        {saving ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                                        Verify & Change Password
                                    </Button>
                                    <p className="text-[10px] text-slate-400 text-center italic">
                                        At least 6 characters required. You will stay logged in after change.
                                    </p>
                                </form>
                            </Card>

                            {/* 2FA Section */}
                            <div className="flex items-center gap-3 px-2 mt-4">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                <h2 className="text-xl font-bold text-[#1b365d]" style={{ fontFamily: 'Georgia, serif' }}>2FA Security</h2>
                            </div>

                            <Card className="p-6 border-slate-100 bg-white shadow-sm border-dashed border-2">
                                <div className="flex items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("p-4 rounded-full transition-colors", identityData.email_2fa_enabled ? "bg-emerald-50" : "bg-slate-50")}>
                                            <ShieldCheck className={cn("w-8 h-8", identityData.email_2fa_enabled ? "text-emerald-600" : "text-slate-400")} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800">Email Verification OTP</h3>
                                            <p className="text-xs text-slate-500 mt-1 max-w-[280px]">
                                                Receive a secure 6-digit code via email every time you log in to verify your identity.
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleEmail2FAToggle}
                                        disabled={saving}
                                        className={cn(
                                            "min-w-[140px] font-bold text-xs tracking-widest uppercase transition-all shadow-md",
                                            identityData.email_2fa_enabled
                                                ? "bg-red-500 hover:bg-red-600 text-white"
                                                : "bg-[#1b365d] hover:bg-[#152e50] text-white"
                                        )}
                                    >
                                        {saving ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : null}
                                        {identityData.email_2fa_enabled ? 'Deactivate' : 'Activate 2FA'}
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* 3. IDENTITY ASSETS & CONTACT NODES */}
                <TabsContent value="assets" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <form onSubmit={handleIdentityUpdate} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* ASSETS */}
                            <Card className="p-8 shadow-sm border-slate-100 bg-white relative">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-2 border border-slate-200 rounded-lg shadow-sm bg-white">
                                        <ImageIcon className="w-5 h-5 text-[#1b365d]" />
                                    </div>
                                    <h2 className="font-bold tracking-widest text-[#1b365d] text-sm uppercase">Identity Assets</h2>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-bold tracking-widest text-[#a8b1c5] uppercase">Portal Title</label>
                                        <div className="flex border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm hover:border-[#1b365d] transition-colors">
                                            <div className="bg-slate-50 px-4 py-3 border-r border-slate-200 flex items-center justify-center shrink-0">
                                                <Globe className="w-4 h-4 text-slate-300" />
                                            </div>
                                            <Input
                                                className="border-0 shadow-none h-12 focus-visible:ring-0 text-slate-700 bg-white"
                                                value={identityData.site_title}
                                                onChange={e => setIdentityData({ ...identityData, site_title: e.target.value })}
                                                placeholder="The Gesit Companies"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[11px] font-bold tracking-widest text-[#a8b1c5] uppercase">Primary Symbol</label>
                                        <div className="flex border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm hover:border-[#1b365d] transition-colors">
                                            <div className="bg-slate-50 px-4 py-3 border-r border-slate-200 flex items-center justify-center shrink-0">
                                                <div className="w-4 h-5 border border-slate-300 rounded-sm bg-white flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                                                </div>
                                            </div>
                                            <Input
                                                className="border-0 shadow-none h-12 focus-visible:ring-0 text-slate-700 bg-white"
                                                value={identityData.logo_url}
                                                onChange={e => setIdentityData({ ...identityData, logo_url: e.target.value })}
                                                placeholder="/logos/logos.png"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[11px] font-bold tracking-widest text-[#a8b1c5] uppercase">Terminal Icon</label>
                                        <div className="flex border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm hover:border-[#1b365d] transition-colors">
                                            <div className="bg-slate-50 px-4 py-3 border-r border-slate-200 flex items-center justify-center shrink-0">
                                                <Globe className="w-4 h-4 text-slate-300" />
                                            </div>
                                            <Input
                                                className="border-0 shadow-none h-12 focus-visible:ring-0 text-slate-700 bg-white"
                                                value={identityData.favicon_url}
                                                onChange={e => setIdentityData({ ...identityData, favicon_url: e.target.value })}
                                                placeholder="/favicon.ico"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* CONTACT NODES */}
                            <Card className="p-8 shadow-sm border-slate-100 bg-white relative">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-2 border border-slate-200 rounded-lg shadow-sm bg-white">
                                        <Phone className="w-5 h-5 text-[#1b365d]" />
                                    </div>
                                    <h2 className="font-bold tracking-widest text-[#1b365d] text-sm uppercase">Contact Nodes</h2>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-bold tracking-widest text-[#a8b1c5] uppercase">Direct Line</label>
                                        <div className="flex border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm hover:border-[#1b365d] transition-colors">
                                            <div className="bg-slate-50 px-4 py-3 border-r border-slate-200 flex items-center justify-center shrink-0">
                                                <Phone className="w-4 h-4 text-slate-300" />
                                            </div>
                                            <Input
                                                className="border-0 shadow-none h-12 font-semibold focus-visible:ring-0 text-slate-800 bg-white"
                                                value={identityData.contact_phone}
                                                onChange={e => setIdentityData({ ...identityData, contact_phone: e.target.value })}
                                                placeholder="+62 21 3101601"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[11px] font-bold tracking-widest text-[#a8b1c5] uppercase">Office Address</label>
                                        <Textarea
                                            className="border-slate-200 shadow-sm focus-visible:ring-0 focus-visible:border-[#1b365d] text-slate-800 bg-white font-medium resize-none min-h-[100px]"
                                            value={identityData.contact_address}
                                            onChange={e => setIdentityData({ ...identityData, contact_address: e.target.value })}
                                            placeholder="The City Tower, 27th Floor..."
                                        />
                                    </div>

                                    {/* Analytics Integration */}
                                    <div className="pt-6 border-t border-slate-100 mt-6 space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Zap className="w-4 h-4 text-amber-500" />
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Marketing & Analytics</span>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-bold tracking-widest text-[#a8b1c5] uppercase">Google Analytics (GA4) ID</label>
                                            <Input
                                                className="bg-white border-slate-200 h-11 text-slate-700"
                                                placeholder="G-XXXXXXXXXX"
                                                value={identityData.ga_tracking_id}
                                                onChange={e => setIdentityData({ ...identityData, ga_tracking_id: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[11px] font-bold tracking-widest text-[#a8b1c5] uppercase">Facebook Pixel ID</label>
                                            <Input
                                                className="bg-white border-slate-200 h-11 text-slate-700"
                                                placeholder="123456789012345"
                                                value={identityData.fb_pixel_id}
                                                onChange={e => setIdentityData({ ...identityData, fb_pixel_id: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute right-8 top-8">
                                    <Button type="submit" disabled={saving} className="bg-[#1b365d] hover:bg-[#152e50] text-xs tracking-widest uppercase">
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save"}
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        {/* SYSTEM CONTROL: MAINTENANCE */}
                        <div className="space-y-8">
                            <Card className="p-8 shadow-sm border-slate-100 bg-white relative">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-2 border border-slate-200 rounded-lg shadow-sm bg-white">
                                        <RefreshCw className={`w-5 h-5 ${identityData.maintenance_mode ? 'text-red-500' : 'text-green-500'}`} />
                                    </div>
                                    <div>
                                        <h2 className="font-bold tracking-widest text-[#1b365d] text-sm uppercase">System Status</h2>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Public Visibility Controls</p>
                                    </div>
                                </div>

                                <div className={`p-8 rounded-xl border-2 border-dashed transition-all ${identityData.maintenance_mode ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="space-y-1">
                                                <h4 className={`text-lg font-bold ${identityData.maintenance_mode ? 'text-red-700' : 'text-slate-800'}`}>
                                                    {identityData.maintenance_mode ? 'Maintenance Mode Active' : 'Website is Live'}
                                                </h4>
                                                <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                                                    {identityData.maintenance_mode
                                                        ? `Public access is blocked. Visitors see a "Site Under Maintenance" page with a countdown until ${new Date(identityData.maintenance_until).toLocaleString()}.`
                                                        : 'Public visitors can access all pages normally. Activate this mode when performing major updates.'}
                                                </p>
                                            </div>

                                            <Button
                                                type="button"
                                                onClick={handleMaintenanceToggle}
                                                disabled={saving}
                                                className={cn(
                                                    "min-w-[140px] h-12 font-bold text-xs tracking-widest uppercase transition-all shadow-lg",
                                                    identityData.maintenance_mode
                                                        ? "bg-red-600 hover:bg-red-700 text-white"
                                                        : "bg-[#1b365d] hover:bg-navy-deep text-white"
                                                )}
                                            >
                                                {saving ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : null}
                                                {identityData.maintenance_mode ? 'Deactivate Now' : 'Activate Mode'}
                                            </Button>
                                        </div>

                                        {!identityData.maintenance_mode && (
                                            <div className="pt-6 border-t border-slate-200/60">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Set Maintenance Duration</span>
                                                </div>
                                                <div className="flex flex-wrap gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setMaintenanceDuration('none')}
                                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                                                            maintenanceDuration === 'none' 
                                                            ? 'bg-[#bc9c33] border-[#bc9c33] text-white shadow-md' 
                                                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                                                        }`}
                                                    >
                                                        No Timer
                                                    </button>
                                                    {['1h', '3h', '6h', '12h', '1d'].map((dur) => (
                                                        <button
                                                            key={dur}
                                                            type="button"
                                                            onClick={() => setMaintenanceDuration(dur)}
                                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                                                                maintenanceDuration === dur 
                                                                ? 'bg-[#1b365d] border-[#1b365d] text-white shadow-md' 
                                                                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                                                            }`}
                                                        >
                                                            {dur === '1d' ? '24 Hours' : dur.replace('h', ' Hours')}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 flex items-start gap-2 px-1">
                                    <AlertCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                                    <p className="text-[10px] text-slate-400 italic">
                                        Admin Dashboard remains accessible during maintenance. Public traffic is redirected immediately.
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </form>
                </TabsContent>

                {/* 4. ACTIVITY LOGS */}
                <TabsContent value="logs" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-start justify-between mb-10 px-2 pt-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-[#1b365d] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                System Activity Logs
                            </h1>
                            <p className="text-xs font-bold tracking-widest text-[#a8b1c5] uppercase">
                                Track recent updates and modifications
                            </p>
                        </div>
                        <Button onClick={fetchData} variant="outline" size="icon" className="bg-slate-50 border-slate-200">
                            <RotateCcw className={`w-4 h-4 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
                        </Button>
                    </div>

                    <div className="relative pl-6 lg:pl-10">
                        <div className="absolute left-8 lg:left-[51px] top-4 bottom-0 w-px bg-slate-100"></div>

                        <div className="space-y-6 pb-6">
                            {logs.length === 0 && !loading ? (
                                <div className="p-10 text-center text-slate-400">No activity logs recorded yet.</div>
                            ) : (
                                logs.slice((logsPage - 1) * LOGS_PER_PAGE, logsPage * LOGS_PER_PAGE).map((log) => (
                                    <div key={log.id} className="relative flex gap-6 lg:gap-8 hover:-translate-y-0.5 transition-transform">
                                        {/* Timeline Marker */}
                                        <div className="relative z-10 w-7 h-7 shrink-0 rounded bg-blue-50 flex items-center justify-center mt-3 shadow-sm border border-blue-100/50">
                                            <Zap className="w-3 h-3 text-blue-500 shrink-0" />
                                        </div>

                                        <Card className="flex-1 p-5 shadow-sm border-slate-100 hover:border-slate-200 transition-colors bg-white">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                                                        UPDATE
                                                    </span>
                                                    <h4 className="font-bold text-slate-700 text-sm">
                                                        {log.target}
                                                    </h4>
                                                </div>
                                                <span className="text-[11px] font-medium tracking-wide text-[#a8b1c5]">
                                                    {new Date(log.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <p className="text-slate-500 text-sm">
                                                {log.action}
                                            </p>
                                        </Card>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Pagination Footer for Logs */}
                        {logs.length > 0 && (
                            <div className="ml-0 lg:ml-8 mt-8 px-6 py-4 border rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 shadow-sm bg-white">
                                <p className="text-xs font-semibold text-slate-500">
                                    Showing <span className="text-[#1b365d] font-bold">{Math.min(logs.length, (logsPage - 1) * LOGS_PER_PAGE + 1)}</span> to <span className="text-[#1b365d] font-bold">{Math.min(logs.length, logsPage * LOGS_PER_PAGE)}</span> of <span className="text-[#1b365d] font-bold">{logs.length}</span> actions
                                </p>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setLogsPage(prev => Math.max(1, prev - 1))}
                                        disabled={logsPage === 1}
                                        className="h-8 text-xs font-semibold"
                                    >
                                        Sebelumnya
                                    </Button>
                                    <span className="text-xs font-bold text-slate-700 px-3 py-1 bg-white border rounded-md">
                                        Halaman {logsPage} dari {Math.max(1, Math.ceil(logs.length / LOGS_PER_PAGE))}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setLogsPage(prev => Math.min(Math.max(1, Math.ceil(logs.length / LOGS_PER_PAGE)), prev + 1))}
                                        disabled={logsPage === Math.max(1, Math.ceil(logs.length / LOGS_PER_PAGE))}
                                        className="h-8 text-xs font-semibold"
                                    >
                                        Selanjutnya
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

