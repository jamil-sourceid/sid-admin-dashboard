export const FETCH_ACCOUNTS_REQUEST = 'FETCH_ACCOUNTS_REQUEST';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const FETCH_ACCOUNTS_FAILURE = 'FETCH_ACCOUNTS_FAILURE';

export const FETCH_CUSTOMER_REQUEST = 'FETCH_CUSTOMER_REQUEST';
export const FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS';
export const FETCH_CUSTOMER_FAILURE = 'FETCH_CUSTOMER_FAILURE';

export const FETCH_IDENTITY_REQUEST = 'FETCH_IDENTITY_REQUEST';
export const FETCH_IDENTITY_SUCCESS = 'FETCH_IDENTITY_SUCCESS';
export const FETCH_IDENTITY_FAILURE = 'FETCH_IDENTITY_FAILURE';

export const FETCH_VERIFICATION_LOGS_REQUEST = 'FETCH_VERIFICATION_LOGS_REQUEST';
export const FETCH_VERIFICATION_LOGS_SUCCESS = 'FETCH_VERIFICATION_LOGS_SUCCESS';
export const FETCH_VERIFICATION_LOGS_FAILURE = 'FETCH_VERIFICATION_LOGS_FAILURE';

export const ADD_CUSTOMER_REQUEST = 'ADD_CUSTOMER_REQUEST';
export const ADD_CUSTOMER_SUCCESS = 'ADD_CUSTOMER_SUCCESS';
export const ADD_CUSTOMER_FAILURE = 'ADD_CUSTOMER_FAILURE';
export const RESET_ADD_CUSTOMER_STATE = 'RESET_ADD_CUSTOMER_STATE';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  count: number;
}

export interface Account {
  _id: string;
  firstName: string;
  lastName: string;
  primaryEmail: string;
  primaryPhoneNumber: string;
  country: string;
  verified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountsResponse {
  message: string;
  data: Account[];
  meta: PaginationMeta;
}

export interface Identity {
  _id: string;
  documentType: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  expiryDate: string;
  issuingCountry: string;
  documentFrontImageUrl: string;
  documentBackImageUrl: string;
  selfieImageUrl: string;
  facialMatch: boolean;
  facialMatchScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface IdentityResponse {
  message: string;
  data: Identity[];
  meta: PaginationMeta;
}

export interface VerificationLog {
  _id: string;
  userId: string;
  action: string;
  status: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface VerificationLogResponse {
  message: string;
  data: VerificationLog[];
  meta: PaginationMeta;
}

export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  primaryEmail: string;
  primaryPhoneNumber: string;
  country: string;
  verified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  identities: Identity[];
}

export interface CustomerResponse {
  message: string;
  data: Customer;
}

export interface AccountsState {
  loading: boolean;
  data: Account[] | null;
  error: string | null;
  meta: PaginationMeta | null;
}

export interface CustomerState {
  loading: boolean;
  data: Customer | null;
  error: string | null;
}

export interface IdentityState {
  loading: boolean;
  data: Identity[] | null;
  error: string | null;
  meta: PaginationMeta | null;
}

export interface VerificationLogsState {
  loading: boolean;
  data: VerificationLog[] | null;
  error: string | null;
  meta: PaginationMeta | null;
}

export interface FetchAccountsRequestAction {
  type: typeof FETCH_ACCOUNTS_REQUEST;
  payload?: Record<string, unknown>;
}

export interface FetchAccountsSuccessAction {
  type: typeof FETCH_ACCOUNTS_SUCCESS;
  payload: {
    meta: PaginationMeta | null;
    accounts: Account[];
  };
}

export interface FetchAccountsFailureAction {
  type: typeof FETCH_ACCOUNTS_FAILURE;
  payload: {
    error: string | Error;
  };
}

export interface FetchCustomerRequestAction {
  type: typeof FETCH_CUSTOMER_REQUEST;
  payload: string;
}

export interface FetchCustomerSuccessAction {
  type: typeof FETCH_CUSTOMER_SUCCESS;
  payload: Customer;
}

export interface FetchCustomerFailureAction {
  type: typeof FETCH_CUSTOMER_FAILURE;
  payload: {
    error: string | Error;
  };
}

export interface FetchIdentityRequestAction {
  type: typeof FETCH_IDENTITY_REQUEST;
  payload: {
    customerId: string;
  };
}

export interface FetchIdentitySuccessAction {
  type: typeof FETCH_IDENTITY_SUCCESS;
  payload: {
    data: Identity[];
    meta: PaginationMeta | null;
  };
}

export interface FetchIdentityFailureAction {
  type: typeof FETCH_IDENTITY_FAILURE;
  payload: {
    error: string | Error;
  };
}

export interface FetchVerificationLogsRequestAction {
  type: typeof FETCH_VERIFICATION_LOGS_REQUEST;
  payload: {
    customerId: string;
  };
}

export interface FetchVerificationLogsSuccessAction {
  type: typeof FETCH_VERIFICATION_LOGS_SUCCESS;
  payload: {
    data: VerificationLog[];
    meta: PaginationMeta | null;
  };
}

export interface FetchVerificationLogsFailureAction {
  type: typeof FETCH_VERIFICATION_LOGS_FAILURE;
  payload: {
    error: string | Error;
  };
}

export interface AddCustomerPayload {
  firstName: string;
  lastName: string;
  primaryEmail: string;
  primaryPhoneNumber: string;
  country: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface AddCustomerResponse {
  message: string;
  data: Customer;
}

export interface AddCustomerState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: Customer | null;
}

export interface AddCustomerRequestAction {
  type: typeof ADD_CUSTOMER_REQUEST;
  payload: AddCustomerPayload;
}

export interface AddCustomerSuccessAction {
  type: typeof ADD_CUSTOMER_SUCCESS;
  payload: AddCustomerResponse;
}

export interface AddCustomerFailureAction {
  type: typeof ADD_CUSTOMER_FAILURE;
  payload: {
    error: string | Error;
  };
}

export interface ResetAddCustomerStateAction {
  type: typeof RESET_ADD_CUSTOMER_STATE;
}

export type FetchAccountsActionTypes =
  | FetchAccountsRequestAction
  | FetchAccountsSuccessAction
  | FetchAccountsFailureAction;

export type FetchCustomerActionTypes =
  | FetchCustomerRequestAction
  | FetchCustomerSuccessAction
  | FetchCustomerFailureAction;

export type FetchIdentityActionTypes =
  | FetchIdentityRequestAction
  | FetchIdentitySuccessAction
  | FetchIdentityFailureAction;

export type FetchVerificationLogsActionTypes =
  | FetchVerificationLogsRequestAction
  | FetchVerificationLogsSuccessAction
  | FetchVerificationLogsFailureAction;

export type AddCustomerActionTypes =
  | AddCustomerRequestAction
  | AddCustomerSuccessAction
  | AddCustomerFailureAction
  | ResetAddCustomerStateAction;
