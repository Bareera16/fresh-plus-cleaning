"use client";
import { TopBar } from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CustomersPage() {
    return (
        <div className="flex flex-col h-full bg-[#f8fafc]">
            <TopBar
                title="Client Relations Nexus"
                subtitle="Manage historical data and retention protocols for your clientele."
            />

            <div className="p-8 space-y-8 flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="border-none shadow-sm bg-white p-6 rounded-2xl border-b-2 border-b-blue-600">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Nodes</p>
                            <h3 className="text-3xl font-black text-gray-900">1,284</h3>
                        </div>
                    </Card>

                    <Card className="border-none shadow-sm bg-white p-6 rounded-2xl border-b-2 border-b-emerald-600">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Growth</p>
                            <h3 className="text-3xl font-black text-emerald-600">+12%</h3>
                        </div>
                    </Card>

                    <Card className="border-none shadow-sm bg-white p-6 rounded-2xl border-b-2 border-b-purple-600">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Retention</p>
                            <h3 className="text-3xl font-black text-purple-600">88.4%</h3>
                        </div>
                    </Card>

                    <Card className="border-none shadow-sm bg-white p-6 rounded-2xl border-b-2 border-b-pink-600">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">LTV (Avg)</p>
                            <h3 className="text-3xl font-black text-pink-600">$420</h3>
                        </div>
                    </Card>
                </div>

                <Card className="border-none shadow-sm rounded-3xl bg-white p-20 text-center space-y-6">
                    <div className="h-24 w-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto transition-transform hover:scale-110 duration-500">
                        <Heart className="h-10 w-10 text-pink-500 fill-pink-500" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">CRM Nexus Initialization</h2>
                        <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Customer Lifecycle Engine online</p>
                    </div>
                    <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center">
                            <ShieldCheck className="h-5 w-5 text-emerald-500 mb-2" />
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Data Secure</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center">
                            <Zap className="h-5 w-5 text-amber-500 mb-2" />
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">AI Insights</p>
                        </div>
                    </div>
                    <Button className="bg-gray-900 hover:bg-black text-white font-black px-10 h-12 rounded-2xl shadow-xl shadow-gray-200 uppercase tracking-[.2em] text-[10px]">
                        Access CRM Database
                    </Button>
                </Card>
            </div>
        </div>
    );
}
