// src/lib/authOptions.ts
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Login',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return { id: '1', email: credentials?.email || 'guest@example.com' };
      },
    }),
  ],
};

export default authOptions;
