import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/reducers";
import { organisationReducer } from "./organisation/reducer";
import customersReducer from "./customers/reducers";
import { overviewReducer } from "./dashboard/overview/reducers";
import { staffReducer } from "./staff/reducer";
import auditLogsReducer from "./logs/audit-logs/reducers";

const dashboardReducer = combineReducers({
  overview: overviewReducer,
});

const rootReducer = combineReducers({
  auth: authReducer,
  organisations: organisationReducer,
  customers: customersReducer,
  dashboard: dashboardReducer,
  staff: staffReducer,
  auditLogs: auditLogsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
