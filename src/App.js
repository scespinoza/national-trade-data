import { MantineProvider } from "@mantine/core";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import axios from "axios";
import { Container } from "@mantine/core";

import Home from "./pages/Home";
import Country from "./pages/Country";

import CountriesDataContext from "./configContext";
import Error from "./pages/Error";
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
      path: "country/:countryID",
      element: <Country />,
      errorElement: <Error />,
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
        <Container className="page-container">
          <RouterProvider router={router} />
        </Container>
      </CountriesDataContext.Provider>
    </MantineProvider>
  );
}

export default App;
