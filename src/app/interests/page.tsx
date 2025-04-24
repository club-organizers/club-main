'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, FormControl } from 'react-bootstrap';
import supabase from '../../../supabaseClient';
import Link from 'next/link';

const ProfilesPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for the input field
  const [filteredClubs, setFilteredClubs] = useState<{ id: number; name: string; description: string; type: string }[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleFetchClubs = async () => {
    const { data, error } = await supabase
      .from('clubs')
      .select('id, name, description, type');

    if (error) {
      setFetchError('Could not fetch the data');
      setFilteredClubs(null);
      console.log(error);
    } else {
      // Filter the results based on the search query
      const filteredResults = data.filter(
        (club) =>
          club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          club.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredClubs(filteredResults);
      setFetchError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleFetchClubs(); // Trigger the fetch and search logic
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search for a Club</h1>
      <Form onSubmit={handleSubmit}>
        <FormControl
          type="text"
          placeholder="Search by club name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
        />
        <Button
          type="submit"
          style={{ marginBottom: '20px', backgroundColor: 'olive', border: 'none' }}
        >
          Find Clubs
        </Button>
      </Form>

      <Container style={{ marginTop: '20px' }}>
        {fetchError && <p>{fetchError}</p>}
        {filteredClubs && filteredClubs.length > 0 ? (
          <Row className="g-4">
            {filteredClubs.map((club) => (
              <Col md={4} key={club.id}>
                <Card className="shadow-sm card-light-gray">
                  <Card.Body>
                    <Card.Title className="text-center">{club.name}</Card.Title>
                    <Card.Text className="text-center">
                      {club.description.length > 150
                        ? `${club.description.substring(0, 150)}...`
                        : club.description}
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
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>No clubs found.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProfilesPage;
