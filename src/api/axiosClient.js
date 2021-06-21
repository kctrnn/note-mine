import axios from 'axios';
import StorageKeys from 'constants/storage-keys';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),

  // onUploadProgress: (progressEvent) => {
  //   const { loaded, total } = progressEvent;
  //   let percent = Math.round((loaded * 100) / total);
  //   console.log(`${percent}%`);
  // },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const customHeaders = {};

    const accessToken = localStorage.getItem(StorageKeys.TOKEN);
    if (accessToken) {
      customHeaders.Authorization = `Bearer ${accessToken}`;
    }

    return {
      ...config,
      headers: {
        ...customHeaders, // auto attach token
        ...config.headers, // but you can override for some requests
      },
    };
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },

  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const { config, status, data } = error.response;
    const URLS = ['/auth/local/register', '/auth/local'];
    if (URLS.includes(config.url) && status === 400) {
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};

      if (firstMessage.message.includes('Email')) {
        const newMessage = firstMessage.message.replace(
          'Email',
          'Email or username'
        );
        throw new Error(newMessage);
      }

      throw new Error(firstMessage.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
