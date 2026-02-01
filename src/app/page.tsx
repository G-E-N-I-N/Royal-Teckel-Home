'use client'

import "@/i18n";
import Link from 'next/link';
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Shield, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DogCard } from '@/components/DogCard';
import { useFeaturedDogs } from '@/hooks/useDogs';

const Home = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const { t, i18n } = useTranslation();
  const {
    data: featuredDogs = [],
    isLoading,
    isError,
  } = useFeaturedDogs();

  const features = [
    { icon: Heart, titleEn: 'Raised with Love', titleFr: 'Élevés avec Amour', descEn: 'Our puppies are raised in loving homes with proper socialization.', descFr: 'Nos chiots sont élevés dans des foyers aimants avec une socialisation appropriée.' },
    { icon: Shield, titleEn: 'Health Guaranteed', titleFr: 'Santé Garantie', descEn: 'Full veterinary check-up and health certificate included.', descFr: 'Bilan vétérinaire complet et certificat de santé inclus.' },
    { icon: Award, titleEn: 'Certified Breeders', titleFr: 'Éleveurs Certifiés', descEn: 'All our breeders are certified and follow strict standards.', descFr: 'Tous nos éleveurs sont certifiés et suivent des normes strictes.' },
  ];

  const testimonials = [
    { name: 'Sarah M.', location: 'New York, USA', text: 'We found our perfect Golden Retriever through Royal Teckel Home. The process was smooth and transparent.', textFr: 'Nous avons trouvé notre Golden Retriever parfait grâce à Royal Teckel Home. Le processus était fluide et transparent.' },
    { name: 'Pierre D.', location: 'Paris, France', text: 'Excellent service and a beautiful French Bulldog. Very professional team!', textFr: 'Excellent service et un magnifique Bouledogue Français. Équipe très professionnelle !' },
    { name: 'Emma L.', location: 'Los Angeles, USA', text: 'The team helped us find the perfect puppy for our family. Highly recommend!', textFr: 'L\'équipe nous a aidés à trouver le chiot parfait pour notre famille. Je recommande vivement !' },
  ];

  const isFrench = i18n.language === 'fr';

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Royal Teckel Home",
            description:
              "Élevage de teckels élevés avec amour, socialisés et prêts à rejoindre des familles responsables.",
            url: "https://royal-teckel-home.vercel.app/",
            logo: "https://royal-teckel-home.vercel.app/hero-dog1.jpg",
            image: "https://royal-teckel-home.vercel.app/hero-dog1.jpg",
            address: {
              "@type": "PostalAddress",
              addressCountry: "FR",
            },
            areaServed: [
              {
                "@type": "Country",
                name: "Cameroon",
              },
              {
                "@type": "Country",
                name: "France",
              },
              {
                "@type": "Country",
                name: "United States",
              },
            ],
            sameAs: [
              // "https://www.facebook.com/royalteckelhome",
              "https://royal-teckel-home.vercel.app/",
            ],
          }),
        }}
      />

      <div
        className="fixed right-8 bottom-4 text-sm md:text-xl z-99 text-white/8 font-[Great_Vibes] select-none"
        style={{
          transform: 'rotate(-5deg)',
          whiteSpace: 'nowrap',
        }}
      >
          l0rd_9h057
      </div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="hero-dog1.jpg"
            alt="Beautiful puppy - Premium puppies for adoption"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/80 to-background/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg"
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/dogs">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/dogs#contact">
                  {t('nav.contact')}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-card"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {isFrench ? feature.titleFr : feature.titleEn}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isFrench ? feature.descFr : feature.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dogs Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t('hero.featured')}
            </h2>
          </motion.div>

          {isLoading && featuredDogs.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-secondary/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : featuredDogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredDogs.map((dog, index) => (
                <DogCard key={dog._id} dog={dog} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">{t('dogs.noResults')}</p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" size="lg">
              <Link href="/dogs">
                {t('nav.dogs')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {isFrench ? 'Ce Que Disent Nos Clients' : 'What Our Clients Say'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{isFrench ? testimonial.textFr : testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {isFrench ? 'Prêt à Trouver Votre Compagnon ?' : 'Ready to Find Your Companion?'}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {isFrench 
                ? 'Parcourez notre sélection de chiots de qualité et trouvez votre nouveau meilleur ami.'
                : 'Browse our selection of premium puppies and find your new best friend.'}
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/dogs">
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;