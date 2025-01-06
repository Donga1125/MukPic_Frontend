import axios from "axios";

const API_URL = 'http://localhost:8080';

const instance = axios.create({
    baseURL: API_URL, // process.env.NEXT_PUBLIC_ROOT_API,
    timeout: 25000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;


