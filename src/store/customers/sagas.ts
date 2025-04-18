import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getData, postData } from '@/setup/config/api';
import { notify } from '@/components/toast/utils';
import { AxiosError } from 'axios';
import {
  FETCH_ACCOUNTS_REQUEST,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE,
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
  FETCH_VERIFICATION_LOGS_REQUEST,
  FETCH_IDENTITY_SUCCESS,
  FETCH_IDENTITY_FAILURE,
  FETCH_VERIFICATION_LOGS_SUCCESS,
  FETCH_VERIFICATION_LOGS_FAILURE,
  FETCH_IDENTITY_REQUEST,
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILURE,
  AccountsResponse,
  CustomerResponse,
  Identity,
  VerificationLog,
  AddCustomerRequestAction,
  AddCustomerResponse,
} from './types';

function* handleFetchAccounts(action: {
  type: string;
  payload?: {
    page?: number;
    limit?: number;
    type?: string;
    searchString?: string;
    verified?: boolean;
  };
}): SagaIterator {
  try {
    const { page = 1, limit = 50, type, searchString, verified } = action.payload || {};

    const response = (yield call(postData, '/customer/kyc-kyb', {
      page,
      limit,
      type,
      searchString,
      verified,
    })) as {
      data: AccountsResponse & {
        meta: {
          page: number;
          limit: number;
          total: number;
          count: number;
          verified: boolean;
        };
      };
    };

    if (response?.data?.data) {
      yield put({
        type: FETCH_ACCOUNTS_SUCCESS,
        payload: {
          accounts: response.data.data,
          meta: response.data.meta,
        },
      });
      return;
    }

    throw new Error(response?.data?.message || 'Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to fetch accounts. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put({
      type: FETCH_ACCOUNTS_FAILURE,
      payload: { error: errMessage },
    });

    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

function* handleFetchCustomerInfo(action: { type: string; payload: string }): SagaIterator {
  try {
    const customerId = action.payload;

    const response = (yield call(getData, `/customer/kyc-kyb/${customerId}`)) as {
      data: CustomerResponse;
    };

    if (response?.data?.data) {
      yield put({
        type: FETCH_CUSTOMER_SUCCESS,
        payload: response.data.data,
      });
      return;
    }

    throw new Error(response?.data?.message || 'Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to fetch customer info. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put({
      type: FETCH_CUSTOMER_FAILURE,
      payload: { error: errMessage },
    });

    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

function* handleFetchIdentity(action: {
  type: string;
  payload: { customerId: string };
}): SagaIterator {
  try {
    const { customerId } = action.payload;

    const response = (yield call(getData, `/customer/identity/${customerId}`)) as {
      data: {
        message: string;
        data: Identity[];
        meta: {
          page: number;
          limit: number;
          total: number;
          count: number;
        };
      };
    };

    if (response?.data?.data) {
      yield put({
        type: FETCH_IDENTITY_SUCCESS,
        payload: {
          data: response.data.data,
          meta: response.data.meta,
        },
      });
      return;
    }

    throw new Error(response?.data?.message || 'Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to fetch identity info. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put({
      type: FETCH_IDENTITY_FAILURE,
      payload: { error: errMessage },
    });

    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

function* handleFetchVerificationLogs(action: {
  type: string;
  payload: { customerId: string };
}): SagaIterator {
  try {
    const { customerId } = action.payload;

    const response = (yield call(getData, `/customer/verification-logs/${customerId}`)) as {
      data: {
        message: string;
        data: VerificationLog[];
        meta: {
          page: number;
          limit: number;
          total: number;
          count: number;
        };
      };
    };

    if (response?.data?.data) {
      yield put({
        type: FETCH_VERIFICATION_LOGS_SUCCESS,
        payload: {
          data: response.data.data,
          meta: response.data.meta,
        },
      });
      return;
    }

    throw new Error(response?.data?.message || 'Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to fetch verification logs. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put({
      type: FETCH_VERIFICATION_LOGS_FAILURE,
      payload: { error: errMessage },
    });

    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

function* handleAddCustomer(action: AddCustomerRequestAction): SagaIterator {
  try {
    const response = (yield call(postData, '/customer/kyc-kyb/create', action.payload)) as {
      data: AddCustomerResponse;
    };

    if (response?.data) {
      yield put({
        type: ADD_CUSTOMER_SUCCESS,
        payload: response.data,
      });

      notify(
        {
          title: 'Success',
          text: 'Customer added successfully!',
        },
        'success'
      );
      return;
    }

    throw new Error('Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to add customer. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put({
      type: ADD_CUSTOMER_FAILURE,
      payload: { error: errMessage },
    });

    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

export function* CustomersSaga(): SagaIterator {
  yield takeLatest(FETCH_ACCOUNTS_REQUEST, handleFetchAccounts);
  yield takeLatest(FETCH_CUSTOMER_REQUEST, handleFetchCustomerInfo);
  yield takeLatest(FETCH_IDENTITY_REQUEST, handleFetchIdentity);
  yield takeLatest(FETCH_VERIFICATION_LOGS_REQUEST, handleFetchVerificationLogs);
  yield takeLatest(ADD_CUSTOMER_REQUEST, handleAddCustomer);
}
