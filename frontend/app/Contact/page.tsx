import Containers from "@/components/Container";
import { Box, Button, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function Contact() {
  return (
    <Box as="main" id="contact" padding="25px">
      <Containers>
        <Text
          fontWeight={500}
          fontSize={30}
          marginBottom={6}
          textAlign="center"
        >
          Contact Us
        </Text>
        <Grid gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          <GridItem>
            <Image
              src="/assets_frontend/contact_image.png"
              alt="Contact Image"
            />
          </GridItem>
          <GridItem textColor="var(--textColor)">
            <Text
              as="h3"
              fontWeight={600}
              textTransform="uppercase"
              marginBottom={5}
              fontSize={20}
            >
              our office
            </Text>
            <Text as="address" marginBottom={4}>
              00000 Willms Station Suite 000, <br /> Washington, USA
            </Text>
            <Text as="address" marginBottom={4}>
              Tel: (+20) 1208943693 <br /> Email: ahmadmayallo02@gmail.com
            </Text>
            <Text
              as="h3"
              fontWeight={600}
              textTransform="uppercase"
              marginBottom={5}
              fontSize={20}
            >
              careers at prescripto
            </Text>
            <Text marginBottom={6}>
              Learn more about our teams and job openings.
            </Text>
            <Button colorScheme="blue">Explore Jobs</Button>
          </GridItem>
        </Grid>
      </Containers>
    </Box>
  );
}
