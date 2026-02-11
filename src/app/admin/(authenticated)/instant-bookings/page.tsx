"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/adminAuth';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { extraServices } from '@/lib/pricing-data';
import {
    Zap,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Clock,
    Trash2,
    Eye,
    Search,
    Filter,
    Home,
    Package,
    CheckCircle,
    MoreVertical,
    ExternalLink,
    DollarSign,
    ArrowUpDown
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { TopBar } from '@/components/admin/AdminLayout';

interface InstantBooking {
    id: string;
    created_at: string;
    updated_at: string;
    service_type: string;
    service_name: string;
    bedrooms: number | null;
    bathrooms: number;
    property_type: string | null;
    furnished: 'furnished' | 'empty' | null;
    selected_extras: Record<string, number>;
    bundle_selected: boolean;
    original_price: number;
    discount_amount: number;
    final_price: number;
    same_day_booking: boolean;
    preferred_date: string | null;
    preferred_time: string | null;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    suburb: string;
    postcode: string;
    comments: string | null;
    status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
    admin_notes: string | null;
    assigned_to: string | null;
}

export default function InstantBookingsPage() {
    const router = useRouter();
    const { user } = useAdminAuth();
    const [bookings, setBookings] = useState<InstantBooking[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<InstantBooking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState<InstantBooking | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [serviceFilter, setServiceFilter] = useState('all');

    useEffect(() => {
        loadBookings();
    }, []);

    useEffect(() => {
        filterBookings();
    }, [bookings, searchTerm, statusFilter, serviceFilter]);

    const loadBookings = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('instant_bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBookings(data || []);
        } catch (error) {
            console.error('Error loading instant bookings:', error);
            toast.error('Failed to load instant bookings');
        } finally {
            setIsLoading(false);
        }
    };

    const filterBookings = () => {
        let filtered = bookings;

        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(booking =>
                `${booking.first_name} ${booking.last_name}`.toLowerCase().includes(search) ||
                booking.email.toLowerCase().includes(search) ||
                booking.address.toLowerCase().includes(search) ||
                booking.service_name.toLowerCase().includes(search)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(booking => booking.status === statusFilter);
        }

        if (serviceFilter !== 'all') {
            filtered = filtered.filter(booking => booking.service_type === serviceFilter);
        }

        setFilteredBookings(filtered);
    };

    const updateBooking = async (bookingId: string, updates: Partial<InstantBooking>) => {
        try {
            const { error } = await supabase
                .from('instant_bookings')
                .update({
                    ...updates,
                    updated_at: new Date().toISOString()
                })
                .eq('id', bookingId);

            if (error) throw error;

            toast.success('Vector Sync: Booking state updated');
            loadBookings();
        } catch (error) {
            console.error('Sync Error:', error);
            toast.error('Protocol Failure: Update failed');
        }
    };

    const deleteBooking = async (bookingId: string) => {
        if (!confirm('Execute Deletion: Are you sure? This cannot be reversed.')) return;

        try {
            const { error } = await supabase
                .from('instant_bookings')
                .delete()
                .eq('id', bookingId);

            if (error) throw error;

            toast.success('Purge Complete: Data removed');
            loadBookings();
        } catch (error) {
            toast.error('Purge Failed: System error');
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'pending': return { color: 'bg-amber-100 text-amber-700 border-amber-200', pulse: true };
            case 'confirmed': return { color: 'bg-blue-100 text-blue-700 border-blue-200', pulse: false };
            case 'in_progress': return { color: 'bg-indigo-100 text-indigo-700 border-indigo-200', pulse: true };
            case 'completed': return { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', pulse: false };
            case 'cancelled': return { color: 'bg-red-100 text-red-700 border-red-200', pulse: false };
            default: return { color: 'bg-gray-100 text-gray-700 border-gray-200', pulse: false };
        }
    };

    const getExtraName = (extraId: string): string => {
        const extra = extraServices.find(e => e.id === extraId);
        return extra?.name || extraId;
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc]">
            <TopBar
                title="Instant Booking Nexus"
                subtitle="Manage leads generated through the pricing algorithm."
            />

            <div className="p-8 space-y-6 flex-1 overflow-y-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search leads..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white border-gray-200 focus:ring-emerald-500/20 rounded-xl"
                            />
                        </div>
                        <Button variant="outline" className="rounded-xl border-gray-200 bg-white hover:bg-gray-50">
                            <Filter className="h-4 w-4 mr-2" />
                            Complex Filters
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-40 rounded-xl bg-white border-gray-200">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All States</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="in_progress">Executing</SelectItem>
                                <SelectItem value="completed">Success</SelectItem>
                                <SelectItem value="cancelled">Aborted</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={loadBookings} variant="ghost" size="icon" className="rounded-xl hover:bg-white">
                            <ArrowUpDown className="h-4 w-4 text-gray-400" />
                        </Button>
                    </div>
                </div>

                <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-white">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-gray-50/50">
                                    <TableRow className="border-gray-100">
                                        <TableHead className="text-[10px] font-black uppercase tracking-widest px-6">Customer Profile</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase tracking-widest">Service Class</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase tracking-widest">Zone</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase tracking-widest">Appointment</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-6">Valuation</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredBookings.map((booking) => {
                                        const status = getStatusConfig(booking.status);
                                        return (
                                            <TableRow key={booking.id} className="border-gray-50 hover:bg-gray-50/30 transition-colors cursor-pointer group">
                                                <TableCell className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                                                            {booking.first_name[0]}{booking.last_name[0]}
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <p className="font-bold text-sm text-gray-900 group-hover:text-emerald-600 transition-colors">
                                                                {booking.first_name} {booking.last_name}
                                                            </p>
                                                            <p className="text-[10px] text-gray-500 font-bold lowercase tracking-tight">{booking.email}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <Zap className="h-3 w-3 text-emerald-500" />
                                                            <span className="text-xs font-bold text-gray-700">{booking.service_name}</span>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            {booking.bedrooms && (
                                                                <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-none text-[9px] font-black uppercase px-2 py-0">
                                                                    {booking.bedrooms}B
                                                                </Badge>
                                                            )}
                                                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-none text-[9px] font-black uppercase px-2 py-0">
                                                                {booking.bathrooms}BA
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-0.5">
                                                        <p className="text-xs font-bold text-gray-700">{booking.suburb}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">NSW {booking.postcode}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`h-2 w-2 rounded-full ${status.color.split(' ')[0]} ${status.pulse ? 'animate-pulse' : ''}`} />
                                                        <span className={`text-[10px] font-black uppercase tracking-wider ${status.color.split(' ')[1]}`}>
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-[10px] text-gray-400 font-bold mt-1">
                                                        {booking.preferred_date ? format(new Date(booking.preferred_date), 'dd MMM') : 'TBD'} • {booking.preferred_time || 'Flex'}
                                                    </p>
                                                </TableCell>
                                                <TableCell className="text-right px-6">
                                                    <p className="text-sm font-black text-emerald-600">${booking.final_price}</p>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] font-bold text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 opacity-0 group-hover:opacity-100 transition-all rounded-xl">
                                                                Access Node <ExternalLink className="ml-1 h-3 w-3" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-2xl bg-white border-none shadow-2xl rounded-3xl p-0 overflow-hidden">
                                                            <DialogHeader className="sr-only">
                                                                <DialogTitle>{booking.first_name} {booking.last_name}</DialogTitle>
                                                            </DialogHeader>
                                                            <div className="h-2 w-full bg-emerald-500" />
                                                            <div className="p-8 space-y-6">
                                                                <div className="flex justify-between items-start">
                                                                    <div>
                                                                        <h2 className="text-2xl font-black text-gray-900">{booking.first_name} {booking.last_name}</h2>
                                                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Lead ID: #{booking.id.slice(0, 8)}</p>
                                                                    </div>
                                                                    <Badge className={status.color + " px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border-none"}>
                                                                        {booking.status}
                                                                    </Badge>
                                                                </div>

                                                                <div className="grid grid-cols-2 gap-6">
                                                                    <div className="space-y-4">
                                                                        <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                                                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Info</h3>
                                                                            <div className="space-y-2">
                                                                                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                                                                    <Mail className="h-4 w-4 text-emerald-500" /> {booking.email}
                                                                                </div>
                                                                                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                                                                    <Phone className="h-4 w-4 text-emerald-500" /> {booking.phone}
                                                                                </div>
                                                                                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                                                                    <MapPin className="h-4 w-4 text-emerald-500" /> {booking.address}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-3">
                                                                            <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Financial Node</h3>
                                                                            <div className="flex justify-between items-end">
                                                                                <div className="space-y-1">
                                                                                    <p className="text-[10px] text-emerald-600/60 font-black uppercase">Original</p>
                                                                                    <p className="text-sm font-bold text-gray-400 line-through">${booking.original_price}</p>
                                                                                </div>
                                                                                <div className="text-right">
                                                                                    <p className="text-[10px] text-emerald-600 font-black uppercase">Approved Total</p>
                                                                                    <p className="text-3xl font-black text-emerald-600">${booking.final_price}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-4">
                                                                        <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                                                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Config</h3>
                                                                            <div className="space-y-2">
                                                                                <div className="flex justify-between text-sm font-bold text-gray-700">
                                                                                    <span>Service</span>
                                                                                    <span className="text-emerald-600">{booking.service_name}</span>
                                                                                </div>
                                                                                <div className="flex justify-between text-sm font-black text-gray-700 border-t border-gray-100 pt-2">
                                                                                    <span>Extras</span>
                                                                                    <span className="text-gray-400">{Object.keys(booking.selected_extras).length} Active</span>
                                                                                </div>
                                                                                <div className="flex flex-wrap gap-1 mt-2">
                                                                                    {Object.entries(booking.selected_extras).map(([id, qty]) => (
                                                                                        qty > 0 && (
                                                                                            <Badge key={id} className="bg-white border-gray-200 text-[9px] font-bold text-gray-600 px-2">
                                                                                                {getExtraName(id)} {qty > 1 && `x${qty}`}
                                                                                            </Badge>
                                                                                        )
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Operation Status</h3>
                                                                            <Select
                                                                                value={booking.status}
                                                                                onValueChange={(s: any) => updateBooking(booking.id, { status: s })}
                                                                            >
                                                                                <SelectTrigger className="rounded-xl border-gray-200 bg-white font-bold text-sm">
                                                                                    <SelectValue />
                                                                                </SelectTrigger>
                                                                                <SelectContent className="rounded-xl border-gray-100 shadow-2xl">
                                                                                    <SelectItem value="pending">Mark Pending</SelectItem>
                                                                                    <SelectItem value="confirmed">Confirm Access</SelectItem>
                                                                                    <SelectItem value="in_progress">Executing Service</SelectItem>
                                                                                    <SelectItem value="completed">Complete Record</SelectItem>
                                                                                    <SelectItem value="cancelled">Abort Protocol</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Internal Nexus Notes</h3>
                                                                    <Textarea
                                                                        placeholder="Add encrypted notes..."
                                                                        className="rounded-2xl border-gray-100 bg-gray-50/50 min-h-[100px] text-sm focus:ring-emerald-500/10"
                                                                        defaultValue={booking.admin_notes || ''}
                                                                        onBlur={(e) => updateBooking(booking.id, { admin_notes: e.target.value })}
                                                                    />
                                                                </div>

                                                                <div className="flex gap-3 pt-2">
                                                                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl h-12 shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-[10px]">
                                                                        Dispatch Cleaner
                                                                    </Button>
                                                                    <Button variant="outline" className="h-12 w-12 rounded-2xl border-gray-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-colors" onClick={() => deleteBooking(booking.id)}>
                                                                        <Trash2 className="h-5 w-5" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                        {filteredBookings.length === 0 && (
                            <div className="p-20 text-center space-y-4">
                                <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                                    <Zap className="h-10 w-10 text-gray-200" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">No Nexus Data Detected</h3>
                                    <p className="text-xs text-gray-400 font-medium">Try adjusting your filtration criteria or clearing search.</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
