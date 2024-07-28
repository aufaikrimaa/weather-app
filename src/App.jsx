import { useEffect } from "react";
import owmApi from "./api/owmApi";
import { Country, City } from "country-state-city";

function App() {
  const cityData = City.getAllCities();

  const filteredCity = cityData.filter((city) =>
    city.name.toLowerCase().includes("Magelang".toLowerCase())
  );
  console.log(filteredCity);

  const currentWeather = async () => {
    try {
      const params = {
        lat: -7.5484,
        lon: 110.3097,
        units: "metric",
      };
      const data = await owmApi.getCurrentWeather({ params });
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const forecast5days = async () => {
    try {
      const params = {
        lat: -7.5484,
        lon: 110.3097,
        units: "metric",
        lang: "ID",
      };
      const data = await owmApi.getForecast5days({ params });
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const airPollution = async () => {
    try {
      const params = {
        lat: -7.5484,
        lon: 110.3097,
        units: "metric",
        lang: "ID",
      };
      const data = await owmApi.getAirPolluion({ params });
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    currentWeather();
    forecast5days();
    airPollution();
  }, []);

  return (
    <>
      <div>Weather app</div>
    </>
  );
}

export default App;
