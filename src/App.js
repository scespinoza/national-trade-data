import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Container } from "@mantine/core";

import Home from "./pages/Home";
import Country from "./pages/Country";

import CountriesDataContext from "./configContext";
import Error from "./pages/Error";
import { useCountries } from "./hooks/countries";

function App() {
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

  const countriesData = useCountries();

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
