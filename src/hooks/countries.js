import { useState, useEffect } from "react";
import axios from "axios";

export const COUNTRIES_LIST_URL =
  "https://oec.world/olap-proxy/members?cube=trade_i_baci_a_92&level=Country&locale=en";

export const useCountries = () => {
  const [countriesData, setCountriesData] = useState([]);
  useEffect(() => {
    axios.get(COUNTRIES_LIST_URL).then((response) => {
      const { data: countriesData } = response.data;
      setCountriesData(countriesData);
    });
  }, []);
  return countriesData;
};
