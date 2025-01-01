import { backendURL } from '@/utils/constants';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = ({
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { access_type: "offline" }, // Optional
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 hours
  },
  callbacks: {

    async jwt({ token, account, user }) {
      console.log("Jwt Callback:", { account, user });
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
      console.log("Session Callback:", { session, token });
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };