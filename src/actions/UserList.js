export const requestUserList = () => ({ type: "REQUEST_USER_LIST" });
export const receiveUserList = data => ({ type: "RECEIVE_USER_LIST", data });

export const requestDeleteUser = userId => ({ type: "REQUEST_DELETE_USER", userId });
export const receiveDeleteUser = data => ({ type: "RECEIVE_DELETE_USER", data });
