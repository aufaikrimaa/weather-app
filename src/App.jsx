import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather } from "./redux/slice/weatherSlice";
import { fetchForecast } from "./redux/slice/forecastSlice";
import { fetchAirPollution } from "./redux/slice/pollutionSlice";
import { City } from "country-state-city";
import { FixedSizeList as List } from "react-window";
import debounce from "lodash/debounce";
import iso3166Country from "iso-3166-1";
import iso3166State from "iso-3166-2";
import apiConfig from "./api/apiConfig";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  const dispatch = useDispatch();
  const { forecastData } = useSelector((state) => state.forecast);
  const { airPollutionData } = useSelector((state) => state.pollution);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCity, setFilteredCity] = useState([]);
  const [chosenCity, setChosenCity] = useState({
    latitude: "-5.00000000",
    longitude: "120.00000000",
    name: "Indonesia",
  });

  useEffect(() => {
    const params = {
      lat: chosenCity.latitude,
      lon: chosenCity.longitude,
      units: "metric",
      // lang: "ID",
    };
    dispatch(fetchCurrentWeather(params));
    dispatch(fetchForecast(params));
    dispatch(fetchAirPollution(params));
  }, [dispatch, chosenCity]);

  const debouncedFilterCity = useCallback(
    debounce((value) => {
      if (value.length > 0) {
        const cityData = City.getAllCities();
        const filtered = cityData.filter((city) =>
          city.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCity(filtered);
      } else {
        setFilteredCity([]);
      }
    }, 100),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFilterCity(value);
  };

  const getCountryName = (code) =>
    iso3166Country.whereAlpha2(code)?.country || code;

  const getStateName = (countryCode, stateCode) => {
    const stateData = iso3166State.subdivision(countryCode, stateCode);
    return stateData ? stateData.name : stateCode;
  };

  const pollutanIndex = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

  const components = airPollutionData?.list
    ? Object.keys(airPollutionData.list[0].components)
    : [];

  const kimia = {
    co: "CO",
    no: "NO",
    no2: "NO2",
    o3: "O3",
    so2: "SO2",
    pm2_5: "PM2.5",
    pm10: "PM10",
    nh3: "NH3",
  };

  // console.log(weatherData);
  // console.log(forecastData);
  // console.log(airPollutionData);
  // console.log(chosenCity);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Input your city"
          className="px-3 py-1 sm:py-0.5 xs:py-0.5 md:text-xs sm:text-[10px] xs:text-[10px] rounded-full w-[30rem] md:w-[25rem] sm:w-[85vw] xs:w-[85vw] border border-gray-500 focus:border-secondaryColor focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <List
        height={200}
        itemCount={filteredCity.length}
        itemSize={35}
        width={600}
      >
        {({ index, style }) => (
          <div
            style={style}
            onClick={() => {
              setChosenCity(filteredCity[index]);
              setSearchTerm("");
              setFilteredCity([]);
            }}
          >
            {filteredCity[index].name}
            {", "}
            {getStateName(
              filteredCity[index].countryCode,
              filteredCity[index].stateCode
            )}
            {", "}
            {getCountryName(filteredCity[index].countryCode)}
          </div>
        )}
      </List>
      <div>
        {chosenCity.name}
        {chosenCity.countryCode
          ? ", " +
            getStateName(chosenCity.countryCode, chosenCity.stateCode) +
            ", " +
            getCountryName(chosenCity.countryCode)
          : ""}
      </div>
      <CurrentWeather />

      <div className="flex flex-wrap gap-2">
        {forecastData?.list.map((item, i) => (
          <div key={i}>
            <div>{item.weather[0].main}</div>
            <div>{item.weather[0].description}</div>
            <div>
              <img src={apiConfig.iconUrl(item.weather[0].icon)} />
            </div>
          </div>
        ))}
      </div>
      <div>
        Air Condition : {pollutanIndex[airPollutionData?.list[0].main.aqi - 1]}
      </div>
      <div>
        {components.map((item, i) => (
          <div key={i}>
            {kimia[item] + ": " + airPollutionData.list[0].components[item]}{" "}
            μg/m3
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
