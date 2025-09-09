// src/store/auth/authSelectors.ts

import { RootState } from '../index'; // Adjust path as needed

export const selectAuthLoading = (state: RootState): boolean => state.auth.loading;
export const selectAuthError = (state: RootState): string | null => state.auth.error;
export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;
export const selectIsTwoFaRequired = (state: RootState): boolean => state.auth.isTwoFaRequired;
export const selectIsMfaLogin = (state: RootState): boolean => state.auth.isMfaLogin;
export const selectQrCode = (state: RootState): string | null => state.auth.qrCode;
export const selectRequiresMfa = (state: RootState): boolean => state.auth.requiresMfa;
export const selectUserEmail = (state: RootState): string => state.auth.userEmail;
export const selectUserName = (state: RootState): string => state.auth.userName;
export const selectUserId = (state: RootState): string => state.auth.userId;
