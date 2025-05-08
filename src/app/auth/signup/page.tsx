'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row, Alert } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';
import { useState } from 'react';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

/** The sign up page. */
const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords do not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    setErrorMessage(null); // Clear any previous error messages

    try {
      // Attempt to create the user
      await createUser(data);

      // After creating, sign in with redirect to the landing page
      await signIn('credentials', { callbackUrl: '/LandPage', ...data });
    } catch (error) {
      if (error instanceof Error) {
        // Handle specific errors
        if (error.message.includes('duplicate key value')) {
          setErrorMessage('The email is already taken. Please use a different email.');
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      } else {
        // Handle non-Error objects (fallback)
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <main>
      <div style={{ backgroundImage: 'url(/login-background.jpg)', height: '100vh', backgroundSize: 'cover' }}>
        <Container>
          <Row className="justify-content-center">
            <Col xs={5}>
              <h1 className="text-center" style={{ color: 'white' }}>Sign Up</h1>
              <Card>
                <Card.Body>
                  {errorMessage && (
                    <Alert variant="danger" className="text-center">
                      {errorMessage}
                    </Alert>
                  )}
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="form-group">
                      <Form.Label>Email</Form.Label>
                      <input
                        type="text"
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.email?.message}</div>
                    </Form.Group>

                    <Form.Group className="form-group">
                      <Form.Label>Password</Form.Label>
                      <input
                        type="password"
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.password?.message}</div>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Confirm Password</Form.Label>
                      <input
                        type="password"
                        {...register('confirmPassword')}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </Form.Group>
                    <Form.Group className="form-group py-3">
                      <Row>
                        <Col>
                          <Button type="submit" className="btn btn-primary">
                            Register
                          </Button>
                        </Col>
                        <Col>
                          <Button type="button" onClick={() => reset()} className="btn btn-warning float-right">
                            Reset
                          </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                </Card.Body>
                <Card.Footer>
                  Already have an account?
                  <a href="/auth/signin">Sign in</a>
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

export default SignUp;