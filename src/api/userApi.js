import axiosClient from './axiosClient';

const userApi = {
  login: (payload) => {
    const url = '/auth/local';
    return axiosClient.post(url, payload);
  },

  signup: (payload) => {
    const url = 'auth/local/register';
    return axiosClient.post(url, payload);
  },
};

export default userApi;