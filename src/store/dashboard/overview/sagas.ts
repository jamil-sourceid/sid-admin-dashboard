import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getData } from '../../../setup/config/api';
import { notify } from '../../../components/toast/utils';
import { AxiosError } from 'axios';
import {
  FETCH_OVERVIEW_REQUEST,
  FETCH_OVERVIEW_SUCCESS,
  FETCH_OVERVIEW_FAILURE,
  OverviewResponse,
} from './types';

function* handleFetchOverview(): SagaIterator {
  try {
    const response = (yield call(getData, '/dashboard/overview')) as {
      data: OverviewResponse;
    };

    if (response?.data?.data) {
      yield put({
        type: FETCH_OVERVIEW_SUCCESS,
        payload: response.data.data,
      });
      return;
    }

    throw new Error(response?.data?.message || 'Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to fetch overview data. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put({
      type: FETCH_OVERVIEW_FAILURE,
      payload: { error: errMessage },
    });

    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

export function* OverviewSaga(): SagaIterator {
  yield takeLatest(FETCH_OVERVIEW_REQUEST, handleFetchOverview);
}
