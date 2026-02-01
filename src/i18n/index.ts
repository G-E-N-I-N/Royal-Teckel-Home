import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            // Navigation
            nav: {
                home: 'Home',
                dogs: 'Our Dogs',
                about: 'About',
                contact: 'Contact',
                admin: 'Admin',
                login: 'Login',
                logout: 'Logout',
            },
            // Hero
            hero: {
                title: 'Find Your Perfect Companion',
                subtitle: 'We raise our puppies in a healthy environment, with love and care. Our Royal Teckel Homes are monitored, socialized, and ready to join responsible families.',
                cta: 'Browse Dogs',
                featured: 'Featured Dogs',
            },
            // Dogs
            dogs: {
                title: 'Our Dogs',
                subtitle: 'Discover our selection of beautiful puppies',
                filter: 'Filter by breed',
                all: 'All breeds',
                available: 'Available',
                reserved: 'Reserved',
                sold: 'Sold',
                months: 'months',
                male: 'Male',
                female: 'Female',
                small: 'Small',
                medium: 'Medium',
                large: 'Large',
                adopt: 'Adopt Me',
                contact: 'Contact via WhatsApp',
                noResults: 'No dogs found matching your criteria.',
                details: 'View Details',
                age: 'Age',
                size: 'Size',
                gender: 'Gender',
                price: 'Price',
            },
            // about-us
            about: {
                title: 'About Us',
                subtitle: 'Discover who we are and our passion for dogs',
                description: `
                    We are a small, family-run breeder passionate about raising healthy, well-balanced puppies in a loving environment. Our dogs are raised with care, patience, and daily human interaction, ensuring they become confident and affectionate companions. Each puppy receives appropriate veterinary care, age-appropriate treatments, and early socialization. We prioritize quality over quantity and focus on responsible breeding practices, always prioritizing the well-being of our puppies. Transparency, honesty, and respect are at the heart of everything we do. We guide prospective families through every step of the process and remain available for support even after adoption, because placing a puppy is not just a transaction, it's a lifelong commitment.
                    
                    Our goal is simple:
                    To connect our puppies with loving and responsible families and give them the best possible start in life.`,
                values: {
                    love: {
                        title: 'Love & Care',
                        description: 'Each puppy is raised with love and receives constant attention.',
                    },
                    trust: {
                        title: 'Trust',
                        description: 'Transparency and honesty are at the heart of our relationships.',
                    },
                    quality: {
                        title: 'Quality',
                        description: 'Only the best for our puppies: nutrition, care, and environment.',
                    },
                    family: {
                        title: 'Family',
                        description: 'We support you throughout your adoption journey.',
                    },
                },
            },
            // WhatsApp
            whatsapp: {
                message: 'Hello! I am interested in adopting {{name}} ({{breed}}). I would like to learn more about this puppy.',
            },
            // email
            email: {
                message: `
                    name: *{{name}}*, email: *{{email}}*, phone: *{{phone}}*
                    subject: *{{subject}}*
                    message: *{{message}}*
                `,
            },
            // Contact Form
            contact: {
                title: 'Contact Us',
                subtitle: 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
                name: 'Full Name',
                namePlaceholder: 'John Doe',
                email: 'Email Address',
                emailPlaceholder: 'john@example.com',
                phone: 'Phone Number',
                phonePlaceholder: '+1 (234) 567-890',
                subject: 'Subject',
                subjectPlaceholder: 'How can we help?',
                message: 'Message',
                messagePlaceholder: 'Tell us about your interest in our puppies...',
                send: 'Send Message',
                success: 'Message Sent!',
                successMessage: 'Thank you for contacting us. We\'ll get back to you shortly.',
                info: 'Contact Information',
                followUs: 'Follow Us',
                socialDescription: 'Stay updated with our latest puppies and news by following us on social media.',
            },
            // Footer
            footer: {
                description: 'Your trusted source for premium puppies in the US and France.',
                quickLinks: 'Quick Links',
                contact: 'Contact Us',
                rights: 'All rights reserved.',
                email: 'Email',
                phone: 'Phone',
                address: 'Address',
            },
            // Admin
            admin: {
                title: 'Admin Dashboard',
                addDog: 'Add New Dog',
                editDog: 'Edit Dog',
                deleteDog: 'Delete Dog',
                save: 'Save',
                cancel: 'Cancel',
                name: 'Name',
                breed: 'Breed',
                age: 'Age (months)',
                price: 'Price ($)',
                description: 'Description',
                gender: 'Gender',
                size: 'Size',
                status: 'Status',
                featured: 'Featured',
                imageUrl: 'Image URL',
                confirmDelete: 'Are you sure you want to delete this dog?',
                success: 'Operation successful!',
                error: 'An error occurred.',
            },
            // Auth
            auth: {
                login: 'Login',
                register: 'Register',
                email: 'Email',
                password: 'Password',
                fullName: 'Full Name',
                noAccount: "Don't have an account?",
                hasAccount: 'Already have an account?',
                loginSuccess: 'Welcome back!',
                registerSuccess: 'Account created successfully!',
                logout: 'Logout',
                logoutSuccess: 'See you soon!',
                adminLogin: 'Admin Login',
                adminLoginDescription: 'Sign in to access the admin dashboard',
                devMode: 'Development Mode',
                devModeDescription: 'Use the test credentials below to access the admin panel during development.',
                useDevCredentials: 'Use Test Credentials',
                invalidCredentials: 'Invalid email or password. Please try again.',
                emailNotConfirmed: 'Please confirm your email address before logging in.',
                securityNotice: 'This is a secure admin area. Unauthorized access attempts are logged.',
            },
            // Theme
            theme: {
                light: 'Light',
                dark: 'Dark',
                system: 'System',
            },
            // Common
            common: {
                loading: 'Loading...',
                error: 'An error occurred',
                back: 'Back',
            },
        },
    },
    fr: {
        translation: {
            // Navigation
            nav: {
                home: 'Accueil',
                dogs: 'Nos Chiens',
                about: 'À Propos',
                contact: 'Contact',
                admin: 'Admin',
                login: 'Connexion',
                logout: 'Déconnexion',
            },
            // Hero
            hero: {
                title: 'Trouvez Votre Compagnon Idéal',
                subtitle: "Nous élevons nos chiots dans un environnement sain, avec amour et attention. Nos teckels sont suivis, sociabilisés et prêts à rejoindre des familles responsables.",
                cta: 'Voir les Chiens',
                featured: 'Chiens en Vedette',
            },
            // Dogs
            dogs: {
                title: 'Nos Chiens',
                subtitle: 'Découvrez notre sélection de magnifiques chiots',
                filter: 'Filtrer par race',
                all: 'Toutes les races',
                available: 'Disponible',
                reserved: 'Réservé',
                sold: 'Vendu',
                months: 'mois',
                male: 'Mâle',
                female: 'Femelle',
                small: 'Petit',
                medium: 'Moyen',
                large: 'Grand',
                adopt: 'Adopter',
                contact: 'Contacter via WhatsApp',
                noResults: 'Aucun chien trouvé correspondant à vos critères.',
                details: 'Voir les Détails',
                age: 'Âge',
                size: 'Taille',
                gender: 'Sexe',
                price: 'Prix',
            },
            // About
            about: {
                title: 'À Propos de Nous',
                subtitle: 'Découvrez qui nous sommes et notre passion pour les chiens',
                description: `
                    Nous sommes un petit éleveur familial passionné par l'élevage de chiots en bonne santé et bien équilibrés dans un environnement aimant. Nos chiens sont élevés avec soin, patience et interaction humaine quotidienne, ce qui garantit qu’ils deviennent des compagnons confiants et affectueux. Chaque chiot reçoit un suivi vétérinaire approprié, des soins adaptés à l’âge et une socialisation précoce. Nous donnons la priorité à la qualité plutôt qu’à la quantité et nous nous concentrons sur des pratiques d’élevage responsables, en accordant toujours la priorité au bien-être de nos chiots. La transparence, l’honnêteté et le respect sont au cœur de tout ce que nous faisons. Nous guidons les futures familles à chaque étape du processus et restons disponibles pour un soutien même après l’adoption, car placer un chiot n’est pas seulement une transaction, c’est un engagement à vie.
                    
                    Notre objectif est simple :
                    Pour mettre en relation nos chiots avec des familles aimantes et responsables et leur donner le meilleur départ possible dans la vie.`,
                values: {
                    love: {
                        title: 'Amour & Soin',
                        description: 'Chaque chiot est élevé avec amour et reçoit une attention constante.',
                    },
                    trust: {
                        title: 'Confiance',
                        description: 'La transparence et l\'honnêteté sont au cœur de nos relations.',
                    },
                    quality: {
                        title: 'Qualité',
                        description: 'Le meilleur pour nos chiots : nutrition, soins et environnement.',
                    },
                    family: {
                        title: 'Famille',
                        description: 'Nous vous accompagnons tout au long de votre parcours d\'adoption.',
                    },
                },
            },
            // WhatsApp
            whatsapp: {
                message: "Bonjour ! Je suis intéressé(e) par l'adoption de {{name}} ({{breed}}). J'aimerais en savoir plus sur ce chiot.",
            },
            // email
            email: {
                message: `
                    name: *{{name}}*, email: *{{email}}*, phone: *{{phone}}*
                    subject: *{{subject}}*
                    message: *{{message}}*
                `,
            },
            // Contact Form
            contact: {
                title: 'Contactez-Nous',
                subtitle: 'Des questions ? Nous serions ravis de vous entendre. Envoyez-nous un message et nous vous répondrons dès que possible.',
                name: 'Nom Complet',
                namePlaceholder: 'Jean Dupont',
                email: 'Adresse Email',
                emailPlaceholder: 'jean@exemple.com',
                phone: 'Numéro de Téléphone',
                phonePlaceholder: '+33 1 23 45 67 89',
                subject: 'Sujet',
                subjectPlaceholder: 'Comment pouvons-nous vous aider ?',
                message: 'Message',
                messagePlaceholder: 'Parlez-nous de votre intérêt pour nos chiots...',
                send: 'Envoyer le Message',
                success: 'Message Envoyé !',
                successMessage: 'Merci de nous avoir contacté. Nous vous répondrons rapidement.',
                info: 'Coordonnées',
                followUs: 'Suivez-Nous',
                socialDescription: 'Restez informé de nos derniers chiots et actualités en nous suivant sur les réseaux sociaux.',
            },
            // Footer
            footer: {
                description: 'Votre source de confiance pour des chiots de qualité aux États-Unis et en France.',
                quickLinks: 'Liens Rapides',
                contact: 'Nous Contacter',
                rights: 'Tous droits réservés.',
                email: 'Email',
                phone: 'Téléphone',
                address: 'Adresse',
            },
            // Admin
            admin: {
                title: "Tableau de Bord Admin",
                addDog: 'Ajouter un Chien',
                editDog: 'Modifier le Chien',
                deleteDog: 'Supprimer le Chien',
                save: 'Enregistrer',
                cancel: 'Annuler',
                name: 'Nom',
                breed: 'Race',
                age: 'Âge (mois)',
                price: 'Prix (€)',
                description: 'Description',
                gender: 'Sexe',
                size: 'Taille',
                status: 'Statut',
                featured: 'En Vedette',
                imageUrl: "URL de l'Image",
                confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce chien ?',
                success: 'Opération réussie !',
                error: 'Une erreur est survenue.',
            },
            // Auth
            auth: {
                login: 'Connexion',
                register: "S'inscrire",
                email: 'Email',
                password: 'Mot de passe',
                fullName: 'Nom Complet',
                noAccount: "Pas encore de compte ?",
                hasAccount: 'Déjà un compte ?',
                loginSuccess: 'Bon retour !',
                registerSuccess: 'Compte créé avec succès !',
                logout: 'Déconnexion',
                logoutSuccess: 'À bientôt !',
                adminLogin: 'Connexion Admin',
                adminLoginDescription: 'Connectez-vous pour accéder au tableau de bord admin',
                devMode: 'Mode Développement',
                devModeDescription: 'Utilisez les identifiants de test ci-dessous pour accéder au panneau admin pendant le développement.',
                useDevCredentials: 'Utiliser les Identifiants de Test',
                invalidCredentials: 'Email ou mot de passe incorrect. Veuillez réessayer.',
                emailNotConfirmed: 'Veuillez confirmer votre adresse email avant de vous connecter.',
                securityNotice: 'Ceci est une zone admin sécurisée. Les tentatives d\'accès non autorisées sont enregistrées.',
            },
            // Theme
            theme: {
                light: 'Clair',
                dark: 'Sombre',
                system: 'Système',
            },
            // Common
            common: {
                loading: 'Chargement...',
                error: 'Une erreur est survenue',
                back: 'Retour',
            },
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
