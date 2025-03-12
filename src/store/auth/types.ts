export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const TWO_FA_REQUEST = 'TWO_FA_REQUEST';
export const TWO_FA_SUCCESS = 'TWO_FA_SUCCESS';
export const TWO_FA_FAILURE = 'TWO_FA_FAILURE';
export const SET_MFA_DATA = 'auth/SET_MFA_DATA';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  isTwoFaRequired: boolean;
  isMfaLogin: boolean;
  qrCode: string | null;
  requiresMfa: boolean;
  userEmail: string;
}

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload?: {
    requiresMfa: boolean;
  };
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: string;
  };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface TwoFaRequestAction {
  type: typeof TWO_FA_REQUEST;
  payload: {
    email: string;
    mfaCode: string;
  };
}

export interface TwoFaSuccessAction {
  type: typeof TWO_FA_SUCCESS;
}

export interface TwoFaFailureAction {
  type: typeof TWO_FA_FAILURE;
  payload: {
    error: string;
  };
}

export interface SetMfaDataAction {
  type: typeof SET_MFA_DATA;
  payload: {
    userEmail: string;
    isMfaLogin: boolean;
    qrCode: string | null;
  };
}

export type AuthActions =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | TwoFaRequestAction
  | TwoFaSuccessAction
  | TwoFaFailureAction
  | SetMfaDataAction;
