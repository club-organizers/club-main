'use client';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <main className="wrapper pb-5">
        <div className="text-center">
          <h1 className="reset-margins" style={{ fontSize: '40pt', color: 'olive' }}>
            Clubs
          </h1>
        </div>

        <div className="landing-white-background">
          <Container className="my-5">
            <Row className="g-4 justify-content-center">
              <Col md={5}>
                <Card className="text-center card-light-gray shadow-sm">
                  <Card.Img
                    variant="top"
                    src="/images/bbclub.png"
                    style={{ width: '250px', margin: '20px auto' }}
                  />
                  <Card.Body>
                    <Card.Title>Basketball Club</Card.Title>
                    <Card.Text>Basketball is really cool.</Card.Text>
                    <Button
                      style={{ backgroundColor: 'olive', border: 'none' }}
                      onClick={() => window.location.href = 'https://www.espn.com/nba/player/_/id/1966/lebron-james'}
                    >
                      Learn More
                    </Button>

                  </Card.Body>
                </Card>
              </Col>
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
                      PANDA (Programming AND Algorithms) is a special interest group of ACM Mānoa
                      dedicated to studying and applying algorithms.
                    </Card.Text>
                    <Button style={{ backgroundColor: 'olive', border: 'none' }}>Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card className="text-center card-light-gray shadow-sm">
                  <Card.Img
                    variant="top"
                    src="/images/medicine.png"
                    style={{ width: '250px', margin: '20px auto' }}
                  />
                  <Card.Body>
                    <Card.Title>Associated Students of the John A. Burns School of Medicine</Card.Title>
                    <Card.Text>
                      The purpose of ASJABSOM and the JABSOM Classes is to serve as the
                      official body representing the medical students of JABSOM.
                      To that end, purposes include, but are not limited to advocating on behalf of the medical
                      students of JABSOM, promoting the welfare of JABSOM and its students, and fostering student
                      morale.
                    </Card.Text>
                    <Button style={{ backgroundColor: 'olive', border: 'none' }}>Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card className="text-center card-light-gray shadow-sm">
                  <Card.Img
                    variant="top"
                    src="/images/japanese.png"
                    style={{ width: '250px', margin: '20px auto' }}
                  />
                  <Card.Body>
                    <Card.Title>Japanese Culture Club at UH Manoa</Card.Title>
                    <Card.Text>
                      To provide a space for anyone to enjoy Japanese cultural activities and practice the language.
                    </Card.Text>
                    <Button style={{ backgroundColor: 'olive', border: 'none' }}>Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </main>

      <footer className="text-center py-0 bg-light mt-auto">
        <p className="mb-0" />
      </footer>

    </>
  );
}
