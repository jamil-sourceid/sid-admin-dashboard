import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/reducers';
import { organisationReducer } from './organisation/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  organisations: organisationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
