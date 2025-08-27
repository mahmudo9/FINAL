import React from "react";
import { Input, Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../configs/api";

const SignUp = () => {
  let navigate = useNavigate();
  async function signup(userName, password) {
    const res = await API.post("Account/login", { userName, password });
    if (res.data.data) {
      localStorage.setItem("accessToken", res.data.data);
      navigate("/");
	  console.log(res.data.data);
    }
    return res.data;
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    let userName = e.target["userName"].value;
    let password = e.target["password"].value;
    signup(userName, password);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 dark:bg-gray-800 dark:text-[white]">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-1">
          Create an account
        </h2>
        <p className="text-sm text-gray-600 mb-6">Enter your details below</p>

        <form action="" onSubmit={handlesubmit} className="flex flex-col gap-y-4">
          <Input
            placeholder="Name"
            size="large"
            className="mb-4"
            name="userName"
          />

          <Input.Password
            placeholder="Password"
            size="large"
            className="mb-4"
            name="password"
          />

          <button
            type="submit"
            className="bg-[#DB4444] py-[10px] px-[48px] rounded-[4px] text-white w-full shadow border-0 mb-4"
          >
            Create Account
          </button>
        </form>
<div className="my-[15px]">
        <Button
          icon={<GoogleOutlined />}
          className="w-full border border-gray-300 text-black mb-6"
          size="large"
        >
          Sign up with Google
        </Button>
        </div>

        <div className="text-center text-sm">
          Already have account?{" "}
          <Link to="/login" className="text-black underline hover:text-red-500">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
