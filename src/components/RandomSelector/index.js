import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Text, Button } from "@mantine/core";
import CountriesDataContext from "../../configContext";
import { IconArrowRight } from "@tabler/icons";
import "./index.css";

const RandomSelector = () => {
  const countries = useContext(CountriesDataContext);
  const [currentSuggestion, setCurrentSuggestion] = useState();
  return (
    <div className="random-selector">
      <Text>Not sure of what you are looking for?</Text>
      <Button
        variant="gradient"
        gradient={{ from: "#06beb6", to: "#48b1bf", deg: 45 }}
        onClick={() => {
          function setRandomSuggestion(i = 0) {
            setTimeout(() => {
              const randomId = Math.round(Math.random() * countries.length);
              setCurrentSuggestion(countries[randomId]);
              if (i < 20) {
                i++;
                setRandomSuggestion(i);
              }
            }, 500 / (100 - i * 2));
          }
          setRandomSuggestion();
        }}
      >
        Try a random country
      </Button>
      {currentSuggestion && (
        <div className="random-suggestion">
          <Text color="cyan.9" size={24}>
            {currentSuggestion["EN Label"]}
          </Text>
          <Link to={`/country/${currentSuggestion["ID"]}`}>
            <Button round="full" radius="xl" variant="light" color="cyan">
              <IconArrowRight />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RandomSelector;
