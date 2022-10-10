import { Text } from "@mantine/core";
import "./index.css";

const Footer = () => {
  return (
    <div className="footer">
      <Text align="center">
        built by{" "}
        <a
          href="https://github.com/scespinoza/"
          target="_blank"
          rel="noreferrer"
        >
          Sebastián C. Espinoza
        </a>
      </Text>
      <Text align="center">
        Data provided by the{" "}
        <a href="https://oec.world/" target="_blank" rel="noreferrer">
          Observatory of Economic Complexity (OEC)
        </a>
      </Text>
    </div>
  );
};
export default Footer;
