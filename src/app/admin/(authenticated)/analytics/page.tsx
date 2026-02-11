"use client";
import { TopBar } from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp, BarChart3, PieChart, LineChart, Zap, Activity, Globe, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col h-full bg-[#f8fafc]">
            <TopBar
                title="Intel Analytics & Forecast"
                subtitle="Historical data analysis and predictive growth modeling."
            />

            <div className="p-8 space-y-8 flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Conversion Factor', value: '18.4%', icon: MousePointer2, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Atomic Revenue', value: '$84.2K', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Nexus Traffic', value: '42.1K', icon: Globe, color: 'text-purple-600', bg: 'bg-purple-50' },
                        { label: 'System Load', value: '0.04ms', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' }
                    ].map((stat, i) => (
                        <Card key={i} className="border-none shadow-sm p-6 rounded-2xl bg-white group hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                    <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                        <CardHeader className="p-8 border-b border-gray-50 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black uppercase tracking-tighter">Growth Matrix</CardTitle>
                                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Real-time revenue synchronization</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest bg-gray-50">30 Days</Button>
                                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest">90 Days</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-12 h-80 flex flex-col items-center justify-center space-y-4">
                            <BarChart3 className="h-16 w-16 text-gray-100 animate-pulse" />
                            <p className="text-xs font-black text-gray-300 uppercase tracking-[.3em]">Visualization Engine Booting...</p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                        <CardHeader className="p-8 border-b border-gray-50">
                            <CardTitle className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            {[
                                { label: 'End of Lease', value: 45, color: 'bg-blue-500' },
                                { label: 'Deep Cleaning', value: 28, color: 'bg-emerald-500' },
                                { label: 'Residential', value: 18, color: 'bg-purple-500' },
                                { label: 'Other Protocols', value: 9, color: 'bg-amber-500' }
                            ].map((service, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-600">
                                        <span>{service.label}</span>
                                        <span>{service.value}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                        <div className={`h-full ${service.color} transition-all duration-1000`} style={{ width: `${service.value}%` }} />
                                    </div>
                                </div>
                            ))}
                            <div className="pt-4">
                                <Button className="w-full bg-gray-900 hover:bg-black text-white font-black h-12 rounded-2xl shadow-xl shadow-gray-200 uppercase tracking-[.2em] text-[10px]">
                                    Download Intel PDF
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-sm rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden group">
                    <Zap className="absolute -right-4 -top-4 h-32 w-32 opacity-10 group-hover:scale-110 transition-transform" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 text-center md:text-left">
                            <h3 className="text-2xl font-black uppercase tracking-tighter">AI Prediction Pulse</h3>
                            <p className="text-sm font-medium opacity-80">Our predictive algorithm suggests a 14% increase in booking volume for the upcoming cycle.</p>
                        </div>
                        <Button className="bg-white text-blue-600 hover:bg-gray-100 font-black px-8 h-12 rounded-2xl shadow-lg border-none uppercase tracking-widest text-[10px] whitespace-nowrap">
                            View Forecast Matrix
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
