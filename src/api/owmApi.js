import axiosInstance from "./axiosInstance";

const owmApi = {
  getCurrentWeather: (params) => {
    const url = "weather?";
    return axiosInstance.get(url, params);
  },
  getForecast5days: (params) => {
    const url = "forecast?";
    return axiosInstance.get(url, params);
  },
};

export default owmApi;
