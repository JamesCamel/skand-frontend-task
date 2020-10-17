import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { receiveUserList } from "../src/actions/UserList";
import { receiveUserDetail } from "./actions/User";
import { fetchUserList, fetchUserDetail } from "./api";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getUserList(action) {
  try {
    // do api call
    const data = yield call(fetchUserList);
    yield put(receiveUserList(data));
  } catch (e) {
    console.log(e);
  }
}

function* getUserDetail(action) {
  try {
    // do api call
    const data = yield call(fetchUserDetail, action.userId);
    yield put(receiveUserDetail(data));
  } catch (e) {
    console.log(e);
  }
}



// watch Saga: will listen on REQUEST_USER_ACTION
function* watchGetUserList() {
  yield  takeLatest("REQUEST_USER_LIST", getUserList)
}

function* watchGetUserDetail() {
  yield  takeLatest("REQUEST_USER_DETAIL", getUserDetail)
}

export default function* rootSaga(){
  yield all([
    watchGetUserList(),
    watchGetUserDetail()
  ])
}


