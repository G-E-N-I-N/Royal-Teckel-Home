import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Dog } from '@/hooks/useDogs';

interface DogCardProps {
    dog: Dog;
    index?: number;
}

export function DogCard({ dog, index = 0 }: DogCardProps) {
    const { t, i18n } = useTranslation();

    const statusColors = {
        available: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
        reserved: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
        sold: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(i18n.language === 'fr' ? 'fr-FR' : 'en-US', {
        style: 'currency',
        currency: i18n.language === 'fr' ? 'EUR' : 'USD',
        minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Card className="group overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="relative aspect-4/3 overflow-hidden">
                    <img
                        src={dog.image_url || '/placeholder.svg'}
                        alt={dog.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                        <Badge className={statusColors[dog.status]}>
                        {t(`dogs.${dog.status}`)}
                        </Badge>
                    </div>
                    {dog.is_featured && (
                        <div className="absolute top-3 right-3">
                        <Badge className="bg-gold text-primary-foreground">★</Badge>
                        </div>
                    )}
                </div>

                <CardContent className="p-5">

                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-display text-xl font-semibold">{dog.name}</h3>
                            <p className="text-muted-foreground">{dog.breed}</p>
                        </div>
                        <p className="font-semibold text-primary text-lg">{formatPrice(dog.price)}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 text-sm text-muted-foreground">
                        <span>{dog.age_months} {t('dogs.months')}</span>
                        <span>•</span>
                        <span>{t(`dogs.${dog.gender}`)}</span>
                        <span>•</span>
                        <span>{t(`dogs.${dog.size}`)}</span>
                    </div>
                    
                    <Button asChild variant="default" className="w-full">
                        <Link href={`/dogs?id=${dog._id}`}>{t('dogs.details')}</Link>
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}