'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useSession } from 'next-auth/react'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import supabase from '../../../supabaseClient';

const ProfilesPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedClubType, setSelectedClubType] = useState<string>('');
  const [filteredClubs, setFilteredClubs] = useState<{ id: number; name: string; description: string; type: string }[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Session status:', status); 
    console.log('Session data:', session); 

    if (status === 'unauthenticated') {
      console.log('No session found, redirecting to login...');
      router.push('/auth/signin'); 
    }
  }, [router, session, status]);

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

  function truncateText(description: string, maxLength: number): string {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  }

  const handleFetchClubs = async () => {
    if (!selectedClubType) {
      setFetchError('Please select a club type.');
      setFilteredClubs(null);
      return;
    }

    const { data, error } = await supabase
      .from('clubs')
      .select('id, name, description, type')
      .eq('type', selectedClubType);

    if (error) {
      setFetchError('Could not fetch the data');
      setFilteredClubs(null);
      console.log(error);
    } else {
      setFilteredClubs(data);
      setFetchError(null);
    }
  };

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
      </form>
      <Button
        onClick={handleFetchClubs}
        style={{ marginTop: '10px', backgroundColor: 'olive', border: 'none' }}
      >
        Show Clubs
      </Button>

      <Container style={{ marginTop: '20px' }}>
        <Row className="justify-content-center">
          <Col xs={8}>
            <h1 className="text-center">Club Names:</h1>
            <div>
              {fetchError && <p>{fetchError}</p>}
              {filteredClubs && (
                <Row className="g-4">
                  {filteredClubs.map((club) => (
                    <Col md={4} key={club.id}>
                      <Card className="shadow-sm card-light-gray">
                        <Card.Body>
                          <Card.Title className="text-center">{club.name}</Card.Title>
                          <Card.Text className="text-center">
                            {truncateText(club.description, 150)}
                          </Card.Text>
                          <div className="text-center">
                            <Link href={`/club/${club.id}`} passHref>
                              <Button variant="primary">View Details</Button>
                            </Link>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilesPage;
