import { useSelector } from "react-redux";
import apiConfig from "../api/apiConfig";

function CurrentWeather() {
  const { weatherData, status, error } = useSelector((state) => state.weather);
  console.log(weatherData);
  return (
    <>
      <div>{weatherData?.weather[0].main}</div>
      <div>{weatherData?.weather[0].description}</div>
      <div>
        <img src={apiConfig.iconUrl(weatherData?.weather[0].icon)} />
      </div>
    </>
  );
}
export default CurrentWeather;
