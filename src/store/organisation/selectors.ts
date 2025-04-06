/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/auth/authSelectors.ts

import { RootState } from '../index'; // Adjust path as needed
import { Organization } from './types';

export const selectOrgLoading = (state: RootState): boolean => state.organisations.loading;
export const selectOrgs = (state: RootState): Organization[] => state.organisations.data;
export const selectCreateOrganization = (state: RootState): any => state.organisations.createOrganization;
export const selectUpdateOrganization = (state: RootState): any => state.organisations.updateOrganization;
export const selectMeta = (state: RootState): any => state.organisations.meta;
