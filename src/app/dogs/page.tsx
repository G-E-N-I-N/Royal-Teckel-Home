'use client'

import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { DogGallery } from '@/components/DogGallery';
import { ContactForm } from '@/components/ContactForm';
import { useDogs, useBreeds, Dog } from '@/hooks/useDogs';

const Dogs = () => {
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);
    const { t, i18n } = useTranslation();
    const [selectedBreed, setSelectedBreed] = useState<string>('all');
    const { data: dbDogs, isLoading } = useDogs(selectedBreed);
    const { data: breeds } = useBreeds();

    // Combine tous les chiens (ici plus de mock, seulement DB)
    const allDogs: Dog[] = useMemo(() => {
        if (!dbDogs) return [];
        return selectedBreed === 'all'
            ? dbDogs
            : dbDogs.filter((dog) => dog.breed === selectedBreed);
    }, [dbDogs, selectedBreed]);

    // Récupération des races uniques pour le filtre
    const allBreeds: string[] = useMemo(() => {
        if (!breeds) return [];
        return Array.from(new Set(breeds)).sort();
    }, [breeds]);

    const handleBuyClick = (dog: Dog) => {
        const message = t('whatsapp.message', { name: dog.name, breed: dog.breed });
        console.log('WhatsApp message:', message);
        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div>
            <div
                className="fixed right-8 bottom-4 text-sm md:text-xl z-99 text-white/8 font-[Great_Vibes] select-none"
                style={{
                    transform: 'rotate(-5deg)',
                    whiteSpace: 'nowrap',
                }}
            >
                l0rd_9h057
            </div>

            {/* SEO Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                // className="bg-secondary/30 py-8 md:py-12"
                className="bg-secondary/10 py-8 md:py-12 absolute top-15 w-full z-10"
            >
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                                {t('dogs.title')}
                            </h1>
                            <p className="">
                                {t('dogs.subtitle')}
                            </p>
                        </div>

                        {/* Breed Filter */}
                        <div className="flex items-center gap-3">
                            <Filter className="h-5 w-5 text-muted-foreground" />
                            <select
                                value={selectedBreed}
                                onChange={(e) => setSelectedBreed(e.target.value)}
                                aria-label={t('dogs.filter')}
                                className="w-48 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="all">{t('dogs.all')}</option>
                                {allBreeds.map((breed) => (
                                    <option key={breed} value={breed}>
                                        {breed}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Gallery */}
            {isLoading && allDogs.length === 0 ? (
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="animate-pulse text-muted-foreground">{t('common.loading')}</div>
                </div>
            ) : (
                <DogGallery dogs={allDogs} onBuyClick={handleBuyClick} />
            )}

            {/* Contact Form */}
            <ContactForm />
        </div>
    );
};

export default Dogs;
