import axios from "axios"
import { getstorage} from './storage'

axios.defaults.baseURL="https://identitytoolkit.googleapis.com/v1"

const APIKEY="firebase api key";

//const REGISTERURL=`/accounts:signUp?key=${APIKEY}`;

//const LOGINURL=`/accounts:signInWithPassword?key=${APIKEY}`;

const USER_DETAILS_URL = `/accounts:lookup?key=${APIKEY}`;
const API_URL='http://localhost:8080';

export const RegisterApi = (inputs) => {
    const data = {
        //displayName: inputs.name,
        username:inputs.name,
        email: inputs.email,
        password: inputs.password,
    };
    return axios.post(`${API_URL}/register`, data);
};

export const LoginApi = (inputs) => {
    const data = {
        //email: inputs.email,
        username:inputs.email,
        password: inputs.password,
    };
    return axios.post(`${API_URL}/login`, data);
};

export const UserDetailsApi = ()=>{
    let data = {idToken:getstorage()}
    return axios.post(USER_DETAILS_URL,data)
}
