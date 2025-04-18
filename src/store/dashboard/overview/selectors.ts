import { RootState } from '../../rootReducer';
import { OverviewData } from './types';

export const selectOverviewData = (state: RootState): OverviewData | null =>
  state.dashboard?.overview?.data || {
    totalCustomers: 0,
    activeCustomers: 0,
    inactiveCustomers: 0,
  };

export const selectOverviewLoading = (state: RootState): boolean =>
  state.dashboard?.overview?.loading || false;

export const selectOverviewError = (state: RootState): string | null =>
  state.dashboard?.overview?.error;
