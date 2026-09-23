import { LoginResponse, UserProfile } from '../types/auth';

const API_URL = 'https://dummyjson.com';

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });

  if (!response.ok) {
    throw new Error('Invalid username or password.');
  }

  return await response.json();
}

export async function getProfile(token: string): Promise<UserProfile> {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error('SESSION_EXPIRED');
  }

  if (!response.ok) {
    throw new Error('Unable to load profile.');
  }

  return await response.json();
}