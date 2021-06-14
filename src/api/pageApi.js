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

  getById: (pageId) => {
    const url = `/pages/?_pageId=${pageId}`;
    return axiosClient.get(url);
  },

  updatePage: (id, data) => {
    const url = `/pages/${id}`;
    return axiosClient.put(url, data);
  },
};

export default pageApi;
