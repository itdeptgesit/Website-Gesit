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
    Building2,
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

    // Helper to get active page name for header
    const activePageName = navItems.find(item => pathname === item.href)?.name || 'Overview';

    return (
        <div className="h-screen bg-[#f8f9fa] flex font-sans overflow-hidden">
            {/* --- PREMIUM SIDEBAR --- */}
            <aside
                className={cn(
                    "bg-[#0a1835] text-slate-300 transition-all duration-300 flex flex-col fixed inset-y-0 z-50 border-r border-[#152e50]",
                    isSidebarOpen ? "w-64" : "w-20"
                )}
            >
                {/* Sidebar Header */}
                <div className="h-[72px] flex items-center px-6 border-b border-[#152e50] shrink-0 bg-[#07122a]">
                    <div className="flex items-center gap-3">
                        <img
                            src={isSidebarOpen ? "/logo-gesit.png" : "/favicon.ico"}
                            alt="Gesit Logo"
                            className={cn("object-contain", isSidebarOpen ? "h-8" : "h-6 w-6")}
                            style={{ filter: 'brightness(0) invert(1)' }}
                        />
                        {isSidebarOpen && (
                            <span className="font-bold text-lg text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                Gesit Portal
                            </span>
                        )}
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto w-full">
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
                                    "flex items-center gap-4 py-3 relative transition-all duration-200 group text-sm font-medium w-full",
                                    isActive
                                        ? "text-white bg-[#152e50]/50"
                                        : "text-slate-400 hover:bg-[#152e50]/30 hover:text-white"
                                )}
                            >
                                {/* Active Indicator Bar */}
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#bc9c33] rounded-r-sm"></div>
                                )}

                                <div className={cn(
                                    "flex items-center gap-4 w-full",
                                    isSidebarOpen ? "px-6" : "justify-center"
                                )}>
                                    <item.icon className={cn(
                                        "w-[18px] h-[18px] shrink-0 transition-colors",
                                        isActive ? "text-[#bc9c33]" : "group-hover:text-slate-300"
                                    )} />
                                    {isSidebarOpen && <span className="tracking-wide">{item.name}</span>}
                                </div>

                                {/* Tooltip for collapsed mode */}
                                {!isSidebarOpen && (
                                    <div className="fixed left-20 ml-2 px-3 py-1.5 bg-[#07122a] text-white text-xs rounded shadow-md border border-[#152e50] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                        {item.name}
                                    </div>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Sidebar Footer User Profile */}
                <div className="p-4 border-t border-[#152e50] bg-[#07122a]">
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
            <main className={cn(
                "flex-1 flex flex-col transition-all duration-300 min-w-0 h-screen",
                isSidebarOpen ? "ml-64" : "ml-20"
            )}>
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

                        {/* Page Context Title */}
                        <div className="hidden sm:flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Admin Section</span>
                            <span className="text-sm font-bold text-[#103065]">{activePageName}</span>
                        </div>
                    </div>

                    {/* Right side tools */}
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
                <div className="p-4 sm:p-8 flex-1 overflow-x-hidden overflow-y-auto">
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
