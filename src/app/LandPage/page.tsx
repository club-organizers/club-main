'use client';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="wrapper">
      <div className="text-center">
        <h1
          className="reset-margins"
          style={{ fontSize: '40pt', color: 'olive' }}
        >
          Welcome to Club Organizers
        </h1>
        <p style={{ fontSize: '15pt', color: 'olive' }}>
          Discover new organizations, and find ways to get involved.
        </p>
        <Image
          src="/images/clubspic.jpg"
          alt="CLUBS logo"
          width={350}
          height={100}
        />
      </div>

      <div className="landing-white-background">
        <h2
          className="reset-margins text-center"
          style={{ fontSize: '30pt', color: 'olive' }}
        >
          Example:
        </h2>
        <Container className="my-5">
          <Row className="g-4 justify-content-center">
            <Col md={5}>
              <Card className="text-center card-light-gray shadow-sm">
                <Card.Img
                  variant="top"
                  src="/images/pandaclub.png"
                  style={{ width: '250px', margin: '20px auto' }}
                />
                <Card.Body>
                  <Card.Title>PANDA</Card.Title>
                  <Card.Text>
                    PANDA (Programming AND Algorithms) is a special interest
                    group of ACM Mānoa dedicated to studying and applying
                    algorithms.
                  </Card.Text>
                  <Button style={{ backgroundColor: 'olive', border: 'none' }}>
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button
              style={{
                backgroundColor: 'olive',
                border: 'none',
                width: '100%',
                padding: '15px',
                fontSize: '16px',
              }}
              onClick={() => router.push('/projects')}
            >
              Discover Clubs
            </Button>
          </div>
        </Container>
      </div>
    </main>
  );
}
