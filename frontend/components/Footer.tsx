import React from "react";
import Containers from "./Container";
import {
  Grid,
  GridItem,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <>
      <footer>
        <Containers>
          <Grid
            gridTemplateColumns={{ base: "1fr", md: "2fr 1fr 1fr" }}
            gap={4}
            textAlign={{ base: "center", md: "start" }}
          >
            <GridItem>
              <Image
                src="/assets_frontend/logo.svg"
                marginBottom={4}
                alt="Logo"
                display="block"
                marginX={{ base: "auto", md: "0" }}
              />
              <Text
                textColor="var(--textColor)"
                maxWidth="450px"
                marginX={{ base: "auto", md: "0" }}
                lineHeight="2"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </GridItem>
            <GridItem>
              <Text
                as="h4"
                textTransform="uppercase"
                fontWeight={500}
                marginBottom={3}
              >
                company
              </Text>
              <UnorderedList
                display="grid"
                gap={2}
                textColor="var(--textColor)"
              >
                <ListItem>Home</ListItem>
                <ListItem>About</ListItem>
                <ListItem>Delivery</ListItem>
                <ListItem>Privacy Policy</ListItem>
              </UnorderedList>
            </GridItem>
            <GridItem>
              <Text
                as="h4"
                textTransform="uppercase"
                fontWeight={500}
                marginBottom={3}
              >
                get in touch
              </Text>
              <UnorderedList
                display="grid"
                gap={2}
                textColor="var(--textColor)"
              >
                <ListItem>20+ 1208943693</ListItem>
                <ListItem>Ahmad Mayallo</ListItem>
              </UnorderedList>
            </GridItem>
          </Grid>
        </Containers>
      </footer>
      <footer
        className="copyright"
        style={{
          padding: "15px",
          textAlign: "center",
          borderTop: "1px solid #BDBDBD",
          marginTop: "1rem",
        }}
      >
        Copyright &copy; 2024 Ahmad Mayallo - All Right Reserved.
      </footer>
    </>
  );
}
