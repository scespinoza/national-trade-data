import { Autocomplete } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { IconSearch } from "@tabler/icons";
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
        icon={<IconSearch stroke={1.5} color="#0B7285" />}
        onItemSubmit={(value) => {
          return navigate(`/country/${value.id}`);
        }}
      />
    </div>
  );
};

export default SearchBar;
