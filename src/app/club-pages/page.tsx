'use client';

import { Container, Row, Col } from 'react-bootstrap';

/** The information page about the website. */
const ClubPages = () => (
  <main>
    <Container style={{ marginTop: '20px' }}>
      <Row className="justify-content-center">
        <Col xs={8}>
          <h1 className="text-center">About Club Organizers</h1>
          <p className="text-center">
            Welcome to Club Organizers! This website is designed to help the UH Manoa community access over
            150 school organizations.
          </p>
          <p className="text-center">
            Whether you&apos;re looking to for a specific club or just want to explore the various organizations
            available, Club Organizers is here to assist you. You can find information about each club, including
            their mission, their location, and their contact.
          </p>
        </Col>
      </Row>
    </Container>
  </main>
);

export default ClubPages;
