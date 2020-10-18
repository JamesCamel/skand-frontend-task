import { all, call, put, takeLatest } from 'redux-saga/effects';
import { receiveUserList, receiveDeleteUser, receiveUpdateUserDetail, receiveCreateUser } from './actions/UserList';
import { receiveUserDetail } from './actions/User';
import { fetchUserList, fetchUserDetail, fetchDeleteUser, fetchUpdateUserDetail, fetchCreateUser } from './api';

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

function* getDeleteUser(action) {
  try {
    // do api call
    const data = yield call(fetchDeleteUser, action.userId);
    if (data.status === 200) {
      const newList = yield call(fetchUserList);
      yield put(receiveDeleteUser(newList));
    } else {
      console.log(data.status);
    }
  } catch (e) {
    throw new Error(e);
  }
}

function* getUpdateUserDetail(action) {
  try {
    // do api call
    const data = yield call(fetchUpdateUserDetail, action.payload);
    if (data.status === 200) {
      const newList = yield call(fetchUserList);
      yield put(receiveUpdateUserDetail(newList));
    } else {
      console.log(data.status);
    }
  } catch (e) {
    throw new Error(e);
  }
}

function* getCreateUser(action) {
  try {
    // do api call
    const newList = yield call(fetchUserList);
      console.log(newList)
    const data = yield call(fetchCreateUser, action.payload);
    if (data.status === 201) {
      const newList = yield call(fetchUserList);
      console.log(newList)
      yield put(receiveCreateUser(newList));
    } else {
      console.log(data.status);
    }
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

function* watchDeleteUser() {
  yield takeLatest('REQUEST_DELETE_USER', getDeleteUser);
}

function* watchUpdateUserDetail() {
  yield takeLatest('REQUEST_UPDATE_USER_DETAIL', getUpdateUserDetail);
}

function* watchCreateUser() {
  yield takeLatest('REQUEST_CREATE_USER', getCreateUser);
}


export default function* rootSaga() {
  yield all([
    watchGetUserList(), 
    watchGetUserDetail(), 
    watchDeleteUser(), 
    watchUpdateUserDetail(),
    watchCreateUser()
  ]);
}
