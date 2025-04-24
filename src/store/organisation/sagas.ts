import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AxiosError } from 'axios';
import { getData, postData, patchData, deleteData } from '@/setup/config/api';
import { notify } from '@/components/toast/utils';
import {
  FETCH_ORGANISATIONS_REQUEST,
  CREATE_ORGANISATION_REQUEST,
  UPDATE_ORGANISATION_REQUEST,
  TOGGLE_ORGANISATION_MFA_REQUEST,
  FETCH_ORGANISATION_STAFF_REQUEST,
  DELETE_STAFF_REQUEST,
  CREATE_STAFF_REQUEST,
  FetchOrganisationsRequestAction,
  CreateOrganisationRequestAction,
  UpdateOrganisationRequestAction,
  ToggleOrganisationMfaRequestAction,
  OrganizationsResponse,
  CreateOrganizationResponse,
  UpdateOrganizationResponse,
  ToggleOrganizationMfaResponse,
  FetchOrganisationStaffRequestAction,
  DeleteStaffRequestAction,
  CreateStaffRequestAction,
  OrganizationStaffResponse,
  DeleteStaffResponse,
  CreateStaffResponse,
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
  fetchOrganisationStaffSuccess,
  fetchOrganisationStaffFailure,
  deleteStaffSuccess,
  deleteStaffFailure,
  createStaffSuccess,
  createStaffFailure,
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

function* handleFetchOrganisationStaff(action: FetchOrganisationStaffRequestAction): SagaIterator {
  try {
    const {
      organizationId,
      page = 1,
      limit = 10,
      search,
    } = action.payload;

    // Create query params
    const params: Record<string, string> = {
      page: String(page),
      limit: String(limit),
    };

    // Add optional search param
    if (search) params.search = search;

    // Convert to URLSearchParams
    const queryParams = new URLSearchParams(params).toString();

    // Use the correct API endpoint based on documentation
    const response = (yield call(
      getData,
      `/staff/admin/admin/${organizationId}${queryParams ? `?${queryParams}` : ''}`
    )) as { data: OrganizationStaffResponse };

    if (response?.data) {
      yield put(fetchOrganisationStaffSuccess(response.data));
      return;
    }

    throw new Error('Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to fetch staff members. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put(fetchOrganisationStaffFailure(errMessage));
    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

function* handleDeleteStaff(action: DeleteStaffRequestAction): SagaIterator {
  try {
    const { staffId, organizationId } = action.payload;

    // API endpoint for deleting a staff member - update to match the pattern of the get endpoint
    const response = (yield call(
      deleteData,
      `/staff/admin/${staffId}`
    )) as { data: DeleteStaffResponse };

    if (response?.data) {
      yield put(deleteStaffSuccess(staffId, response.data.message || 'Staff member deleted successfully'));
      notify(
        {
          title: 'Success',
          text: 'Staff member deleted successfully',
        },
        'success'
      );
      return;
    }

    throw new Error('Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to delete staff member. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put(deleteStaffFailure(errMessage));
    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

function* handleCreateStaff(action: CreateStaffRequestAction): SagaIterator {
  try {
    // API endpoint for creating a staff member
    const response = (yield call(
      postData,
      '/admin/staff',
      action.payload
    )) as { data: CreateStaffResponse };

    if (response?.data) {
      yield put(createStaffSuccess(response.data));
      notify(
        {
          title: 'Success',
          text: 'Staff member created successfully',
        },
        'success'
      );
      return;
    }

    throw new Error('Invalid response format');
  } catch (error: unknown) {
    let errMessage = 'Failed to create staff member. Please try again.';

    if (error instanceof AxiosError) {
      errMessage = error.response?.data?.message || error.message || errMessage;
    } else if (error instanceof Error) {
      errMessage = error.message;
    } else {
      errMessage = String(error);
    }

    yield put(createStaffFailure(errMessage));
    notify({ title: 'Error', text: errMessage }, 'error');
  }
}

export function* organisationSaga(): Generator {
  yield takeLatest(FETCH_ORGANISATIONS_REQUEST, handleFetchOrganisations);
  yield takeLatest(CREATE_ORGANISATION_REQUEST, handleCreateOrganisation);
  yield takeLatest(UPDATE_ORGANISATION_REQUEST, handleUpdateOrganisation);
  yield takeLatest(TOGGLE_ORGANISATION_MFA_REQUEST, handleToggleOrganisationMfa);
  yield takeLatest(FETCH_ORGANISATION_STAFF_REQUEST, handleFetchOrganisationStaff);
  yield takeLatest(DELETE_STAFF_REQUEST, handleDeleteStaff);
  yield takeLatest(CREATE_STAFF_REQUEST, handleCreateStaff);
}
