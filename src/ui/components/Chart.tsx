import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import moment from "moment";
import { useTranslation } from "react-i18next";

const renderLegend = (props: any, color: any, t: any) => {
  const { payload } = props;
  return (
    <>
      {payload.map((entry: { value: any }, index: any) => (
        <div style={{ color, textAlign: "center" }} key={`item-${index}`}>
          {t(entry.value)}
        </div>
      ))}
    </>
  );
};

const Chart = ({ data }: any) => {
  const { prices, market_caps, total_volumes } = data;
  const { t } = useTranslation();
  const pricesData = prices.map((i: any) => ({
    dt: moment(i[0]).format("DD/MM/YY HH:mm:ss"),
    price: i[1],
  }));
  const marketCapsData = market_caps.map((i: any) => ({
    dt: moment(i[0]).format("DD/MM/YY HH:mm:ss"),
    market_cap: i[1],
  }));
  const totalVolumesData = total_volumes.map((i: any) => ({
    dt: moment(i[0]).format("DD/MM/YY HH:mm:ss"),
    total_volume: i[1],
  }));

  return (
    <>
      <div className={"chart"}>
        <div className="chart-title">{"Price"}</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={100}
            height={200}
            data={pricesData}
            margin={{ top: 10, bottom: 10, left: 30, right: 30 }}
          >
            <Line
              type="monotone"
              dataKey="price"
              stroke="#c39bc6"
              strokeWidth={1}
              dot={false}
            />
            <XAxis tickLine={true} dataKey="dt" />
            <YAxis domain={["auto", "auto"]} />
            <CartesianGrid strokeDasharray="3 4" />
            <Tooltip filterNull={false} />
            <Legend content={(props) => renderLegend(props, "#c39bc6", t)} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={"chart"}>
        <div className="chart-title">{"Market Cap"}</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={100}
            height={200}
            data={marketCapsData}
            margin={{ top: 10, bottom: 10, left: 30, right: 30 }}
          >
            <Line
              type="monotone"
              key="0"
              dataKey="market_cap"
              stroke="#277488"
              strokeWidth={1}
              yAxisId={0}
              dot={false}
            />
            <XAxis dataKey="dt" />
            <YAxis domain={["auto", "auto"]} />
            <CartesianGrid strokeDasharray="3 4" />
            <Tooltip filterNull={false} />
            <Legend content={(props) => renderLegend(props, "#277488", t)} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={"chart"}>
        <div className="chart-title">{"Total Volumes"}</div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={100}
            height={200}
            data={totalVolumesData}
            margin={{ top: 10, bottom: 10, left: 30, right: 30 }}
          >
            <Area
              type="basis"
              key="0"
              dataKey="total_volume"
              stroke="#277488"
              strokeWidth={1}
              yAxisId={0}
              dot={false}
            />
            <XAxis dataKey="dt" />
            <YAxis domain={["auto", "auto"]} />
            <CartesianGrid strokeDasharray="3 4" />
            <Tooltip filterNull={false} />
            <Legend content={(props) => renderLegend(props, "#277488", t)} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
