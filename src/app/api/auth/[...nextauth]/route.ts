// src/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import db from '@/libs/db';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!userFound) throw new Error('No user found');

        const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

        if (!matchPassword) throw new Error('Wrong password');

        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.sub;
      session.user.image = token.picture; // Añade la foto del perfil de Google
      session.user.name = token.name;     // Añade el nombre del perfil de Google
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.picture = profile.picture;  // Guarda la foto del perfil
        token.name = profile.name;        // Guarda el nombre del perfil
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
