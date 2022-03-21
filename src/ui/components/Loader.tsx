import { Skeleton, Spin } from "antd";

const Loader = (props: any) => (
  <Spin spinning>
    <div className="loader">
      <Skeleton
        avatar
        paragraph={{ rows: 8 }}
        size={"large"}
        shape={"square"}
        active
        {...props}
      />
    </div>
  </Spin>
);

export default Loader;
