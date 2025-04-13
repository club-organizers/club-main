'use client';

import { Container, Row, Col } from 'react-bootstrap';

/** The information page about the website. */
const Information = () => (
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
          <p className="text-center">
            Use the navigation bar to explore the features of the platform. If you&apos;re logged in, you can save the
            clubs your interested in. If you&apos;re not logged in, feel free to browse the available information and
            profiles.
          </p>
          <p className="text-center">
            We hope you enjoy using Club Organizers to streamline your club&apos;s
            activities!
          </p>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Information;
