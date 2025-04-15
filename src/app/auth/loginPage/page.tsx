'use client';

import { Button, Container, Card } from 'react-bootstrap';

const LoginPage = () => (
  <div style={{ backgroundImage: 'url(/login-background.jpg)', height: '100vh', backgroundSize: 'cover' }}>
    <Container className="d-flex flex-column align-items-center mt-5">
      <h1 className="text-center" style={{ color: 'white' }}>Welcome</h1>
      <Card>
        <Card.Body>
          <p>Have an account?</p>
          <div className="d-flex gap-3">
            <Button href="/auth/signin" variant="success" className="mb-4">
              Login!
            </Button>
          </div>
          <p>Don&apos;t have an account?</p>
          <div className="d-flex gap-3">
            <Button href="/auth/signup" variant="success">
              Sign Up!
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  </div>
);

export default LoginPage;
