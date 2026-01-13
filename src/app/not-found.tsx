'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        
            {/* 404 */}
            <h1 className="mb-6 text-8xl font-display font-bold bg-clip-text text-primary animate-fade-in-up">
                404
            </h1>

            {/* Title */}
            <h2 className="mb-4 text-3xl font-display font-semibold text-foreground animate-slide-in-left">
                Oups… cette page s’est échappée 🐾
            </h2>

            {/* Description */}
            <p className="mb-8 max-w-xl text-lg text-muted-foreground animate-slide-in-right">
                La page que vous recherchez n’existe pas, a été déplacée ou n’est plus disponible.
                Revenez à l’accueil pour découvrir nos chiens d’exception.
            </p>

            {/* CTA */}
            <Link
                href="/"
                className="
                    inline-flex items-center justify-center
                    rounded-lg px-8 py-4
                    bg-primary text-primary-foreground
                    font-semibold tracking-wide
                    shadow-card hover:shadow-card-hover
                    hover:bg-primary-foreground hover:text-primary hover:font-bold
                    transition-all duration-300
                    animate-scale-in
                "
            >
                Retour à l’accueil
            </Link>
        </div>
    );
}
