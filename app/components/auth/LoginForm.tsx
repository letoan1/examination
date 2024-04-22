"use client";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Button, Form, Input } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/api/auth";
import { useAuth } from "@/app/providers/authProvider";
import { useEffect } from "react";

interface FieldType {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const { currentUser, logInSuccess } = useAuth();

  const schema = yup.object().shape({
    email: yup.string().required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
  });

  useEffect(() => {
    currentUser && router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FieldType>({
    resolver: yupResolver(schema),
  });

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationFn: (values: FieldType) => AuthService.login(values),
    onSuccess: (response) => {
      router.push("/");
      logInSuccess({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      });
    },
    onError: () => {
      setError("password", {
        type: "manual",
        message: "Incorrect password, please try again!",
      });
    },
  });

  const onSubmit: SubmitHandler<FieldType> = async (data: FieldType) => {
    mutateLogin(data);
  };

  return (
    <>
      <Form
        onFinish={handleSubmit(onSubmit)}
        style={{ minWidth: 400 }}
        autoComplete="off"
        layout="vertical"
        validateTrigger="onSubmit"
      >
        <Form.Item<FieldType>
          label="Email"
          validateStatus={errors.password ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-black text-white mt-[16px] hover:!bg-black"
          loading={isPending}
        >
          Login
        </Button>
      </Form>
    </>
  );
};
