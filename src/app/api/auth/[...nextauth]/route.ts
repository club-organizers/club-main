/* eslint-disable arrow-body-style */
import NextAuth from 'next-auth';
import authOptions from '@/app/auth/authOptions/authOptions';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
