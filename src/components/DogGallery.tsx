import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, ArrowDown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dog } from '@/hooks/useDogs';
import { use } from 'i18next';

interface DogGalleryProps {
  dogs: Dog[];
  onBuyClick: (dog: Dog) => void;
}

export function DogGallery({ dogs, onBuyClick }: DogGalleryProps) {
  const { t, i18n } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const currentUrl = new URL(window.location.href);
    const dogID = currentUrl.searchParams.get('id');
    if (!dogID || dogs.length === 0) return;
    const index = dogs.findIndex(dog => dog._id === dogID);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }, [dogs]);

  const selectedDog = dogs[selectedIndex];

  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnail = thumbnailsRef.current.children[selectedIndex] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedIndex]);

  const handleThumbnailClick = (index: number) => {
    setIsAutoScrolling(false);
    setSelectedIndex(index);
  };

  const handlePrev = () => {
    setIsAutoScrolling(false);
    setSelectedIndex((prev) => (prev - 1 + dogs.length) % dogs.length);
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    setSelectedIndex((prev) => (prev + 1) % dogs.length);
  };

  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  if (dogs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">{t('dogs.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Display */}
      <div className="relative min-h-screen md:min-h-screen flex flex-col">
        {/* Hero Image */}
        <div className="relative flex-1 min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDog._id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 overflow-hidden z-0"
            >
              <img
                src={selectedDog.image_url || '/placeholder.svg'}
                alt={selectedDog.name}
                className="absolute inset-0 w-full h-full object-cover object-center block z-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent z-10" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 hover:bg-background shadow-lg z-30"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 hover:bg-background shadow-lg z-30"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dog Info Overlay */}
          <motion.div
            key={`info-${selectedDog._id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-40"
          >
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <Badge className={`mb-3 ${statusColors[selectedDog.status]}`}>
                    {t(`dogs.${selectedDog.status}`)}
                  </Badge>
                  <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-2">
                    {selectedDog.name}
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground mb-2">{selectedDog.breed}</p>
                  <p className="text-2xl md:text-3xl font-bold text-primary">
                    {formatPrice(selectedDog.price)}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={scrollToDetails}
                    className="bg-background/80 hover:bg-background"
                  >
                    <ArrowDown className="mr-2 h-5 w-5" />
                    {t('dogs.details')}
                  </Button>
                  {selectedDog.status === 'available' && (
                    <Button
                      size="lg"
                      onClick={() => onBuyClick(selectedDog)}
                      className="shadow-lg"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      {t('dogs.adopt')}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Thumbnail Strip */}
        <div className="bg-background/95 backdrop-blur-sm border-t border-border py-4">
          <div className="container mx-auto px-4">
            <div
              ref={thumbnailsRef}
              className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
              onMouseEnter={() => setIsAutoScrolling(false)}
            >
              {dogs.map((dog, index) => (
                <motion.button
                  key={dog._id}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === selectedIndex
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  whileHover={{ scale: index === selectedIndex ? 1.05 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={dog.image_url || '/placeholder.svg'}
                    alt={dog.name}
                    className="w-full h-full object-cover"
                  />
                  {dog.status !== 'available' && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <span className="text-xs font-medium">{t(`dogs.${dog.status}`)}</span>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dog Details Section */}
      <div ref={detailsRef} id="gallery" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Grid */}
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-card">
                  <img
                    src={selectedDog.image_url || '/placeholder.svg'}
                    alt={selectedDog.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <Badge className={`mb-3 ${statusColors[selectedDog.status]}`}>
                    {t(`dogs.${selectedDog.status}`)}
                  </Badge>
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-2">
                    {selectedDog.name}
                  </h3>
                  <p className="text-lg text-muted-foreground">{selectedDog.breed}</p>
                </div>

                <div className="text-3xl font-bold text-primary">
                  {formatPrice(selectedDog.price)}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                    <p className="text-sm text-muted-foreground mb-1">{t('dogs.age')}</p>
                    <p className="font-semibold">{selectedDog.age_months} {t('dogs.months')}</p>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                    <p className="text-sm text-muted-foreground mb-1">{t('dogs.gender')}</p>
                    <p className="font-semibold">{t(`dogs.${selectedDog.gender}`)}</p>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center shadow-sm">
                    <p className="text-sm text-muted-foreground mb-1">{t('dogs.size')}</p>
                    <p className="font-semibold">{t(`dogs.${selectedDog.size}`)}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-background rounded-lg p-6 shadow-sm">
                  <p className="text-muted-foreground leading-relaxed">
                    {i18n.language === 'fr' ? selectedDog.description_fr : selectedDog.description_en}
                  </p>
                </div>

                {/* CTA */}
                {selectedDog.status === 'available' && (
                  <Button
                    size="lg"
                    className="w-full text-lg py-6"
                    onClick={() => onBuyClick(selectedDog)}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {t('dogs.contact')}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
