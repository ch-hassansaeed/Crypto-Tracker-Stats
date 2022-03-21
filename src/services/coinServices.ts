import axios from "axios";

export const fetchCoins = async ({ page }: any) => {
  const params = {
    vs_currency: "usd",
    page,
    sparkline: false,
    per_page: 20,
    order: "market_cap_desc",
  };
  try {
    const data = await axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/markets`,
      params,
      headers: {
        "content-type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.error("Error in coins service:", err);
    throw err;
  }
};

export const fetchCoinDetails = async ({ id }: any) => {
  const params = {
    tickers: false,
    developer_data: false,
  };
  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/${id}`,
      params,
      headers: {
        "content-type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.error("Error in coin details service:", err);
    throw err;
  }
};

export const fetchCoinChartData = async ({ id, days }: any) => {
  const params = {
    vs_currency: "usd",
    days,
  };
  try {
    const { data } = await axios({
      method: "get",
      url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      params,
      headers: {
        "content-type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.error("Error in coin details service:", err);
    throw err;
  }
};
