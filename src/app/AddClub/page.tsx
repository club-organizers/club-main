'use client';

import { useState } from 'react';
import supabase from '../../../supabaseClient';

const AddClubPage = () => {
  const [clubName, setClubName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { error } = await supabase.from('clubs').insert([
      {
        name: clubName,
        description: description,
      },
    ]);

    if (error) {
      setError('Failed to add club: ' + error.message);
    } else {
      setSuccess('Club added successfully!');
      setClubName('');
      setDescription('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add a New Club</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="clubName">Club Name:</label>
          <input
            id="clubName"
            type="text"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
          Add Club
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default AddClubPage;