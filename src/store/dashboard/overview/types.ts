export const FETCH_OVERVIEW_REQUEST = 'FETCH_OVERVIEW_REQUEST';
export const FETCH_OVERVIEW_SUCCESS = 'FETCH_OVERVIEW_SUCCESS';
export const FETCH_OVERVIEW_FAILURE = 'FETCH_OVERVIEW_FAILURE';

export interface OverviewData {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  // Add other overview statistics as needed
}

export interface OverviewResponse {
  message: string;
  data: OverviewData;
}

export interface OverviewState {
  loading: boolean;
  data: OverviewData | null;
  error: string | null;
}

export interface FetchOverviewRequestAction {
  type: typeof FETCH_OVERVIEW_REQUEST;
}

export interface FetchOverviewSuccessAction {
  type: typeof FETCH_OVERVIEW_SUCCESS;
  payload: OverviewData;
}

export interface FetchOverviewFailureAction {
  type: typeof FETCH_OVERVIEW_FAILURE;
  payload: {
    error: string | Error;
  };
}

export type FetchOverviewActionTypes =
  | FetchOverviewRequestAction
  | FetchOverviewSuccessAction
  | FetchOverviewFailureAction;
