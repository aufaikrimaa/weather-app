import axiosInstance from "./axiosInstance";

const endpoint = {
  wedata: "data/2.5/",
  geo: "geo/1.0/",
};

const owmApi = {
  getCurrentWeather: (params) =>
    axiosInstance.get(endpoint.wedata + "weather?", params),
  getForecast5days: (params) =>
    axiosInstance.get(endpoint.wedata + "forecast?", params),
  getAirPolluion: (params) =>
    axiosInstance.get(endpoint.wedata + "air_pollution?", params),
  getGeoLocation: (params) =>
    axiosInstance.get(endpoint.geo + "direct?", params),
};

export default owmApi;
