import { all } from 'redux-saga/effects';
import authSaga from './auth/sagas';
import { organisationSaga } from './organisation/sagas';

export default function* rootSaga(): Generator {
  yield all([
    authSaga(),
    organisationSaga(),
  ]);
}
