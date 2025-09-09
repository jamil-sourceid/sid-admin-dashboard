import jwt from 'jsonwebtoken';

export interface DecodedToken {
  userId?: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    // Remove 'Bearer ' prefix if present
    const cleanToken = token.replace('Bearer ', '');

    // Decode the token without verification (since we don't have the secret)
    const decoded = jwt.decode(cleanToken) as DecodedToken;

    if (!decoded) {
      console.warn('Failed to decode JWT token');
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
};

export const getUserFromToken = (token: string | null): { name: string; email: string } | null => {
  if (!token) return null;

  const decoded = decodeToken(token);
  if (!decoded) return null;

  // Try different possible fields for name
  const name = decoded.name || decoded.firstName || decoded.lastName
    ? `${decoded.firstName || ''} ${decoded.lastName || ''}`.trim()
    : decoded.email?.split('@')[0] || 'User';

  const email = decoded.email || '';

  return { name, email };
};
