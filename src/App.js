import { MantineProvider } from "@mantine/core";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import axios from "axios";
import { Title, Container } from "@mantine/core";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import CountriesDataContext from "./configContext";

const COUNTRIES_LIST_URL =
  "https://oec.world/olap-proxy/members?cube=trade_i_baci_a_92&level=Country&locale=en";

function App() {
  const [countriesData, setCountriesData] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "dashboard/:countryID",
      element: <Dashboard />,
    },
  ]);

  useEffect(() => {
    axios.get(COUNTRIES_LIST_URL).then((response) => {
      const { data: countriesData } = response.data;
      setCountriesData(countriesData);
    });
  }, []);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <CountriesDataContext.Provider value={countriesData}>
        <Container>
          <Title order={1} align="center">
            National Trade Data
          </Title>
          <RouterProvider router={router} />
        </Container>
      </CountriesDataContext.Provider>
    </MantineProvider>
  );
}

export default App;
