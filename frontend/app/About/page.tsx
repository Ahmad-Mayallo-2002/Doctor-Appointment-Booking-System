import Containers from "@/components/Container";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  HStack,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import React from "react";

interface choose {
  head: string;
  content: string;
}

const chooseArray: choose[] = [
  {
    head: "efficiency: ",
    content:
      "Streamlined appointment scheduling that fits into your busy lifestyle.",
  },
  {
    head: "convenience: ",
    content:
      "Access to a network of trusted healthcare professionals in your area.",
  },
  {
    head: "personalization: ",
    content:
      "Tailored recommendations and reminders to help you stay on top of your health.",
  },
];

export default function About() {
  return (
    <Box as="main" id="about" paddingY={10}>
      <Containers>
        <Text
          fontSize={30}
          fontWeight={500}
          marginBottom={5}
          textAlign="center"
        >
          About Us
        </Text>
        <Grid gridTemplateColumns={{ base: "1fr", lg: "1fr 2fr" }} gap={4}>
          <GridItem>
            <Image
              src="/assets_frontend/about_image.png"
              width="100%"
              height="500px"
              alt="About Image"
            />
          </GridItem>
          <GridItem textColor="var(--textColor)">
            <Text as="p" marginBottom={7} lineHeight={1.7}>
              Welcome to Prescripto, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At Prescripto, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </Text>
            <Text as="p" marginBottom={7} lineHeight={1.7}>
              Prescripto is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you're booking your first appointment or
              managing ongoing care, Prescripto is here to support you every
              step of the way.
            </Text>
            <Text as="h4" fontWeight={700} marginBottom={4} textColor="#000">
              Our Vision
            </Text>
            <Text as="p" lineHeight={1.7}>
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </Text>
          </GridItem>
        </Grid>
        <Text as="h3" fontSize="30px" fontWeight={500} marginY={8}>
          why{" "}
          <Text as="span" textTransform="uppercase">
            choose us
          </Text>
        </Text>
        <Stack
          direction={{ base: "column", md: "row" }}
          divider={
            <StackDivider margin="0px !important" borderColor="#ABABAB" />
          }
          border="1px solid #ABABAB"
        >
          {chooseArray.map((value, index) => (
            <Box
              padding="24px"
              key={index}
              _hover={{ bg: "var(--primaryColor)", textColor: "#fff" }}
              transitionDuration="400ms"
            >
              <Text
                as="h5"
                fontWeight={500}
                fontSize="24px"
                textTransform="uppercase"
                marginBottom={5}
              >
                {value.head}
              </Text>
              <Text as="p">{value.content}</Text>
            </Box>
          ))}
        </Stack>
      </Containers>
    </Box>
  );
}
