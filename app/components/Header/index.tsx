"use client";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Button, Input, Switch } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/authProvider";

const navList = [
  {
    key: 1,
    name: "Home",
    href: "/",
  },
  {
    key: 2,
    name: "Dashboard",
    href: "/dashboard",
  },
];

const Header = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("mode") ?? "");
  const router = useRouter();
  const { currentUser, logOutSuccess } = useAuth();

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    setDarkMode(mode === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", darkMode);
    if (darkMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const backToLogin = () => {
    router.push("/login");
  };

  const handleLogOut = () => {
    logOutSuccess();
    router.push("/login");
  };

  const onChange = (checked: boolean) => {
    setDarkMode(darkMode === "light" ? "dark" : "light");
  };

  console.log("DA", darkMode);

  return (
    <div className="mb-[24px] flex justify-between items-center w-[1140px] mx-[auto] my-[0] mt-[16px] dark:bg-gray-800">
      <div className="block">
        <Input
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined />}
          className=""
        />
      </div>
      <div className="leading-8 flex gap-[16px] items-center">
        {navList.map(({ key, name, href }) => (
          <Link key={key} href={href}>
            {name}
          </Link>
        ))}
        {!currentUser ? (
          <Button onClick={backToLogin}>Log in</Button>
        ) : (
          <Button onClick={handleLogOut}>Log out</Button>
        )}
        <Switch onChange={onChange} checked={darkMode === "dark"} />
      </div>
    </div>
  );
};

export { Header };
