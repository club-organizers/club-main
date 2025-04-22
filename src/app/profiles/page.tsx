'use client';

import React from 'react';

const ProfilesPage = () => {
  const clubTypes = [
    'Academic/Professional',
    'Sport/Leisure',
    'Service',
    'Fraternity/Sorority',
    'Religious/Spiritual',
    'Ethnic/Cultural',
    'Political',
    'Leisure/Recreational',
    'Honorary Society',
    'Student Affairs',
  ];

  const [selectedClubType, setSelectedClubType] = React.useState<string>('');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Select a Club Type</h1>
      <form>
        <div style={{ marginBottom: '10px' }}>Choose a club type:</div>
        <select
          id="clubTypeSelect"
          value={selectedClubType}
          onChange={(e) => setSelectedClubType(e.target.value)}
          style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
        >
          <option value="" disabled>
            -- Select a club type --
          </option>
          {clubTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          type="button"
          style={{
            padding: '10px 20px',
            backgroundColor: 'olive',
            color: 'white',
            border: 'none',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfilesPage;
