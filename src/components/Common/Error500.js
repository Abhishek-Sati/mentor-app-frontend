import React from "react";
import { Result, Button } from "antd";

export default function Error500() {
  return (
    <section style={{ gridColumn: "1/-1" }}>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" href="/">
            Back Home
          </Button>
        }
      />
    </section>
  );
}
