'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import supabase from '../../../supabaseClient';

const ProjectPage = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [clubs, setClubs] = useState<{ id: number; name: string; description: string; type: string }[] | null>(null);


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

  useEffect(() => {
    const fetchClubs = async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('id, name, description, type');

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
                        {clubTypeImages[club.type] && ( 
                          <Card.Img
                            variant="top"
                            src={clubTypeImages[club.type]}
                            alt={`${club.type} club`}
                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                          />
                        )}
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
