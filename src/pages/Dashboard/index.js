import { useNavigate, useParams } from "react-router-dom";
import { Button, Title } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons";
import { useContext } from "react";
import CountriesDataContext from "../../configContext";
import ImportsChart from "../../components/ImportsChart";
import ExportsChart from "../../components/ExportsChart";

import "./index.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { countryID } = useParams();
  const countries = useContext(CountriesDataContext);

  const countryName = countries.find((country) => country["ID"] === countryID);
  if (countryName)
    return (
      <main className="dashboard">
        <div className="dashboard-header">
          <Title>{countryName["EN Label"]}</Title>
          <Button leftIcon={<IconArrowBackUp />} onClick={() => navigate("/")}>
            Search another country
          </Button>
        </div>
        <ImportsChart countryID={countryID} />
        <ExportsChart countryID={countryID} />
      </main>
    );
};

export default Dashboard;
