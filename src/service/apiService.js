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

const fetchGroup = () => {
    return axios.get(`/api/v1/group/read`)
}

const createUserService = (userData) => {
    return axios.post("/api/v1/users/create", { ...userData })
}

const updateUserService = (userData) => {
    return axios.put("/api/v1/users/update", { ...userData })
}

const getUserAccount = () => {
    return axios.get(`/api/v1/account`)
}

const logoutService = () => {
    return axios.post("/api/v1/logout")
}

export {
    registerService, loginService,
    fetchAllUsers, deleteUser, fetchGroup,
    createUserService, updateUserService,
    getUserAccount, logoutService
}