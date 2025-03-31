import {
  FETCH_ORGANISATIONS_REQUEST,
  FETCH_ORGANISATIONS_SUCCESS,
  FETCH_ORGANISATIONS_FAILURE,
  CREATE_ORGANISATION_REQUEST,
  CREATE_ORGANISATION_SUCCESS,
  CREATE_ORGANISATION_FAILURE,
  RESET_CREATE_ORGANISATION_STATE,
  UPDATE_ORGANISATION_REQUEST,
  UPDATE_ORGANISATION_SUCCESS,
  UPDATE_ORGANISATION_FAILURE,
  RESET_UPDATE_ORGANISATION_STATE,
  TOGGLE_ORGANISATION_MFA_REQUEST,
  TOGGLE_ORGANISATION_MFA_SUCCESS,
  TOGGLE_ORGANISATION_MFA_FAILURE,
  OrganisationState,
  OrganisationActionTypes,
  Organization,
} from './types';

const initialState: OrganisationState = {
  loading: false,
  data: [],
  error: null,
  meta: null,
  createOrganization: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  updateOrganization: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  selectedOrganization: null,
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

    case CREATE_ORGANISATION_REQUEST:
      return {
        ...state,
        createOrganization: {
          ...state.createOrganization,
          loading: true,
          success: false,
          error: null,
        },
      };

    case CREATE_ORGANISATION_SUCCESS:
      return {
        ...state,
        createOrganization: {
          loading: false,
          success: true,
          error: null,
          data: action.payload.data,
        },
      };

    case CREATE_ORGANISATION_FAILURE:
      return {
        ...state,
        createOrganization: {
          ...state.createOrganization,
          loading: false,
          success: false,
          error: action.payload.error,
        },
      };

    case RESET_CREATE_ORGANISATION_STATE:
      return {
        ...state,
        createOrganization: {
          loading: false,
          success: false,
          error: null,
          data: null,
        },
      };

    case UPDATE_ORGANISATION_REQUEST:
      return {
        ...state,
        updateOrganization: {
          ...state.updateOrganization,
          loading: true,
          success: false,
          error: null,
        },
      };

    case UPDATE_ORGANISATION_SUCCESS: {
      const updatedOrganizations = state.data.map((org: Organization) =>
        org._id === action.payload.data._id ? action.payload.data : org
      );

      return {
        ...state,
        data: updatedOrganizations,
        updateOrganization: {
          loading: false,
          success: true,
          error: null,
          data: action.payload.data,
        },
        selectedOrganization: action.payload.data,
      };
    }

    case UPDATE_ORGANISATION_FAILURE:
      return {
        ...state,
        updateOrganization: {
          ...state.updateOrganization,
          loading: false,
          success: false,
          error: action.payload.error,
        },
      };

    case RESET_UPDATE_ORGANISATION_STATE:
      return {
        ...state,
        updateOrganization: {
          loading: false,
          success: false,
          error: null,
          data: null,
        },
      };

    case TOGGLE_ORGANISATION_MFA_REQUEST:
      return {
        ...state,
        updateOrganization: {
          ...state.updateOrganization,
          loading: true,
          success: false,
          error: null,
        },
      };

    case TOGGLE_ORGANISATION_MFA_SUCCESS: {
      const mfaUpdatedOrganizations = state.data.map((org: Organization) =>
        org._id === action.payload.data._id ? action.payload.data : org
      );

      return {
        ...state,
        data: mfaUpdatedOrganizations,
        updateOrganization: {
          loading: false,
          success: true,
          error: null,
          data: action.payload.data,
        },
        selectedOrganization: action.payload.data,
      };
    }

    case TOGGLE_ORGANISATION_MFA_FAILURE:
      return {
        ...state,
        updateOrganization: {
          ...state.updateOrganization,
          loading: false,
          success: false,
          error: action.payload.error,
        },
      };

    default:
      return state;
  }
};
