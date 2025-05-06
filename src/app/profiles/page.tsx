'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import supabase from '../../../supabaseClient';

const ProfilesPage = () => {
  const [selectedClubType, setSelectedClubType] = useState<string>('');
  const [filteredClubs, setFilteredClubs] = useState<{ id: number; name: string; description: string; type: string }[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const clubTypeImages: { [key: string]: string } = {
    'Academic/Professional': '/images/academic.jpg',
    'Sport/Leisure': '/images/sports.jpg',
    'Leisure/Sport': '/images/sports.jpg',
    Service: '/images/service.jpg',
    'Fraternity/Sorority': '/images/fraternity.png',
    'Religious/Spiritual': '/images/religious.jpg',
    'Spiritual/Religious': '/images/religious.jpg',
    'Ethnic/Cultural': '/images/cultural.jpg',
    Political: '/images/political.jpg',
    'Leisure/Recreational': '/images/recreational.jpg',
    'Honorary Society': '/images/honorary.jpg',
    'Student Affairs': '/images/student-affairs.jpg',
  };

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

    setLoading(true);
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
    setLoading(false);
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
              {loading && <p>Loading clubs...</p>}
              {fetchError && <p>{fetchError}</p>}
              {filteredClubs && (
                <Row className="g-4">
                  {filteredClubs.map((club) => (
                    <Col md={4} key={club.id}>
                      <Card className="shadow-sm card-light-gray">
                        <Card.Img
                          variant="top"
                          src={clubTypeImages[club.type]}
                          alt={`${club.type} club`}
                          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                        />
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
