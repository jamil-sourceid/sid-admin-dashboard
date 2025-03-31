import { call, put, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LoginRequestAction,
  TWO_FA_REQUEST,
  TWO_FA_FAILURE,
  TWO_FA_SUCCESS,
  TwoFaRequestAction,
  SET_MFA_DATA,
} from './types';
import { postData } from '../../setup/config/api';
import { LoginResponse, TwoFALoginResponse } from './model';
import { notify } from '../../components/toast/utils';
import { AxiosError } from 'axios';

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
      localStorage.setItem('authToken', token);
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
      localStorage.setItem('authToken', token);
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
      localStorage.removeItem('userEmail');
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

export default function* authSaga(): Generator {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(TWO_FA_REQUEST, handleTwoFaLogin);
}
