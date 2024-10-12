"use client";
import { mainUrl } from "@/app/assets/assets";
import {
  Heading,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Patient {
  id: number;
  patient: string;
  age: number;
  date: Date;
  doctor: string;
  fees: number;
}

const patients: Patient[] = [
  {
    id: 1,
    patient: "John Doe",
    age: 35,
    date: new Date(2024, 0, 15),
    doctor: "Dr. Smith",
    fees: 300,
  },
  {
    id: 2,
    patient: "Jane Roe",
    age: 28,
    date: new Date(2024, 1, 10),
    doctor: "Dr. Johnson",
    fees: 450,
  },
  {
    id: 3,
    patient: "Michael Brown",
    age: 42,
    date: new Date(2024, 2, 5),
    doctor: "Dr. Davis",
    fees: 500,
  },
  {
    id: 4,
    patient: "Emily Clark",
    age: 22,
    date: new Date(2024, 3, 20),
    doctor: "Dr. Lee",
    fees: 320,
  },
  {
    id: 5,
    patient: "David Miller",
    age: 45,
    date: new Date(2024, 4, 25),
    doctor: "Dr. Patel",
    fees: 275,
  },
  {
    id: 6,
    patient: "Sophia White",
    age: 31,
    date: new Date(2024, 5, 10),
    doctor: "Dr. Martinez",
    fees: 380,
  },
  {
    id: 7,
    patient: "William Black",
    age: 52,
    date: new Date(2024, 6, 8),
    doctor: "Dr. Robinson",
    fees: 400,
  },
  {
    id: 8,
    patient: "Olivia Green",
    age: 26,
    date: new Date(2024, 7, 13),
    doctor: "Dr. Walker",
    fees: 350,
  },
  {
    id: 9,
    patient: "James Harris",
    age: 36,
    date: new Date(2024, 8, 5),
    doctor: "Dr. Young",
    fees: 450,
  },
  {
    id: 10,
    patient: "Isabella King",
    age: 29,
    date: new Date(2024, 9, 1),
    doctor: "Dr. Perez",
    fees: 390,
  },
  {
    id: 11,
    patient: "Mason Wilson",
    age: 37,
    date: new Date(2024, 10, 15),
    doctor: "Dr. Clark",
    fees: 325,
  },
  {
    id: 12,
    patient: "Ava Scott",
    age: 44,
    date: new Date(2024, 11, 20),
    doctor: "Dr. Cooper",
    fees: 475,
  },
  {
    id: 13,
    patient: "Lucas Young",
    age: 33,
    date: new Date(2024, 1, 17),
    doctor: "Dr. Rivera",
    fees: 340,
  },
  {
    id: 14,
    patient: "Mia Campbell",
    age: 27,
    date: new Date(2024, 2, 23),
    doctor: "Dr. Ramirez",
    fees: 280,
  },
  {
    id: 15,
    patient: "Henry Mitchell",
    age: 40,
    date: new Date(2024, 3, 9),
    doctor: "Dr. Phillips",
    fees: 420,
  },
  {
    id: 16,
    patient: "Ella Carter",
    age: 25,
    date: new Date(2024, 4, 4),
    doctor: "Dr. Evans",
    fees: 290,
  },
  {
    id: 17,
    patient: "Jack Turner",
    age: 39,
    date: new Date(2024, 5, 19),
    doctor: "Dr. Torres",
    fees: 410,
  },
  {
    id: 18,
    patient: "Amelia Parker",
    age: 30,
    date: new Date(2024, 6, 11),
    doctor: "Dr. Edwards",
    fees: 370,
  },
  {
    id: 19,
    patient: "Ethan Hill",
    age: 38,
    date: new Date(2024, 7, 24),
    doctor: "Dr. Collins",
    fees: 450,
  },
  {
    id: 20,
    patient: "Charlotte Adams",
    age: 32,
    date: new Date(2024, 8, 7),
    doctor: "Dr. Morris",
    fees: 315,
  },
  // Add more patient objects here as needed
];

export default function Appointments() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data, status } = await axios.get(mainUrl + "get-doctors");
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  return (
    <>
      <Heading marginBottom={4}>Appointments</Heading>
      <TableContainer overflowX="auto">
        <Table border="1px solid var(--chakra-colors-chakra-border-color)">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Patient</Th>
              <Th>Age</Th>
              <Th>Date & Time</Th>
              <Th>Doctor</Th>
              <Th>Fees</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patients.map((patient) => {
              const {
                id,
                patient: patientName,
                age,
                date,
                doctor,
                fees,
              } = patient;

              return (
                <Tr key={id}>
                  <Td>{id}</Td>
                  <Td>{patientName}</Td>
                  <Td>{age}</Td>
                  <Td>{date.toLocaleDateString()}</Td>
                  <Td>{doctor}</Td>
                  <Td>${fees}</Td>
                  <Td>
                    <Button colorScheme="red">Delete</Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
