import { Link } from "react-router-dom";
import { Title, Text } from "@mantine/core";

const Header = () => (
  <Title order={1} align="center">
    <Link className="title" to="/">
      <Text
        gradient={{ from: "#06beb6", to: "#48b1bf", deg: 45 }}
        variant="gradient"
      >
        National Trade Data
      </Text>
    </Link>
  </Title>
);

export default Header;
