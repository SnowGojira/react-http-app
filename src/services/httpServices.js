import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logServices";

axios.interceptors.response.use(null, (error) => {
  const clientSideError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!clientSideError) {
    logger.log(error);
    toast.error("an unexpected error happened!");
  }
  return Promise.reject(error);
});

const http = {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
};

export default http;
