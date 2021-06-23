import axiosClient from './axiosClient';

const userApi = {
  login: (payload) => {
    const url = '/auth/local';
    return axiosClient.post(url, payload);
  },

  signup: (payload) => {
    const url = '/auth/local/register';
    return axiosClient.post(url, payload);
  },

  getUser: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  updateAccount: (id, payload) => {
    const url = `users/${id}`;
    return axiosClient.put(url, payload);
  },
};

export default userApi;
