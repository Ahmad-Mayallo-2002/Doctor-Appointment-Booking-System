"use client";
import {
  DoctorInfo,
  IdToken,
  mainUrl,
  specialityData,
  useIdToken,
  userData,
} from "@/app/assets/assets";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";

export default function AddDoctor() {
  const { register, handleSubmit, formState } = useForm<DoctorInfo>();
  const { errors } = formState;
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>(
    "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  );
  const toast = useToast();
  const handleChangeImage = (event: any) =>
    setImage(URL.createObjectURL(event?.target.files[0]));
  let IdToken: userData;
  if (typeof window !== "undefined") {
    IdToken = useIdToken();
  }
  const onSubmit = async (data: DoctorInfo, event: any) => {
    const formData = new FormData(event?.target);
    try {
      setLoading(true);
      const { data, status } = await axios.post(
        mainUrl + "add-doctor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${IdToken?.token}`,
            id: IdToken?.id,
          },
        }
      );
      if (status === 200)
        toast({
          title: "Complete",
          description: data?.msg,
          isClosable: true,
          status: "success",
          duration: 1500,
          position: "top-left",
        });
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Error",
        description: error?.response?.data?.msg,
        isClosable: true,
        status: "error",
        duration: 1500,
        position: "top-left",
      });
    } finally {
      setLoading(false);
    }
  };
  const onError = () => {
    console.log(errors);
  };
  return (
    <>
      <Heading marginBottom={4}>Add Doctor</Heading>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit, onError)}
        display="grid"
        gap="1rem"
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
      >
        <FormControl
          gridColumn="1/-1"
          id="image"
          bg="#fafafa"
          padding={4}
          borderRadius="1rem"
        >
          <Input
            type="file"
            {...register("doctor_image", {
              required: {
                value: true,
                message: "Doctor Image is Required",
              },
              onChange: handleChangeImage,
            })}
            hidden
          />
          <FormLabel
            display="flex"
            alignItems="center"
            gap={2}
            width="fit-content"
            cursor="pointer"
          >
            <Image
              src={image}
              width="100px"
              height="100px"
              borderRadius="50%"
              alt="Doctor Image"
            />
            <Stack>
              <Text>Upload Doctor Picture</Text>
            </Stack>
          </FormLabel>
          {errors?.doctor_image?.message && (
            <FormHelperText
              color="red"
              display="flex"
              gap={2}
              alignItems="center"
              fontWeight="bold"
            >
              <MdError fontSize={24} />
              {errors?.doctor_image?.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl bg="#fafafa" padding={4} borderRadius="0.375rem">
          <Input
            type="text"
            {...register("doctor_name", {
              required: {
                value: true,
                message: "Doctor Name is Required",
              },
            })}
            placeholder="Doctor Name"
          />
          {errors?.doctor_name?.message && (
            <FormHelperText
              color="red"
              display="flex"
              gap={2}
              alignItems="center"
              fontWeight="bold"
            >
              <MdError fontSize={24} />
              {errors?.doctor_name?.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl bg="#fafafa" padding={4} borderRadius="0.375rem">
          <Input
            type="text"
            {...register("doctor_email", {
              required: {
                value: true,
                message: "Doctor Email is Required",
              },
            })}
            placeholder="Doctor Email"
          />
          {errors?.doctor_email?.message && (
            <FormHelperText
              color="red"
              display="flex"
              gap={2}
              alignItems="center"
              fontWeight="bold"
            >
              <MdError fontSize={24} />
              {errors?.doctor_email?.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          bg="#fafafa"
          padding={4}
          borderRadius="0.375rem"
          isInvalid={!!errors.doctor_experience}
        >
          <Select
            {...register("doctor_experience", {
              required: {
                value: true,
                message: "Doctor Experience is Required",
              },
            })}
            defaultValue="1 Year"
          >
            <option value={1}>1 Year</option>
            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <option key={value} value={value}>
                {value} Years
              </option>
            ))}
          </Select>
          {errors.doctor_experience?.message && (
            <FormHelperText
              color="red"
              display="flex"
              gap={2}
              alignItems="center"
              fontWeight="bold"
            >
              <MdError fontSize={24} />
              {errors?.doctor_experience?.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          bg="#fafafa"
          padding={4}
          borderRadius="0.375rem"
          isInvalid={!!errors.doctor_speciality}
        >
          <Select
            {...register("doctor_speciality", {
              required: {
                value: true,
                message: "Doctor Speciality is Required",
              },
            })}
            defaultValue={specialityData[0].speciality}
          >
            {specialityData.map((value) => (
              <option key={value.speciality} value={value.speciality}>
                {value.speciality}
              </option>
            ))}
          </Select>
          {errors?.doctor_speciality?.message && (
            <FormErrorMessage
              color="red"
              display="flex"
              gap={2}
              alignItems="center"
              fontWeight="bold"
            >
              <MdError fontSize={24} />
              {errors?.doctor_speciality?.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl bg="#fafafa" padding={4} borderRadius="0.375rem">
          <Input
            type="number"
            placeholder="Fees"
            min="0"
            {...register("doctor_fees", {
              required: {
                value: true,
                message: "Doctor Fees is Required",
              },
            })}
          />
          {errors?.doctor_fees?.message && (
            <FormHelperText
              color="red"
              display="flex"
              gap={2}
              alignItems="center"
              fontWeight="bold"
            >
              <MdError fontSize={24} />
              {errors?.doctor_fees?.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl bg="#fafafa" padding={4} borderRadius="0.375rem">
          <Input
            type="text"
            {...register("doctor_degree", {
              required: {
                value: true,
                message: "Doctor Degree is Required",
              },
            })}
            placeholder="Degree"
          />
          {errors.doctor_degree?.message && (
            <FormHelperText
              color="red"
              display="flex"
              gap={2}
              alignItems="center"
              fontWeight="bold"
            >
              <MdError fontSize={24} />
              {errors.doctor_degree?.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl gridColumn="1/-1" bg="#fafafa" padding={4}>
          <Input
            type="text"
            {...register("doctor_address", {
              required: {
                value: true,
                message: "Doctor Address is Required",
              },
            })}
            placeholder="Address"
          />
          {errors?.doctor_address?.message && (
            <FormHelperText
              color="red"
              display="flex"
              gap={2}
              alignItems="center"
              fontWeight="bold"
            >
              <MdError fontSize={24} />
              {errors?.doctor_address?.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          bg="#fafafa"
          padding={4}
          borderRadius="0.375rem"
          gridColumn="1/-1"
        >
          <Input
            type="text"
            as="textarea"
            resize="none"
            placeholder="About Doctor"
            paddingY="10px"
            height={175}
            {...register("about_doctor", {
              required: {
                value: true,
                message: "About Doctor is Required",
              },
            })}
          />
          {errors.about_doctor?.message && (
            <FormHelperText
              color="red"
              display="flex"
              gap={2}
              alignItems="center"
              fontWeight="bold"
            >
              <MdError fontSize={24} />
              {errors.about_doctor?.message}
            </FormHelperText>
          )}
        </FormControl>

        <Button
          isLoading={loading && true}
          loadingText="Loading..."
          type="submit"
          colorScheme="blue"
          gridColumn="1/-1"
        >
          Add Doctor
        </Button>
      </Box>
    </>
  );
}
