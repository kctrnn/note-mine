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

  getByPageId: (pageId) => {
    const url = `/blocks/?_sort=position:ASC&page.pageId=${pageId}`;
    return axiosClient.get(url);
  },

  delete: (id) => {
    const url = `/blocks/${id}`;
    return axiosClient.delete(url);
  },

  add: (data) => {
    const url = '/blocks';
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    const url = `/blocks/${id}`;
    return axiosClient.put(url, data);
  },
};

export default blockApi;
