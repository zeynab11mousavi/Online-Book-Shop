import axios from "axios";
import {LOGIN_URL, URL} from '../config/api'
import {ACCESS_TOKEN} from "../config/constants";
  

axios.defaults.baseURL = URL
axios.interceptors.request.use((req) => {
    if (req.url !== LOGIN_URL){
        const token = localStorage.getItem(ACCESS_TOKEN);
        req.headers.token = token;
    }
    return req;
})
export default axios



export const NewInstance = axios.create({
	// Configuration
	baseURL: 'https://matikanback.onrender.com',
    timeout: 0,
	headers: {
		Accept: 'application/json',
	},
});