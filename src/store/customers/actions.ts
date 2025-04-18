import {
  FETCH_ACCOUNTS_REQUEST,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE,
  FetchAccountsRequestAction,
  FetchAccountsSuccessAction,
  FetchAccountsFailureAction,
  FETCH_CUSTOMER_REQUEST,
  FETCH_CUSTOMER_SUCCESS,
  FETCH_CUSTOMER_FAILURE,
  FetchCustomerRequestAction,
  FetchCustomerSuccessAction,
  FetchCustomerFailureAction,
  FETCH_IDENTITY_REQUEST,
  FETCH_IDENTITY_SUCCESS,
  FETCH_IDENTITY_FAILURE,
  FetchIdentityRequestAction,
  FetchIdentitySuccessAction,
  FetchIdentityFailureAction,
  FETCH_VERIFICATION_LOGS_REQUEST,
  FETCH_VERIFICATION_LOGS_SUCCESS,
  FETCH_VERIFICATION_LOGS_FAILURE,
  FetchVerificationLogsRequestAction,
  FetchVerificationLogsSuccessAction,
  FetchVerificationLogsFailureAction,
  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILURE,
  RESET_ADD_CUSTOMER_STATE,
  AddCustomerRequestAction,
  AddCustomerSuccessAction,
  AddCustomerFailureAction,
  ResetAddCustomerStateAction,
  AddCustomerPayload,
  AddCustomerResponse,
  Account,
  Customer,
  Identity,
  VerificationLog,
  PaginationMeta,
} from './types';

// Fetch Accounts
export const fetchAccountsRequest = (
  payload: Record<string, unknown> = {}
): FetchAccountsRequestAction => ({
  type: FETCH_ACCOUNTS_REQUEST,
  payload,
});

export const fetchAccountsSuccess = (
  accounts: Account[],
  meta: PaginationMeta | null
): FetchAccountsSuccessAction => ({
  type: FETCH_ACCOUNTS_SUCCESS,
  payload: {
    accounts,
    meta,
  },
});

export const fetchAccountsFailure = (error: string | Error): FetchAccountsFailureAction => ({
  type: FETCH_ACCOUNTS_FAILURE,
  payload: { error },
});

// Fetch Customer
export const fetchCustomerRequest = (customerId: string): FetchCustomerRequestAction => ({
  type: FETCH_CUSTOMER_REQUEST,
  payload: customerId,
});

export const fetchCustomerSuccess = (customer: Customer): FetchCustomerSuccessAction => ({
  type: FETCH_CUSTOMER_SUCCESS,
  payload: customer,
});

export const fetchCustomerFailure = (error: string | Error): FetchCustomerFailureAction => ({
  type: FETCH_CUSTOMER_FAILURE,
  payload: { error },
});

// Fetch Identity
export const fetchIdentityRequest = (customerId: string): FetchIdentityRequestAction => ({
  type: FETCH_IDENTITY_REQUEST,
  payload: { customerId },
});

export const fetchIdentitySuccess = (
  data: Identity[],
  meta: PaginationMeta | null
): FetchIdentitySuccessAction => ({
  type: FETCH_IDENTITY_SUCCESS,
  payload: { data, meta },
});

export const fetchIdentityFailure = (error: string | Error): FetchIdentityFailureAction => ({
  type: FETCH_IDENTITY_FAILURE,
  payload: { error },
});

// Fetch Verification Logs
export const fetchVerificationLogsRequest = (
  customerId: string
): FetchVerificationLogsRequestAction => ({
  type: FETCH_VERIFICATION_LOGS_REQUEST,
  payload: { customerId },
});

export const fetchVerificationLogsSuccess = (
  data: VerificationLog[],
  meta: PaginationMeta | null
): FetchVerificationLogsSuccessAction => ({
  type: FETCH_VERIFICATION_LOGS_SUCCESS,
  payload: { data, meta },
});

export const fetchVerificationLogsFailure = (
  error: string | Error
): FetchVerificationLogsFailureAction => ({
  type: FETCH_VERIFICATION_LOGS_FAILURE,
  payload: { error },
});

// Add Customer
export const addCustomerRequest = (payload: AddCustomerPayload): AddCustomerRequestAction => ({
  type: ADD_CUSTOMER_REQUEST,
  payload,
});

export const addCustomerSuccess = (data: AddCustomerResponse): AddCustomerSuccessAction => ({
  type: ADD_CUSTOMER_SUCCESS,
  payload: data,
});

export const addCustomerFailure = (error: string | Error): AddCustomerFailureAction => ({
  type: ADD_CUSTOMER_FAILURE,
  payload: { error },
});

export const resetAddCustomerState = (): ResetAddCustomerStateAction => ({
  type: RESET_ADD_CUSTOMER_STATE,
});
