import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { PageHeader, Button, Modal, Form, Input, Switch, notification } from "antd";
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

export default function Header({ setTasks, mentor }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const onFinish = async (values) => {
    try {
      await axios.post(`${endPoints.detail.base}/${mentor._id}`, values);
      const { data = [] } = await axios.get(`${endPoints.detail.base}/all`, {
        params: { _id: mentor._id },
      });
      setTasks(data);
      notification.success({ message: "Task added successfully " });
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
        onBack={() => history.push("/")}
        title="Mentor and Task App"
        subTitle="Create Task and assign it to mentor"
        extra={[
          <Button key="1" type="primary" onClick={() => setOpen((v) => !v)}>
            Add Task
          </Button>,
        ]}
      />
      <Modal
        title="Add Task"
        visible={open}
        footer={null}
        onCancel={() => setOpen(false)}
        maskClosable={false}
        destroyOnClose
      >
        <Form {...layout} initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Description"
            name="description"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter the description !!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Completed" name="completed">
            <Switch />
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
