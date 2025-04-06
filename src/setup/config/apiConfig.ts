interface ApiConfig {
  BASE_URL: string;
  CLOUDFRONT_URL: string;
}

const API_CONFIG: Record<string, ApiConfig> = {
  rd: {
    BASE_URL: "https://core-api.rd.usesourceid.com/v1/api",
    CLOUDFRONT_URL: "https://d2el06pz926wsm.cloudfront.net",
  },
  sbx: {
    BASE_URL: "https://core-api.sbx.sourceid.tech/v1/api",
    CLOUDFRONT_URL: "https://d2bk45i9s8apyt.cloudfront.net",
  },
  uat: {
    BASE_URL: "https://core-api.uat.usesourceid.com/v1/api",
    CLOUDFRONT_URL: "https://dlskm261vx6r8.cloudfront.net",
  },
  prod: {
    BASE_URL: "https://core-api.sourceid.tech/v1/api",
    CLOUDFRONT_URL: "https://d2aml8s3eynmoo.cloudfront.net",
  },
};

export const ENV: string =
  typeof window !== "undefined"
    ? window.location.hostname.includes("localhost")
      ? "rd" // Use "rd" for localhost
      : window.location.hostname.split(".").length >= 2
      ? window.location.hostname.split(".")[1] // Get the second part of the hostname
      : "prod" // Default to "prod" if no subdomain is found
    : "prod"; // Default to "prod" if running in SSR (server-side rendering)

export const CLOUDFRONT_URL = (API_CONFIG[ENV] || API_CONFIG.rd).CLOUDFRONT_URL;

export default API_CONFIG[ENV] || API_CONFIG.rd;
