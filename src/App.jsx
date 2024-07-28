import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather } from "./redux/slice/weatherSlice";
import { fetchForecast } from "./redux/slice/forecastSlice";
import { fetchAirPollution } from "./redux/slice/pollutionSlice";
import { City } from "country-state-city";

function App() {
  const dispatch = useDispatch();
  const { weatherData, status, error } = useSelector((state) => state.weather);
  const { forecastData } = useSelector((state) => state.forecast);
  const { airPollutionData } = useSelector((state) => state.pollution);

  useEffect(() => {
    const params = {
      lat: -7.5484,
      lon: 110.3097,
      units: "metric",
      lang: "ID",
    };
    dispatch(fetchCurrentWeather(params));
    dispatch(fetchForecast(params));
    dispatch(fetchAirPollution(params));
    // airPollution();
  }, [dispatch]);

  const cityData = City.getAllCities();

  const filteredCity = cityData.filter((city) =>
    city.name.toLowerCase().includes("Magelang".toLowerCase())
  );

  console.log(weatherData);
  console.log(forecastData);
  console.log(airPollutionData);

  return (
    <>
      <div>Weather app</div>
    </>
  );
}

export default App;
