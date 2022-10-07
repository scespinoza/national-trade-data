import axios from "axios";
import _ from "lodash";
import { format } from "d3plus-format";
import { useEffect, useState } from "react";
import { Treemap } from "d3plus-react";
import { Title, Text } from "@mantine/core";

const ImportsChart = ({ countryID, countryName }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [maxCategory, setMaxCategory] = useState({});

  const formatCurrency = format(".3~a");
  useEffect(() => {
    const url = `https://oec.world/olap-proxy/data.jsonrecords?Importer+Country=${countryID}&Year=2020&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=${process.env.REACT_APP_ACCESS_TOKEN}`;
    axios.get(url).then((response) => {
      setData(response.data.data);
      setTotal(response.data.data.reduce((a, b) => a + b["Trade Value"], 0));
      setMaxCategory(_.maxBy(response.data.data, "Trade Value"));
    });
  }, [countryID]);

  return (
    <article>
      <div className="chart-section-header">
        <Title color="gray.7" order={4} weight={500} transform="uppercase">
          Imports
        </Title>
        <Text weight={700}>{`Total: $${formatCurrency(total)} USD`}</Text>
      </div>
      <Text className="chart-description">
        The category with more imports for{" "}
        <Text weight={500} color="cyan.9" span>
          {countryName}
        </Text>{" "}
        in 2020 was{" "}
        <Text weight={500} italic span>
          "{maxCategory["HS2"]}"
        </Text>{" "}
        with a trade value of{" "}
        <Text weight={500} color="cyan.9" span>{`$${formatCurrency(
          maxCategory["Trade Value"]
        )} USD.`}</Text>
      </Text>
      <div className="chart-container">
        {data.length > 0 && (
          <Treemap
            config={{
              title: `Share of ${countryName} importations for 2020.`,
              titleConfig: {
                fontSize: 16,
                fontWeight: 500,
                fontColor: "#0B7285",
              },
              detectVisible: false,
              height: 400,
              data: data.map((d) => ({
                id: d["HS2"],
                value: d["Trade Value"],
              })),
              tooltipConfig: {
                tbody: [
                  ["Imports", (d) => `$${formatCurrency(d.value)} USD`],
                  ["Share", (d) => `${_.round((100 * d.value) / total, 2)}%`],
                ],
              },
            }}
          />
        )}
      </div>
    </article>
  );
};

export default ImportsChart;
