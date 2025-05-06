import { all } from "redux-saga/effects";
import authSaga from "./auth/sagas";
import { organisationSaga } from "./organisation/sagas";
import { CustomersSaga } from "./customers/sagas";
import { OverviewSaga } from "./dashboard/overview/sagas";
import staffSaga from "./staff/sagas";
import { auditLogsSaga } from "./logs/audit-logs/sagas";

export default function* rootSaga(): Generator {
  yield all([
    authSaga(),
    organisationSaga(),
    CustomersSaga(),
    OverviewSaga(),
    staffSaga(),
    auditLogsSaga(),
  ]);
}
