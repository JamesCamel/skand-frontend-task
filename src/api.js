import axios from 'axios';

export const fetchUserList = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/api/v2/users', {
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
    const response = await axios.get(`http://localhost:3000/api/v2/users/${userId}`, {
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
    const response = await axios.delete(`http://localhost:3000/api/v2/users/${userId}`, {
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
      `http://localhost:3000/api/v2/users/${payload.id}`,
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
    const response = await axios.post('http://localhost:3000/api/v2/users/', payload, {
      headers: { authorization: token },
    });
    return response;
  } catch (e) {
    throw new Error(e);
  }
};
