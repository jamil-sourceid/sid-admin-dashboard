import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  TWO_FA_REQUEST,
  TWO_FA_SUCCESS,
  TWO_FA_FAILURE,
  SSO_LOGIN_REQUEST,
  SSO_LOGIN_SUCCESS,
  SSO_LOGIN_FAILURE,
  LoginRequestAction,
  LoginSuccessAction,
  LoginFailureAction,
  LogoutAction,
  TwoFaRequestAction,
  TwoFaSuccessAction,
  TwoFaFailureAction,
  SsoLoginRequestAction,
  SsoLoginSuccessAction,
  SsoLoginFailureAction,
  SetMfaDataAction,
  SetUserProfileAction,
  SET_MFA_DATA,
  SET_USER_PROFILE,
} from './types';

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface TwoFaRequestPayload {
  email: string;
  mfaCode: string;
}

export interface SsoLoginRequestPayload {
  token: string;
}

export const loginRequest = (payload: LoginRequestPayload): LoginRequestAction => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = (error: string): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: { error },
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});

export const twoFaRequest = (payload: TwoFaRequestPayload): TwoFaRequestAction => ({
  type: TWO_FA_REQUEST,
  payload,
});

export const twoFaSuccess = (): TwoFaSuccessAction => ({
  type: TWO_FA_SUCCESS,
});

export const twoFaFailure = (error: string): TwoFaFailureAction => ({
  type: TWO_FA_FAILURE,
  payload: { error },
});
export const setMfaData = (payload: {
  isMfaLogin: boolean;
  qrCode: string | null;
  userEmail: string;
}): SetMfaDataAction => ({
  type: SET_MFA_DATA,
  payload,
});

export const setUserProfile = (payload: {
  userId: string;
  userName: string;
  userEmail: string;
}): SetUserProfileAction => ({
  type: SET_USER_PROFILE,
  payload,
});

export const ssoLoginRequest = (payload: SsoLoginRequestPayload): SsoLoginRequestAction => ({
  type: SSO_LOGIN_REQUEST,
  payload,
});

export const ssoLoginSuccess = (): SsoLoginSuccessAction => ({
  type: SSO_LOGIN_SUCCESS,
});

export const ssoLoginFailure = (error: string): SsoLoginFailureAction => ({
  type: SSO_LOGIN_FAILURE,
  payload: { error },
});
