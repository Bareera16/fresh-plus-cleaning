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
    DollarSign,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Trash2,
    Eye,
    Search,
    Filter,
    Send,
    Zap,
    ArrowUpDown,
    ExternalLink,
    ChevronRight,
    ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { getServiceDisplayName } from '@/lib/serviceMapping';
import { TopBar } from '@/components/admin/AdminLayout';

interface Quote {
    id: string;
    name: string;
    address: string;
    city: string;
    postcode: string;
    phone1: string;
    phone2: string | null;
    email: string;
    property_type: string | null;
    services: string[];
    preferred_date: string | null;
    job_description: string | null;
    status: string;
    admin_notes: string | null;
    quote_amount: number | null;
    assigned_to: string | null;
    created_at: string;
}

export default function QuotesPage() {
    const router = useRouter();
    const { user } = useAdminAuth();
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        loadQuotes();
    }, []);

    useEffect(() => {
        filterQuotes();
    }, [quotes, searchTerm, statusFilter]);

    const loadQuotes = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('quotes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setQuotes(data || []);
        } catch (error) {
            console.error('Error loading quotes:', error);
            toast.error('Failed to load quotes');
        } finally {
            setIsLoading(false);
        }
    };

    const filterQuotes = () => {
        let filtered = quotes;

        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(quote =>
                quote.name.toLowerCase().includes(search) ||
                quote.email.toLowerCase().includes(search) ||
                quote.address.toLowerCase().includes(search)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(quote => quote.status === statusFilter);
        }

        setFilteredQuotes(filtered);
    };

    const updateQuote = async (quoteId: string, updates: Partial<Quote>) => {
        try {
            const { error } = await supabase
                .from('quotes')
                .update({
                    ...updates,
                    updated_at: new Date().toISOString()
                })
                .eq('id', quoteId);

            if (error) throw error;

            toast.success('Sync: Quote protocol updated');
            loadQuotes();
        } catch (error) {
            toast.error('Sync Error: Update failure');
        }
    };

    const deleteQuote = async (quoteId: string) => {
        if (!confirm('Purge Confirmation: Permanently remove this quote from nexus?')) return;

        try {
            const { error } = await supabase
                .from('quotes')
                .delete()
                .eq('id', quoteId);

            if (error) throw error;

            toast.success('Purge: Record removed from core');
            loadQuotes();
        } catch (error) {
            toast.error('Purge Failed: Database error');
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'pending': return { color: 'bg-amber-100 text-amber-700', label: 'Processing' };
            case 'contacted': return { color: 'bg-blue-100 text-blue-700', label: 'Engaged' };
            case 'quoted': return { color: 'bg-purple-100 text-purple-700', label: 'Valuated' };
            case 'accepted': return { color: 'bg-emerald-100 text-emerald-700', label: 'Confirmed' };
            case 'completed': return { color: 'bg-emerald-100 text-emerald-700', label: 'Archived' };
            case 'cancelled': return { color: 'bg-red-100 text-red-700', label: 'Aborted' };
            default: return { color: 'bg-gray-100 text-gray-700', label: status };
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc]">
            <TopBar
                title="Quote Valuation Console"
                subtitle="Manage custom service requests and price estimations."
            />

            <div className="p-8 space-y-6 flex-1 overflow-y-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search lead nexus..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white border-gray-200 focus:ring-purple-500/20 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-40 rounded-xl bg-white border-gray-200">
                                <SelectValue placeholder="Lead State" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Full Spectrum</SelectItem>
                                <SelectItem value="pending">Processing</SelectItem>
                                <SelectItem value="contacted">Engaged</SelectItem>
                                <SelectItem value="quoted">Valuated</SelectItem>
                                <SelectItem value="accepted">Confirmed</SelectItem>
                                <SelectItem value="cancelled">Aborted</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={loadQuotes} variant="outline" className="rounded-xl border-gray-200 bg-white">
                            Refresh
                        </Button>
                    </div>
                </div>

                <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-white">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-gray-50/50">
                                <TableRow className="border-gray-100">
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest px-6">Requester</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Service Matrix</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Valuation</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Node State</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-6">Command</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredQuotes.map((quote) => {
                                    const status = getStatusConfig(quote.status);
                                    return (
                                        <TableRow key={quote.id} className="border-gray-50 hover:bg-gray-50/50 group">
                                            <TableCell className="px-6 py-4">
                                                <div className="space-y-0.5">
                                                    <p className="font-bold text-sm text-gray-900">{quote.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{quote.email}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {quote.services.slice(0, 2).map((s, i) => (
                                                        <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-600 border-none text-[9px] font-black uppercase px-2 py-0">
                                                            {getServiceDisplayName(s)}
                                                        </Badge>
                                                    ))}
                                                    {quote.services.length > 2 && <span className="text-[9px] font-black text-gray-400">+{quote.services.length - 2}</span>}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {quote.quote_amount ? (
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                        <p className="text-sm font-black text-emerald-600">${quote.quote_amount}</p>
                                                    </div>
                                                ) : (
                                                    <p className="text-[10px] font-black text-gray-300 uppercase italic">Pending Entry</p>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge className={status.color + " border px-2 py-0 text-[10px] font-black uppercase tracking-wider"}>
                                                    {status.label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right px-6">
                                                <div className="flex justify-end gap-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-purple-50 hover:text-purple-600">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-2xl bg-white border-none shadow-2xl rounded-3xl p-0 overflow-hidden">
                                                            <DialogHeader className="sr-only">
                                                                <DialogTitle>{quote.name}</DialogTitle>
                                                            </DialogHeader>
                                                            <div className="h-1.5 w-full bg-purple-600" />
                                                            <div className="p-8 space-y-6">
                                                                <div className="flex justify-between items-start">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                                                                            <DollarSign className="h-6 w-6" />
                                                                        </div>
                                                                        <div>
                                                                            <h2 className="text-2xl font-black text-gray-900">{quote.name}</h2>
                                                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Custom Valuation Protocol</p>
                                                                        </div>
                                                                    </div>
                                                                    <Badge className={status.color + " px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-none"}>
                                                                        {status.label}
                                                                    </Badge>
                                                                </div>

                                                                <div className="grid grid-cols-2 gap-8">
                                                                    <div className="space-y-6">
                                                                        <div className="space-y-3">
                                                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lead Source</h3>
                                                                            <div className="space-y-2">
                                                                                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                                                                    <Mail className="h-4 w-4 text-purple-500" /> {quote.email}
                                                                                </div>
                                                                                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                                                                    <Phone className="h-4 w-4 text-purple-500" /> {quote.phone1}
                                                                                </div>
                                                                                <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                                                                                    <MapPin className="h-4 w-4 text-purple-500" /> {quote.address}, {quote.city}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                                                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Protocol Instructions</h3>
                                                                            <p className="text-sm font-medium text-gray-600 italic">
                                                                                "{quote.job_description || "System: No custom instructions detected."}"
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-6">
                                                                        <div className="space-y-4">
                                                                            <div className="space-y-2">
                                                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Update Valuation</label>
                                                                                <div className="relative">
                                                                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                                                    <Input
                                                                                        type="number"
                                                                                        className="pl-9 rounded-xl border-gray-100 bg-gray-50 font-black text-sm"
                                                                                        defaultValue={quote.quote_amount || ''}
                                                                                        onBlur={(e) => updateQuote(quote.id, { quote_amount: parseFloat(e.target.value) || null })}
                                                                                    />
                                                                                </div>
                                                                            </div>

                                                                            <div className="space-y-2">
                                                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lead State</label>
                                                                                <Select
                                                                                    value={quote.status}
                                                                                    onValueChange={(s) => updateQuote(quote.id, { status: s })}
                                                                                >
                                                                                    <SelectTrigger className="rounded-xl border-gray-100 bg-gray-50 font-bold text-sm">
                                                                                        <SelectValue />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent>
                                                                                        <SelectItem value="pending">Processing</SelectItem>
                                                                                        <SelectItem value="contacted">Engaged</SelectItem>
                                                                                        <SelectItem value="quoted">Valuated</SelectItem>
                                                                                        <SelectItem value="accepted">Confirmed</SelectItem>
                                                                                        <SelectItem value="cancelled">Aborted</SelectItem>
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="flex gap-4 pt-2">
                                                                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl h-12 shadow-lg shadow-purple-500/20 uppercase tracking-widest text-[10px]"
                                                                        onClick={() => {
                                                                            const subject = `FreshPlus Cleaning Quote - ${quote.name}`;
                                                                            const body = `Hi ${quote.name},\n\nWe have reviewed your request for ${quote.services.map(s => getServiceDisplayName(s)).join(', ')}.\n\nYour custom quote is $${quote.quote_amount || 'TBD'}.\n\nPlease let us know if you wish to proceed.`;
                                                                            window.open(`mailto:${quote.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                                                                        }}
                                                                    >
                                                                        Transmit Valuation
                                                                    </Button>
                                                                    <Button variant="outline" className="h-12 w-12 border-gray-100 font-bold rounded-2xl text-red-500 hover:bg-red-50 hover:border-red-100" onClick={() => deleteQuote(quote.id)}>
                                                                        <Trash2 className="h-5 w-5" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {filteredQuotes.length === 0 && (
                            <div className="p-20 text-center text-gray-400 font-medium">
                                No lead valuations detected in core repository.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
