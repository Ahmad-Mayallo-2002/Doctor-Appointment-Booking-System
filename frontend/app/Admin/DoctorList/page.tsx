"use client";
import {
  DoctorInfo,
  IdToken,
  mainUrl,
  useIdToken,
  userData,
} from "@/app/assets/assets";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DoctorList() {
  const [doctorData, setDoctorData] = useState<DoctorInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  let IdToken: userData;
  if (typeof window !== "undefined") {
    IdToken = useIdToken();
  }

  const getData = async () => {
    try {
      setLoading(true);
      const { data, status } = await axios.get(mainUrl + "get-doctors");
      if (status === 200) setDoctorData(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleDeleteDoctor = async (id: number) => {
    try {
      const { data, status } = await axios.delete(
        mainUrl + `delete-doctor/${id}`
      );
      if (status === 200) {
        toast({
          title: "Done",
          description: data?.msg,
          isClosable: true,
          status: "success",
          duration: 1500,
        });
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvailabilityDoctor = async (id: number) => {
    try {
      const { data, status } = await axios.patch(
        mainUrl + `dotor-available/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${IdToken?.token}`,
            id: id,
          },
        }
      );
      if (status === 200) {
        toast({
          title: "Complete",
          description: data?.msg,
          isClosable: true,
          status: "success",
          duration: 1500,
          position: "top-left",
        });
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Heading marginBottom={4}>Doctor List</Heading>
      {loading ? (
        <Spinner
          width="150px"
          height="150px"
          borderWidth="5px"
          speed=".75s"
          color="var(--primaryColor)"
          margin="auto"
          display="block"
        />
      ) : (
        <Grid
          gridTemplateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          }}
          gap={4}
        >
          {doctorData.map((doctor, index) => (
            <GridItem key={doctor.id}>
              <Card>
                <CardHeader
                  padding={0}
                  bg="#eaefff"
                  transitionDuration="300ms"
                  _hover={{ bg: "var(--primaryColor)" }}
                >
                  <Image
                    src={`/doctor_images/${doctor.doctor_image}`}
                    alt="Doctot Image"
                    width="100%"
                    height="250px"
                  />
                </CardHeader>
                <CardBody>
                  <Heading fontSize={20}>{doctor.doctor_name}</Heading>
                  <Text color="#666" marginY={4}>
                    {doctor.doctor_speciality}
                  </Text>
                  {doctor.isAvailable ? (
                    <Text color="#22c55e">Available</Text>
                  ) : (
                    <Text color="red">Unavailable</Text>
                  )}
                  <Button
                    colorScheme="red"
                    marginTop={4}
                    width="100%"
                    onClick={() => handleDeleteDoctor(doctor.id)}
                  >
                    Delete Doctor
                  </Button>
                  <Button
                    onClick={() => handleAvailabilityDoctor(doctor.id)}
                    colorScheme="blue"
                    marginTop={4}
                    width="100%"
                  >
                    Change Availability
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      )}
    </>
  );
}
