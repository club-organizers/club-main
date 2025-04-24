'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import supabase from '../../../../supabaseClient';

const ClubDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [club, setClub] = useState<{ id: string; name: string; description: string; type: string; contact_person: string; email: string } | null>(null);

  useEffect(() => {
    const fetchClubDetails = async () => {
      const { data } = await supabase
        .from('clubs')
        .select('id, name, description, type, contact_person, email')
        .eq('id', id)
        .single();

      setClub(data);
    };

    fetchClubDetails();
  }, [id]);

  return (
    <Container style={{ marginTop: '20px' }}>
      {club && (
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="text-center">{club.name}</Card.Title>
            <Card.Text className="text-center">{club.description}</Card.Text>
            <p className="text-center">
              <strong>Type:</strong> {club.type}
            </p>
            <p className="text-center">
              <strong>Contact:</strong> {club.contact_person}
            </p>
            <p className="text-center">
              <strong>Email:</strong> {club.email}
            </p>
            <div className="text-center">
              <Button onClick={() => router.push(`/edit/${club.id}`)} variant="secondary" style={{ marginBottom: '10px' }}>
                Edit
              </Button>
            </div>
            <div className="text-center">
              <Button onClick={() => router.push(`/projects`)} variant="secondary">
                Back
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ClubDetailsPage;
