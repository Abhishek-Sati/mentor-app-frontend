import React from "react";
import { Result } from "antd";

export default function Error() {
  return (
    <section style={{ gridColumn: "1/-1" }}>
      <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
    </section>
  );
}
