import axios from "axios";
import _ from "lodash";
import { format } from "d3plus-format";
import { useEffect, useState } from "react";
import { Treemap } from "d3plus-react";
import { Title, Text, LoadingOverlay } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons";

const formatCurrency = format(".3~a");

const ChartDescription = ({ countryName, data }) => {
  const dataSorted = _.sortBy(data, (d) => -d["Trade Value"]);
  const maxCategory = dataSorted[0];
  const importantCategories = dataSorted
    .slice(1, dataSorted.length - 1)
    .slice(0, 2);

  const ExtraCategories = ({ categories = [] }) => {
    if (categories.length === 0) return;
    if (categories.length === 1)
      return (
        <Text>
          Another important category of imported goods is{" "}
          <Text weight={500} italic span>
            "{importantCategories["HS2"]}"
          </Text>{" "}
          with{" "}
          <Text color="cyan.9" weight={400} span>
            {`$${formatCurrency(categories[0]["Trade Value"])} USD `}
          </Text>
        </Text>
      );
    if (categories.length === 2)
      return (
        <Text span>
          Other important categories of imported goods are{" "}
          <Text weight={500} italic span>
            "{categories[0]["HS2"]}"
          </Text>{" "}
          with{" "}
          <Text color="cyan.9" weight={400} span>
            {`$${formatCurrency(categories[0]["Trade Value"])} USD `}
          </Text>
          and{" "}
          <Text weight={500} italic span>
            "{categories[1]["HS2"]}"
          </Text>{" "}
          with{" "}
          <Text color="cyan.9" weight={400} span>
            {`$${formatCurrency(categories[1]["Trade Value"])} US.`}
          </Text>
        </Text>
      );
  };
  return (
    <Text className="chart-description">
      This chart shows the share of exports for{" "}
      <Text weight={500} color="cyan.9" span>
        {countryName}
      </Text>{" "}
      in 2020. The most prominent category of exported goods was{" "}
      <Text weight={500} italic span>
        "{maxCategory["HS2"]}"
      </Text>{" "}
      with a trade value of{" "}
      <Text weight={500} color="cyan.9" span>{`$${formatCurrency(
        maxCategory["Trade Value"]
      )} USD.`}</Text>
      <ExtraCategories categories={importantCategories} />
    </Text>
  );
};

const Chart = ({ countryName, data, total }) => {
  return (
    <div className="chart-container">
      <Treemap
        config={{
          title: `Share of ${countryName} exports for 2020.`,
          titleConfig: {
            fontSize: 16,
            fontWeight: 500,
            fontColor: "#0B7285",
          },
          detectVisible: false,

          data: data.map((d) => ({
            id: d["HS2"],
            value: d["Trade Value"],
          })),
          tooltipConfig: {
            tbody: [
              ["Exports", (d) => `$${formatCurrency(d.value)} USD`],
              ["Share", (d) => `${_.round((100 * d.value) / total, 2)}%`],
            ],
          },
        }}
      />
    </div>
  );
};
const ImportsChart = ({ countryID, countryName }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = `https://oec.world/olap-proxy/data.jsonrecords?Exporter+Country=${countryID}&Year=2020&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=${process.env.REACT_APP_ACCESS_TOKEN}`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data.data);
        setTotal(response.data.data.reduce((a, b) => a + b["Trade Value"], 0));

        setLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, [countryID]);
  return (
    <article>
      <div className="chart-section-header">
        <Title color="gray.7" order={4} weight={500} transform="uppercase">
          Exports
        </Title>
        <Text weight={700} color="cyan.9">{`Trade Value $${format(".3~a")(
          total
        )} USD`}</Text>
      </div>
      <LoadingOverlay visible={isLoading} loaderProps={{ color: "cyan.9" }} />
      {data.length > 0 && (
        <>
          <ChartDescription
            countryName={countryName}
            data={data}
            total={total}
          />
          <Chart countryName={countryName} data={data} total={total} />
        </>
      )}
      {data.length === 0 && !isLoading && (
        <div className="not-found-message">
          <IconMoodSad color="#0B7285" size={64} />
          <Text>We couldn't find exports data for this country.</Text>
        </div>
      )}
    </article>
  );
};

export default ImportsChart;
