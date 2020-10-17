import { all, call, put, takeLatest } from 'redux-saga/effects';
import { receiveUserList } from './actions/UserList';
import { receiveUserDetail } from './actions/User';
import { fetchUserList, fetchUserDetail } from './api';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getUserList() {
  try {
    // do api call
    const data = yield call(fetchUserList);
    yield put(receiveUserList(data));
  } catch (e) {
    throw new Error(e);
  }
}

function* getUserDetail(action) {
  try {
    // do api call
    const data = yield call(fetchUserDetail, action.userId);
    yield put(receiveUserDetail(data));
  } catch (e) {
    throw new Error(e);
  }
}

// watch Saga: will listen on REQUEST_USER_ACTION
function* watchGetUserList() {
  yield takeLatest('REQUEST_USER_LIST', getUserList);
}

function* watchGetUserDetail() {
  yield takeLatest('REQUEST_USER_DETAIL', getUserDetail);
}

export default function* rootSaga() {
  yield all([watchGetUserList(), watchGetUserDetail()]);
}
