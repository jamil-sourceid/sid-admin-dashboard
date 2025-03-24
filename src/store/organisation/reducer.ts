import {
  FETCH_ORGANISATIONS_REQUEST,
  FETCH_ORGANISATIONS_SUCCESS,
  FETCH_ORGANISATIONS_FAILURE,
  OrganisationState,
  OrganisationActionTypes,
} from './types';

const initialState: OrganisationState = {
  loading: false,
  data: [],
  error: null,
  meta: null,
};

export const organisationReducer = (
  state = initialState,
  action: OrganisationActionTypes
): OrganisationState => {
  switch (action.type) {
    case FETCH_ORGANISATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ORGANISATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        meta: action.payload.meta,
        error: null,
      };

    case FETCH_ORGANISATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}; 