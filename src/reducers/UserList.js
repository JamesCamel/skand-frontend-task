export default (state = {}, { type, data }) => {
  switch (type) {
    case "RECEIVE_USER_LIST":
      return data
    case "RECEIVE_DELETE_USER":
      console.log(data)
      return data
    default:
      return state;
  }
};
