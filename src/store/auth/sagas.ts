import { call, put, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SSO_LOGIN_REQUEST,
  SSO_LOGIN_SUCCESS,
  SSO_LOGIN_FAILURE,
  LoginRequestAction,
  TWO_FA_REQUEST,
  TWO_FA_FAILURE,
  TWO_FA_SUCCESS,
  TwoFaRequestAction,
  SsoLoginRequestAction,
  SET_MFA_DATA,
} from './types';
import { postData } from '@/setup/config/api';
import { LoginResponse, TwoFALoginResponse } from './model';
import { notify } from '@/components/toast/utils';
import { AxiosError } from 'axios';
import { getUserFromToken } from '@/helpers/jwtDecode';
import { setUserProfile } from './actions';

function* handleLogin(action: LoginRequestAction): Generator {
  try {
    const { email, password } = action.payload;

    const response = (yield call(
      postData<LoginResponse, { email: string; password: string }>,
      '/auth/admin/login',
      {
        email,
        password: password,
      }
    )) as LoginResponse;

    const token = response.headers['x-access-token'];
    const isMfaLogin = response?.data?.data?.isMfaLogin ?? false;
    const qrCode = response?.data?.data?.qrCode ?? null;

    if (isMfaLogin) {
      yield put({
        type: SET_MFA_DATA,
        payload: {
          isMfaLogin,
          qrCode,
          userEmail: email,
        },
      });
    }

    if (token) {
      const fullToken = `Bearer ${token}`;
      sessionStorage.setItem('authToken', fullToken);

      // Decode token and store user profile
      const userInfo = getUserFromToken(fullToken);
      if (userInfo) {
        yield put(setUserProfile({
          userId: '', // We'll get this from the token if available
          userName: userInfo.name,
          userEmail: userInfo.email,
        }));
      }
    }

    if (!isMfaLogin) {
      yield put({ type: LOGIN_SUCCESS });
      notify(
        {
          title: 'Login Successful',
          text: 'Success',
        },
        'success'
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      yield put({ type: LOGIN_SUCCESS, payload: { requiresMfa: true } });
    }
  } catch (error: unknown) {
    const errMessage =
      error instanceof AxiosError && error.response
        ? error.response.data.message
        : error instanceof Error
          ? error.message
          : 'An unknown error occurred';
    notify(
      {
        title: errMessage,
        text: 'Error',
      },
      'error'
    );
    yield put({ type: LOGIN_FAILURE, payload: { error: errMessage } });
  }
}

function* handleTwoFaLogin(action: TwoFaRequestAction): Generator {
  try {
    const { email, mfaCode } = action.payload;

    const response = (yield call(
      postData<TwoFALoginResponse, { email: string; mfaCode: string }>,
      '/auth/admin/complete-mfa-login',
      {
        email,
        mfaCode,
      }
    )) as TwoFALoginResponse;

    const token = response.headers['x-access-token'];

    if (token) {
      const fullToken = `Bearer ${token}`;
      sessionStorage.setItem('authToken', fullToken);

      // Decode token and store user profile
      const userInfo = getUserFromToken(fullToken);
      if (userInfo) {
        yield put(setUserProfile({
          userId: '', // We'll get this from the token if available
          userName: userInfo.name,
          userEmail: userInfo.email,
        }));
      }
    } else {
      throw new Error();
    }

    notify(
      {
        title: 'Login Successful',
        text: 'Success',
      },
      'success'
    );

    yield put({ type: TWO_FA_SUCCESS });

    setTimeout(() => {
      sessionStorage.removeItem('userEmail');
      window.location.reload();
    }, 1000);
  } catch (error: unknown) {
    let errMessage = 'An unknown error occurred';

    if (typeof error === 'object' && error !== null) {
      if ('response' in error && typeof error.response === 'object' && error.response !== null) {
        const response = error.response as { data?: { message?: string } };
        if (response.data?.message) {
          errMessage = response.data.message;
        }
      } else if ('message' in error && typeof error.message === 'string') {
        errMessage = error.message;
      }
    }

    notify(
      {
        title: errMessage,
        text: 'Error',
      },
      'error'
    );

    yield put({ type: TWO_FA_FAILURE, payload: { error: errMessage } });
  }
}

function* handleSsoLogin(action: SsoLoginRequestAction): Generator {
  try {
    const { token } = action.payload;

    console.log('SSO Login: Processing token:', token);

    // For SSO, the JWT token from the URL is the auth token
    // Store it directly as the authentication token
    const fullToken = `Bearer ${token}`;
    sessionStorage.setItem('authToken', fullToken);

    console.log('SSO Login: Token stored in sessionStorage');

    // Decode token and store user profile
    const userInfo = getUserFromToken(fullToken);
    if (userInfo) {
      yield put(setUserProfile({
        userId: '', // We'll get this from the token if available
        userName: userInfo.name,
        userEmail: userInfo.email,
      }));
      console.log('SSO Login: User profile stored:', userInfo);
    }
    // Verify token was stored
    const storedToken = sessionStorage.getItem('authToken');
    console.log('SSO Login: Verifying stored token:', storedToken ? 'Present' : 'Missing');

    yield put({ type: SSO_LOGIN_SUCCESS });

    notify(
      {
        title: 'Login Successful',
        text: 'Welcome back!',
      },
      'success'
    );

    // Redirect to dashboard after successful login
    // Use window.location.reload to ensure useAuthRedirect hook re-checks the token
    setTimeout(() => {
      console.log('SSO Login: Redirecting to dashboard');
      window.location.href = '/dashboard';
    }, 1000);

  } catch (error: unknown) {
    console.error('SSO Login: Error occurred:', error);

    const errMessage =
      error instanceof Error
        ? error.message
        : 'An unknown error occurred during SSO login';

    notify(
      {
        title: 'SSO Login Failed',
        text: errMessage,
      },
      'error'
    );

    yield put({ type: SSO_LOGIN_FAILURE, payload: { error: errMessage } });

    // Clear any partial auth data
    sessionStorage.removeItem('authToken');

    // Redirect back to sign-in page on failure
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  }
}

export default function* authSaga(): Generator {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(TWO_FA_REQUEST, handleTwoFaLogin);
  yield takeLatest(SSO_LOGIN_REQUEST, handleSsoLogin);
}
