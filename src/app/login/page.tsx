'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Dog, AlertCircle, Info } from 'lucide-react';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    const { t } = useTranslation();
    const router = useRouter();
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
            callbackUrl: '/admin',
        });

        setLoading(false);

        if (!res) {
            toast({
                title: t('common.error'),
                description: t('auth.unknownError'),
                variant: 'destructive',
            });
            return;
        }

        if (res.error) {
            toast({
                title: t('common.error'),
                description: t('auth.invalidCredentials'),
                variant: 'destructive',
            });
            return;
        }
        router.push(res.url ?? '/admin');
    };

    return (
        <div className="min-h-[90vh] mt-15 flex items-center justify-center py-12 px-4">
            <div
                className="fixed right-8 bottom-4 text-sm md:text-xl z-99 text-white/8 font-[Great_Vibes] select-none"
                style={{
                    transform: 'rotate(-5deg)',
                    whiteSpace: 'nowrap',
                }}
            >
                l0rd_9h057
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-6"
            >
                <Card className="shadow-card">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <Dog className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle className="font-display text-2xl">
                            {t('auth.adminLogin')}
                        </CardTitle>
                        <CardDescription>
                            {t('auth.adminLoginDescription')}
                        </CardDescription>
                    </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">{t('auth.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">{t('auth.password')}</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? t('common.loading') : t('auth.login')}
                        </Button>
                    </form>
                </CardContent>
                </Card>

                <Alert className="bg-muted/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs text-muted-foreground">
                    {t('auth.securityNotice')}
                </AlertDescription>
                </Alert>
            </motion.div>
        </div>
    );
};

export default Login;
