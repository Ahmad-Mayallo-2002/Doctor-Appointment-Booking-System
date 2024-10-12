"use client";
import {
  Button,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { IdToken, mainUrl, useIdToken } from "@/app/assets/assets";

interface user {
  id: number;
  username: string;
  email: string;
  user_image: string;
  role: string;
}

export default function UsersTable() {
  let idToken: IdToken | undefined;
  const [users, setUsers] = useState<Array<user>>([]);
  const toast = useToast();
  if (typeof window !== "undefined") idToken = useIdToken();
  const getData = async () => {
    try {
      const { data, status } = await axios.get(mainUrl + "get-users", {
        headers: {
          Authorization: `Bearer ${idToken?.token}`,
          id: idToken?.id,
        },
      });
      if (status === 200) {
        let newArray = data?.filter((value: user) => value?.role === "user");
        setUsers(newArray);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleDeleteUser = async (id: number) => {
    try {
      const { data, status } = await axios.delete(
        mainUrl + `delete-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${idToken?.token}`,
            id: idToken?.id,
          },
        }
      );
      if (status === 200) {
        toast({
          title: "Complete",
          duration: data?.msg,
          isClosable: true,
          status: "success",
          position: "top-left",
        });
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableContainer overflowX="auto">
      <Table
        marginBottom={4}
        border="1px solid var(--chakra-colors-chakra-border-color)"
      >
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Avatar</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={user?.id}>
              <Td>{++index}</Td>
              <Td>{user?.username}</Td>
              <Td>{user?.email}</Td>
              <Td>
                <Image
                  src={`/users_images/${user?.user_image}`}
                  alt="Avatar User"
                  width="50px"
                  height="50px"
                  borderRadius="50%"
                />
              </Td>
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={4}>Total Users: </Td>
            <Td>{users.length}</Td>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
