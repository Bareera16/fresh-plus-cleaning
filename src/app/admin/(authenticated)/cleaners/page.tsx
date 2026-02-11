"use client";
import { TopBar } from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Users, ShieldCheck, Zap, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CleanersPage() {
    return (
        <div className="flex flex-col h-full bg-[#f8fafc]">
            <TopBar
                title="Workforce Management"
                subtitle="Manage your team of certified cleaners and field technicians."
            />

            <div className="p-8 space-y-8 flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-none shadow-sm bg-blue-600 text-white p-6 rounded-2xl relative overflow-hidden group">
                        <ShieldCheck className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10 group-hover:scale-110 transition-transform" />
                        <div className="relative z-10 space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[.25em] opacity-80">Operational</p>
                            <h3 className="text-3xl font-black">12 Active</h3>
                            <p className="text-sm font-medium opacity-90">Systems online and tracked.</p>
                        </div>
                    </Card>

                    <Card className="border-none shadow-sm bg-white p-6 rounded-2xl border-l-4 border-l-emerald-500">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[.25em]">Efficiency</p>
                            <h3 className="text-3xl font-black text-gray-900">94.2%</h3>
                            <p className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                                <Activity className="h-4 w-4" /> Optimal Performance
                            </p>
                        </div>
                    </Card>

                    <Card className="border-none shadow-sm bg-white p-6 rounded-2xl border-l-4 border-l-purple-500">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[.25em]">Lead Generation</p>
                            <h3 className="text-3xl font-black text-gray-900">4 En-route</h3>
                            <p className="text-sm font-bold text-purple-600 flex items-center gap-1">
                                <Zap className="h-4 w-4" /> Real-time Tracking
                            </p>
                        </div>
                    </Card>
                </div>

                <Card className="border-none shadow-sm rounded-3xl bg-white p-20 text-center space-y-6">
                    <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-gray-100">
                        <Users className="h-10 w-10 text-gray-300" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Workforce Database Synchronizing</h2>
                        <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Version 2.0 Deployment in progress</p>
                    </div>
                    <div className="max-w-md mx-auto p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <p className="text-xs font-medium text-blue-700 leading-relaxed italic">
                            "Our specialized workforce management module is currently being optimized for high-performance scheduling. Full employee portal integration will be available in the next cycle."
                        </p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 h-12 rounded-2xl shadow-xl shadow-blue-500/20 uppercase tracking-[.2em] text-[10px]">
                        Authorize Manual Entry
                    </Button>
                </Card>
            </div>
        </div>
    );
}
