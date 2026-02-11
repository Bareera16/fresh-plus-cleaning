"use client";
import { TopBar } from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Settings, Shield, Bell, Zap, Database, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
    return (
        <div className="flex flex-col h-full bg-[#f8fafc]">
            <TopBar
                title="Nexus System Configuration"
                subtitle="Calibrate operational parameters and security protocols."
            />

            <div className="p-8 space-y-8 flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
                            <CardHeader className="bg-white border-b border-gray-50 flex flex-row items-center justify-between p-8">
                                <div>
                                    <CardTitle className="text-xl font-black uppercase tracking-tighter">Identity Protocol</CardTitle>
                                    <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Update your admin credentials</p>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-xl font-bold text-[10px] uppercase tracking-widest">Reset Vault</Button>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6 bg-white">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Admin Designation</label>
                                        <Input className="rounded-2xl border-gray-100 bg-gray-50 h-12 font-bold" defaultValue="System Administrator" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Secure Email</label>
                                        <Input className="rounded-2xl border-gray-100 bg-gray-50 h-12 font-bold" defaultValue="infofreshplusclean@gmail.com" />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-12 h-12 rounded-2xl shadow-xl shadow-blue-500/10 uppercase tracking-[.2em] text-[10px]">
                                        Commit Changes
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
                            <CardHeader className="bg-white border-b border-gray-50 p-8">
                                <CardTitle className="text-xl font-black uppercase tracking-tighter">Security Matrix</CardTitle>
                                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Multi-factor authentication and vault protection</p>
                            </CardHeader>
                            <CardContent className="p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { icon: Shield, label: 'Encrypted Vault', status: 'Stable', color: 'text-emerald-500' },
                                    { icon: Bell, label: 'Atomic Alerts', status: 'Active', color: 'text-blue-500' },
                                    { icon: Database, label: 'Cloud Sync', status: 'Optimal', color: 'text-purple-500' },
                                    { icon: Globe, label: 'Nexus Edge', status: 'Global', color: 'text-amber-500' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100/50 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
                                        <div className={`p-3 rounded-xl bg-white shadow-sm ${item.color}`}>
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-900">{item.label}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card className="border-none shadow-sm rounded-3xl bg-gray-900 text-white p-8 relative overflow-hidden group">
                            <Zap className="absolute -right-8 -bottom-8 h-40 w-40 text-blue-500 opacity-20 group-hover:scale-110 transition-transform duration-500" />
                            <div className="relative z-10 space-y-6">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[.3em] text-blue-400">System State</p>
                                    <h3 className="text-3xl font-black leading-none">V2.4 Nexus</h3>
                                </div>
                                <div className="space-y-4 pt-4 border-t border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold opacity-60">Database Integrity</span>
                                        <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase">100%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold opacity-60">API Synchronization</span>
                                        <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase">Optimal</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold opacity-60">Atomic Broadcast</span>
                                        <span className="text-[10px] font-black bg-blue-500 text-white px-2 py-0.5 rounded-full uppercase">Live</span>
                                    </div>
                                </div>
                                <p className="text-[10px] font-medium opacity-40 italic pt-4">Nexus build hash: #ff042x99281-auth-v2</p>
                            </div>
                        </Card>

                        <Card className="border-none shadow-sm rounded-3xl bg-white p-8 space-y-4">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Protocol Support</h4>
                            <p className="text-xs font-medium text-gray-600 leading-relaxed">Need technical assistance with the Nexus dashboard? Our systems engineers are standing by.</p>
                            <Button variant="outline" className="w-full h-12 rounded-2xl border-gray-100 font-black text-[10px] uppercase tracking-widest">Request System Support</Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
