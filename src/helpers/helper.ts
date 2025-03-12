import {
  AES_ENCRYPTION_MASTER_IV,
  AES_ENCRYPTION_MASTER_KEY,
} from 'setup/config/apiConfig';
import CryptoJS from 'crypto-js';

export function numberWithCommas(x: string): string {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '';
}

export const signOut = (): void => {
  localStorage.removeItem('authToken');
  window.location.reload();
};

export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
};

export const calculateExpiryDate = (period: string): string => {
  if (period === 'never') return '9999-12-31';
  const days = parseInt(period);
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
};
export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export const encryptPassword = (plaintext: string): string => {
  const key = CryptoJS.enc.Base64.parse(AES_ENCRYPTION_MASTER_KEY);
  const iv = CryptoJS.enc.Base64.parse(AES_ENCRYPTION_MASTER_IV);

  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return encrypted.toString();
};
