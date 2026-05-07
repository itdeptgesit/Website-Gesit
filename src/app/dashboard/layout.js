'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Newspaper,
    LogOut,
    Menu,
    X,
    User,
    Settings,
    Mail,
    ChevronDown,
    Search,
    Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClient();

    useEffect(() => {
        let mounted = true;

        const checkUser = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error || !session) {
                    if (mounted) router.push('/admin/login');
                } else {
                    if (mounted) setUser(session.user);
                }
            } catch (err) {
                console.error("Auth check warning:", err);
            }
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                if (mounted) router.push('/admin/login');
            } else if (session) {
                if (mounted) setUser(session.user);
            }
        });

        return () => {
            mounted = false;
            subscription?.unsubscribe();
        };
    }, [router, supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        router.push('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { name: 'Manage News', icon: Newspaper, href: '/dashboard/news' },
        { name: 'Contact Messages', icon: Mail, href: '/dashboard/contacts' },
        { name: 'Global Settings', icon: Settings, href: '/dashboard/settings' },
    ];

    const activePageName = navItems.find(item => pathname === item.href)?.name || 'Overview';

    return (
        <div className="h-screen bg-[#f8f9fa] flex font-sans overflow-hidden">
            {/* --- PREMIUM SIDEBAR (Flex-based, no longer fixed to avoid stacking context issues) --- */}
            <aside
                className={cn(
                    "bg-[#103065] text-slate-300 transition-all duration-300 flex flex-col h-full border-r border-white/10 shrink-0 overflow-hidden",
                    isSidebarOpen ? "w-64" : "w-20"
                )}
            >
                {/* Sidebar Header */}
                <div className="h-[72px] flex items-center px-6 border-b border-white/10 shrink-0 bg-[#0c244b]">
                    <div className="flex items-center gap-3 w-full">
                        <img
                            src="/logo-gesit.webp"
                            alt="Gesit Logo"
                            className={cn("object-contain brightness-0 invert", isSidebarOpen ? "h-9" : "h-7 mx-auto")}
                        />
                        {isSidebarOpen && (
                            <div className="flex flex-col leading-tight">
                                <span className="font-bold text-sm tracking-[0.2em] text-white uppercase">Gesit Portal</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto w-full scrollbar-hide">
                    <div className="px-6 mb-2">
                        {isSidebarOpen && <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Main Menu</p>}
                    </div>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 py-3 relative transition-all duration-200 group text-[13px] font-medium w-full",
                                    isActive
                                        ? "text-white bg-white/10"
                                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20 rounded-r-sm"></div>
                                )}

                                <div className={cn(
                                    "flex items-center gap-4 w-full",
                                    isSidebarOpen ? "px-6" : "justify-center"
                                )}>
                                    <item.icon className={cn(
                                        "w-[18px] h-[18px] shrink-0 transition-colors",
                                        isActive ? "text-white" : "group-hover:text-white"
                                    )} />
                                    {isSidebarOpen && <span className="tracking-wide whitespace-nowrap">{item.name}</span>}
                                </div>

                                {!isSidebarOpen && (
                                    <div className="fixed left-20 ml-2 px-3 py-1.5 bg-[#0c244b] text-white text-xs rounded shadow-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[110]">
                                        {item.name}
                                    </div>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Sidebar Footer User Profile */}
                <div className="p-4 border-t border-white/10 bg-[#0c244b]">
                    <div className="flex items-center justify-between">
                        {isSidebarOpen && (
                            <div className="flex items-center gap-3 overflow-hidden pl-2">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                                    <span className="text-xs font-bold text-slate-300">AD</span>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-semibold text-white truncate">Administrator</p>
                                    <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@gesit.co.id'}</p>
                                </div>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 shrink-0 mx-auto"
                            onClick={handleLogout}
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col min-w-0 h-full">
                {/* Clean Top Header */}
                <header className="h-[72px] shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 z-40 shadow-sm/50">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-slate-500 hover:bg-slate-100"
                        >
                            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

                        <div className="hidden sm:flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin Section</span>
                            <span className="text-sm font-bold text-[#103065]">{activePageName}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5">
                        <div className="hidden md:flex items-center relative">
                            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search portal..."
                                className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#bc9c33] focus:border-[#bc9c33] transition-all w-48 focus:w-64"
                            />
                        </div>

                        <Button variant="ghost" size="icon" className="text-slate-500 hidden sm:flex">
                            <Bell className="w-4 h-4" />
                        </Button>

                        <div className="h-6 w-px bg-slate-200" />

                        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 py-1.5 px-2 rounded-md transition-colors">
                            <div className="w-8 h-8 rounded-full bg-[#103065] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                AD
                            </div>
                            <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin</span>
                            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                        </div>
                    </div>
                </header>

                {/* Page Content Container */}
                <div className="p-4 sm:p-8 flex-1 overflow-x-hidden overflow-y-auto bg-[#f8f9fa]">
                    <div className="max-w-7xl mx-auto w-full pb-8">
                        {children}
                    </div>
                </div>
            </main>

            {/* Global Toaster for Notifications */}
            <Toaster position="top-center" richColors />
        </div>
    );
}
