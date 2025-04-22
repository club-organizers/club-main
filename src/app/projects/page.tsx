'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import supabase from '../../../supabaseClient'; // Adjust the path if necessary

const ProjectPage = () => {
  console.log(supabase);

  const [fetchError, setFetchError] = useState<string | null>(null);
  const [clubs, setClubs] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select();

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

  return (
    <main>
      <Container style={{ marginTop: '20px' }}>
        <Row className="justify-content-center">
          <Col xs={8}>
            <h1 className="text-center">Club Names:</h1>
            <div>
              {fetchError && (<p>{fetchError}</p>)}
              {clubs && (
                <div className="clubs">
                  {clubs.map(clubs => (
                    <p>{clubs.name}</p>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ProjectPage;
