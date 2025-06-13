import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://adhd-server.onrender.com/',
});

export default Api;

