import axios from "axios"

const baseUrl = "https://northwindrestapi20250828211334-fgexd6fjh9dgcahx.swedencentral-01.azurewebsites.net";
const extraUrl = "/api/authentication";
// const baseUrl = "https://localhost:7270/api/authentication";

const authenticate = (userForAuth)=>{
    const request = axios.post(baseUrl+extraUrl, userForAuth);
    return request.then(response => response);
}

export default { authenticate};