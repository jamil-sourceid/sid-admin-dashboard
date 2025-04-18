import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/reducers";
import { organisationReducer } from './organisation/reducer';
import customersReducer from "./customers/reducers";
import { overviewReducer } from "./dashboard/overview/reducers";

const dashboardReducer = combineReducers({
  overview: overviewReducer,
});

const rootReducer = combineReducers({
  auth: authReducer,
  organisations: organisationReducer,
  customers: customersReducer,
  dashboard: dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
