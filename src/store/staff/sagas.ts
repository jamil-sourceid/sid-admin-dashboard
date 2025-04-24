import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  FETCH_STAFF_REQUEST,
  FETCH_STAFF_BY_ID_REQUEST,
  CREATE_STAFF_REQUEST,
  UPDATE_STAFF_REQUEST,
  DELETE_STAFF_REQUEST,
  FetchStaffRequestAction,
  FetchStaffByIdRequestAction,
  CreateStaffRequestAction,
  UpdateStaffRequestAction,
  DeleteStaffRequestAction,
  StaffResponse,
  StaffByIdResponse,
  CreateStaffResponse,
  UpdateStaffResponse,
  DeleteStaffResponse
} from './types';
import {
  fetchStaffSuccess,
  fetchStaffFailure,
  fetchStaffByIdSuccess,
  fetchStaffByIdFailure,
  createStaffSuccess,
  createStaffFailure,
  updateStaffSuccess,
  updateStaffFailure,
  deleteStaffSuccess,
  deleteStaffFailure
} from './actions';
import staffService from '../../services/staff';

// Worker Sagas
function* fetchStaffSaga(action: FetchStaffRequestAction): SagaIterator {
  try {
    const params = action.payload;
    // @ts-ignore
    const response = yield call(staffService.getStaffList.bind(staffService), params);
    yield put(fetchStaffSuccess({
      data: response.data,
      meta: {
        totalItems: response.pagination.totalItems,
        itemCount: response.data.length,
        itemsPerPage: response.pagination.totalItems / response.pagination.totalPages,
        totalPages: response.pagination.totalPages,
        currentPage: response.pagination.currentPage
      }
    }));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch staff list';
    yield put(fetchStaffFailure(errorMessage));
  }
}

function* fetchStaffByIdSaga(action: FetchStaffByIdRequestAction): SagaIterator {
  try {
    const { staffId } = action.payload;
    // @ts-ignore
    const staffMember = yield call(staffService.getStaffById.bind(staffService), staffId);
    yield put(fetchStaffByIdSuccess({ data: staffMember }));
  } catch (error: unknown) {
    let errorMessage = 'Failed to fetch staff details';
    
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as any;
      if (axiosError.response?.status === 404) {
        errorMessage = 'Staff member not found. They may have been deleted or moved to a different organization.';
      } else if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    yield put(fetchStaffByIdFailure(errorMessage));
  }
}

function* createStaffSaga(action: CreateStaffRequestAction): SagaIterator {
  try {
    const staffData = action.payload;
    // @ts-ignore
    const newStaff = yield call(staffService.createStaff.bind(staffService), staffData);
    yield put(createStaffSuccess({
      data: newStaff,
      message: 'Staff member created successfully'
    }));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create staff';
    yield put(createStaffFailure(errorMessage));
  }
}

function* updateStaffSaga(action: UpdateStaffRequestAction): SagaIterator {
  try {
    const staffData = action.payload;
    // @ts-ignore
    const updatedStaff = yield call(staffService.updateStaff.bind(staffService), staffData);
    yield put(updateStaffSuccess({
      data: updatedStaff,
      message: 'Staff member updated successfully'
    }));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update staff';
    yield put(updateStaffFailure(errorMessage));
  }
}

function* deleteStaffSaga(action: DeleteStaffRequestAction): SagaIterator {
  try {
    const { staffId } = action.payload;
    // @ts-ignore
    yield call(staffService.deleteStaff.bind(staffService), staffId);
    yield put(deleteStaffSuccess(staffId, 'Staff deleted successfully'));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete staff';
    yield put(deleteStaffFailure(errorMessage));
  }
}

// Watcher Saga
export default function* staffSaga(): SagaIterator {
  yield takeLatest(FETCH_STAFF_REQUEST, fetchStaffSaga);
  yield takeLatest(FETCH_STAFF_BY_ID_REQUEST, fetchStaffByIdSaga);
  yield takeLatest(CREATE_STAFF_REQUEST, createStaffSaga);
  yield takeLatest(UPDATE_STAFF_REQUEST, updateStaffSaga);
  yield takeLatest(DELETE_STAFF_REQUEST, deleteStaffSaga);
} 