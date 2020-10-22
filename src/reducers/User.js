export default (state = {}, { type, data }) => {
  switch (type) {
    case "RECEIVE_USER_DETAIL":
      return {...data};
    default:
      return state;
  }
};
  