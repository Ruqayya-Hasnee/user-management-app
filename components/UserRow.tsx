"use client";

import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { User } from "@/types/user";


interface UserRowProps {
  users: User[];
}

const UserRow: React.FC<UserRowProps> = ({ users }) => {
  const columns: ColumnsType<User> = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Company",
      dataIndex: ["company", "name"],
      key: "company",
      render: (_, record) => record.company?.name || "-",
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      className="shadow rounded-md overflow-hidden"
    />
  );
};

export default UserRow;
