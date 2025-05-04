import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function globalSetup() {
  console.log('Setting up test user...');

  // Insert or update the test user with the ADMIN role
  const { error } = await supabase
    .from('User')
    .upsert(
      {
        email: 'testuser@example.com',
        password: '123456',
        role: 'ADMIN',
      },
      { onConflict: 'email' } // Ensure the email is unique
    );

  if (error) {
    console.error('Error setting up test user:', error);
    throw new Error('Failed to set up test user');
  }

  console.log('Test user setup complete.');
}

export default globalSetup;
