'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Database, Mail, ShieldCheck, DollarSign } from 'lucide-react';

export default function TestConnectionPage() {
    const [status, setStatus] = useState<{
        supabase: 'loading' | 'success' | 'error';
        contactCount: number | null;
        quoteCount: number | null;
        recentMessages: any[];
        recentQuotes: any[];
        error: string | null;
    }>({
        supabase: 'loading',
        contactCount: null,
        quoteCount: null,
        recentMessages: [],
        recentQuotes: [],
        error: null,
    });

    async function checkConnection() {
        try {
            // 1. Fetch Contact Messages
            const { data: contacts, count: cCount, error: cError } = await supabase
                .from('contact_messages')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .limit(5);

            if (cError) throw cError;

            // 2. Fetch Instant Quotes/Bookings
            const { data: quotes, count: qCount, error: qError } = await supabase
                .from('instant_bookings')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .limit(5);

            if (qError) throw qError;

            setStatus({
                supabase: 'success',
                contactCount: cCount,
                quoteCount: qCount,
                recentMessages: contacts || [],
                recentQuotes: quotes || [],
                error: null,
            });
        } catch (err: any) {
            console.error('Connection test failed:', err);
            setStatus(prev => ({
                ...prev,
                supabase: 'error',
                error: err.message,
            }));
        }
    }

    useEffect(() => {
        checkConnection();
        // Refresh every 10 seconds automatically
        const interval = setInterval(checkConnection, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8 pt-24 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Integration Tester</h1>
                        <p className="text-gray-500 text-sm">Real-time backend verification (Updates every 10s)</p>
                    </div>
                    <button
                        onClick={() => checkConnection()}
                        className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                        Refresh Now
                    </button>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                    {/* Supabase Status */}
                    <Card className="border-t-4 border-t-green-500 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between">
                                Database
                                <Database className="h-4 w-4 text-gray-300" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {status.supabase === 'loading' ? (
                                <div className="animate-pulse h-6 bg-gray-200 rounded"></div>
                            ) : status.supabase === 'success' ? (
                                <div className="flex items-center text-green-600 font-bold text-lg gap-2">
                                    <CheckCircle2 className="h-5 w-5" /> Connected
                                </div>
                            ) : (
                                <div className="flex items-center text-red-600 font-bold text-lg gap-2">
                                    <XCircle className="h-5 w-5" /> Offline
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Contact Count */}
                    <Card className="border-t-4 border-t-blue-500 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between">
                                Contacts
                                <Mail className="h-4 w-4 text-gray-300" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black text-blue-600">
                                {status.contactCount !== null ? status.contactCount : '--'}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quote Count */}
                    <Card className="border-t-4 border-t-purple-500 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between">
                                Quotes
                                <DollarSign className="h-4 w-4 text-gray-300" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black text-purple-600">
                                {status.quoteCount !== null ? status.quoteCount : '--'}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Status */}
                    <Card className="border-t-4 border-t-amber-500 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between">
                                Bot Protection
                                <ShieldCheck className="h-4 w-4 text-gray-300" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-amber-600 font-bold text-lg">
                                reCAPTCHA v3
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Quotes Table */}
                    <Card className="shadow-md overflow-hidden">
                        <CardHeader className="bg-white border-b">
                            <CardTitle className="text-base font-bold text-purple-700">Live Instant Quotes</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {status.recentQuotes.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                                            <tr>
                                                <th className="px-4 py-3">Customer</th>
                                                <th className="px-4 py-3">Service</th>
                                                <th className="px-4 py-3">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {status.recentQuotes.map((quote, i) => (
                                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <span className="font-semibold text-gray-900">{quote.first_name} {quote.last_name}</span>
                                                        <div className="text-[10px] text-gray-400">{new Date(quote.created_at).toLocaleTimeString()}</div>
                                                    </td>
                                                    <td className="px-4 py-3 italic text-gray-600 text-xs">{quote.service_name}</td>
                                                    <td className="px-4 py-3 font-bold text-green-600">${quote.final_price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-400 italic text-sm">
                                    No quotes found yet.
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Data Table */}
                    <Card className="shadow-md overflow-hidden">
                        <CardHeader className="bg-white border-b">
                            <CardTitle className="text-base font-bold text-blue-700">Live Contact Messages</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {status.recentMessages.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                                            <tr>
                                                <th className="px-4 py-3">Sender</th>
                                                <th className="px-4 py-3">Subject</th>
                                                <th className="px-4 py-3">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {status.recentMessages.map((msg, i) => (
                                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3 font-medium text-gray-900">
                                                        {msg.name}
                                                        <div className="text-[10px] text-gray-400 truncate max-w-[150px]">{msg.email}</div>
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-600 text-xs">{msg.subject}</td>
                                                    <td className="px-4 py-3 text-[10px] text-gray-400">
                                                        {new Date(msg.created_at).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-400 italic text-sm">
                                    No contact messages found.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-blue-600 p-6 rounded-2xl text-white flex items-center justify-between shadow-lg">
                    <div>
                        <h3 className="font-bold text-lg mb-1">Ready to report to client?</h3>
                        <p className="text-blue-100 text-sm">Perform a test on <strong>/get-quote</strong> and watch it appear here instantly.</p>
                    </div>
                    <div className="bg-white/20 px-4 py-2 rounded-xl border border-white/30 backdrop-blur-sm animate-pulse text-xs font-bold uppercase tracking-widest">
                        System Active
                    </div>
                </div>
            </div>
        </div>
    );
}
