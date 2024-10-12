"use client";
import Containers from "@/components/Container";
import {
  Box,
  Heading,
  FormControl,
  Input,
  FormLabel,
  Image,
  Button,
  useToast,
  Grid,
  GridItem,
  Card,
  CardHeader,
  Text,
  CardBody,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DoctorInfo, mainUrl, useIdToken, userData } from "../assets/assets";

interface UserData {
  username: string;
  email: string;
  password: string;
  user_image: string;
  age: number;
}

export default function Profile() {
  const { register, handleSubmit } = useForm<UserData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [doctorsData, setDoctorsData] = useState<DoctorInfo[]>([]);
  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  );
  let IdToken: userData;
  if (typeof window !== "undefined") IdToken = useIdToken();
  const toast = useToast();
  const getData = async () => {
    try {
      const { data } = await axios.get(mainUrl + "user-doctors", {
        headers: {
          Authorization: `Bearer ${IdToken?.token}`,
          id: IdToken?.id,
        },
      });
      setDoctorsData(data);
    } catch (error: any) {
      console.log(error);
    }
  };
  const onSubmit = async (data: UserData, event: any) => {
    try {
      setLoading(true);
      const formData = new FormData(event?.target);
      const { data, status } = await axios.patch(
        mainUrl + `update-user/${IdToken?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${IdToken?.token}`,
          },
        }
      );
      if (status === 200) {
        toast({
          title: "Done",
          description: data?.msg,
          isClosable: true,
          status: "success",
          duration: 1500,
          position: "top-left",
        });
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Error",
        description: error?.response?.data?.msg,
        status: "error",
        isClosable: true,
        duration: 1500,
        position: "top-left",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleChangeImage = (event: {
    target: { files: (Blob | MediaSource)[] };
  }) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const handleDeleteDoctor = async (id: number) => {
    try {
      const { data } = await axios.delete(
        mainUrl + `delete-user-doctor/${id}`,
        {
          headers: {
            id: IdToken?.id,
            Authorization: `Bearer ${IdToken?.token}`,
          },
        }
      );
      toast({
        title: "Done",
        description: data?.msg,
        isClosable: true,
        status: "success",
        duration: 1500,
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Containers marginBottom="2rem">
        <Box
          id="profile-content"
          display="grid"
          gap="1rem"
          gridTemplateColumns={{ base: "1fr", lg: "300px 1fr" }}
        >
          <Box
            as="form"
            marginY="1rem"
            onSubmit={handleSubmit(onSubmit)}
            display="grid"
            gap="1rem"
            height="fit-content"
          >
            {/* User Image */}
            <FormControl>
              <FormLabel htmlFor="image" width="fit-content" marginX="auto">
                <Image
                  src={image}
                  alt="User Image"
                  borderRadius="50%"
                  w={100}
                  h={100}
                />
              </FormLabel>
              <Input
                type="file"
                {...register("user_image", { onChange: handleChangeImage })}
                id="image"
                hidden
              />
            </FormControl>
            {/* Username */}
            <FormControl>
              <FormLabel>Username: </FormLabel>
              <Input
                type="text"
                {...register("username", {
                  minLength: {
                    value: 4,
                    message: "Minimum Length is 4",
                  },
                  maxLength: {
                    value: 15,
                    message: "Maximum Length is 15",
                  },
                })}
              />
            </FormControl>
            {/* Email */}
            <FormControl>
              <FormLabel>Email: </FormLabel>
              <Input
                type="text"
                {...register("email", {
                  pattern: {
                    value: /^[A-Za-z]+[0-9!#$%^&*]*@gmail\.com$/,
                    message: "Invalid Email Syntax",
                  },
                })}
              />
            </FormControl>
            {/* Password */}
            <FormControl>
              <FormLabel>Password: </FormLabel>
              <Input
                type="password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Minimum Length is 8",
                  },
                  maxLength: {
                    value: 20,
                    message: "Maximum Length is 20",
                  },
                })}
              />
            </FormControl>
            {/* Age */}
            <FormControl>
              <FormLabel>Age: </FormLabel>
              <Input
                type="number"
                {...register("age", {
                  min: {
                    value: 15,
                    message: "Minimum Age is 15 Years",
                  },
                })}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={loading && true}
              loadingText="Loading..."
            >
              Update Data
            </Button>
          </Box>
          <Box flexGrow="1">
            <Heading marginY={6}>Your Doctors</Heading>
            <Grid
              gridTemplateColumns={{
                base: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3, 1fr)",
              }}
              gap={4}
            >
              {doctorsData.map((doctor) => (
                <GridItem key={doctor?.id}>
                  <Card>
                    <CardHeader bg="#EAEFFF">
                      <Image
                        src={`doctor_images/${doctor.doctor_image}`}
                        alt="Doctor Image"
                        w="100%"
                        h="100%"
                      />
                    </CardHeader>
                    <CardBody>
                      <Heading fontSize="25px" marginBottom={4}>
                        {doctor.doctor_name}
                      </Heading>
                      <Text color="var(--textColor)">
                        {doctor.doctor_speciality}
                      </Text>
                      <Button
                        colorScheme="red"
                        marginTop={4}
                        width="100%"
                        onClick={() => handleDeleteDoctor(doctor.id)}
                      >
                        Delete Doctor
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Box>
      </Containers>
    </>
  );
}
