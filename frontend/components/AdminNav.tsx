"use client";
import { Box, Icon, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { MdHome, MdOutlineAddCircle } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaUsers } from "react-icons/fa";
import { usePathname } from "next/navigation";

interface linksOfAdminNav {
  name: string;
  path: string;
  icon: any;
}

const navLinks: linksOfAdminNav[] = [
  {
    name: "Dashboard",
    path: "/Admin",
    icon: MdHome,
  },
  {
    name: "Appointments",
    path: "/Admin/Appointments",
    icon: SlCalender,
  },
  {
    name: "Add Doctor",
    path: "/Admin/AddDoctor",
    icon: MdOutlineAddCircle,
  },
  {
    name: "Doctor List",
    path: "/Admin/DoctorList",
    icon: FaUsers,
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <Box as="aside" borderRightWidth={{ base: "0px", lg: "3px" }}>
      <UnorderedList
        display="flex"
        flexDirection={{ base: "row", lg: "column" }}
        justifyContent={{ base: "space-between", lg: "start" }}
      >
        {navLinks.map((link) => (
          <ListItem
            padding={{ base: "1rem", lg: "14px 36px" }}
            display="flex"
            alignItems="center"
            columnGap={2}
            key={link.name}
            as="a"
            href={link.path}
            textColor={
              pathname === link.path ? "var(--primaryColor)" : "initial"
            }
            bg={pathname === link.path ? "#eee" : "initial"}
            _hover={{ textColor: "var(--primaryColor)", bg: "#eee" }}
          >
            <Icon as={link.icon} fontSize={30} />
            <Text
              as="span"
              fontSize={20}
              display={{ base: "none", lg: "block" }}
            >
              {link.name}
            </Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
