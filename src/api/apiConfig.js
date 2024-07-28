const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

const apiConfig = {
  baseUrl: "https://api.openweathermap.org/",
  apiKey: API_KEY,
  iconUrl: (img) => `https://openweathermap.org/img/wn/${img}@2x.png`,
};

export default apiConfig;
