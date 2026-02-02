"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import Button from "@/components/Button";
import AddUserModal from "@/components/AddUserModal";
import UserRow from "@/components/UserRow";
import { Spin } from "antd";
import { User } from "@/types/user";

// fetch users
const fetchUsers = async (): Promise<User[]> => {
  const res = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return res.data;
};

export default function Page() {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });

  const [localUsers, setLocalUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allUsers = [...users, ...localUsers];

  const handleAddUser = (values: {
    name: string;
    email: string;
    company?: string;
  }) => {
    const newUser: User = {
      id: Date.now(),
      name: values.name,
      email: values.email,
      company: values.company ? { name: values.company } : undefined,
    };

    setLocalUsers((prev) => [...prev, newUser]);

    // refetch users
    queryClient.invalidateQueries({ queryKey: ["users"] });
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add User</Button>
      </div>

      {isLoading ? (
        <div className="text-center">
          <Spin />
        </div>
      ) : isError ? (
        <p className="text-red-600">Error: {error?.message}</p>
      ) : (
        <UserRow users={allUsers} />
      )}

      {isModalOpen && (
        <AddUserModal
          isOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onAddUser={handleAddUser}
        />
      )}
    </div>
  );
}
