import axios from "axios"

const baseUrl = "https://localhost:7270/api/customers";

const getAll = () => {
    // const config ={
    //     headers:{Auhorization: token},
    // }
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = (newCustomer) => {
    return axios.post(baseUrl, newCustomer);
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

const update = (customer) => {
    return axios.put(`${baseUrl}/${customer.customerId}`, customer);
}

export default { getAll, create, remove, update};