import axios from "axios";

export const config = {
  baseURL: "https://testdarkstorebackend.onrender.com",
};

const client = axios.create({
  baseURL: config.baseURL,
  timeout: 100000,
  headers: {
    common: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  },
});

export default client;
