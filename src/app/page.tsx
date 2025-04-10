'use client';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { PageIDs } from '@/utilities/ids';

export default function Home() {
  return (
    <main>
      <div id={PageIDs.landingPage}>
        <div className="landing-green-background">
          <Container className="text-center">
            <h1 style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }}>
              Welcome to Club Organizer
            </h1>
            <h3 style={{ paddingBottom: '20px', color: 'white' }}>
              Organize club profiles, Find new groups, and more!
            </h3>
          </Container>
        </div>

        <div className="landing-white-background py-5">
          <Container>
            <Row className="g-4" xs={1} md={2} lg={3}>
              <Col>
                <Card className="h-100 text-center shadow-sm card-light-gray">
                  <Card.Img variant="top" src="/images/home-page.png" />
                  <Card.Body>
                    <Card.Title>Start by logging in</Card.Title>
                    <Card.Text>
                      Create your account and begin exploring clubs.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 text-center shadow-sm card-light-gray">
                  <Card.Img variant="top" src="/images/add-project-page.png" />
                  <Card.Body>
                    <Card.Title>Find a club!</Card.Title>
                    <Card.Text>
                      Browse existing clubs! Find what interests you!
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 text-center shadow-sm card-light-gray">
                  <Card.Img variant="top" src="/images/filter-page.png" />
                  <Card.Body>
                    <Card.Title>Join new groups! Make new friends!</Card.Title>
                    <Card.Text>
                      Sign up and join clubs by looking at their contact info on the bottom of their pages!
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="landing-green-background">
          <Container className="text-center">
            <h1 style={{ paddingTop: '20px', paddingBottom: '30px', color: 'white', fontSize: '36pt' }}>
              For club owners...

            </h1>
          </Container>
        </div>
        <div className="landing-white-background py-5">
          <Container>
            <Row className="g-4" xs={1} md={2} lg={3}>
              <Col>
                <Card className="h-100 text-center shadow-sm card-light-gray">
                  <Card.Img variant="top" src="/images/home-page.png" />
                  <Card.Body>
                    <Card.Title>Start by logging in</Card.Title>
                    <Card.Text>
                      Log in through using your club ID number.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 text-center shadow-sm card-light-gray">
                  <Card.Img variant="top" src="/images/add-project-page.png" />
                  <Card.Body>
                    <Card.Title>Edit your page!</Card.Title>
                    <Card.Text>
                      Edit your club page to show others what your club is all about!
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100 text-center shadow-sm card-light-gray">
                  <Card.Img variant="top" src="/images/filter-page.png" />
                  <Card.Body>
                    <Card.Title>Publish your changes!</Card.Title>
                    <Card.Text>
                      Publish your changes via the &quot;publish&quot; button on the bottom of the page!
                      Don&apos;t forget to include contact information!
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </main>
  );
}
