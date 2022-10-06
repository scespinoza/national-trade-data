import { MantineProvider } from "@mantine/core";

import Home from "./pages/Home";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Home></Home>
    </MantineProvider>
  );
}

export default App;
