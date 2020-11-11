import React, { useState } from "react";
import axios from "axios";
import { List, Avatar, Button, Skeleton, notification, Form, Input, Modal, Switch } from "antd";
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

export default function Tasks({ tasks, setTasks, mentor }) {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const deleteTasks = async (_id) => {
    try {
      await axios.delete(endPoints.detail.base, { params: { _id, owner: mentor._id } });
      const { data = [] } = await axios.get(`${endPoints.detail.base}/all`, {
        params: { _id: mentor._id },
      });
      setTasks(data);
      notification.success({ message: "Task removed successfully !" });
    } catch (e) {
      notification.error({ message: "Task not removed" });
    }
  };

  const onFinish = async (values) => {
    try {
      await axios.patch(`${endPoints.detail.base}/${selectedTask._id}/${mentor._id}`, values);
      const { data = [] } = await axios.get(`${endPoints.detail.base}/all`, {
        params: { _id: mentor._id },
      });
      setTasks(data);
      notification.success({ message: "Task updated successfully " });
      setOpen(false);
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                key={1}
                type="link"
                onClick={() => {
                  setSelectedTask(item);
                  setOpen((v) => !v);
                }}
              >
                Edit
              </Button>,
              <Button key={2} type="link" onClick={() => deleteTasks(item._id)}>
                Remove
              </Button>,
            ]}
          >
            <Skeleton avatar title={false} active loading={false}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a>{`Task ${index + 1}`}</a>}
                description={item.description}
              />
              <div>{` Is Completed --> ${item.completed ? "Completed" : "Not Completed"}`}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Modal
        title="Update Task"
        visible={open}
        footer={null}
        onCancel={() => setOpen(false)}
        maskClosable={false}
        destroyOnClose
      >
        <Form
          {...layout}
          initialValues={selectedTask}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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
