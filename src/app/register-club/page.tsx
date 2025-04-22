'use client';

import { Container, Row, Col } from 'react-bootstrap';

/** The information page about the website. */
const RegisterClub = () => (
  <main>
    <Container style={{ marginTop: '20px' }}>
      <Row className="justify-content-center">
        <Col xs={8}>
          <h1 className="text-center">How to Register your Own Club!</h1>
          <h2 className="text-center">Forming a club requires the following on an annual basis to remain active: </h2>
          <ul style={{ marginTop: '20px' }}>
            <li>
              Submit a completed
              {' '}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfZHcu-dtXozIQnPlc0hqe44Bji_h
                fXPqVkkeRNwLSe_jFOJg/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                RIO Application
              </a>
            </li>
            <li>
              Complete the
              {' '}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQL
                SeLIeYes8ykAO_PF4swTSYxa7Jt_XDqkfc9H9remdAR9xjQSw/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                RIO Orientation Requirement
              </a>
            </li>
            <li>
              Submit Authorized Representative Signature Forms, applies to all 6 authorized representatives to
              {' '}
              <a href="mailto:sld@hawaii.edu.">sld@hawaii.edu.</a>
            </li>
            <li>
              If the organization will engage in initiatory activities for its
              continuing or new members, complete the Anti-Hazing Workshop Requirement.
            </li>
            <li>
              Submit a Constitution OR Charter (if not currently on file with SLD)
              that has been adopted or ratified by the members of the RIO (Sample Constitution)
            </li>
            <li>Submit a Current Member Roster (must include names and email addresses)</li>
          </ul>
          <h2 className="text-center" style={{ marginTop: '30px' }}>
            For more information
            {' '}
            <a
              href="https://manoa.hawaii.edu/studentlife/involvement/registered-
              independent-organizations/forming-an-rio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              click here
            </a>
          </h2>
        </Col>
      </Row>
    </Container>
  </main>
);

export default RegisterClub;
