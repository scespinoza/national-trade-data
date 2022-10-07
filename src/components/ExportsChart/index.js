import axios from "axios";
import { useEffect, useState } from "react";
import { Treemap } from "d3plus-react";
import { Title } from "@mantine/core";

const ImportsChart = ({ countryID }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = `https://oec.world/olap-proxy/data.jsonrecords?Exporter+Country=${countryID}&Year=2020&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=${process.env.REACT_APP_ACCESS_TOKEN}`;
    axios.get(url).then((response) => {
      setData(response.data.data);
    });
  }, [countryID]);
  return (
    <article>
      <Title>Exports</Title>
      <div className="chart-container">
        <Treemap
          config={{
            height: 400,
            data: data.map((d) => ({
              id: d["HS2"],
              value: d["Trade Value"],
            })),
          }}
        />
      </div>
    </article>
  );
};

export default ImportsChart;
