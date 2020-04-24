import axios from 'axios';

const instance = axios.create({
	///baseURL: "http://localhost:5000/",
	baseURL: "https://gliphy-mailify-dev.wl.r.appspot.com/",
	withCredentials: false,
});

export default instance;