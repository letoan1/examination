"use client";

import { Divider } from "antd";
import { LoginForm } from "./LoginForm";

export const LoginLayout = () => {
  return (
    <div className="w-[900px] mx-[auto] my-[auto] text-[46px] login border border-solid border-[#dfdfdf] rounded-[16px] px-[24px] py-[16px]">
      <h1 className="text-center mb-[16px]">Login</h1>
      <div className="flex justify-center pb-[16px]">
        <LoginForm />
      </div>
      <Divider />
    </div>
  );
};
