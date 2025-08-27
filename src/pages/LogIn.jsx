import React from "react";
import { Input, Button, Switch } from "antd";
import { VisibilityOutlined } from "@mui/icons-material";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import clsx from "clsx";
import useDarkSide from "../configs/useDarkSide";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
const LogIn = () => {
  const [theme, toggleTheme] = useDarkSide();
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
          Log in to Exclusive
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter your details below
        </p>

        <TextField
          id="outlined-basic"
          label=" Email or phone number"
          fullWidth
          placeholder="rimel1111@gmail.com"
          className="block text-sm text-gray-300 dark:text-gray-800 mb-4"
          variant="outlined"
        />

        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 mt-[10px]">
          Password
        </label>
        <Input.Password
          placeholder="********"
          className="mb-4"
          size="large"
          iconRender={() => <VisibilityOutlined />}
        />

        <div className="text-center mb-4">
          <a href="#" className="text-red-500 text-sm hover:underline">
            Forget Password?
          </a>
        </div>
        <button className="bg-[#DB4444] py-[16px] px-[48px] rounded-[4px] text-white w-full shadow border-0">
          Log In
        </button>
      </div>
    </div>
  );
};

export default LogIn;
