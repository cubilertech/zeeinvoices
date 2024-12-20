import { backendURL } from '@/utils/constants';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = ({
  providers: [
    GoogleProvider({
      // clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      // clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      clientId: '504461919652-mvp7lhfe05kj4pjkg66v4q4elasdq1if.apps.googleusercontent.com',
      clientSecret:'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',
      authorization: `https://accounts.google.com/o/oauth2/auth/authorize?response_type=code&prompt=login`,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 hours
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        // Call your backend API here
        try {
          const response = await fetch(`${backendURL}/users/save`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${account.access_token}`,
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image
              // Add any other user data you want to send
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to call backend API');
          }
        } catch (error) {
          console.error('Error calling backend API:', error);
          // Handle the error as needed
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    // error: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL, 
    // signIn: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL, 
    error: 'https://staging.zeeinvoices.com',
    signIn: 'https://staging.zeeinvoices.com'
  },
});

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };