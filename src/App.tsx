import { CoinsList, CoinDetails } from "./ui";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { Result, Button } from "antd";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/coins/:page">
            <CoinsList />
          </Route>
          <Route path="/coins">
            <CoinsList />
          </Route>
          <Route path="/coin/:coinId">
            <CoinDetails />
          </Route>
          <Route exact path="/">
            <CoinsList />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const NotFound = () => {
  const history = useHistory();
  const start = () => {
    history.push("/coins");
  };
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={start}>
            Go to Coins List
          </Button>
        }
      />
      ,
    </>
  );
};

export default App;
