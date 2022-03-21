import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../actions/coinActions";
import { useParams, useHistory } from "react-router-dom";
import { Avatar, Button, PageHeader, Spin, Result } from "antd";
import { ICoin } from "../Interfaces/ICoin";
import Search from "antd/lib/input/Search";

const CoinHeader = () => (
  <div className="coin-header">
    <span className="coin-column"></span>
    <span className="coin-column">Name</span>
    <span className="coin-column">Symbol</span>
    <span className="coin-column">Current Price</span>
    <span className="coin-column">High (24h)</span>
    <span className="coin-column">Low (24h)</span>
    <span className="coin-column">Change % (24h)</span>
  </div>
);

const CoinRow = ({ coin, keyIndex, onSelect }: any) => (
  <div className="coin-row" key={keyIndex} onClick={() => onSelect(coin.id)}>
    <span className="coin-column">
      <Avatar src={coin.image} size={30} />
    </span>
    <span className="coin-column">{coin.name}</span>
    <span className="coin-column">{coin.symbol}</span>
    <span className="coin-column">{coin.current_price}</span>
    <span className="coin-column">{coin.high_24h}</span>
    <span className="coin-column">{coin.low_24h}</span>
    <span
      className={`coin-column ${
        coin.price_change_percentage_24h > 0
          ? "positive"
          : coin.price_change_percentage_24h < 0
          ? "negative"
          : ""
      }`}
    >
      {coin.price_change_percentage_24h}
    </span>
  </div>
);

const Pagination = ({ page = 1, onSelect }: any) => {
  const maxButtons = 5;
  return (
    <>
      <Button.Group>
        <Button
          onClick={() => onSelect(parseInt(page) - 1)}
          type="primary"
          disabled={page > 1 ? false : true}
        >
          Previous Page
        </Button>
        {page > maxButtons && (
          <Button onClick={() => onSelect(1)} type="primary">
            1
          </Button>
        )}

        {page > maxButtons + 1 && <Button>...</Button>}

        {Array.from(
          { length: Math.min(maxButtons, page) },
          (_, index) => page - index,
        )
          .reverse()
          .map((p, i) => (
            <Button
              key={`p${i}`}
              onClick={() => onSelect(p)}
              disabled={p === page}
              type="primary"
            >
              {p}
            </Button>
          ))}
        <Button onClick={() => onSelect(parseInt(page) + 1)} type="primary">
          Next Page
        </Button>
      </Button.Group>
    </>
  );
};

const CoinsList = () => {
  const { data, error, loading } = useSelector((state: any) => state.coins);
  const [coins, setCoins] = useState<ICoin[]>();
  let { page }: any = useParams();
  page = parseInt(page) || 1;
  const history = useHistory();

  const getPage = (page: any) => {
    history.push(`/coins/${page}`);
  };

  const getCoinInfo = (id: number) => {
    history.push(`/coin/${id}`);
  };

  const refresh = () => {
    dispatch(fetchCoins({ page: page || 1 }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoins({ page: page || 1 }));
  }, [page, dispatch]);
  useEffect(() => {
    setCoins(data.data);
  }, [data]);

  const handleChange = (event: { target: { value: string } }) => {
    const filterCoins = data?.data?.filter((value: ICoin) => {
      return (
        value.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        value.symbol.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    setCoins(filterCoins);
  };

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

  return (
    <>
      <Spin spinning={loading}>
        <PageHeader title="Crypto Tracker Stats" />
        <div className="search-bar">
          {" "}
          <Search
            placeholder="input search text"
            onChange={handleChange}
            enterButton
          />
        </div>
        <div className="coins-list">
          <Pagination page={page} onSelect={getPage} />
          {coins?.length && <CoinHeader />}
          {coins?.map((coin: any, index: number) => (
            <CoinRow key={index} coin={coin} onSelect={getCoinInfo} />
          ))}
        </div>
        <footer className="row center" style={{ textAlign: "center" }}>
          Copyright &copy; Crypto Tracker Stats 2022
          https://github.com/ch-hassansaeed
        </footer>
      </Spin>
    </>
  );
};

export default CoinsList;
