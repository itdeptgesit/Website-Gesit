'use client';

import { useState, useEffect, useMemo } from 'react';
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
    const supabase = useMemo(() => createClient(), []);

    // Dropdowns and Interactive States
    const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ pages: [], news: [], contacts: [] });
    const [notifications, setNotifications] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        let mounted = true;

        const checkUser = async () => {
            try {
                const { data: { user: authUser }, error } = await supabase.auth.getUser();
                if (error || !authUser) {
                    if (mounted) router.push('/admin/login');
                } else {
                    if (mounted) setUser(authUser);
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

    // Click outside listener to dismiss floating panels
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close admin dropdown
            const adminTrigger = document.getElementById('admin-profile-trigger');
            const adminMenu = document.getElementById('admin-dropdown-menu');
            if (adminTrigger && !adminTrigger.contains(event.target) && adminMenu && !adminMenu.contains(event.target)) {
                setIsAdminMenuOpen(false);
            }

            // Close notification dropdown
            const bellTrigger = document.getElementById('notification-bell-trigger');
            const notificationsMenu = document.getElementById('notifications-dropdown-menu');
            if (bellTrigger && !bellTrigger.contains(event.target) && notificationsMenu && !notificationsMenu.contains(event.target)) {
                setIsNotificationsOpen(false);
            }

            // Close search results dropdown
            const searchInput = document.getElementById('dashboard-search-input');
            const searchResultsDropdown = document.getElementById('search-results-dropdown');
            if (searchInput && !searchInput.contains(event.target) && searchResultsDropdown && !searchResultsDropdown.contains(event.target)) {
                setIsSearching(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('id, name, subject, created_at')
                .order('created_at', { ascending: false })
                .limit(5);

            if (!error && data) {
                setNotifications(data);
            }
        } catch (err) {
            console.error("Notifications fetch warning:", err);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // refresh every 30s
        return () => clearInterval(interval);
    }, []);

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

    // Dynamic Search Filter Logic
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults({ pages: [], news: [], contacts: [] });
            setIsSearching(false);
            return;
        }

        const runSearch = async () => {
            setIsSearching(true);
            const query = searchQuery.trim().toLowerCase();

            // Escape SQL wildcard characters to prevent injection
            const escapedQuery = query.replace(/[%_\\]/g, '\\$&');

            // Match navigation pages
            const matchedPages = navItems.filter(item => 
                item.name.toLowerCase().includes(query)
            );

            try {
                // Match news titles
                const { data: newsData } = await supabase
                    .from('news')
                    .select('id, title, slug')
                    .ilike('title', `%${escapedQuery}%`)
                    .limit(3);

                // Match contact subject or sender
                const { data: contactsData } = await supabase
                    .from('contact_messages')
                    .select('id, name, subject, email')
                    .or(`name.ilike.%${escapedQuery}%,subject.ilike.%${escapedQuery}%,email.ilike.%${escapedQuery}%`)
                    .limit(3);

                setSearchResults({
                    pages: matchedPages,
                    news: newsData || [],
                    contacts: contactsData || []
                });
            } catch (err) {
                console.error("Dynamic search failed:", err);
            }
        };

        const debounce = setTimeout(runSearch, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery]);

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
                        {/* Stateful Search Bar */}
                        <div className="hidden md:flex items-center relative z-50">
                            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
                            <input
                                id="dashboard-search-input"
                                type="text"
                                placeholder="Search portal..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setIsSearching(true);
                                }}
                                onFocus={() => setIsSearching(true)}
                                className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#bc9c33] focus:border-[#bc9c33] transition-all w-48 focus:w-64"
                            />

                            {/* Live Search Floating Panel */}
                            {isSearching && (searchQuery.trim() !== '') && (
                                <div 
                                    id="search-results-dropdown"
                                    className="absolute top-11 right-0 w-80 bg-white border border-slate-200/80 rounded-xl shadow-xl z-50 py-3 animate-in fade-in slide-in-from-top-2 duration-150"
                                >
                                    <div className="max-h-[360px] overflow-y-auto px-1">
                                        {/* Pages Category */}
                                        {searchResults.pages.length > 0 && (
                                            <div className="mb-3">
                                                <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Navigation</p>
                                                {searchResults.pages.map((page) => (
                                                    <Link
                                                        key={page.name}
                                                        href={page.href}
                                                        onClick={() => {
                                                            setSearchQuery('');
                                                            setIsSearching(false);
                                                        }}
                                                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                                                    >
                                                        <page.icon className="w-4 h-4 text-slate-400" />
                                                        <span>{page.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {/* News Category */}
                                        {searchResults.news.length > 0 && (
                                            <div className="mb-3">
                                                <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">News Articles</p>
                                                {searchResults.news.map((n) => (
                                                    <Link
                                                        key={n.id}
                                                        href={`/dashboard/news`}
                                                        onClick={() => {
                                                            setSearchQuery('');
                                                            setIsSearching(false);
                                                        }}
                                                        className="block px-3 py-2 hover:bg-slate-50 rounded-lg text-xs transition-colors"
                                                    >
                                                        <span className="font-semibold text-slate-700 line-clamp-1">{n.title}</span>
                                                        <span className="text-[10px] text-slate-400">gesit.co.id/news/{n.slug}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {/* Contacts Category */}
                                        {searchResults.contacts.length > 0 && (
                                            <div className="mb-1">
                                                <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Inbox Messages</p>
                                                {searchResults.contacts.map((c) => (
                                                    <Link
                                                        key={c.id}
                                                        href={`/dashboard/contacts`}
                                                        onClick={() => {
                                                            setSearchQuery('');
                                                            setIsSearching(false);
                                                        }}
                                                        className="block px-3 py-2 hover:bg-slate-50 rounded-lg text-xs transition-colors"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-semibold text-slate-700">{c.name}</span>
                                                            <span className="text-[9px] text-[#bc9c33] font-bold uppercase">{c.email?.split('@')[0]}</span>
                                                        </div>
                                                        <span className="text-[10px] text-slate-400 line-clamp-1">{c.subject || 'No Subject'}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        {/* Empty State */}
                                        {searchResults.pages.length === 0 && searchResults.news.length === 0 && searchResults.contacts.length === 0 && (
                                            <div className="py-6 text-center">
                                                <p className="text-xs font-semibold text-slate-400">No results found for &ldquo;{searchQuery}&rdquo;</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Stateful Notification Bell */}
                        <div className="relative">
                            <Button 
                                id="notification-bell-trigger"
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className={cn(
                                    "text-slate-500 hidden sm:flex relative rounded-full hover:bg-slate-100",
                                    isNotificationsOpen && "bg-slate-100 text-[#103065]"
                                )}
                            >
                                <Bell className="w-4 h-4" />
                                {notifications.length > 0 && (
                                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#bc9c33] rounded-full border border-white" />
                                )}
                            </Button>

                            {/* Floating Notifications Panel */}
                            {isNotificationsOpen && (
                                <div 
                                    id="notifications-dropdown-menu"
                                    className="absolute right-0 mt-3 w-80 bg-white border border-slate-200/80 rounded-xl shadow-xl z-50 py-3 animate-in fade-in slide-in-from-top-2 duration-150"
                                >
                                    <div className="px-4 pb-2 border-b flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-800">Recent Messages</span>
                                        <span className="text-[9px] font-bold bg-[#bc9c33]/10 text-[#bc9c33] px-2 py-0.5 rounded-full uppercase tracking-wider">
                                            {notifications.length} Unread
                                        </span>
                                    </div>
                                    <div className="max-h-[280px] overflow-y-auto divide-y divide-slate-100">
                                        {notifications.length > 0 ? (
                                            notifications.map((n) => (
                                                <Link
                                                    key={n.id}
                                                    href="/dashboard/contacts"
                                                    onClick={() => setIsNotificationsOpen(false)}
                                                    className="block p-4 hover:bg-slate-50 transition-colors"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-[#103065]">{n.name}</span>
                                                        <span className="text-[9px] text-slate-400">{new Date(n.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-600 font-medium truncate mt-1">{n.subject || 'No Subject'}</p>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="py-8 text-center">
                                                <p className="text-xs text-slate-400 font-medium">Your inbox is clear! 🎉</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="h-6 w-px bg-slate-200" />

                        {/* Stateful Admin Dropdown Menu */}
                        <div className="relative">
                            <div 
                                id="admin-profile-trigger"
                                onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                                className={cn(
                                    "flex items-center gap-2 cursor-pointer hover:bg-slate-50 py-1.5 px-2 rounded-md transition-colors select-none",
                                    isAdminMenuOpen && "bg-slate-50"
                                )}
                            >
                                <div className="w-8 h-8 rounded-full bg-[#103065] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                    AD
                                </div>
                                <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin</span>
                                <ChevronDown className={cn("w-4 h-4 text-slate-400 hidden sm:block transition-transform duration-200", isAdminMenuOpen && "rotate-180")} />
                            </div>

                            {/* Floating Admin Dropdown Panel */}
                            {isAdminMenuOpen && (
                                <div 
                                    id="admin-dropdown-menu"
                                    className="absolute right-0 mt-3 w-56 bg-white border border-slate-200/80 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-150"
                                >
                                    {/* User header */}
                                    <div className="px-4 py-2 border-b mb-1">
                                        <p className="text-xs font-bold text-slate-800">Administrator</p>
                                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{user?.email || 'admin@gesit.co.id'}</p>
                                    </div>

                                    {/* Action Links */}
                                    <Link 
                                        href="/dashboard/settings" 
                                        onClick={() => setIsAdminMenuOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                                    >
                                        <Settings className="w-4 h-4 text-slate-400" />
                                        <span>System Settings</span>
                                    </Link>

                                    <Link 
                                        href="/dashboard/news" 
                                        onClick={() => setIsAdminMenuOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                                    >
                                        <Newspaper className="w-4 h-4 text-slate-400" />
                                        <span>Manage News</span>
                                    </Link>

                                    {/* Separator */}
                                    <div className="h-px bg-slate-100 my-1.5" />

                                    {/* Sign out */}
                                    <button 
                                        onClick={() => {
                                            setIsAdminMenuOpen(false);
                                            handleLogout();
                                        }}
                                        className="flex items-center gap-2.5 w-full text-left px-4 py-2 hover:bg-red-50 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            )}
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

            {/* Toaster removed to prevent duplicate alerts (now handled globally in root layout) */}
        </div>
    );
}
