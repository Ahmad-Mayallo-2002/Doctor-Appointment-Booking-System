import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

export default function Loading() {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner
        borderWidth="10px"
        width="150px"
        height="150px"
        color="#5f6fff"
      />
    </Box>
  );
}
