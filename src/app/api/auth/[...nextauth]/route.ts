import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { connectDB } from "@/lib/mongodb";
import { ProfileModel } from '@/lib/models/profile.model';
import type { Profile } from '@/lib/models/profile.model';
import { UserRoleModel } from '@/lib/models/user-role.model';
import type { UserRole } from '@/lib/models/user-role.model';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                await connectDB();

                const user = await ProfileModel.findOne<Profile>({
                    email: credentials.email,
                });
                if (!user) return null;

                const role = await UserRoleModel.findOne<UserRole>({
                    user_id: user._id.toString(),
                    role: 'admin',
                });
                if (!role) return null;

                const isValid = await compare(
                    credentials.password,
                    user.password
                );
                console.log('Password valid:', isValid);

                if (!isValid) return null;

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.full_name,
                    role: role.role,
                };
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({
            token,
            user,
        }: {
            token: JWT;
            user?: User & { role?: string };
        }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({
            session,
            token,
        }: {
            session: Session;
            token: JWT;
        }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
