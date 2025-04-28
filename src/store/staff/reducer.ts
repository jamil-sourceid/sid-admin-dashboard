import {
  StaffState,
  StaffAction,
  FETCH_STAFF_REQUEST,
  FETCH_STAFF_SUCCESS,
  FETCH_STAFF_FAILURE,
  FETCH_STAFF_BY_ID_REQUEST,
  FETCH_STAFF_BY_ID_SUCCESS,
  FETCH_STAFF_BY_ID_FAILURE,
  CREATE_STAFF_REQUEST,
  CREATE_STAFF_SUCCESS,
  CREATE_STAFF_FAILURE,
  RESET_CREATE_STAFF_STATE,
  UPDATE_STAFF_REQUEST,
  UPDATE_STAFF_SUCCESS,
  UPDATE_STAFF_FAILURE,
  RESET_UPDATE_STAFF_STATE,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  DELETE_STAFF_FAILURE
} from './types';

// Define the initial state of the staff reducer
const initialState: StaffState = {
  // Staff listing related
  staffMembers: [],
  totalStaff: 0,
  isLoadingStaff: false,
  staffError: null,
  
  // Individual staff member related
  currentStaff: null,
  isLoadingCurrentStaff: false,
  currentStaffError: null,
  
  // Staff creation related
  isCreatingStaff: false,
  createStaffSuccess: false,
  createStaffError: null,
  
  // Staff update related
  isUpdatingStaff: false,
  updateStaffSuccess: false,
  updateStaffError: null,
  
  // Staff deletion related
  isDeletingStaff: false,
  deleteStaffSuccess: false,
  deleteStaffError: null,
};

// Staff reducer function
export function staffReducer(state = initialState, action: StaffAction): StaffState {
  switch (action.type) {
    // Fetch staff list cases
    case FETCH_STAFF_REQUEST:
      return {
        ...state,
        isLoadingStaff: true,
        staffError: null,
      };
    case FETCH_STAFF_SUCCESS:
      return {
        ...state,
        isLoadingStaff: false,
        staffMembers: action.payload.data,
        totalStaff: action.payload.meta.totalItems,
        staffError: null,
      };
    case FETCH_STAFF_FAILURE:
      return {
        ...state,
        isLoadingStaff: false,
        staffError: action.payload.error,
      };

    // Fetch staff by ID cases
    case FETCH_STAFF_BY_ID_REQUEST:
      return {
        ...state,
        isLoadingCurrentStaff: true,
        currentStaffError: null,
      };
    case FETCH_STAFF_BY_ID_SUCCESS:
      return {
        ...state,
        isLoadingCurrentStaff: false,
        currentStaff: action.payload.data,
        currentStaffError: null,
      };
    case FETCH_STAFF_BY_ID_FAILURE:
      return {
        ...state,
        isLoadingCurrentStaff: false,
        currentStaffError: action.payload.error,
      };

    // Create staff cases
    case CREATE_STAFF_REQUEST:
      return {
        ...state,
        isCreatingStaff: true,
        createStaffSuccess: false,
        createStaffError: null,
      };
    case CREATE_STAFF_SUCCESS:
      return {
        ...state,
        isCreatingStaff: false,
        createStaffSuccess: true,
        staffMembers: [action.payload.data, ...state.staffMembers],
        totalStaff: state.totalStaff + 1,
        createStaffError: null,
      };
    case CREATE_STAFF_FAILURE:
      return {
        ...state,
        isCreatingStaff: false,
        createStaffSuccess: false,
        createStaffError: action.payload.error,
      };
    case RESET_CREATE_STAFF_STATE:
      return {
        ...state,
        isCreatingStaff: false,
        createStaffSuccess: false,
        createStaffError: null,
      };

    // Update staff cases
    case UPDATE_STAFF_REQUEST:
      return {
        ...state,
        isUpdatingStaff: true,
        updateStaffSuccess: false,
        updateStaffError: null,
      };
    case UPDATE_STAFF_SUCCESS:
      return {
        ...state,
        isUpdatingStaff: false,
        updateStaffSuccess: true,
        currentStaff: action.payload.data,
        staffMembers: state.staffMembers.map(staff => 
          staff.id === action.payload.data.id ? action.payload.data : staff
        ),
        updateStaffError: null,
      };
    case UPDATE_STAFF_FAILURE:
      return {
        ...state,
        isUpdatingStaff: false,
        updateStaffSuccess: false,
        updateStaffError: action.payload.error,
      };
    case RESET_UPDATE_STAFF_STATE:
      return {
        ...state,
        isUpdatingStaff: false,
        updateStaffSuccess: false,
        updateStaffError: null,
      };

    // Delete staff cases
    case DELETE_STAFF_REQUEST:
      return {
        ...state,
        isDeletingStaff: true,
        deleteStaffSuccess: false,
        deleteStaffError: null,
      };
    case DELETE_STAFF_SUCCESS:
      return {
        ...state,
        isDeletingStaff: false,
        deleteStaffSuccess: true,
        staffMembers: state.staffMembers.filter(staff => staff.id !== action.payload.staffId),
        totalStaff: state.totalStaff - 1,
        deleteStaffError: null,
      };
    case DELETE_STAFF_FAILURE:
      return {
        ...state,
        isDeletingStaff: false,
        deleteStaffSuccess: false,
        deleteStaffError: action.payload.error,
      };

    default:
      return state;
  }
} 