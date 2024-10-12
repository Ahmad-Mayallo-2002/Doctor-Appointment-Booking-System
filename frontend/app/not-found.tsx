import Containers from "@/components/Container";
import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

export default function NotFound() {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Containers centerContent>
        <Text fontSize={40} fontWeight="bold">
          Error 404 Page Not Found
        </Text>
        <Text marginTop="1rem" fontSize={30}>
          Return To{" "}
          <Link
            href="/"
            _hover={{ color: "#5f6fff", textDecoration: "underline" }}
          >
            Home Page
          </Link>
        </Text>
      </Containers>
    </Box>
  );
}
