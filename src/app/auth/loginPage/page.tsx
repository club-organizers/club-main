'use client';

import { Button, Container } from 'react-bootstrap';

const LoginPage = () => (
  <Container className="d-flex flex-column align-items-center mt-5">
    <p>Have an account?</p>
    <div className="d-flex gap-3">
      <Button href="/auth/signin" variant="success">
        Login!
      </Button>
    </div>
    <p>Dont have an account?</p>
    <div className="d-flex gap-3">
      <Button href="/auth/signup" variant="success">
        Sign Up!
      </Button>
    </div>
  </Container>
);

export default LoginPage;
