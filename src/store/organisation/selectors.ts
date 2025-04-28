/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/auth/authSelectors.ts

import { RootState } from '../rootReducer';
import { Organization } from './types';

export const selectOrgLoading = (state: RootState): boolean => state.organisations.loading;
export const selectOrgs = (state: RootState): Organization[] => state.organisations.data;
export const selectCreateOrganization = (state: RootState): any => state.organisations.createOrganization;
export const selectUpdateOrganization = (state: RootState): any => state.organisations.updateOrganization;
export const selectMeta = (state: RootState): any => state.organisations.meta;

// Staff-related selectors
export const selectStaffLoading = (state: RootState): boolean => state.organisations.staff.loading;
export const selectStaffData = (state: RootState) => state.organisations.staff.data;
export const selectStaffError = (state: RootState): string | null => state.organisations.staff.error;
export const selectStaffMeta = (state: RootState) => state.organisations.staff.meta;
export const selectStaffDeleteLoading = (state: RootState) => state.organisations.staff.deleteLoading;
export const selectStaffDeleteSuccess = (state: RootState) => state.organisations.staff.deleteSuccess;
export const selectStaffDeleteError = (state: RootState) => state.organisations.staff.deleteError;

// Staff creation selectors
export const selectStaffCreateLoading = (state: RootState): boolean => state.organisations.staff.createStaff.loading;
export const selectStaffCreateSuccess = (state: RootState): boolean => state.organisations.staff.createStaff.success;
export const selectStaffCreateError = (state: RootState): string | null => state.organisations.staff.createStaff.error;