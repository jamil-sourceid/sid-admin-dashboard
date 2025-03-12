export interface LoginResponse {
  data: {
    twoFaEnabled: unknown | string | number;
    message: string;
    data: {
      qrCode: null;
      isMfaLogin: boolean;
    };
  };
  headers: { 'x-access-token'?: string; 'Is-Mfa-Login'?: string };
}

export interface TwoFALoginResponse {
  headers: { 'x-access-token'?: string };
  data: {
    message: string;
    data: {
      token: string;
    };
  };
}

export interface EncryptionResponse {
  data: {
    data: {
      enableAppLevelPasswordEncryption: boolean;
      key: string;
    };
  };
}
