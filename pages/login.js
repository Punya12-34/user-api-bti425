import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import { authenticateUser } from '@/lib/authenticate';
import { getFavourites } from '@/lib/userData';
import { favouritesAtom } from '@/store';

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtom();
      router.push('/');
    } catch (err) {
      setWarning(err.response?.data?.message || 'Invalid credentials');
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <Card>
        <Card.Body>
          <h2>Login</h2>
          <p>Sign in to your account:</p>
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
            <Button type="submit" className="w-100">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}