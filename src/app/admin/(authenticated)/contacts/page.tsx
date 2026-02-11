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
    MessageSquare,
    Phone,
    Mail,
    Trash2,
    Eye,
    Search,
    Filter,
    Reply,
    CheckCircle,
    Zap,
    MoreHorizontal,
    Archive,
    Star
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { TopBar } from '@/components/admin/AdminLayout';

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    status: string;
    admin_notes: string | null;
    replied_by: string | null;
    reply_sent_at: string | null;
    created_at: string;
}

export default function ContactsPage() {
    const router = useRouter();
    const { user } = useAdminAuth();
    const [contacts, setContacts] = useState<ContactMessage[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        loadContacts();
    }, []);

    useEffect(() => {
        filterContacts();
    }, [contacts, searchTerm, statusFilter]);

    const loadContacts = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setContacts(data || []);
        } catch (error) {
            console.error('Error loading contact messages:', error);
            toast.error('Failed to load contact messages');
        } finally {
            setIsLoading(false);
        }
    };

    const filterContacts = () => {
        let filtered = contacts;

        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(contact =>
                contact.name.toLowerCase().includes(search) ||
                contact.email.toLowerCase().includes(search) ||
                contact.message.toLowerCase().includes(search)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(contact => contact.status === statusFilter);
        }

        setFilteredContacts(filtered);
    };

    const updateContactStatus = async (contactId: string, status: string, adminNotes?: string) => {
        try {
            const { error } = await supabase
                .from('contact_messages')
                .update({
                    status,
                    admin_notes: adminNotes,
                    updated_at: new Date().toISOString()
                })
                .eq('id', contactId);

            if (error) throw error;

            toast.success('Sync: Message state updated');
            loadContacts();
        } catch (error) {
            toast.error('Sync Error: Update failure');
        }
    };

    const markAsRead = async (contactId: string) => {
        await updateContactStatus(contactId, 'read');
    };

    const deleteContact = async (contactId: string) => {
        if (!confirm('Execute Purge: Permanently remove this message?')) return;

        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', contactId);

            if (error) throw error;

            toast.success('Purge: Record removed from core');
            loadContacts();
        } catch (error) {
            toast.error('Purge Failed: Database error');
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'unread': return { color: 'bg-red-100 text-red-700 font-black', label: 'Priority' };
            case 'read': return { color: 'bg-blue-100 text-blue-700', label: 'Reviewed' };
            case 'replied': return { color: 'bg-emerald-100 text-emerald-700', label: 'Resolved' };
            case 'archived': return { color: 'bg-gray-100 text-gray-700', label: 'Archived' };
            default: return { color: 'bg-gray-100 text-gray-700', label: status };
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc]">
            <TopBar
                title="Communication Hub"
                subtitle="Manage incoming inquiries and customer engagements."
            />

            <div className="p-8 space-y-6 flex-1 overflow-y-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search communication nexus..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white border-gray-200 focus:ring-blue-500/20 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-40 rounded-xl bg-white border-gray-200">
                                <SelectValue placeholder="Engagement State" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Full Spectrum</SelectItem>
                                <SelectItem value="unread">Priority (Unread)</SelectItem>
                                <SelectItem value="read">Reviewed</SelectItem>
                                <SelectItem value="replied">Resolved</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={loadContacts} variant="outline" className="rounded-xl border-gray-200 bg-white">
                            Synchronize
                        </Button>
                    </div>
                </div>

                <Card className="border-none shadow-sm overflow-hidden rounded-2xl bg-white">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-gray-50/50">
                                <TableRow className="border-gray-100">
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest px-6 w-1/4">Originator</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest w-1/3">Transmission Intel</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Temporal Log</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Node State</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right px-6">Command</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredContacts.map((contact) => {
                                    const status = getStatusConfig(contact.status);
                                    return (
                                        <TableRow key={contact.id} className={`border-gray-50 hover:bg-gray-50/50 group transition-colors ${contact.status === 'unread' ? 'bg-red-50/20' : ''}`}>
                                            <TableCell className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {contact.status === 'unread' && <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
                                                    <div className="space-y-0.5">
                                                        <p className="font-bold text-sm text-gray-900">{contact.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{contact.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-0.5">
                                                    <p className="text-xs font-bold text-gray-700 truncate max-w-[300px]">{contact.subject || 'No Transmission Subject'}</p>
                                                    <p className="text-[10px] text-gray-400 font-medium truncate max-w-[350px]">{contact.message}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-0.5">
                                                    <p className="text-xs font-bold text-gray-700">{format(new Date(contact.created_at), 'dd MMM yyyy')}</p>
                                                    <p className="text-[10px] text-gray-400 font-black uppercase">{format(new Date(contact.created_at), 'HH:mm:ss')}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge className={status.color + " border px-2 py-0 text-[10px] font-black uppercase tracking-wider border-none"}>
                                                    {status.label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right px-6">
                                                <div className="flex justify-end gap-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-emerald-50 hover:text-emerald-600" onClick={() => contact.status === 'unread' && markAsRead(contact.id)}>
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-2xl bg-white border-none shadow-2xl rounded-3xl p-0 overflow-hidden">
                                                            <DialogHeader className="sr-only">
                                                                <DialogTitle>{contact.name}</DialogTitle>
                                                            </DialogHeader>
                                                            <div className="h-1.5 w-full bg-blue-600" />
                                                            <div className="p-8 space-y-6">
                                                                <div className="flex justify-between items-start">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                                                            <MessageSquare className="h-6 w-6" />
                                                                        </div>
                                                                        <div>
                                                                            <h2 className="text-2xl font-black text-gray-900">{contact.name}</h2>
                                                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Transmission Decrypted</p>
                                                                        </div>
                                                                    </div>
                                                                    <Badge className={status.color + " px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-none"}>
                                                                        {status.label}
                                                                    </Badge>
                                                                </div>

                                                                <div className="space-y-6">
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                                                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Metadata</h3>
                                                                            <div className="space-y-1">
                                                                                <p className="text-sm font-bold text-gray-700 flex items-center gap-2"><Mail className="h-3 w-3 text-blue-500" /> {contact.email}</p>
                                                                                <p className="text-sm font-bold text-gray-700 flex items-center gap-2"><Phone className="h-3 w-3 text-blue-500" /> {contact.phone || "Not provided"}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                                                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time Log</h3>
                                                                            <p className="text-sm font-bold text-gray-700">{format(new Date(contact.created_at), 'PPPP')}</p>
                                                                            <p className="text-[10px] font-black text-gray-400 uppercase">{format(new Date(contact.created_at), 'p')}</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-3">
                                                                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Transmission Content</h3>
                                                                        <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100 relative">
                                                                            <p className="text-sm font-bold text-blue-900 border-b border-blue-100 pb-2 mb-3">Sub: {contact.subject || "N/A"}</p>
                                                                            <p className="text-sm font-medium text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                                                {contact.message}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-3">
                                                                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">System Operation</h3>
                                                                        <div className="flex gap-4">
                                                                            <Select value={contact.status} onValueChange={(s) => updateContactStatus(contact.id, s)}>
                                                                                <SelectTrigger className="rounded-xl border-gray-100 bg-gray-50 font-bold text-sm h-12 flex-1">
                                                                                    <SelectValue placeholder="Engagement State" />
                                                                                </SelectTrigger>
                                                                                <SelectContent className="rounded-xl border-none shadow-2xl">
                                                                                    <SelectItem value="unread">Mark Priority</SelectItem>
                                                                                    <SelectItem value="read">Mark Reviewed</SelectItem>
                                                                                    <SelectItem value="replied">Mark Resolved</SelectItem>
                                                                                    <SelectItem value="archived">Mark Archived</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                            <Button variant="outline" className="h-12 px-6 rounded-xl border-gray-100 font-bold text-xs uppercase tracking-widest bg-white"
                                                                                onClick={() => {
                                                                                    const subject = `Re: ${contact.subject || 'FreshPlus Cleaning Inquiry'}`;
                                                                                    window.open(`mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=Dear ${contact.name},`);
                                                                                    updateContactStatus(contact.id, 'replied');
                                                                                }}
                                                                            >
                                                                                Execute Reply <Reply className="ml-2 h-4 w-4" />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="flex gap-4 pt-2">
                                                                    <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 h-10 px-4 rounded-xl" onClick={() => deleteContact(contact.id)}>
                                                                        Purge Message
                                                                    </Button>
                                                                    <div className="flex-1" />
                                                                    <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-gray-50">
                                                                        <Star className="h-4 w-4 text-gray-300" />
                                                                    </Button>
                                                                    <Button variant="outline" className="h-10 px-6 rounded-xl border-gray-100 font-bold text-xs uppercase tracking-widest" onClick={() => updateContactStatus(contact.id, 'archived')}>
                                                                        Archive <Archive className="ml-2 h-4 w-4" />
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
                        {filteredContacts.length === 0 && (
                            <div className="p-20 text-center text-gray-400 font-medium">
                                No communication transmissions detected in current nexus.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
