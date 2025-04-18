import {
  FETCH_OVERVIEW_REQUEST,
  FETCH_OVERVIEW_SUCCESS,
  FETCH_OVERVIEW_FAILURE,
  FetchOverviewRequestAction,
  FetchOverviewSuccessAction,
  FetchOverviewFailureAction,
  OverviewData,
} from './types';

// Fetch Overview
export const fetchOverviewRequest = (): FetchOverviewRequestAction => ({
  type: FETCH_OVERVIEW_REQUEST,
});

export const fetchOverviewSuccess = (data: OverviewData): FetchOverviewSuccessAction => ({
  type: FETCH_OVERVIEW_SUCCESS,
  payload: data,
});

export const fetchOverviewFailure = (error: string | Error): FetchOverviewFailureAction => ({
  type: FETCH_OVERVIEW_FAILURE,
  payload: { error },
});
