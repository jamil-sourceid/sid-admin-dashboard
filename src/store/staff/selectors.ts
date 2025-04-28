import { RootState } from '../rootReducer';
import { StaffMember } from './types';

// Staff list selectors
export const selectStaffMembers = (state: RootState): StaffMember[] => state.staff.staffMembers;
export const selectTotalStaff = (state: RootState): number => state.staff.totalStaff;
export const selectStaffLoading = (state: RootState): boolean => state.staff.isLoadingStaff;
export const selectStaffError = (state: RootState): string | null => state.staff.staffError;

// Current staff selectors
export const selectCurrentStaff = (state: RootState): StaffMember | null => state.staff.currentStaff;
export const selectCurrentStaffLoading = (state: RootState): boolean => state.staff.isLoadingCurrentStaff;
export const selectCurrentStaffError = (state: RootState): string | null => state.staff.currentStaffError;

// Create staff selectors
export const selectCreatingStaff = (state: RootState): boolean => state.staff.isCreatingStaff;
export const selectCreateStaffSuccess = (state: RootState): boolean => state.staff.createStaffSuccess;
export const selectCreateStaffError = (state: RootState): string | null => state.staff.createStaffError;

// Update staff selectors
export const selectUpdatingStaff = (state: RootState): boolean => state.staff.isUpdatingStaff;
export const selectUpdateStaffSuccess = (state: RootState): boolean => state.staff.updateStaffSuccess;
export const selectUpdateStaffError = (state: RootState): string | null => state.staff.updateStaffError;

// Delete staff selectors
export const selectDeletingStaff = (state: RootState): boolean => state.staff.isDeletingStaff;
export const selectDeleteStaffSuccess = (state: RootState): boolean => state.staff.deleteStaffSuccess;
export const selectDeleteStaffError = (state: RootState): string | null => state.staff.deleteStaffError; 