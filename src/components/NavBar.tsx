'use client'

import "@/i18n";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import { motion } from 'framer-motion';
import { Dog, Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useSession, signOut } from 'next-auth/react'

export function Navbar() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'fr';
    const pathname = usePathname() || '/';
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();
    const { data: session, status } = useSession()
    const user = null;
    const isAdmin = false;

    const toggleLanguage = () => {
        const next = i18n?.language === 'fr' ? 'en' : 'fr';
        if (i18n && typeof i18n.changeLanguage === 'function') {
            i18n.changeLanguage(next);
        } else {
            try { localStorage.setItem('i18nextLng', next); } catch {}
            window.location.reload();
        }
    };

    const navLinks = [
        { href: '/', label: t('nav.home') },
        { href: '/dogs', label: t('nav.dogs') },
        { href: '/about-us', label: t('nav.about') },
        ...(isAdmin ? [{ href: '/admin', label: t('nav.admin') }] : []),
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 left-0 right-0 z-50 glass-effect border-b border-border"
        >
            <div className="mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Dog className="h-8 w-8 text-primary" />
                        <span className="font-display text-xl md:text-2xl font-semibold">Royal Teckel Home</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative font-medium transition-colors hover:text-primary ${
                                isActive(link.href) ? 'text-primary' : 'text-foreground/80'
                                }`}
                            >
                                {link.label}
                                {isActive(link.href) && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Language Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleLanguage}
                            className="hidden sm:flex"
                            aria-label="Change language"
                            >
                            <Image
                                src={currentLang === 'fr' ? '/flags/fr.svg' : '/flags/us.svg'}
                                alt={currentLang === 'fr' ? 'Langue française' : 'English language'}
                                width={24}
                                height={24}
                                className="rounded-sm w-auto h-auto"
                            />
                            </Button>

                        {/* Theme Toggle */}
                        <Button variant="ghost" size="sm" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
                            {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>

                        {/* Auth Button */}
                        {session?.user ? (
                            <Button variant="outline" size="sm" onClick={() => signOut({callbackUrl: '/login',})} className="hidden sm:flex">
                                {t('nav.logout')}
                            </Button>
                        ) : (
                            <Button asChild variant="default" size="sm" className="hidden sm:flex">
                                <Link href="/login">{t('nav.login')}</Link>
                            </Button>
                        )}

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden border-t border-border bg-background"
                >
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block py-2 font-medium ${
                                isActive(link.href) ? 'text-primary' : 'text-foreground/80'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex items-center gap-4 pt-4 border-t border-border">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleLanguage}
                                aria-label="Change language"
                                >
                                <Image
                                    src={currentLang === 'fr' ? '/flags/fr.svg' : '/flags/us.svg'}
                                    alt={currentLang === 'fr' ? 'Langue française' : 'English language'}
                                    width={20}
                                    height={20}
                                    className="rounded-sm mr-2 w-auto h-auto"
                                />
                                {currentLang === 'fr' ? 'FR' : 'EN'}
                                </Button>
                            <Button variant="ghost" size="sm" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
                                {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </Button>
                            {user ? (
                                <Button variant="outline" size="sm" onClick={() => signOut({callbackUrl: '/login',})}>
                                {t('nav.logout')}
                                </Button>
                            ) : (
                                <Button asChild variant="default" size="sm">
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                        {t('nav.login')}
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
}