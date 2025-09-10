export interface DecodedToken {
  userId?: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

// Browser-compatible JWT decoder
const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    const payload = parts[1];
    // Add padding if needed
    const paddedPayload = payload.padEnd(payload.length + (4 - payload.length % 4) % 4, '=');
    const decodedPayload = atob(paddedPayload);

    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT payload:', error);
    return null;
  }
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    // Remove 'Bearer ' prefix if present
    const cleanToken = token.replace('Bearer ', '');

    // Decode the token payload (we only need the payload, not header/signature verification)
    const decoded = decodeJwtPayload(cleanToken) as DecodedToken;

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
