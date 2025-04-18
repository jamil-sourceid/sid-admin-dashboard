import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AxiosError } from 'axios';
import { getData, postData, patchData } from '@/setup/config/api';
import { notify } from '@/components/toast/utils';
import {
  FETCH_ORGANISATIONS_REQUEST,
  CREATE_ORGANISATION_REQUEST,
  UPDATE_ORGANISATION_REQUEST,
  TOGGLE_ORGANISATION_MFA_REQUEST,
  FetchOrganisationsRequestAction,
  CreateOrganisationRequestAction,
  UpdateOrganisationRequestAction,
  ToggleOrganisationMfaRequestAction,
  OrganizationsResponse,
  CreateOrganizationResponse,
  UpdateOrganizationResponse,
  ToggleOrganizationMfaResponse,
} from './types';
import {
  fetchOrganisationsSuccess,
  fetchOrganisationsFailure,
  createOrganisationSuccess,
  createOrganisationFailure,
  updateOrganisationSuccess,
  updateOrganisationFailure,
  toggleOrganisationMfaSuccess,
  toggleOrganisationMfaFailure,
} from './actions';

function* handleFetchOrganisations(action: FetchOrganisationsRequestAction): SagaIterator {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      startDate,
      endDate,
      mfaIsEnabled,
    } = action.payload || {};

    // Create query params object first
    const params: Record<string, string> = {
      page: String(page),
      limit: String(limit),
    };

    // Add optional params only if they are defined
    if (search) params.search = search;
    if (status) params.status = status;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (mfaIsEnabled !== undefined) params.mfaIsEnabled = String(mfaIsEnabled);

    // Convert to URLSearchParams
    const queryParams = new URLSearchParams(params).toString();

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

function* handleCreateOrganisation(action: CreateOrganisationRequestAction): SagaIterator {
  try {
    const response = (yield call(postData, '/organization', action.payload)) as {
      data: CreateOrganizationResponse;
    };

    if (response?.data) {
      yield put(createOrganisationSuccess(response.data));
      notify(
        {
          title: 'Success',
          text: 'Organization created successfully!',
        },
        'success'
      );
      return;
    }

    throw new Error('Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to create organisation. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put(createOrganisationFailure(errMessage));
    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

function* handleUpdateOrganisation(action: UpdateOrganisationRequestAction): SagaIterator {
  try {
    const { organizationId, ...updateData } = action.payload;
    const response = (yield call(patchData, `/organization/${organizationId}`, updateData)) as {
      data: UpdateOrganizationResponse;
    };

    if (response?.data) {
      yield put(updateOrganisationSuccess(response.data));
      notify(
        {
          title: 'Success',
          text: 'Organization updated successfully!',
        },
        'success'
      );
      return;
    }

    throw new Error('Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to update organisation. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put(updateOrganisationFailure(errMessage));
    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

function* handleToggleOrganisationMfa(action: ToggleOrganisationMfaRequestAction): SagaIterator {
  try {
    const { organizationId, mfaIsEnabled } = action.payload;
    const response = (yield call(patchData, `/organization/toggle-settings/${organizationId}`, {
      mfaIsEnabled,
    })) as { data: ToggleOrganizationMfaResponse };

    if (response?.data) {
      yield put(toggleOrganisationMfaSuccess(response.data));
      notify(
        {
          title: 'Success',
          text: `MFA ${mfaIsEnabled ? 'enabled' : 'disabled'} successfully!`,
        },
        'success'
      );
      return;
    }

    throw new Error('Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to toggle MFA settings. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put(toggleOrganisationMfaFailure(errMessage));
    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

export function* organisationSaga(): Generator {
  yield takeLatest(FETCH_ORGANISATIONS_REQUEST, handleFetchOrganisations);
  yield takeLatest(CREATE_ORGANISATION_REQUEST, handleCreateOrganisation);
  yield takeLatest(UPDATE_ORGANISATION_REQUEST, handleUpdateOrganisation);
  yield takeLatest(TOGGLE_ORGANISATION_MFA_REQUEST, handleToggleOrganisationMfa);
}
