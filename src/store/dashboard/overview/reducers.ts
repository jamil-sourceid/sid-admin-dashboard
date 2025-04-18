import {
  FETCH_OVERVIEW_REQUEST,
  FETCH_OVERVIEW_SUCCESS,
  FETCH_OVERVIEW_FAILURE,
  OverviewState,
  FetchOverviewActionTypes,
} from './types';

const initialOverviewState: OverviewState = {
  loading: false,
  data: null,
  error: null,
};

export const overviewReducer = (
  state = initialOverviewState,
  action: FetchOverviewActionTypes
): OverviewState => {
  switch (action.type) {
    case FETCH_OVERVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_OVERVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_OVERVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error:
          action.payload.error instanceof Error
            ? action.payload.error.message
            : String(action.payload.error),
      };

    default:
      return state;
  }
};
