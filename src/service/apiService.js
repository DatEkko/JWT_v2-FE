import axios from "./../utils/axiosCustomize";

const registerService = (email, phone, username, password) => {
    return axios.post("/api/v1/register", {
        email, phone, username, password
    })
}

export {
    registerService
}