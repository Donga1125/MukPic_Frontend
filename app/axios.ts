import axios from "axios";


const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ROOT_API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;


