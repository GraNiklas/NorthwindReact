import axios from "axios"

// const baseUrl = "https://localhost:7270/api/products";
const baseUrl = "https://northwindrestapi20250828211334-fgexd6fjh9dgcahx.swedencentral-01.azurewebsites.net";
const extraUrl = "/api/products";

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const config = { headers: { Authorization: token } }
    const request = axios.get(baseUrl + extraUrl, config);
    return request.then(response => response.data);
}

const create = (product) => {
    const config = { headers: { Authorization: token } }
    return axios.post(baseUrl + extraUrl, product, config);
}

const remove = (id) => {
    const config = { headers: { Authorization: token } }
    return axios.delete(`${baseUrl + extraUrl}/${id}`, config);
}

const update = (product) => {
    const config = { headers: { Authorization: token } }
    return axios.put(`${baseUrl + extraUrl}/${product.productId}`, product, config);
}

export default { getAll, create, remove, update, setToken };