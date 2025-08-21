import axios from "axios"

const baseUrl = "https://localhost:7270/api/products";

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const config = { headers: { Authorization: token } }
    const request = axios.get(baseUrl, config);
    return request.then(response => response.data);
}

const create = (product) => {
    const config = { headers: { Authorization: token } }
    return axios.post(baseUrl, product, config);
}

const remove = (id) => {
    const config = { headers: { Authorization: token } }
    return axios.delete(`${baseUrl}/${id}`, config);
}

const update = (product) => {
    const config = { headers: { Authorization: token } }
    return axios.put(`${baseUrl}/${product.productId}`, product, config);
}

export default { getAll, create, remove, update, setToken };