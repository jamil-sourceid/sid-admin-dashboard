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
  FETCH_ORGANISATION_STAFF_REQUEST,
  FETCH_ORGANISATION_STAFF_SUCCESS,
  FETCH_ORGANISATION_STAFF_FAILURE,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  DELETE_STAFF_FAILURE,
  CREATE_STAFF_REQUEST,
  CREATE_STAFF_SUCCESS,
  CREATE_STAFF_FAILURE,
  RESET_CREATE_STAFF_STATE,
  OrganisationState,
  OrganisationActionTypes,
  Organization,
  StaffMember,
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
  staff: {
    loading: false,
    data: [],
    error: null,
    meta: null,
    deleteLoading: false,
    deleteSuccess: false,
    deleteError: null,
    createStaff: {
      loading: false,
      success: false,
      error: null,
      data: null,
    },
  },
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

    case FETCH_ORGANISATION_STAFF_REQUEST:
      return {
        ...state,
        staff: {
          ...state.staff,
          loading: true,
          error: null,
        },
      };

    case FETCH_ORGANISATION_STAFF_SUCCESS:
      return {
        ...state,
        staff: {
          ...state.staff,
          loading: false,
          data: action.payload.data,
          meta: action.payload.meta,
          error: null,
        },
      };

    case FETCH_ORGANISATION_STAFF_FAILURE:
      return {
        ...state,
        staff: {
          ...state.staff,
          loading: false,
          error: action.payload.error,
        },
      };

    case DELETE_STAFF_REQUEST:
      return {
        ...state,
        staff: {
          ...state.staff,
          deleteLoading: true,
          deleteSuccess: false,
          deleteError: null,
        },
      };

    case DELETE_STAFF_SUCCESS:
      return {
        ...state,
        staff: {
          ...state.staff,
          deleteLoading: false,
          deleteSuccess: true,
          deleteError: null,
          data: state.staff.data.filter(
            (staff: StaffMember) => staff._id !== action.payload.staffId
          ),
        },
      };

    case DELETE_STAFF_FAILURE:
      return {
        ...state,
        staff: {
          ...state.staff,
          deleteLoading: false,
          deleteSuccess: false,
          deleteError: action.payload.error,
        },
      };

    case CREATE_STAFF_REQUEST:
      return {
        ...state,
        staff: {
          ...state.staff,
          createStaff: {
            ...state.staff.createStaff,
            loading: true,
            success: false,
            error: null,
          },
        },
      };

    case CREATE_STAFF_SUCCESS:
      return {
        ...state,
        staff: {
          ...state.staff,
          data: [...state.staff.data, action.payload.data],
          createStaff: {
            loading: false,
            success: true,
            error: null,
            data: action.payload.data,
          },
        },
      };

    case CREATE_STAFF_FAILURE:
      return {
        ...state,
        staff: {
          ...state.staff,
          createStaff: {
            ...state.staff.createStaff,
            loading: false,
            success: false,
            error: action.payload.error,
          },
        },
      };

    case RESET_CREATE_STAFF_STATE:
      return {
        ...state,
        staff: {
          ...state.staff,
          createStaff: {
            loading: false,
            success: false,
            error: null,
            data: null,
          },
        },
      };

    default:
      return state;
  }
};
