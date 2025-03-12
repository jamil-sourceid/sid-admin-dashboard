import {
  AuthState,
  AuthActions,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  TWO_FA_REQUEST,
  TWO_FA_SUCCESS,
  TWO_FA_FAILURE,
  SET_MFA_DATA,
} from './types';

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  isTwoFaRequired: false,
  isMfaLogin: false,
  qrCode: '',
  requiresMfa: false,
  userEmail: '',
};

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        isTwoFaRequired: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        isTwoFaRequired: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case TWO_FA_REQUEST:
      return {
        ...state,
        loading: true,
        isTwoFaRequired: true,
        error: null,
      };
    case TWO_FA_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        isTwoFaRequired: false,
        error: null,
      };
    case SET_MFA_DATA:
      return {
        ...state,
        isMfaLogin: action.payload.isMfaLogin,
        qrCode: action.payload.qrCode,
        userEmail: action.payload.userEmail,
      };

    case TWO_FA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        isTwoFaRequired: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isTwoFaRequired: false,
      };
    default:
      return state;
  }
};

export default authReducer;
