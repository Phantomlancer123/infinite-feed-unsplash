import axios from 'axios';

const configureServices = () => {
  axios.defaults.baseURL = 'https://api.unsplash.com/';

  axios.interceptors.request.use(
    (request) => {
      console.log(request);
      return request;
    },
    (error) => Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        (error.response.status === 403 || error.response.status === 500) &&
        error.response.data &&
        error.response.data.exceptionMessage.toLowerCase().startsWith('invalid authorization token')
      ) {
        console.log(error.response);
      }
      return Promise.reject(error);
    },
  );
};

const getConfig = () => {
  const conf = {
    headers: {
      'Authorization': 'Client-ID ' + '2Djqd7S2m47zNdHEvgReBRCqtNDrx8QBKr1n_PlezWo'
    }
  };
  return conf;
};

export { configureServices, getConfig };