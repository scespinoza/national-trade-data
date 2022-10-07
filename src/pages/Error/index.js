import { Title, Button } from "@mantine/core";
import { IconRefresh } from "@tabler/icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./index.css";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <main className="error">
      <Header />
      <Title order={2} align="center">
        Whoops! We couldn't find data for this country
      </Title>
      <Link to="/">
        <Button leftIcon={<IconRefresh />} color="cyan.9">
          Try with another one
        </Button>
      </Link>
      <Footer />
    </main>
  );
};

export default Error;
