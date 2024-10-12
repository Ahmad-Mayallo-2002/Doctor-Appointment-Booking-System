import { Container } from "@chakra-ui/react";
import React from "react";

export default function Containers({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [key: string]: any; // Accept any additional props
}) {
  return (
    <Container
      maxW={["100%", "540px", "767px", "991px", "1180px", "1480px"]}
      {...rest} // Spread all additional props
    >
      {children}
    </Container>
  );
}
