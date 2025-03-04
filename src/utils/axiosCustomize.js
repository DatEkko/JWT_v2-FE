import axios from 'axios';
import NProgress from "nprogress";
import { toast } from 'react-toastify';

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

instance.defaults.withCredentials = true;

NProgress.configure(
    {
        easing: 'ease',
        speed: 1000,
        showSpinner: false
    }
);

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;

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
    const status = error && error.response && error.response.status || 500;
    switch (status) {
        case 401: {
            // toast.error("401: Unauthorized the user")
            return error.response.data;
        }

        case 403: {
            // toast.error(`403: You don't have permisson to access this resource`)
            return Promise.reject(error);
        }

        default: {
            return Promise.reject(error);
        }
    }

});

export default instance;