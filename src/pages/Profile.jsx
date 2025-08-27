import React from "react";
import { Input, Button } from "antd";
import clsx from "clsx";
import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-800 dark:text-[white]">
      <div className="text-sm text-gray-500 mb-6">
        <span>Home</span> / <span className="text-black">My Account</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <h3 className="font-semibold text-lg mb-4">Manage My Account</h3>
          <nav className="space-y-2 text-sm">
            <div className="text-red-500 font-medium">My Profile</div>
            <div className="text-gray-400  rounded  py-1 w-fit">
              Address Book
            </div>
            <div className="text-gray-400">My Payment Options</div>
          </nav>

          <h3 className="font-semibold text-lg mt-6 mb-4"><Link to={"/order"}>My Orders</Link></h3>
          <nav className="space-y-2 text-sm">
            <div className="text-gray-600">My Returns</div>
            <div className="text-gray-600">My Cancellations</div>
          </nav>

          <h3 className="font-semibold text-lg mt-6 mb-4">My Wishlist</h3>
        </aside>

        <main className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-500 mb-6">Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input addonBefore="First name" defaultValue="Md" />
            <Input addonBefore="Last name" defaultValue="Rimel" />
            <Input
              addonBefore="Email address"
              defaultValue="rimel1111@gmail.com"
            />
            <Input
              addonBefore="Street address"
              defaultValue="Kingston, 5236, United State"
            />
          </div>

          <div className="mt-8">
            <h3 className="text-md font-medium mb-4">Password Changes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input.Password placeholder="Current password" />
              <Input.Password placeholder="New password" />
              <Input.Password
                placeholder="Confirm new password"
                className="md:col-span-2"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4 items-center">
            <Button type="text" className="text-gray-600" size="large">
              Cancel
            </Button>

            <button className="bg-[#DB4444] py-[12px] px-[32px] rounded-[4px] text-white shadow border-0 cursor-pointer">
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
