import { Autocomplete } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CountriesDataContext from "../../configContext";
import "./index.css";

const SearchBar = () => {
  const countries = useContext(CountriesDataContext);
  const navigate = useNavigate();
  return (
    <div className="search-container">
      <Autocomplete
        data={countries
          .filter((country) => country["EN Label"] !== null)
          .map((country) => ({
            value: country["EN Label"],
            id: country["ID"],
          }))}
        placeholder="Start typing to find a country..."
        onItemSubmit={(value) => {
          console.log(value.id);
          return navigate(`/dashboard/${value.id}`);
        }}
      />
    </div>
  );
};

export default SearchBar;
