"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/adminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { AlertCircle, Lock, Mail, Loader2, ShieldCheck, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login } = useAdminAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                toast.success('Access Granted - Synchronizing Dashboard...');
                router.push('/admin/dashboard');
            } else {
                setError(result.error || 'Unauthorized access. Please check your admin credentials.');
            }
        } catch (err) {
            setError('An encrypted nexus error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black p-4 relative overflow-hidden text-white font-sans">
            {/* Background patterns */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600 rounded-full blur-[128px] animate-pulse delay-1000" />
            </div>

            <div className="w-full max-w-md z-10">
                <div className="flex flex-col items-center mb-10 space-y-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-600 shadow-2xl shadow-blue-500/20 group hover:scale-110 transition-transform duration-500">
                        <ShieldCheck className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-black text-white tracking-tighter uppercase flex items-center justify-center gap-2">
                            FreshPlus <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Nexus</span>
                        </h1>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-[.25em] mt-1">Admin Control Center</p>
                    </div>
                </div>

                <Card className="border-none bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
                    <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 bg-[length:200%_100%] animate-[gradient_3s_linear_infinite]" />
                    <CardHeader className="space-y-1 pb-8">
                        <CardTitle className="text-xl font-bold text-white text-center">Secure Authentication</CardTitle>
                        <CardDescription className="text-gray-400 text-center text-xs">Enter your authorization protocol to continue</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4 px-8">
                            {error && (
                                <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 text-red-400 animate-shake mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className="text-xs font-bold">{error}</AlertDescription>
                                </Alert>
                            )}
                            <div className="space-y-2">
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder="Admin Identity (Email)"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10 h-10 bg-black/40 border-white/5 text-white placeholder:text-gray-600 focus:ring-blue-500/50 focus:border-blue-500 transition-all rounded-xl border"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500 group-focus-within:text-emerald-500 transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="Security Credential"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 h-10 bg-black/40 border-white/5 text-white placeholder:text-gray-600 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all rounded-xl border"
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-4 pb-8 flex flex-col space-y-4 px-8">
                            <Button
                                type="submit"
                                className="w-full h-11 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 group border-none"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        Initialize System
                                        <Zap className="h-4 w-4 group-hover:animate-bounce" />
                                    </div>
                                )}
                            </Button>
                            <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <span>Encryption: AES-256</span>
                                <span className="h-1 w-1 rounded-full bg-gray-500" />
                                <span>Status: Optimal</span>
                            </div>
                        </CardFooter>
                    </form>
                </Card>

                <div className="mt-8 text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} FreshPlus Cleaning Services Australia
                </div>
            </div>

            <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
        </div>
    );
}
