import axios from "axios"

// const baseUrl = "https://localhost:7270/api/users";
const baseUrl = "https://northwindrestapi20250828211334-fgexd6fjh9dgcahx.swedencentral-01.azurewebsites.net";
const extraUrl = "/api/users";

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const config = { headers: { Authorization: token } }
    const request = axios.get(baseUrl + extraUrl,config);
    return request.then(response => response.data);
}

const create = (object) => {
    const config = { headers: { Authorization: token } }
    return axios.post(baseUrl + extraUrl, object,config);
}

const remove = (id) => {
    const config = { headers: { Authorization: token } }
    return axios.delete(`${baseUrl + extraUrl}/${id}`,config);
}

const update = (object) => {
    const config = { headers: { Authorization: token } }
    return axios.put(`${baseUrl + extraUrl}/${object.userId}`, object,config);
}

export default { getAll, create, remove, update, setToken };