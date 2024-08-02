import { backendURL } from '@/utils/constants';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = ({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
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

          // const data = await response.json();
          // You can add the response data to the token if needed
          // token.backendApiResponse = data;
        } catch (error) {
          console.error('Error calling backend API:', error);
          // Handle the error as needed
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      // You can also add the backend API response to the session if needed
      // session.backendApiResponse = token.backendApiResponse;
      return session;
    },
  },
});

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };