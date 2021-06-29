import axios from "axios";

<<<<<<< HEAD
const baseURL = "http://192.168.1.8:8081/api/"
// const baseURL = "http://localhost:8081/api/"
=======
const baseURL = "http://192.168.1.237:8081/api/"
>>>>>>> 1294391428cdfd0536662c16ffe5133dc37f91c2
export const axiosPost = (token, url, data) => {
    return axios.post(baseURL + url, data, {
        headers: {
            "content-type": "application/json",
            "Authorization": token,
        },
    });
};
export const axiosPostLogin = (url, data) => {
    return axios.post(baseURL + url, data, {
        headers: {
            "content-type": "application/json",
        },
    });
};
export const axiosGet = (token, url) => {
    return axios.get(baseURL + url, {
        headers: {
            "content-type": "application/json",
            "Authorization": token,
        },
    });
};

export const axiosPut = (token, url, data) => {
    return axios.put(baseURL + url, data, {
        headers: {
            "content-type": "application/json",
            "Authorization": token,
        },
    });
};
export const axiosDelete = (token, url, data) => {
    return axios.delete(baseURL + url, {
        headers: {
            "content-type": "application/json",
            "Authorization": token,
        },
        data: {
            ...data
        }
    });
};