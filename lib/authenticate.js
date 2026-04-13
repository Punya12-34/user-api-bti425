import axios from 'axios';
import * as jose from 'jose';

export async function registerUser(user, password, password2) {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, {
    userName: user,
    password,
    password2
  });
  return res.data;
}

export async function authenticateUser(user, password) {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, {
    userName: user,
    password
  });
  if (res.data.token) {
    setToken(res.data.token);
    return true;
  }
  return false;
}

export function setToken(token) {
  localStorage.setItem('access_token', token);
}

export function getToken() {
  return localStorage.getItem('access_token');
}

export function removeToken() {
  localStorage.removeItem('access_token');
}

export function readToken() {
  const token = getToken();
  if (!token) return null;
  try {
    return jose.decodeJwt(token);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!readToken();
}