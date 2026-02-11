"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/adminAuth';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Calendar,
    MessageSquare,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle,
    Zap,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Users,
    Activity
} from 'lucide-react';
import { toast } from 'sonner';
import { TopBar } from '@/components/admin/AdminLayout';

interface DashboardStats {
    totalBookings: number;
    pendingBookings: number;
    completedBookings: number;
    totalQuotes: number;
    pendingQuotes: number;
    totalContacts: number;
    unreadContacts: number;
    revenueEstimate: number;
    totalInstantBookings: number;
    pendingInstantBookings: number;
    instantBookingsRevenue: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const { user } = useAdminAuth();
    const [stats, setStats] = useState<DashboardStats>({
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        totalQuotes: 0,
        pendingQuotes: 0,
        totalContacts: 0,
        unreadContacts: 0,
        revenueEstimate: 0,
        totalInstantBookings: 0,
        pendingInstantBookings: 0,
        instantBookingsRevenue: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadDashboardStats();
    }, []);

    const loadDashboardStats = async () => {
        try {
            setIsLoading(true);

            // Get bookings stats
            const { data: bookings } = await supabase.from('bookings').select('status');
            const { data: quotes } = await supabase.from('quotes').select('status, quote_amount');
            const { data: contacts } = await supabase.from('contact_messages').select('status');
            const { data: instantBookings } = await supabase.from('instant_bookings').select('status, final_price');

            // Calculate stats
            const totalBookings = bookings?.length || 0;
            const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0;
            const completedBookings = bookings?.filter(b => b.status === 'completed').length || 0;

            const totalQuotes = quotes?.length || 0;
            const pendingQuotes = quotes?.filter(q => q.status === 'pending').length || 0;

            const totalContacts = contacts?.length || 0;
            const unreadContacts = contacts?.filter(c => c.status === 'unread').length || 0;

            const revenueEstimate = quotes?.reduce((sum, quote) => sum + (quote.quote_amount || 0), 0) || 0;

            const totalInstantBookings = instantBookings?.length || 0;
            const pendingInstantBookings = instantBookings?.filter(b => b.status === 'pending').length || 0;
            const instantBookingsRevenue = instantBookings?.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + (b.final_price || 0), 0) || 0;

            setStats({
                totalBookings,
                pendingBookings,
                completedBookings,
                totalQuotes,
                pendingQuotes,
                totalContacts,
                unreadContacts,
                revenueEstimate,
                totalInstantBookings,
                pendingInstantBookings,
                instantBookingsRevenue
            });
        } catch (error) {
            console.error('Error loading dashboard stats:', error);
            toast.error('Failed to load dashboard statistics');
        } finally {
            setIsLoading(false);
        }
    };

    const StatCard = ({ title, value, subtitle, icon: Icon, color, onClick }: any) => (
        <Card
            className="group hover:shadow-xl transition-all duration-300 border-none bg-white shadow-sm overflow-hidden cursor-pointer"
            onClick={onClick}
        >
            <CardContent className="p-6 relative">
                <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 transition-transform group-hover:scale-110 ${color}`} />
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</p>
                        <p className="text-3xl font-black text-gray-900">{value}</p>
                        {subtitle && (
                            <p className="text-[10px] font-bold text-gray-400 mt-1 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <div className={`p-4 rounded-2xl shadow-lg transition-transform group-hover:-translate-y-1 ${color}`}>
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="flex flex-col h-full overflow-hidden bg-gray-50/50">
            <TopBar
                title={`Welcome back, ${user?.full_name?.split(' ')[0] || 'Admin'}`}
                subtitle="Here's what's happening with FreshPlus today."
            />

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Revenue"
                        value={`$${(stats.instantBookingsRevenue + stats.revenueEstimate).toLocaleString()}`}
                        subtitle="+12.5% from last month"
                        icon={TrendingUp}
                        color="bg-gradient-to-br from-blue-600 to-indigo-700"
                    />
                    <StatCard
                        title="Instant Bookings"
                        value={stats.totalInstantBookings}
                        subtitle={`${stats.pendingInstantBookings} pending approval`}
                        icon={Zap}
                        color="bg-gradient-to-br from-emerald-500 to-teal-600"
                        onClick={() => router.push('/admin/instant-bookings')}
                    />
                    <StatCard
                        title="Service Bookings"
                        value={stats.totalBookings}
                        subtitle={`${stats.pendingBookings} awaiting assignment`}
                        icon={Calendar}
                        color="bg-gradient-to-br from-amber-500 to-orange-600"
                        onClick={() => router.push('/admin/bookings')}
                    />
                    <StatCard
                        title="Active Leads"
                        value={stats.totalQuotes + stats.totalContacts}
                        subtitle={`${stats.unreadContacts} unread messages`}
                        icon={Activity}
                        color="bg-gradient-to-br from-purple-500 to-pink-600"
                        onClick={() => router.push('/admin/contacts')}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Activity Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b border-gray-100 flex flex-row items-center justify-between py-6">
                                <div>
                                    <CardTitle className="text-lg font-bold">Performance Matrix</CardTitle>
                                    <p className="text-xs text-gray-500 font-medium">Real-time synchronization active</p>
                                </div>
                                <Button variant="outline" size="sm" className="text-xs font-bold uppercase tracking-wider" aria-label="View performance matrix details">
                                    Details <ChevronRight className="ml-1 h-3 w-3" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="h-64 flex items-center justify-center text-gray-400 font-medium italic bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100">
                                    Analytics Visualization Engine Initializing...
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                                        Operational Status
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[
                                        { label: 'Cloud Infrastructure', status: 'Optimal' },
                                        { label: 'Booking Gateway', status: 'Stable' },
                                        { label: 'Payment API', status: 'Connected' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                            <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">{item.label}</span>
                                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-black uppercase">
                                                {item.status}
                                            </span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                                        <Users className="h-4 w-4 text-blue-500" />
                                        Workforce Insight
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-6">
                                        <p className="text-3xl font-black text-gray-900">14</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Active Cleaners Online</p>
                                        <div className="mt-4 flex -space-x-2 justify-center">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200" />
                                            ))}
                                            <div className="h-8 w-8 rounded-full border-2 border-white bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">
                                                +9
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        <Card className="border-none shadow-sm bg-blue-600 text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                                <Zap className="h-24 w-24" />
                            </div>
                            <CardContent className="p-8 space-y-4 relative z-10">
                                <p className="text-xs font-black uppercase tracking-[.2em] opacity-80">Quick Protocol</p>
                                <h3 className="text-2xl font-black leading-tight">Generate Instant Quote Report</h3>
                                <p className="text-sm opacity-90 font-medium">Create a comprehensive PDF summary of all current bookings and revenue.</p>
                                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 border-none font-bold mt-4 shadow-xl shadow-black/10">
                                    Execute Report
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center justify-between">
                                    Live Stream
                                    <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-4">
                                {[
                                    { user: 'Sarah J.', action: 'booked', time: '2m ago', color: 'text-emerald-500' },
                                    { user: 'System', action: 'auto-assigned', time: '14m ago', color: 'text-blue-500' },
                                    { user: 'Client 932', action: 'canceled', time: '28m ago', color: 'text-red-500' }
                                ].map((act, i) => (
                                    <div key={i} className="flex gap-4 items-start relative pb-6 last:pb-0">
                                        {i !== 2 && <div className="absolute left-1.5 top-6 bottom-0 w-px bg-gray-100" />}
                                        <div className="h-3 w-3 rounded-full bg-gray-200 mt-1 ring-4 ring-white relative z-10" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-900">
                                                {act.user} <span className="text-gray-400 font-medium tracking-tight"> {act.action} a service.</span>
                                            </p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-wider">{act.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="ghost" className="w-full text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                                    View Audit Trail
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
