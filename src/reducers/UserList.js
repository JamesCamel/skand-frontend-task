export default (state = {}, { type, data }) => {
  switch (type) {
    case "RECEIVE_USER_LIST":
      return [...data]
    case "RECEIVE_DELETE_USER":
      return [...data]
    case "RECEIVE_UPDATE_USER_DETAIL":
      return [...data]
    case "RECEIVE_CREATE_USER":
      return [...data]
    default:
      return state;
  }
};
