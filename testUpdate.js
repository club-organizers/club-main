import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uomwmsfctyczlegcrttv.supabase.co';
const supabaseKey = 'your-anon-key'; // Replace with your actual anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const testUpdate = async () => {
  const id = 'your-club-id'; // Replace with a valid club ID
  const formData = {
    name: 'Updated Club Name',
    description: 'Updated description',
    type: 'Updated type',
    contact_person: 'Updated contact person',
    email: 'updated@example.com',
  };

  const { error } = await supabase
    .from('clubs')
    .update(formData)
    .eq('id', id);

  if (error) {
    console.error('Error updating club:', error);
  } else {
    console.log('Club updated successfully!');
  }
};

testUpdate();