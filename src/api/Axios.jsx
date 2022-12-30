import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3500/",
});

export default Axios;
