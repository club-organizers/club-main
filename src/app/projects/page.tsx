'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import supabase from '../../../supabaseClient';

const ProjectPage = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [clubs, setClubs] = useState<{ id: number; name: string; description: string }[] | null>(null);

  useEffect(() => {
    const fetchClubs = async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('id, name, description'); // Ensure 'id' is included in the query

      if (error) {
        setFetchError('Could not fetch the data');
        setClubs(null);
        console.log(error);
      }
      if (data) {
        setClubs(data);
        setFetchError(null);
      }
    };

    fetchClubs();
  }, []);

  function truncateText(description: string, maxLength: number): string {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  }

  return (
    <main>
      <Container style={{ marginTop: '20px' }}>
        <Row className="justify-content-center">
          <Col xs={8}>
            <h1 className="text-center">Club Names:</h1>
            <div>
              {fetchError && <p>{fetchError}</p>}
              {clubs && (
                <Row className="g-4">
                  {clubs.map((club) => (
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
    </main>
  );
};

export default ProjectPage;
