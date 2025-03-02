import axios from 'axios';
import NProgress from "nprogress";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

NProgress.configure(
    {
        easing: 'ease',
        speed: 1000,
        showSpinner: false
    }
);

// Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (config) {
        NProgress.start();
    }
    return config;
}, function (error) {
    NProgress.done();
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response && response.data) {
        NProgress.done();
        return response.data
    }

    return response;
}, function (error) {
    NProgress.done();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance;