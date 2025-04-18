import {
  FETCH_ACCOUNTS_REQUEST,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE,
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
  FETCH_IDENTITY_REQUEST,
  FETCH_IDENTITY_SUCCESS,
  FETCH_IDENTITY_FAILURE,
  FETCH_VERIFICATION_LOGS_REQUEST,
  FETCH_VERIFICATION_LOGS_SUCCESS,
  FETCH_VERIFICATION_LOGS_FAILURE,
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILURE,
  RESET_ADD_CUSTOMER_STATE,
  AccountsState,
  CustomerState,
  IdentityState,
  VerificationLogsState,
  AddCustomerState,
  FetchAccountsActionTypes,
  FetchCustomerActionTypes,
  FetchIdentityActionTypes,
  FetchVerificationLogsActionTypes,
  AddCustomerActionTypes,
} from './types';
import { combineReducers } from 'redux';

const initialAccountsState: AccountsState = {
  loading: false,
  data: null,
  error: null,
  meta: null,
};

const initialCustomerState: CustomerState = {
  loading: false,
  data: null,
  error: null,
};

const initialIdentityState: IdentityState = {
  loading: false,
  data: null,
  error: null,
  meta: null,
};

const initialVerificationLogsState: VerificationLogsState = {
  loading: false,
  data: null,
  error: null,
  meta: null,
};

const initialAddCustomerState: AddCustomerState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const accountsReducer = (
  state = initialAccountsState,
  action: FetchAccountsActionTypes
): AccountsState => {
  switch (action.type) {
    case FETCH_ACCOUNTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        meta: action.payload.meta,
        data: Array.isArray(action.payload.accounts) ? [...action.payload.accounts] : null,
      };

    case FETCH_ACCOUNTS_FAILURE:
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

const customerReducer = (
  state = initialCustomerState,
  action: FetchCustomerActionTypes
): CustomerState => {
  switch (action.type) {
    case FETCH_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_CUSTOMER_FAILURE:
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

const identityReducer = (
  state = initialIdentityState,
  action: FetchIdentityActionTypes
): IdentityState => {
  switch (action.type) {
    case FETCH_IDENTITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_IDENTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        meta: action.payload.meta,
      };

    case FETCH_IDENTITY_FAILURE:
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

const verificationLogsReducer = (
  state = initialVerificationLogsState,
  action: FetchVerificationLogsActionTypes
): VerificationLogsState => {
  switch (action.type) {
    case FETCH_VERIFICATION_LOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_VERIFICATION_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        meta: action.payload.meta,
      };

    case FETCH_VERIFICATION_LOGS_FAILURE:
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

const addCustomerReducer = (
  state = initialAddCustomerState,
  action: AddCustomerActionTypes
): AddCustomerState => {
  switch (action.type) {
    case ADD_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };

    case ADD_CUSTOMER_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
        data: action.payload.data,
      };

    case ADD_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error:
          action.payload.error instanceof Error
            ? action.payload.error.message
            : String(action.payload.error),
      };

    case RESET_ADD_CUSTOMER_STATE:
      return initialAddCustomerState;

    default:
      return state;
  }
};

const customersReducer = combineReducers({
  accounts: accountsReducer,
  customer: customerReducer,
  identity: identityReducer,
  verificationLogs: verificationLogsReducer,
  addCustomer: addCustomerReducer,
});

export default customersReducer;
