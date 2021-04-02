import axios from "axios";

const  baseURL = "http://localhost:8081/api/"
export const axiosPost = (token, url, data) => {
    return axios.post(baseURL + url, data, {
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token,
        },
    });
};

export const axiosGet = ( token, url) => {
    return axios.get(baseURL + url, {
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token,
        },
    });
};

export const axiosPut = (token, url, data) => {
    return axios.put(baseURL + url, data, {
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token,
        },
    });
};
export const axiosDelete = (token, url, data) => {
    return axios.delete(baseURL + url, {
        headers: {
            "content-type": "application/json",
            "X-Auth-Token": token,
        },
        data: {
            ...data
        }
    });
};