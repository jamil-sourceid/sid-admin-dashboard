interface ApiConfig {
  BASE_URL: string;
  CLOUDFRONT_URL: string;
}

const API_CONFIG: Record<string, ApiConfig> = {
  rd: {
    BASE_URL: 'https://core-api.rd.usesourceid.com/v1/api',
    CLOUDFRONT_URL: 'https://d2el06pz926wsm.cloudfront.net',
  },
  sbx: {
    BASE_URL: 'https://core-api.rd.usesourceid.com/v1/api',
    CLOUDFRONT_URL: 'https://d2el06pz926wsm.cloudfront.net',
  },
  uat: {
    BASE_URL: 'https://core-api.rd.usesourceid.com/v1/api',
    CLOUDFRONT_URL: 'https://d2el06pz926wsm.cloudfront.net',
  },
  prod: {
    BASE_URL: 'https://core-api.rd.usesourceid.com/v1/api',
    CLOUDFRONT_URL: 'https://d2el06pz926wsm.cloudfront.net',
  },
};

const ENV: string = process.env.NODE_ENV || 'rd';

export const AES_ENCRYPTION_MASTER_KEY =
  process.env.REACT_APP_AES_ENCRYPTION_MASTER_KEY || '';
export const AES_ENCRYPTION_MASTER_IV =
  process.env.REACT_APP_AES_ENCRYPTION_MASTER_IV || '';

export const CLOUDFRONT_URL = (API_CONFIG[ENV] || API_CONFIG.rd).CLOUDFRONT_URL;

export default API_CONFIG[ENV] || API_CONFIG.rd;
