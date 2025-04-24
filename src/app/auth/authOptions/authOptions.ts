import { compare } from 'bcrypt';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import supabase from '@/../supabaseClient';

declare module 'next-auth' {
  interface User {
    randomKey?: string;
  }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'john@foo.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const { data: user, error } = await supabase
          .from('User') 
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (error || !user) {
          console.error('Error fetching user:', error?.message || 'User not found');
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) {
          return null;
        }


        return {
          id: `${user.id}`,
          email: user.email,
          randomKey: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        randomKey: token.randomKey,
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          randomKey: user.randomKey,
        };
      }
      return token;
    },
  },
};

export default authOptions;
