import { Title, Container } from "@mantine/core";
import SearchBar from "../../components/SearchBar";
const Home = () => (
  <main>
    <Container>
      <Title order={1} align="center">
        National Trade Data
      </Title>
      <SearchBar />
    </Container>
  </main>
);
export default Home;
