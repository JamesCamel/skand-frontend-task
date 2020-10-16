import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { receiveUserList } from "../src/actions/UserList";
import { fetchUserList } from "./api";

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

// watch Saga: will listen on REQUEST_USER_ACTION
export default function* mySaga() {
  yield takeLatest("REQUEST_USER_LIST", getUserList);
}
