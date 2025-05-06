'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import supabase from '../../../../supabaseClient';
import { useSession } from 'next-auth/react';

const ClubDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [club, setClub] = useState<{ name: string; description: string; type: string; contact_person: string; email: string } | null>(null);

  useEffect(() => {
    const fetchClubDetails = async () => {
      const { data } = await supabase
        .from('clubs')
        .select('name, description, type, contact_person, email')
        .eq('id', id)
        .single();

      setClub(data);
    };

    fetchClubDetails();
  }, [id]);

  const handleDelete = async () => {
    const { error } = await supabase
      .from('clubs')
      .delete()
      .eq('id', id);

    if (!error) {
      router.back();
    } else {
      console.error('Error deleting club:', error);
    }
  };

  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const { data: session } = useSession();
  const currentUser = session?.user?.email;

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!currentUser) return;

      try {
        const { data, error } = await supabase
          .from('User')
          .select('role')
          .eq('email', currentUser)
          .single(); // Fetch a single row

        if (error) {
          console.error('Error fetching user role:', error);
        } else if (data) {
          setCurrentUserRole(data.role); // Set the role from the database
        }
      } catch (err) {
        console.error('Unexpected error fetching user role:', err);
      }
    };

    fetchUserRole();
  }, [currentUser]);

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
              <Button onClick={() => router.back()} variant="secondary" className="me-2">
                Back
              </Button>
              {currentUserRole === 'ADMIN' && (
                <Button onClick={handleDelete} variant="danger">
                Delete
              </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ClubDetailsPage;
