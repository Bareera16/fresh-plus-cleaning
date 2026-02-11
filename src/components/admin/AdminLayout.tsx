'use client';
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/lib/adminAuth';
import { supabase } from '@/lib/supabase';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  Zap,
  Calendar,
  FileText,
  MessageSquare,
  Users,
  UserCircle,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Moon,
  Sun,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  url: string;
  icon: any;
  badge?: number;
  isActive?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

// Navigation configuration
const getNavigation = (pendingInstant: number, pendingBookings: number, unreadContacts: number): NavGroup[] => [
  {
    label: 'Overview',
    items: [
      { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Bookings',
    items: [
      { title: 'Instant Bookings', url: '/admin/instant-bookings', icon: Zap, badge: pendingInstant },
      { title: 'Legacy Bookings', url: '/admin/bookings', icon: Calendar, badge: pendingBookings },
      { title: 'Quote Requests', url: '/admin/quotes', icon: FileText },
    ],
  },
  {
    label: 'Management',
    items: [
      { title: 'Cleaners', url: '/admin/cleaners', icon: Users },
      { title: 'Customers', url: '/admin/customers', icon: UserCircle },
    ],
  },
  {
    label: 'Insights',
    items: [
      { title: 'Analytics', url: '/admin/analytics', icon: BarChart3 },
      { title: 'Messages', url: '/admin/contacts', icon: MessageSquare, badge: unreadContacts },
    ],
  },
  {
    label: 'System',
    items: [
      { title: 'Settings', url: '/admin/settings', icon: Settings },
    ],
  },
];

// Sidebar Navigation Component
function AdminSidebar({ pendingInstant, pendingBookings, unreadContacts }: {
  pendingInstant: number;
  pendingBookings: number;
  unreadContacts: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const navigation = getNavigation(pendingInstant, pendingBookings, unreadContacts);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className="border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-lg font-black text-foreground tracking-tighter">FRESH+</span>
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">Command Center</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {navigation.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[.2em] py-4">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isActive}
                        onClick={() => router.push(item.url)}
                        className={cn(
                          "transition-all duration-200 h-10 rounded-xl px-3",
                          isActive && "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 font-bold"
                        )}
                      >
                        <item.icon className={cn(
                          "h-4 w-4",
                          isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400"
                        )} />
                        <span className="text-sm">{item.title}</span>
                        {item.badge && item.badge > 0 && (
                          <SidebarMenuBadge className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </SidebarMenuBadge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 px-2 hover:bg-muted/50 h-14 rounded-2xl">
              <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 font-bold">
                  {user?.full_name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-bold truncate max-w-[140px] text-gray-900">{user?.full_name || 'Admin'}</span>
                <span className="text-[10px] font-bold text-gray-400 truncate max-w-[140px] uppercase tracking-tighter">{user?.email}</span>
              </div>
              <ChevronDown className="ml-auto h-4 w-4 text-gray-400 group-data-[collapsible=icon]:hidden" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 border-none shadow-2xl">
            <DropdownMenuLabel className="p-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-black">{user?.full_name}</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{user?.role}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-50" />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50 rounded-xl p-3 cursor-pointer">
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-bold text-xs uppercase tracking-widest">Terminate Session</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

// Top Bar Component
function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center gap-4 border-b border-gray-100/50 bg-white/80 backdrop-blur-xl px-8">
      <SidebarTrigger className="h-10 w-10 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors" />

      <div className="flex-1 ml-2">
        <h1 className="text-xl font-black text-gray-900 tracking-tighter uppercase">{title}</h1>
        {subtitle && <p className="text-[10px] font-black text-gray-400 uppercase tracking-[.2em] mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-gray-50 group">
          <Search className="h-5 w-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-gray-50 group relative">
          <Bell className="h-5 w-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
        </Button>

        <div className="h-6 w-[1px] bg-gray-100 mx-2" />

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-gray-50 group" onClick={toggleTheme}>
          {isDark ? <Sun className="h-5 w-5 text-gray-400 group-hover:text-gray-900" /> : <Moon className="h-5 w-5 text-gray-400 group-hover:text-gray-900" />}
        </Button>
      </div>
    </header>
  );
}

// Main Admin Layout
export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [pendingInstant, setPendingInstant] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [unreadContacts, setUnreadContacts] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      if (!isAuthenticated) return;

      try {
        const { count: instantCount } = await supabase
          .from('instant_bookings')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        const { count: bookingsCount } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        const { count: contactsCount } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'unread');

        setPendingInstant(instantCount || 0);
        setPendingBookings(bookingsCount || 0);
        setUnreadContacts(contactsCount || 0);
      } catch (error) {
        console.error('Error fetching sidebar counts:', error);
      }
    };

    fetchCounts();

    // Optional: Set up an interval or real-time subscription to keep counts updated
    const interval = setInterval(fetchCounts, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6">
          <div className="h-12 w-12 animate-spin rounded-full border-[3px] border-blue-100 border-t-blue-600" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[.3em]">Nexus Syncing...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar
        pendingInstant={pendingInstant}
        pendingBookings={pendingBookings}
        unreadContacts={unreadContacts}
      />
      <SidebarInset className="bg-[#fcfdff]">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

// Export TopBar for use in pages
export { TopBar };
