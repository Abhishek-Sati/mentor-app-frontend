import React, { useState } from "react";
import axios from "axios";
import { PageHeader, Button, Modal, Form, Input, InputNumber, notification } from "antd";
import endPoints from "utils/api";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function Header({ setMentors }) {
  const [open, setOpen] = useState(false);

  const onFinish = async (values) => {
    try {
      await axios.post(endPoints.home.base, values);
      const { data = [] } = await axios.get(endPoints.home.mentors);
      setMentors(data);
      notification.success({ message: "Mentor added successfully " });
      setOpen(false);
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="main_container__header">
      <PageHeader
        onBack={() => null}
        title="Mentor and Task App"
        subTitle="Create Mentor and add task"
        extra={[
          <Button key="1" type="primary" onClick={() => setOpen((v) => !v)}>
            Add Mentor
          </Button>,
        ]}
      />
      <Modal
        title="Add Mentor"
        visible={open}
        footer={null}
        onCancel={() => setOpen(false)}
        maskClosable={false}
        destroyOnClose
      >
        <Form
          {...layout}
          initialValues={{}}
          validateMessages={validateMessages}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input you name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input you email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            hasFeedback
            rules={[
              {
                required: true,
                type: "number",
                max: 70,
                min: 18,
              },
            ]}
          >
            <InputNumber size="large" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
