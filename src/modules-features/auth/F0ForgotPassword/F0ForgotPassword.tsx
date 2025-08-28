"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Paper, Flex, Title, Text, Anchor, Button, TextInput, PasswordInput, Group, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import classes from "./css.module.css";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import Link from "next/link";

export default function F0ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");

  // Bước 1: gửi email để nhận OTP
  const sendOtpMutation = useMutation({
    mutationFn: async (values: { email: string }) => {
      const res = await axios.post(process.env.NEXT_PUBLIC_API2 + "forgot-password", values);
      return res.data;
    },
    onSuccess: () => {
      setStep(2);
    },
  });

  // Bước 2: verify OTP
  const verifyOtpMutation = useMutation({
    mutationFn: async (values: { email: string; otp: string }) => {
      const res = await axios.post(process.env.NEXT_PUBLIC_API2 + "verify-reset-otp", values);
      return res.data;
    },
    onSuccess: () => {
      setStep(3);
    },
  });

  // Bước 3: đặt mật khẩu mới
  const resetPasswordMutation = useMutation({
    mutationFn: async (values: { email: string; new_password: string; new_password_confirmation: string }) => {
      const res = await axios.post(process.env.NEXT_PUBLIC_API2 + "set-new-password", values);
      return res.data;
    },
    onSuccess: () => {
      alert("Đặt lại mật khẩu thành công, vui lòng đăng nhập lại!");
      router.replace("/login");
    },
  });

  // Form các bước
  const formStep1 = useForm({ initialValues: { email: "" } });
  const formStep2 = useForm({ initialValues: { otp: "" } });
  const formStep3 = useForm({
    initialValues: { new_password: "", new_password_confirmation: "" },
    validate: {
      new_password: (val) => (val.length < 6 ? "Mật khẩu ít nhất 6 ký tự" : null),
      new_password_confirmation: (val, values) =>
        val !== values.new_password ? "Xác nhận mật khẩu không khớp" : null,
    },
  });

  return (
    <Paper withBorder w={400} m={"md"} shadow="md" p={30} mt={30} radius="md">
      <Flex direction={"column"} mb={"md"}>
        <Title ta="center" className={classes.title}>
          Quên mật khẩu
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Nhập email để lấy lại mật khẩu
        </Text>
      </Flex>

      {step === 1 && (
        <form
          onSubmit={formStep1.onSubmit((values) => {
            setEmail(values.email);
            sendOtpMutation.mutate({ email: values.email });
          })}
        >
          <MyFlexColumn>
            <TextInput
              label="Email"
              placeholder="Nhập email đăng ký"
              withAsterisk
              {...formStep1.getInputProps("email")}
            />
            <Button type="submit" loading={sendOtpMutation.status === "error"} fullWidth>
              Gửi mã OTP
            </Button>
            <Anchor component={Link} href={"auth/login"} size="sm">
              Quay lại trang chủ
            </Anchor>
          </MyFlexColumn>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={formStep2.onSubmit((values) => {
            verifyOtpMutation.mutate({ email, otp: values.otp });
          })}
        >
          <MyFlexColumn>
            <TextInput
              label="Mã OTP"
              placeholder="Nhập OTP trong email"
              withAsterisk
              {...formStep2.getInputProps("otp")}
            />
            <Button type="submit" loading={verifyOtpMutation.status === "success"} fullWidth>
              Xác minh OTP
            </Button>
          </MyFlexColumn>
        </form>
      )}

      {step === 3 && (
        <form
          onSubmit={formStep3.onSubmit((values) => {
            resetPasswordMutation.mutate({ email, ...values });
          })}
        >
          <MyFlexColumn>
            <PasswordInput
              label="Mật khẩu mới"
              placeholder="Nhập mật khẩu mới"
              withAsterisk
              {...formStep3.getInputProps("new_password")}
            />
            <PasswordInput
              label="Xác nhận mật khẩu mới"
              placeholder="Nhập lại mật khẩu mới"
              withAsterisk
              {...formStep3.getInputProps("new_password_confirmation")}
            />
            <Button type="submit" loading={resetPasswordMutation.status === "success"} fullWidth>
              Đặt lại mật khẩu
            </Button>
          </MyFlexColumn>
        </form>
      )}

      {step > 1 && (
        <Anchor component="button" size="sm" mt="sm" onClick={() => setStep(1)}>
          Quay lại nhập email
        </Anchor>
      )}
    </Paper>
  );
}
