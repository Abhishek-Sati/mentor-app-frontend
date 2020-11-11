import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  List,
  Avatar,
  Button,
  Skeleton,
  notification,
  Form,
  Input,
  Modal,
  InputNumber,
} from "antd";
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

export default function Mentors({ mentors, setMentors }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState({});
  const deleteMentor = async (id) => {
    try {
      await axios.delete(`${endPoints.home.base}/${id}`);
      const { data = [] } = await axios.get(endPoints.home.mentors);
      setMentors(data);
      notification.success({ message: "Mentor removed successfully !" });
    } catch (e) {
      notification.error({ message: "Mentor not removed" });
    }
  };

  const onFinish = async (values) => {
    try {
      await axios.patch(`${endPoints.home.base}/${selectedMentor._id}`, values);
      const { data = [] } = await axios.get(endPoints.home.mentors);
      setMentors(data);
      notification.success({ message: "Mentor details updated successfully " });
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
        dataSource={mentors}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key={1}
                type="link"
                onClick={() => {
                  setSelectedMentor(item);
                  setOpen((v) => !v);
                }}
              >
                Edit
              </Button>,
              <Button key={2} type="link" onClick={() => deleteMentor(item._id)}>
                Remove
              </Button>,
              <Button
                key={3}
                type="secondary"
                shape="circle"
                icon={<ArrowRightOutlined />}
                onClick={() => history.push({ pathname: `/${item._id}`, state: { mentor: item } })}
              />,
            ]}
          >
            <Skeleton avatar title={false} active loading={false}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  <a
                    onClick={() =>
                      history.push({ pathname: `/${item._id}`, state: { mentor: item } })
                    }
                  >
                    {item.name}
                  </a>
                }
                description={`Email --> ${item.email}`}
              />
              <div>{` Age --> ${item.age}`}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Modal
        title="Update Mentor's Details"
        visible={open}
        footer={null}
        onCancel={() => setOpen(false)}
        maskClosable={false}
        destroyOnClose
      >
        <Form
          {...layout}
          initialValues={selectedMentor}
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
