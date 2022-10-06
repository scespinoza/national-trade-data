import axios from "axios";
import { Autocomplete } from "@mantine/core";
import { useEffect, useState } from "react";

const COUNTRIES_LIST_URL =
  "https://oec.world/olap-proxy/members?cube=trade_i_baci_a_92&level=Country&locale=en";

const SearchBar = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(COUNTRIES_LIST_URL).then((response) => {
      const { data: countriesData } = response.data;
      setCountries(countriesData);
    });
  }, []);
  if (countries.length > 0) {
    console.log();
  }
  return (
    <Autocomplete
      data={countries
        .filter((country) => country["EN Label"] !== null)
        .map((country) => ({
          value: country["EN Label"],
          id: country["ID"],
        }))}
      placeholder="Start typing to find a country..."
      onItemSubmit={(value) => {
        console.log(value);
        window.alert(`go to ${value.id}`);
      }}
    />
  );
};

export default SearchBar;
