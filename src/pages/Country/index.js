import { useNavigate, useParams } from "react-router-dom";
import { Button, Title } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons";
import { useContext } from "react";
import CountriesDataContext from "../../configContext";
import ImportsChart from "../../components/ImportsChart";
import ExportsChart from "../../components/ExportsChart";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./index.css";

const Country = () => {
  const navigate = useNavigate();
  const { countryID } = useParams();
  const countries = useContext(CountriesDataContext);
  const country = countries.find((country) => country["ID"] === countryID);

  if (country) {
    return (
      <div className="dashboard">
        <main>
          <Header />
          <div className="dashboard-header">
            <Title
              className="country-name"
              color="cyan.9"
              order={2}
              weight={500}
              transform="capitalize"
            >
              {country["EN Label"]}
            </Title>
            <Button
              leftIcon={<IconArrowBackUp />}
              color="cyan"
              variant="light"
              onClick={() => navigate("/")}
            >
              Search another country
            </Button>
          </div>
          <ImportsChart
            countryID={countryID}
            countryName={country["EN Label"]}
          />
          <ExportsChart
            countryID={countryID}
            countryName={country["EN Label"]}
          />
        </main>
        <Footer />
      </div>
    );
  } else if (!country && countries.length > 0) {
    throw new Error("Country does not exists");
  }
};

export default Country;
