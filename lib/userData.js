import { getToken } from './authenticate';

const API = process.env.NEXT_PUBLIC_API_URL;

function authHeader() {
  return { Authorization: `JWT ${getToken()}` };
}

export async function getFavourites() {
  const res = await fetch(`${API}/api/user/favourites`, { headers: authHeader() });
  if (res.status === 200) return res.json();
  return [];
}

export async function addToFavourites(id) {
  const res = await fetch(`${API}/api/user/favourites/${id}`, {
    method: 'PUT',
    headers: authHeader()
  });
  if (res.status === 200) return res.json();
  return [];
}

export async function removeFromFavourites(id) {
  const res = await fetch(`${API}/api/user/favourites/${id}`, {
    method: 'DELETE',
    headers: authHeader()
  });
  if (res.status === 200) return res.json();
  return [];
}