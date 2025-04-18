import { RootState } from '../rootReducer';
import { Account, Customer, Identity, VerificationLog, PaginationMeta } from './types';

// Accounts selectors
export const selectAccounts = (state: RootState): Account[] => state.customers.accounts.data || [];
export const selectAccountsLoading = (state: RootState): boolean =>
  state.customers.accounts.loading;
export const selectAccountsError = (state: RootState): string | null =>
  state.customers.accounts.error;
export const selectAccountsMeta = (state: RootState): PaginationMeta | null =>
  state.customers.accounts.meta;

// Customer selectors
export const selectCustomer = (state: RootState): Customer | null => state.customers.customer.data;
export const selectCustomerLoading = (state: RootState): boolean =>
  state.customers.customer.loading;
export const selectCustomerError = (state: RootState): string | null =>
  state.customers.customer.error;

// Identity selectors
export const selectIdentity = (state: RootState): Identity[] => state.customers.identity.data || [];
export const selectIdentityLoading = (state: RootState): boolean =>
  state.customers.identity.loading;
export const selectIdentityError = (state: RootState): string | null =>
  state.customers.identity.error;
export const selectIdentityMeta = (state: RootState): PaginationMeta | null =>
  state.customers.identity.meta;

// Verification logs selectors
export const selectVerificationLogs = (state: RootState): VerificationLog[] =>
  state.customers.verificationLogs.data || [];
export const selectVerificationLogsLoading = (state: RootState): boolean =>
  state.customers.verificationLogs.loading;
export const selectVerificationLogsError = (state: RootState): string | null =>
  state.customers.verificationLogs.error;
export const selectVerificationLogsMeta = (state: RootState): PaginationMeta | null =>
  state.customers.verificationLogs.meta;

// Add Customer selectors
export const selectAddCustomerLoading = (state: RootState): boolean =>
  state.customers.addCustomer.loading;
export const selectAddCustomerSuccess = (state: RootState): boolean =>
  state.customers.addCustomer.success;
export const selectAddCustomerError = (state: RootState): string | null =>
  state.customers.addCustomer.error;
export const selectAddCustomerData = (state: RootState): Customer | null =>
  state.customers.addCustomer.data;
