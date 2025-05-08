'use server';

import { compare, hash } from 'bcrypt';
import supabase from '@/../supabaseClient';

export async function getUser(email: string) {
  const { data, error } = await supabase
    .from('User') 
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }

  return data;
}

export async function checkPassword(credentials: { email: string; password: string }) {
  const user = await getUser(credentials.email);
  if (!user) {
    return false;
  }

  const isPasswordValid = await compare(credentials.password, user.password);
  return isPasswordValid;
}

export async function changePassword(credentials: { email: string; password: string }) {
  const hashedPassword = await hash(credentials.password, 10);

  const { error } = await supabase
    .from('User')
    .update({ password: hashedPassword })
    .eq('email', credentials.email);

  if (error) {
    console.error('Error updating password:', error.message);
    throw new Error('Failed to update password');
  }
}

export async function createUser(credentials: { email: string; password: string }) {
  const hashedPassword = await hash(credentials.password, 10);

  const { error } = await supabase
    .from('User')
    .insert({
      email: credentials.email,
      password: hashedPassword,
    });

  if (error) {
    console.error('Error creating user:', error.message);
    throw new Error('Failed to create user');
  }
}

