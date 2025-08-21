import axios from "axios"

const baseUrl = "https://localhost:7270/api/users";

const getAll = () => {
    // const config ={
    //     headers:{Auhorization: token},
    // }
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = (object) => {
    return axios.post(baseUrl, object);
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.userId}`, object);
}

export default { getAll, create, remove, update};