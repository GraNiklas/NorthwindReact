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

export default { getAll, create };