import { useEffect } from "react";
import owmApi from "./api/owmApi";

function App() {
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    currentWeather();
    forecast5days();
  }, []);

  return (
    <>
      <div>Weather app</div>
    </>
  );
}

export default App;
