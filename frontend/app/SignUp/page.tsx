"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import { mainUrl } from "../assets/assets";
import { useRouter } from "next/navigation";

interface UserData {
  user_image: string;
  username: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>(
    "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  );
  const router = useRouter();
  const toast = useToast();
  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };
  const { register, handleSubmit, formState } = useForm<UserData>();
  const { errors } = formState;
  const onSubmit = async (resultData: UserData, event: any) => {
    try {
      setLoading(true);
      const formData = new FormData(event?.target);
      const { data, status } = await axios.post(mainUrl + "sign-up", formData);
      if (status === 200) router.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onError = () => {
    console.log(errors);
  };

  return (
    <Box
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      id="login-form-container"
    >
      <Box
        as="form"
        id="login-form"
        marginY={4}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <FormControl>
          <FormLabel
            htmlFor="image"
            width="fit-content"
            marginX="auto"
            cursor="pointer"
          >
            <Image
              src={image}
              alt="User Image"
              borderRadius="50%"
              w={100}
              h={100}
            />
          </FormLabel>
          <Input
            type="file"
            {...register("user_image", { onChange: handleChangeImage })}
            id="image"
            hidden
          />
        </FormControl>
        <FormControl>
          <FormLabel>Username: </FormLabel>
          <Input
            type="text"
            {...register("username", {
              required: {
                value: true,
                message: "Username is Required",
              },
              minLength: {
                value: 4,
                message: "Minimum Length is 4",
              },
              maxLength: {
                value: 15,
                message: "Maximum Length is 15",
              },
            })}
          />
          {errors.username?.message && (
            <FormHelperText
              color="red"
              display="flex"
              gap={2}
              alignItems="center"
              fontWeight="bold"
            >
              <MdError fontSize={24} />
              {errors.username?.message}
            </FormHelperText>
          )}
        </FormControl>
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
          />{" "}
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
          isLoading={loading && true}
          loadingText="Loading..."
          colorScheme="blue"
        >
          Sign Up
        </Button>
        <Text>
          You Already Have An Account ?{" "}
          <Text
            color="var(--primaryColor)"
            as="a"
            href="/Login"
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
          >
            Login
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
