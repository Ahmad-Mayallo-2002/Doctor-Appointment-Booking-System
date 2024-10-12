"use client";
import Containers from "@/components/Container";
import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DoctorInfo, mainUrl, specialityData } from "@/app/assets/assets";
import axios from "axios";

export default function Home() {
  const [doctorData, setDoctorData] = useState<DoctorInfo[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data, status } = await axios.get(mainUrl + "get-doctors");
        if (status === 200) {
          let newData = data?.filter((value: DoctorInfo) => value?.isAvailable);
          setDoctorData(newData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Box marginTop={4} id="header-content">
        <Containers bg="var(--primaryColor)" padding={4}>
          <Grid
            gridTemplateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
          >
            <GridItem
              padding="15px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Text
                color="#fff"
                fontSize={{ base: "35px", md: "50px" }}
                textAlign={{ base: "center", md: "start" }}
                fontWeight="bold"
              >
                Book Appointment With Trusted Doctors
              </Text>
              <Box
                display="flex"
                alignItems="center"
                gap="1.5rem"
                flexDirection={{ base: "column", md: "row" }}
                marginY={4}
              >
                <Image src="/assets_frontend/group_profiles.png" />
                <Text color="#fff" textAlign={{ base: "center", md: "start" }}>
                  Simply browse through our extensive list of trusted doctors,
                  schedule your appointment hassle-free.
                </Text>
              </Box>
              <Button
                rightIcon={<ArrowRightIcon aria-label="Right Arrow Icon" />}
                size="lg"
                width="fit-content"
                borderRadius="55555px"
                marginX={{ base: "auto", md: "0" }}
              >
                Book Appointment
              </Button>
            </GridItem>
            <GridItem>
              <Image
                src="/assets_frontend/header_img.png"
                height="100%"
                alt="Header Image"
              />
            </GridItem>
          </Grid>
        </Containers>
      </Box>
      <Box id="speciality" paddingY={10}>
        <Containers>
          <Box textAlign="center" paddingY={4} maxWidth="650px" marginX="auto">
            <Text fontSize={35} textColor="#1F2937" fontWeight="bold" as="h3">
              Find by Speciality
            </Text>
            <Text fontSize={18} textColor="var(--textColor)" as="p">
              Simply browse through our extensive list of trusted doctors,
              schedule your appointment hassle-free.
            </Text>
          </Box>
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "repeat(3, 1fr)",
              lg: "repeat(6, 1fr)",
            }}
            gap={4}
          >
            {specialityData.map((value) => (
              <GridItem
                key={value.speciality}
                _hover={{ transform: "translateY(-1rem)" }}
                transitionDuration="500ms"
              >
                <Image src={value.image} marginX="auto" />
                <Text
                  as="h4"
                  marginTop={2}
                  fontSize={18}
                  textAlign="center"
                  textColor="var(--textColor)"
                >
                  {value.speciality}
                </Text>
              </GridItem>
            ))}
          </Grid>
        </Containers>
      </Box>
      <Box id="doctors" paddingY={10}>
        <Containers>
          <Box textAlign="center" paddingY={4} maxWidth="650px" marginX="auto">
            <Text fontSize={35} textColor="#1F2937" fontWeight="bold" as="h3">
              Top Doctors to Book
            </Text>
            <Text fontSize={18} textColor="var(--textColor)" as="p">
              Simply browse through our extensive list of trusted doctors.
            </Text>
          </Box>
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={4}
          >
            {doctorData.map((value) => (
              <GridItem key={value.id}>
                <Card border="1px solid #C9D8FF" borderRadius="12px">
                  <CardHeader bg="#EAEFFF" borderRadius="12px 12px 0 0">
                    <Image
                      src={`/doctor_images/${value.doctor_image}`}
                      height="250px"
                      width="100%"
                    />
                  </CardHeader>
                  <CardBody>
                    <Text textColor="#0FBF00" fontWeight={600} fontSize="15px">
                      Available
                    </Text>
                    <Heading fontSize="22px" textColor="#1F2937">
                      {value.doctor_name}
                    </Heading>
                    <Text textColor="var(--textColor)">
                      {value.doctor_speciality}
                    </Text>
                    <Button
                      colorScheme="blue"
                      as="a"
                      marginTop={4}
                      display="flex"
                      href={`/Doctor/${value.id}`}
                    >
                      Check Doctor
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
          <Button
            marginX="auto"
            display="block"
            marginTop={10}
            width="250px"
            borderRadius="5555px"
            height="50px"
          >
            More
          </Button>
        </Containers>
      </Box>
      <Box id="adv" paddingY={10}>
        <Containers>
          <Grid
            padding={4}
            bg="var(--primaryColor)"
            gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          >
            <GridItem
              padding={4}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Text as="h4" textColor="#fff" fontSize="45px" fontWeight="bold">
                Book Appointment With 100+ Trusted Doctors
              </Text>
              <Button
                height="50px"
                marginTop={4}
                borderRadius="5555px"
                width="200px"
              >
                Create Account
              </Button>
            </GridItem>
            <GridItem padding={4}>
              <Image
                width={400}
                src="/assets_frontend/appointment_img.png"
                alt="Image"
                margin="auto"
              />
            </GridItem>
          </Grid>
        </Containers>
      </Box>
    </>
  );
}
