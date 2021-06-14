import axiosClient from './axiosClient';

const blockApi = {
  getAll: (params) => {
    const url = '/blocks';
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/blocks/${id}`;
    return axiosClient.get(url);
  },

  getById: (pageId) => {
    const url = `/blocks/?_page=${pageId}`;
    return axiosClient.get(url);
  },
};

export default blockApi;
