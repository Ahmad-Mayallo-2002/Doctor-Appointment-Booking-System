"use client";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import { mainUrl } from "../assets/assets";
import { useRouter } from "next/navigation";

interface UserData {
  email: string;
  password: string;
}

export default function Login() {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState } = useForm<UserData>();
  const [status, setStatus] = useState<number>(0);
  const { errors } = formState;
  const onSubmit = async (resultData: UserData) => {
    try {
      setLoading(true);
      const { data, status } = await axios.post(
        mainUrl + "/login",
        resultData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (status === 200) {
        setStatus(status);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("IdToken", JSON.stringify(data));
        }
        router.push("/"); // Navigate to home page
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error?.response?.data);
      toast({
        title: "Error",
        description: error?.response?.data?.msg,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-left",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      id="login-form-container"
    >
      <Box as="form" id="login-form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Email: </FormLabel>
          <Input
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /^[A-Za-z]+[0-9!#$%^&*]*@gmail\.com$/,
                message: "Invalid Email Syntax",
              },
            })}
          />
          {errors.email?.message && (
            <FormHelperText
              color="red"
              display="flex"
              gap={2}
              alignItems="center"
              fontWeight="bold"
            >
              <MdError fontSize={24} />
              {errors.email?.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Password: </FormLabel>
          <Input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is Required",
              },
              minLength: {
                value: 8,
                message: "Minimum Length is 8",
              },
              maxLength: {
                value: 20,
                message: "Maximum Length is 20",
              },
            })}
          />
          {errors.password?.message && (
            <FormHelperText
              color="red"
              display="flex"
              gap={2}
              alignItems="center"
              fontWeight="bold"
            >
              <MdError fontSize={24} />
              {errors.password?.message}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={loading}
          loadingText="Loading..."
        >
          Login
        </Button>
        <Text>
          You Don't Have An Account?{" "}
          <Text
            color="var(--primaryColor)"
            as="a"
            href="/SignUp"
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
          >
            Sign Up
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
