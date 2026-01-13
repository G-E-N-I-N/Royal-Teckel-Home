import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function ContactForm() {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [serverMailResponse, setServerMailResponse] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setServerMailResponse('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const responseData = await res.json();
                setSubmitStatus('success');
                setServerMailResponse(responseData?.message);
            } else {
                const errorData = await res.json();
                setSubmitStatus('error');
                setServerMailResponse(errorData?.error || 'Une erreur inattendue est survenue.');
            }
        } catch(error) {
            console.error(error);
            setSubmitStatus('error');
            setServerMailResponse('Problème de connexion. Veuillez réessayer plus tard.');
        } finally {
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
            setIsLoading(false);
            setTimeout(() => setSubmitStatus('idle'), 5000)
        }
    };

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com/puppremium', label: 'Facebook' },
        { icon: Instagram, href: 'https://instagram.com/puppremium', label: 'Instagram' },
        { icon: Twitter, href: 'https://twitter.com/puppremium', label: 'Twitter' },
        { icon: Linkedin, href: 'https://linkedin.com/company/puppremium', label: 'LinkedIn' },
    ];

    return (
        <section id="contact" className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                        {t('contact.title')}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card rounded-2xl p-6 md:p-8 shadow-card"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t('contact.name')}</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder={t('contact.namePlaceholder')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t('contact.email')}</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        placeholder={t('contact.emailPlaceholder')}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">{t('contact.phone')}</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder={t('contact.phonePlaceholder')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">{t('contact.subject')}</Label>
                                    <Input
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                        placeholder={t('contact.subjectPlaceholder')}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">{t('contact.message')}</Label>
                                <Textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows={5}
                                    placeholder={t('contact.messagePlaceholder')}
                                />
                            </div>
                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-[#9ece6a]/20 border border-[#9ece6a]/30 rounded-lg"
                                >
                                    <div className="text-[#9ece6a] font-mono text-sm">
                                        ✓ Message envoyé avec succès ! Je vous répondrai rapidement.
                                    </div>
                                </motion.div>
                            )}
                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-destructive/20 border border-destructive/30 rounded-lg"
                                >
                                    <div className="text-destructive font-mono text-sm">
                                        { serverMailResponse }<br />
                                        <br /> ✗ Erreur lors de l\'envoi. Veuillez réessayer ou me contacter directement.
                                    </div>
                                </motion.div>
                            )}

                            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    t('common.loading')
                                ) : (
                                    <>
                                        <Send className="mr-2 h-5 w-5" />
                                        {t('contact.send')}
                                    </>
                                )}
                            </Button>
                        </form>
                    </motion.div>

                    {/* Contact Info & Social */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Contact Info */}
                        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
                            <h3 className="font-display text-xl font-semibold mb-6">
                                {t('contact.info')}
                            </h3>
                            <div className="space-y-4">
                                <a
                                    href="mailto:contact@puppremium.com"
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{t('footer.email')}</p>
                                        <p className="font-medium">contact@puppremium.com</p>
                                    </div>
                                </a>
                                <a
                                    href="tel:+1234567890"
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Phone className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{t('footer.phone')}</p>
                                        <p className="font-medium">+1 (234) 567-890</p>
                                    </div>
                                </a>
                                <div className="flex items-center gap-4 p-3 rounded-lg">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{t('footer.address')}</p>
                                        <p className="font-medium">New York, USA / Paris, France</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
                            <h3 className="font-display text-xl font-semibold mb-6">
                                {t('contact.followUs')}
                            </h3>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                                    >
                                        <social.icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                                        <span className="sr-only">{social.label}</span>
                                    </a>
                                ))}
                            </div>
                            <p className="mt-6 text-muted-foreground text-sm">
                                {t('contact.socialDescription')}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
