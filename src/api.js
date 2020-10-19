import axios from 'axios';
const root = `${window.location.protocol}//${window.location.host}/api/v2`

export const fetchUserList = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${root}/users`, {
      headers: { authorization: token },
    });
    return response.data.users;
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchUserDetail = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${root}/users/${userId}`, {
      headers: { authorization: token },
    });
    const userDetail = response.data.users;
    return userDetail;
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchDeleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${root}/users/${userId}`, {
      headers: { authorization: token },
    });
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchUpdateUserDetail = async (payload) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${root}/users/${payload.id}`,
      payload,
      { headers: { authorization: token } }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

export const fetchCreateUser = async (payload) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${root}/users/`, payload, {
      headers: { authorization: token },
    });
    return response;
  } catch (e) {
    throw new Error(e);
  }
};
