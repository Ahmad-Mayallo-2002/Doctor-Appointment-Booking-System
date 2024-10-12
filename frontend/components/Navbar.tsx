"use client";
import React, { useEffect } from "react";
import Containers from "./Container";
import {
  Box,
  IconButton,
  Image,
  Link,
  ListItem,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useIdToken, userData } from "@/app/assets/assets";

interface link {
  name: string;
  path: string;
}

const links: link[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Profile",
    path: "/Profile",
  },
  {
    name: "About",
    path: "/About",
  },
  {
    name: "Contact",
    path: "/Contact",
  },
  {
    name: "Create Account",
    path: "/SignUp",
  },
  {
    name: "Login",
    path: "/Login",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isOpen, onToggle } = useDisclosure();
  let IdToken: userData;
  if (typeof window !== "undefined") IdToken = useIdToken();
  return (
    <Box as="nav" borderBottomWidth="3px" padding={4}>
      <Containers
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap={{ base: "wrap", lg: "nowrap" }}
      >
        <Link href="">
          <Image src="/assets_frontend/logo.svg" alt="Logo" />
        </Link>
        <IconButton
          className="burger-icon"
          aria-label="Show Links"
          bg="var(--primaryColor)"
          _hover={{ bg: "var(--hoverPrimaryColor)" }}
          size="lg"
          fontSize="1.5rem"
          textColor="#fff"
          icon={<HamburgerIcon />}
          display={{ base: "flex", lg: "none" }}
          onClick={onToggle}
        />
        <UnorderedList
          className="links-list"
          as="ul"
          display={{ base: isOpen ? "flex" : "none", lg: "flex" }}
          width={{ base: "100%", lg: "fit-content" }}
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: "column", lg: "row" }}
          marginTop={{ base: "1rem", lg: "0rem" }}
          gap="1rem"
        >
          {links.map((value) => (
            <ListItem key={value.name}>
              <Link
                href={value.path}
                _hover={{ color: "var(--primaryColor)" }}
                textColor={`${
                  pathname === value.path && "var(--primaryColor)"
                }`}
                onClick={(event) => {
                  if (value.name === "Profile") {
                    if (!IdToken?.token) {
                      event.preventDefault();
                      alert("Please Login First");
                    }
                  }
                }}
                textTransform="uppercase"
              >
                {value.name}
              </Link>
            </ListItem>
          ))}

          <ListItem>
            <Link
              paddingX={4}
              paddingY={2}
              border="2px solid #5f6fff"
              bg="#5f6fff"
              textColor="#fff"
              _hover={{
                bg: "#5562d0",
                borderColor: "#5562d0",
              }}
              borderRadius="5555px"
              href="/Admin"
              onClick={(event) => {
                if (!IdToken?.token) {
                  event.preventDefault();
                  alert("Please Login First");
                }
              }}
            >
              Admin Panel
            </Link>
          </ListItem>
        </UnorderedList>
      </Containers>
    </Box>
  );
}
