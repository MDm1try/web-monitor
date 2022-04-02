import request from "./request";
import * as urlBuilders from "./urlBuilders";

const api = {
  ...urlBuilders,
  get: (url) => request(url, `GET`),
  delete: (url) => request(url, `DELETE`),
  put: (url, data) => request(url, `PUT`, data),
  post: (url, data) => request(url, `POST`, data),
  patch: (url, data) => request(url, `PATCH`, data),
};

export default api;
