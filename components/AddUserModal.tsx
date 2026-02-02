"use client";
import React from "react";
import { Modal, Form, Input } from "antd";
import Button from "./Button";

interface AddUserModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onAddUser: (user: { name: string; email: string; company?: string }) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onCancel, onAddUser }) => {
  const [form] = Form.useForm();

  // resets form on submission
  const handleFinish = (values: { name: string; email: string; company?: string }) => {
    onAddUser(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Add User"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Company" name="company">
          <Input />
        </Form.Item>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
