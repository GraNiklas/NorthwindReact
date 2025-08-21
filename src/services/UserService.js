import axios from "axios"

const baseUrl = "https://localhost:7270/api/users";

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const config = { headers: { Authorization: token } }
    const request = axios.get(baseUrl,config);
    return request.then(response => response.data);
}

const create = (object) => {
    const config = { headers: { Authorization: token } }
    return axios.post(baseUrl, object,config);
}

const remove = (id) => {
    const config = { headers: { Authorization: token } }
    return axios.delete(`${baseUrl}/${id}`,config);
}

const update = (object) => {
    const config = { headers: { Authorization: token } }
    return axios.put(`${baseUrl}/${object.userId}`, object,config);
}

export default { getAll, create, remove, update, setToken };