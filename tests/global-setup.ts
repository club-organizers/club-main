import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function globalSetup() {
  console.log('Setting up test user...');

  // Insert or update the test user with the ADMIN role
  const { error } = await supabase
    .from('User')
    .upsert({
      email: 'testuser@example.com',
      role: 'ADMIN',
    }, { onConflict: 'email' }); // Ensure the email is unique

  if (error) {
    console.error('Error setting up test user:', error);
    throw new Error('Failed to set up test user');
  }

  console.log('Test user setup complete.');
}

export default globalSetup;
