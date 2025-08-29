import axios from "axios"

// const baseUrl = "https://localhost:7270/api/customers";
const baseUrl = "https://northwindrestapi20250828211334-fgexd6fjh9dgcahx.swedencentral-01.azurewebsites.net";
const extraUrl = "/api/customers";

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const config = { headers: { Authorization: token } }
    const request = axios.get(baseUrl + extraUrl, config);
    return request.then(response => response.data);
}

const create = (newCustomer) => {
    const config = { headers: { Authorization: token } }
    return axios.post(baseUrl + extraUrl, newCustomer, config);
}

const remove = (id) => {
    const config = { headers: { Authorization: token } }
    return axios.delete(`${baseUrl + extraUrl}/${id}`, config);
}

const update = (customer) => {
    const config = { headers: { Authorization: token } }
    return axios.put(`${baseUrl + extraUrl}/${customer.customerId}`, customer, config);
}

export default { getAll, create, remove, update, setToken };