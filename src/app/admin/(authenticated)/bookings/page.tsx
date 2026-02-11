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
import {
    Calendar,
    Phone,
    Mail,
    MapPin,
    Clock,
    Trash2,
    Eye,
    Search,
    Filter,
    CheckCircle,
    ExternalLink,
    ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { getServiceDisplayName } from '@/lib/serviceMapping';
import { TopBar } from '@/components/admin/AdminLayout';

interface Booking {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    address: string;
    service_date: string;
    service_time: string;
    special_instructions: string | null;
    status: string;
    admin_notes: string | null;
    assigned_to: string | null;
    created_at: string;
}

export default function BookingsPage() {
    const router = useRouter();
    const { user } = useAdminAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        loadBookings();
    }, []);

    useEffect(() => {
        filterBookings();
    }, [bookings, searchTerm, statusFilter]);

    const loadBookings = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBookings(data || []);
        } catch (error) {
            console.error('Error loading bookings:', error);
            toast.error('Failed to load bookings');
        } finally {
            setIsLoading(false);
        }
    };

    const filterBookings = () => {
        let filtered = bookings;

        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(booking =>
                booking.name.toLowerCase().includes(search) ||
                booking.email.toLowerCase().includes(search) ||
                booking.phone.includes(searchTerm) ||
                booking.address.toLowerCase().includes(search)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(booking => booking.status === statusFilter);
        }

        setFilteredBookings(filtered);
    };

    const updateBookingStatus = async (bookingId: string, status: string, adminNotes?: string) => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({
                    status,
                    admin_notes: adminNotes,
                    updated_at: new Date().toISOString()
                })
                .eq('id', bookingId);

            if (error) throw error;

            toast.success('Booking protocol updated');
            loadBookings();
        } catch (error) {
            toast.error('Update operation failed');
        }
    };

    const deleteBooking = async (bookingId: string) => {
        if (!confirm('Confirm Purge: Remove this record permanently?')) return;

        try {
            const { error } = await supabase
                .from('bookings')
                .delete()
                .eq('id', bookingId);

            if (error) throw error;

            toast.success('Record purged from database');
            loadBookings();
        } catch (error) {
            toast.error('Purge operation aborted');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'in_progress': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc]">
            <TopBar
                title="Legacy Booking Archive"
                subtitle="Historical and standard service requests management."
            />

            <div className="p-8 space-y-6 flex-1 overflow-y-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search archives..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white border-gray-200 focus:ring-blue-500/20 rounded-xl"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-40 rounded-xl bg-white border-gray-200">
                                <SelectValue placeholder="Status Filter" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Records</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="in_progress">Executing</SelectItem>
                                <SelectItem value="completed">Archived</SelectItem>
                                <SelectItem value="cancelled">Aborted</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={loadBookings} variant="outline" className="rounded-xl border-gray-200 bg-white shadow-sm">
                            Synchronize
                        </Button>
                    </div>
                </div>

                <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-white">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-gray-50/50">
                                <TableRow className="border-gray-100">
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest px-6">Requester</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Service Protocol</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Chronology</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Operation State</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-6">Command</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBookings.map((booking) => (
                                    <TableRow key={booking.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors group">
                                        <TableCell className="px-6 py-4">
                                            <div className="space-y-0.5">
                                                <p className="font-bold text-sm text-gray-900">{booking.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{booking.email}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-0.5">
                                                <p className="text-xs font-bold text-gray-700">{getServiceDisplayName(booking.service)}</p>
                                                <p className="text-[10px] text-gray-400 font-medium truncate max-w-[200px]">{booking.address}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-0.5">
                                                <p className="text-xs font-bold text-gray-700">{format(new Date(booking.service_date), 'dd MMM yyyy')}</p>
                                                <p className="text-[10px] text-gray-400 font-black uppercase">{booking.service_time}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={getStatusColor(booking.status) + " border px-2 py-0 text-[9px] font-black uppercase tracking-wider"}>
                                                {booking.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right px-6">
                                            <div className="flex justify-end gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors" onClick={() => setSelectedBooking(booking)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-2xl bg-white border-none shadow-2xl rounded-3xl p-0 overflow-hidden">
                                                        <DialogHeader className="sr-only">
                                                            <DialogTitle>{booking.name}</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="h-1.5 w-full bg-blue-600" />
                                                        <div className="p-8 space-y-6 text-gray-900">
                                                            <div className="flex justify-between items-start">
                                                                <div>
                                                                    <h2 className="text-2xl font-black text-gray-900">{booking.name}</h2>
                                                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Archive ID: #{booking.id.slice(0, 8)}</p>
                                                                </div>
                                                                <Badge className={getStatusColor(booking.status) + " px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border-none"}>
                                                                    {booking.status}
                                                                </Badge>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-8">
                                                                <div className="space-y-6">
                                                                    <div className="space-y-3">
                                                                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deployment Node</h3>
                                                                        <div className="space-y-2">
                                                                            <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                                                                <MapPin className="h-4 w-4 text-blue-500" /> {booking.address}
                                                                            </div>
                                                                            <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                                                                <Calendar className="h-4 w-4 text-blue-500" /> {format(new Date(booking.service_date), 'PPP')}
                                                                            </div>
                                                                            <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                                                                <Clock className="h-4 w-4 text-blue-500" /> {booking.service_time}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-3">
                                                                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Protocol Instructions</h3>
                                                                        <p className="text-sm bg-gray-50 p-4 rounded-2xl font-medium border border-gray-100 italic">
                                                                            {booking.special_instructions || "No custom protocols defined for this deployment."}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className="space-y-6">
                                                                    <div className="space-y-3">
                                                                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Command Center</h3>
                                                                        <div className="space-y-2">
                                                                            <label className="text-xs font-bold text-gray-500 ml-1">Update Status</label>
                                                                            <Select
                                                                                value={selectedBooking?.status}
                                                                                onValueChange={(status) => setSelectedBooking(prev => prev ? { ...prev, status } : null)}
                                                                            >
                                                                                <SelectTrigger className="rounded-xl border-gray-100 bg-gray-50 font-bold text-sm">
                                                                                    <SelectValue />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectItem value="pending">Pending</SelectItem>
                                                                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                                                                    <SelectItem value="in_progress">Executing</SelectItem>
                                                                                    <SelectItem value="completed">Archived</SelectItem>
                                                                                    <SelectItem value="cancelled">Aborted</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <label className="text-xs font-bold text-gray-500 ml-1">Internal Log</label>
                                                                            <Textarea
                                                                                className="rounded-2xl border-gray-100 bg-gray-50 min-h-[100px] text-sm"
                                                                                defaultValue={selectedBooking?.admin_notes || ''}
                                                                                onBlur={(e) => setSelectedBooking(prev => prev ? { ...prev, admin_notes: e.target.value } : null)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex gap-4 pt-4">
                                                                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl h-12 shadow-lg shadow-blue-500/20 uppercase tracking-widest text-[10px]"
                                                                    onClick={() => {
                                                                        if (selectedBooking) {
                                                                            updateBookingStatus(selectedBooking.id, selectedBooking.status, selectedBooking.admin_notes || '');
                                                                        }
                                                                    }}
                                                                >
                                                                    Submit State Change
                                                                </Button>
                                                                <Button variant="outline" className="h-12 border-gray-100 font-bold rounded-2xl px-6" onClick={() => window.open(`mailto:${selectedBooking?.email}`)}>
                                                                    <Mail className="h-4 w-4" />
                                                                </Button>
                                                                <Button variant="outline" className="h-12 border-gray-100 font-bold rounded-2xl px-6 text-red-500 hover:bg-red-50 hover:border-red-100" onClick={() => deleteBooking(booking.id)}>
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors" onClick={() => deleteBooking(booking.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredBookings.length === 0 && (
                            <div className="p-20 text-center text-gray-400 font-medium">
                                No archived bookings detected in current nexus.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
