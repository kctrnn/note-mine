import axiosClient from './axiosClient';

const pageApi = {
  getAll: (params) => {
    const url = '/pages';
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/pages/${id}`;
    return axiosClient.get(url);
  },
};

export default pageApi;
