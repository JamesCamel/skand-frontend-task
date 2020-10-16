
export default (state = {}, { type, data }) => {
  switch (type) {
    case "RECEIVE_USER_LIST":
      return data;
    default:
      return state;
  }
};
