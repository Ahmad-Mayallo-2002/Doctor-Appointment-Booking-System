"use client";
import { DoctorInfo, mainUrl, useIdToken, userData } from "@/app/assets/assets";
import Containers from "@/components/Container";
import {
  Box,
  Button,
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

const days: string[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export default function Doctor({ params }: { params: any }) {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectDate, setSelectDate] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [doctorData, setDoctorData] = useState<DoctorInfo>({
    id: 0,
    doctor_image: "",
    doctor_name: "",
    doctor_fees: 0,
    doctor_address: "",
    about_doctor: "",
    doctor_degree: "",
    doctor_speciality: "",
    doctor_experience: "",
    doctor_email: "",
    isAvailable: true,
  });
  const toast = useToast();
  let IdToken: userData;
  if (typeof window !== "undefined") {
    IdToken = useIdToken();
  }
  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };
  const handleDateClick = (date: number) => {
    setSelectDate(date);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data, status } = await axios.get(
          mainUrl + `get-doctors/${parseInt(params.id)}`
        );
        if (status === 200) setDoctorData(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  const {
    doctor_address,
    doctor_degree,
    doctor_email,
    doctor_experience,
    doctor_fees,
    doctor_image,
    doctor_name,
    doctor_speciality,
    about_doctor,
  } = doctorData;
  const handleAddDoctorToUser = async (id: number) => {
    try {
      const { data, status } = await axios.post(
        mainUrl + `add-user-doctor/${id}`,
        { user_id: IdToken?.id, doctor_id: id },
        {
          headers: {
            Authorization: `Bearer ${IdToken?.token}`,
            id: IdToken?.id,
          },
        }
      );
      if (status === 200)
        toast({
          title: "Done",
          description: data?.msg,
          isClosable: true,
          status: "success",
          duration: 1500,
          position: "top-left",
        });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: error?.response?.data?.msg,
        isClosable: true,
        status: "error",
        duration: 1500,
        position: "top-left",
      });
    }
  };

  return (
    <>
      <Box as="main" id="about-doctor" paddingY="55px">
        <Containers>
          {loading ? (
            <Spinner
              borderWidth="5px"
              speed=".75s"
              width="150px"
              height="150px"
              color="var(--primaryColor)"
              margin="5rem auto"
              display="block"
            />
          ) : (
            <Grid
              marginBottom={8}
              gridTemplateColumns={{ base: "1fr", lg: "1fr 2fr" }}
              gap={4}
            >
              <GridItem borderRadius={8} bg="var(--primaryColor)">
                <Image
                  width="100%"
                  height="100%"
                  src={`/doctor_images/${doctor_image}`}
                  alt="Doctor Image"
                />
              </GridItem>
              <GridItem
                borderRadius={8}
                border="1px solid var(--textColor)"
                padding={8}
              >
                <Text as="h2" fontWeight={500} fontSize={36} marginBottom={8}>
                  {doctor_name}
                </Text>
                <Text as="p" color="var(--textColor)" fontSize="20px">
                  {doctor_degree} - {doctor_speciality}{" "}
                  <Text
                    as="span"
                    display="inline-block"
                    padding=".5rem 1.5rem"
                    borderRadius="5555px"
                    fontSize="1rem"
                    border="2px solid var(--textColor)"
                    marginLeft="1rem"
                  >
                    {doctor_experience}
                  </Text>
                </Text>

                <Text
                  as="p"
                  color="var(--textColor)"
                  fontSize="20px"
                  marginY={4}
                >
                  Email: {doctor_email}
                </Text>
                <Text as="p" color="var(--textColor)" fontSize="20px">
                  Address: {doctor_address}
                </Text>
                <Text marginY={4} as="h2" fontWeight={500} fontSize={24}>
                  About
                </Text>
                <Text
                  marginBottom={4}
                  as="p"
                  color="var(--textColor)"
                  lineHeight={2}
                >
                  {about_doctor}
                </Text>
                <Text
                  as="h2"
                  fontWeight={500}
                  textColor="var(--textColor)"
                  fontSize={24}
                >
                  Appointment fee:{" "}
                  <span style={{ color: "#000", marginLeft: "1rem" }}>
                    ${doctor_fees}
                  </span>
                </Text>
              </GridItem>
            </Grid>
          )}
          <Box marginBottom={8}>
            <Heading marginBottom={4} textColor="var(--textColor)">
              Booking Slot
            </Heading>
            <Box
              className="days"
              display="flex"
              flexWrap="wrap"
              gap={4}
              marginBottom={4}
            >
              {days.map((day, index) => (
                <Box
                  cursor="pointer"
                  className="day"
                  key={index}
                  paddingY="2rem"
                  w="88px"
                  textAlign="center"
                  fontSize="20px"
                  borderRadius="5555px"
                  boxShadow="0px 4px 12px 0px #5F6FFF66"
                  border="1px solid #ddd"
                  textTransform="uppercase"
                  transitionDuration="300ms"
                  _hover={{ bg: "var(--primaryColor)", textColor: "white" }}
                  bg={
                    day === selectedDay ? "var(--primaryColor)" : "transparent"
                  }
                  textColor={day === selectedDay ? "white" : "initial"}
                  onClick={() => handleDayClick(day)}
                >
                  {day} {`1${index}`}
                </Box>
              ))}
            </Box>
            <Box className="dates" display="flex" flexWrap="wrap" gap={4}>
              {[9, 10, 11, 12, 1, 2, 3, 4].map((date, index) => (
                <Box
                  onClick={() => handleDateClick(date)}
                  cursor="pointer"
                  className="date"
                  key={date}
                  textAlign="center"
                  fontSize="20px"
                  borderRadius="5555px"
                  border="1px solid #ddd"
                  transitionDuration="300ms"
                  padding="1rem 1.5rem"
                  _hover={{ bg: "var(--primaryColor)", textColor: "white" }}
                  bg={
                    date === selectDate ? "var(--primaryColor)" : "transparent"
                  }
                  textColor={date === selectDate ? "white" : "initial"}
                >
                  {index <= 3
                    ? `${String(date).length > 1 ? date : `0${date}`}:00pm`
                    : `0${date}:00am`}
                </Box>
              ))}
            </Box>
            <Button
              colorScheme="blue"
              borderRadius="5555px"
              display="flex"
              marginTop={4}
              marginX="auto"
              padding="1.5rem 4rem"
              loadingText="Loading..."
              onClick={() => handleAddDoctorToUser(params.id)}
            >
              Book an Appointment
            </Button>
          </Box>
        </Containers>
      </Box>
    </>
  );
}
