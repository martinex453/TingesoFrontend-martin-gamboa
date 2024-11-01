import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get("/api/user/");
}

const getId = id => {
    return httpClient.get(`/api/user/${id}`);
}

const getEmail = email => {
    return httpClient.get(`/api/user/email/${email}`);
}

const getPhone = phone => {
    return httpClient.get(`/api/user/phone/${phone}`);
}

const getName = name => {
    return httpClient.get(`/api/user/name/${name}`);
}

const create = data => {
    return httpClient.post("/api/user/", data);
}

const update = data => {
    return httpClient.put("/api/user/", data);
}

const remove = id => {
    return httpClient.delete(`/api/user/${id}`);
}

const login = data => {
    return httpClient.post("/api/user/login", data);
}

const ageLimit = userId => {
    return httpClient.get(`/api/user/ageLimit/${userId}`);
}

export default {getAll, getId, getEmail, getPhone, getName, create, update, remove, login, ageLimit};