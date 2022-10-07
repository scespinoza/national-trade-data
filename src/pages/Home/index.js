import { Text } from "@mantine/core";
import SearchBar from "../../components/SearchBar";
import Footer from "../../components/Footer";
import "./index.css";
import Header from "../../components/Header";
import RandomSelector from "../../components/RandomSelector";
const Home = () => (
  <div className="home">
    <main>
      <Header />
      <div>
        <Text className="welcome-p" align="center">
          Welcome to <b>National Trade Data</b>! Here you can find trade data
          for a variety of countries. Try searching the country you are looking
          for.
        </Text>
        <SearchBar />
        <RandomSelector />
      </div>
    </main>
    <Footer />
  </div>
);
export default Home;
