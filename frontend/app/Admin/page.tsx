"use client";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdFacebook } from "react-icons/md";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import UsersTable from "@/components/UsersTable";
import { IconType } from "react-icons";
import CountUp from "react-countup";

interface stat {
  label: string;
  number: number;
  helperText: number;
  type: "increase" | "decrease";
}

interface follower {
  site: string;
  value: number;
  percentage: string;
  icon: IconType;
  color: string;
}

const followersData: follower[] = [
  {
    site: "Facebook",
    value: 60,
    percentage: "22.14%",
    icon: MdFacebook,
    color: "#1877f2",
  },
  {
    site: "Youtube",
    value: 53,
    percentage: "33.14%",
    icon: FaYoutube,
    color: "#f00",
  },
  {
    site: "Twitter",
    value: 50,
    percentage: "12.14%",
    icon: FaTwitter,
    color: "#1da1f2",
  },
];

const statsInfo: stat[] = [
  {
    label: "All Users",
    number: 110,
    helperText: 12.5,
    type: "increase",
  },
  {
    label: "Doctors",
    number: 50,
    helperText: 10,
    type: "increase",
  },
  {
    label: "Advertesments",
    number: 15,
    helperText: 30,
    type: "decrease",
  },
];

export default function page() {
  return (
    <>
      <Heading marginBottom={4}>Dashboard</Heading>
      <Grid
        marginY={4}
        gridTemplateColumns={{
          base: "1fr",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {followersData.map((value, index) => (
          <GridItem
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            key={index}
            bg="#fafafa"
            padding={4}
            borderRadius="1rem"
          >
            <Box display="flex" alignItems="center" gap={3}>
              <CircularProgress
                size="75px"
                color={value.color}
                value={value.value}
              >
                <CircularProgressLabel>
                  <CountUp start={0} duration={5} end={value.value} />%
                </CircularProgressLabel>
              </CircularProgress>
              <Stack>
                <Text>{value.site} Followers</Text>
                <Text as="small">{value.percentage} Since Last Week</Text>
              </Stack>
            </Box>
            <Icon as={value.icon} color={value.color} fontSize={40} />
          </GridItem>
        ))}
      </Grid>
      <StatGroup
        marginBottom={4}
        gap={4}
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          lg: "repeat(3, 1fr)",
        }}
      >
        {statsInfo.map((stat, index) => (
          <Stat padding={4} bg="#fafafa" borderRadius="1rem" key={index}>
            <StatLabel>{stat.label}</StatLabel>
            <StatNumber fontSize={30}>
              <CountUp end={stat.number} start={0} duration={5} />
            </StatNumber>
            <StatHelpText>
              <StatArrow type={stat.type} />
              {stat.helperText}%
            </StatHelpText>
          </Stat>
        ))}
      </StatGroup>
      <UsersTable />
    </>
  );
}
