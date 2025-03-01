import axios from "./../utils/axiosCustomize";

const registerService = (email, phone, username, password) => {
    return axios.post("/api/v1/register", {
        email, phone, username, password
    })
}

const loginService = (valueLogin, password) => {
    return axios.post("/api/v1/login", {
        valueLogin, password
    })
}

const fetchAllUsers = (page, limit) => {
    return axios.get(`/api/v1/users/read?page=${page}&limit=${limit}`)
}

const deleteUser = (user) => {
    return axios.delete(`/api/v1/users/delete`, { data: { id: user.id } })
}

export {
    registerService, loginService,
    fetchAllUsers, deleteUser
}