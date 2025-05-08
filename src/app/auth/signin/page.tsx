'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, Container, Form, Row, Alert } from 'react-bootstrap';

/** The sign in page. */
const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    const result = await signIn('credentials', {
      callbackUrl: '/LandPage',
      email,
      password,
      redirect: false, 
    });

    if (result?.error) {
      setErrorMessage('Invalid email or password. Please try again.');
      console.error('Sign in failed: ', result.error);
    } else {
      setErrorMessage(null); 
      router.push('/LandPage'); 
    }
  };

  return (
    <main>
      <div style={{ backgroundImage: 'url(/login-background.jpg)', height: '100vh', backgroundSize: 'cover' }}>
        <Container>
          <Row className="justify-content-center">
            <Col xs={5}>
              <h1 className="text-center" style={{ color: 'white' }}>Log In</h1>
              <Card>
                <Card.Body>
                  {errorMessage && (
                    <Alert variant="danger" className="text-center">
                      {errorMessage}
                    </Alert>
                  )}
                  <Form method="post" onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <input name="email" type="text" className="form-control" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <input name="password" type="password" className="form-control" />
                    </Form.Group>
                    <Button type="submit" className="mt-3">
                      Signin
                    </Button>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  Don&apos;t have an account?
                  <a href="/auth/signup"> Sign up</a>
                  <Button href="/auth/loginPage" variant="primary" className="float-end">
                    Back
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default SignIn;