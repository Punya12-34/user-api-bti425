import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import { registerUser } from '@/lib/authenticate';

export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [warning, setWarning] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(user, password, password2);
      router.push('/login');
    } catch (err) {
      setWarning(err.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <Card>
        <Card.Body>
          <h2>Register</h2>
          <p>Register for an account:</p>
          {warning && <Alert variant="danger">{warning}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={user}
                onChange={e => setUser(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="w-100">Register</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}