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
      'Authorization': 'Client-ID ' + '6c446b49b72a4c559d9b9d67183d5c1de1981d16f309063c3b994086e6ce1a26'
    }
  };
  return conf;
};

export { configureServices, getConfig };