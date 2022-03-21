import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetails, fetchCoinChartData } from "../actions/coinActions";
import { useParams, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Statistic,
  PageHeader,
  Card,
  Row,
  Col,
  Result,
  Button,
  Tooltip,
  Typography,
  Avatar,
} from "antd";
import Loader from "./components/Loader";
import moment from "moment";
import PriceChangeTable from "./components/PriceChangeTable";
import ChartsSection from "./components/ChartsSection";

const dateOptions = [
  { label: "1 day ago", value: 1 },
  { label: "14 days ago", value: 14 },
  { label: "1 month ago", value: 30 },
  { label: "3 months ago", value: 90 },
  { label: "1 year ago", value: 365 },
  { label: "Since the creation of the coin", value: "max" },
];
const priceChangeHeaders = ["24h", "7d", "14d", "30d", "60d", "200d", "1y"];
const priceChangePercentagePrefix = "price_change_percentage_";
const linkWithToolTip = (
  link: any | null | undefined,
  index: string | number,
) => (
  <Tooltip placement="left" title={link} key={`link-value-${index}`}>
    <Typography.Paragraph
      ellipsis
      key={`link-value-${index}`}
      className="link-value"
    >
      {link}
    </Typography.Paragraph>
  </Tooltip>
);

export const printLinks = (links: any) => {
  if (!links) return null;
  return (
    <>
      {Array.isArray(links)
        ? links.map(
            (link, index) =>
              link && link !== "" && linkWithToolTip(link, index),
          )
        : typeof links == "object"
        ? Object.keys(links).map((linkTitle, index) => {
            return links[linkTitle].find(
              (link: string) => link && link !== "",
            ) ? (
              <div key={`link-object-value-${index}`}>
                <span className="second-lvl-link-title">
                  <i>{linkTitle}</i>
                </span>
                <div>
                  {links[linkTitle].map((link: any, linkIndex: any) =>
                    linkWithToolTip(link, linkIndex),
                  )}
                </div>
              </div>
            ) : null;
          })
        : linkWithToolTip(links, "")}
    </>
  );
};

const CoinDetails = () => {
  const { data, error, loading } = useSelector((state: any) => state.coin);
  const { coinId }: any = useParams();
  const refresh = () => {
    dispatch(fetchCoinDetails({ id: coinId }));
  };

  const refreshCharts = () => {
    dispatch(fetchCoinChartData({ id: coinId, days: selectedPeriod }));
  };

  const { t } = useTranslation();
  const {
    data: chartData,
    error: chartError,
    loading: chartLoading,
  } = useSelector((state: any) => state.chart);

  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoinDetails({ id: coinId }));
  }, [coinId, dispatch]);

  if (error) {
    return (
      <Result
        status="warning"
        title="Could not retrieve data"
        extra={
          <Button type="primary" onClick={refresh} key="console">
            Please retry
          </Button>
        }
      />
    );
  }

  if (loading) {
    return <Loader />;
  }

  const handleChange = (value: any) => {
    setSelectedPeriod(value);
    if (chartData && chartData[value]) return;
    dispatch(fetchCoinChartData({ id: coinId, days: value }));
  };

  if (!data || !data.name) return null;

  return (
    <>
      <PageHeader onBack={() => history.goBack()} title="Back to Coins List" />
      <div style={{ padding: "10px" }}>
        <div className="coin-title">
          <Avatar src={data.image.large} size={60} /> {data.name}
        </div>

        <div className="coin-description">
          <div dangerouslySetInnerHTML={{ __html: data.description.en }} />
        </div>
        <Row>
          <Col span={16}>
            <Card
              size="small"
              title="Current / Highest / Lowest Prices"
              bordered={true}
            >
              <Row /*type="flex"*/ justify="center">
                <Col span={8}>
                  <Statistic
                    valueStyle={{ fontSize: "1.8rem" }}
                    title="Current Price"
                    value={data.market_data.current_price.usd}
                    precision={2}
                    prefix="$"
                  />
                </Col>
                <Col span={16}>
                  <Row /*type="flex"*/ justify="center">
                    <Col span={12}>
                      <Statistic
                        valueStyle={{ fontSize: "1.2rem" }}
                        title="Highest on last day"
                        value={data.market_data.high_24h.usd}
                        precision={2}
                        prefix="$"
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Highest"
                        valueStyle={{ fontSize: "1.2rem" }}
                        value={data.market_data.ath.usd}
                        precision={2}
                        prefix="$"
                        suffix={
                          <span className="edge-price-date">
                            {`on ${moment(data.market_data.ath_date.usd).format(
                              "DD/MM/YY",
                            )}`}
                          </span>
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Statistic
                        title="Lowest on last day"
                        valueStyle={{ fontSize: "1.2rem" }}
                        value={data.market_data.low_24h.usd}
                        precision={2}
                        prefix="$"
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Lowest"
                        valueStyle={{ fontSize: "1.2rem" }}
                        value={data.market_data.atl.usd}
                        precision={2}
                        prefix="$"
                        suffix={
                          <span className="edge-price-date">
                            {`on ${moment(data.market_data.atl_date.usd).format(
                              "DD/MM/YY",
                            )}`}
                          </span>
                        }
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Card title="Price Change" size="small" bordered={false}>
                <PriceChangeTable
                  priceChangeHeaders={priceChangeHeaders}
                  priceChangePercentagePrefix={priceChangePercentagePrefix}
                  market_data={data.market_data}
                />
              </Card>
            </Card>
            <ChartsSection
              handleChange={handleChange}
              dateOptions={dateOptions}
              loading={chartLoading}
              data={chartData[selectedPeriod]}
              error={chartError}
              refresh={refreshCharts}
            />
          </Col>

          <Col span={8}>
            <div className="coin-links">
              <div>
                {Object.keys(data.links).map((linkTitle) => (
                  <div key={data.id}>
                    <span className="link-title">
                      <b>{t(linkTitle)}:</b>
                    </span>
                    {printLinks(data.links[linkTitle])}
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CoinDetails;
