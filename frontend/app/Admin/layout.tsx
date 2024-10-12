import AdminNav from "@/components/AdminNav";
import { Box, Image } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Box
        as="main"
        id="admin-panel"
        display="flex"
        borderBottomWidth="3px"
        marginBottom={8}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <AdminNav />
        <Box flexGrow={1} padding={4}>
          {children}
        </Box>
      </Box>
    </>
  );
}
