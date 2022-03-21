import { Select, Spin, Result, Button } from "antd";
import Chart from "./Chart";

const ChartsSection = (props: any) => {
  const { handleChange, dateOptions, loading, data, error, refresh } = props;

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
    <Spin spinning={loading}>
      <div className={"chart-selection"}>
        Please Select Period:
        <Select
          defaultValue={1}
          style={{ width: 220, marginLeft: "10px" }}
          onChange={handleChange}
        >
          {dateOptions.map((o: any, i: any) => (
            <Select.Option key={`option${i}`} value={o.value}>
              {o.label}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        {data && <Chart data={data} />}
      </div>
    </Spin>
  );
};

export default ChartsSection;
