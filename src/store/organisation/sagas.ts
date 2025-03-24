import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AxiosError } from 'axios';
import { getData } from '../../setup/config/api';
import { notify } from '../../components/toast/utils';
import {
  FETCH_ORGANISATIONS_REQUEST,
  FetchOrganisationsRequestAction,
  OrganizationsResponse,
} from './types';
import {
  fetchOrganisationsSuccess,
  fetchOrganisationsFailure,
} from './actions';

function* handleFetchOrganisations(
  action: FetchOrganisationsRequestAction
): SagaIterator {
  try {
    const { page = 1, limit = 50, search, status } = action.payload || {};
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(search ? { search } : {}),
      ...(status ? { status } : {}),
    }).toString();

    const response = (yield call(
      getData,
      `/organization${queryParams ? `?${queryParams}` : ''}`
    )) as { data: OrganizationsResponse };

    if (response?.data) {
      yield put(fetchOrganisationsSuccess(response.data));
      return;
    }

    throw new Error('Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to fetch organisations. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put(fetchOrganisationsFailure(errMessage));
    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

export function* organisationSaga(): Generator {
  yield takeLatest(FETCH_ORGANISATIONS_REQUEST, handleFetchOrganisations);
} 