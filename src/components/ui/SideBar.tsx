"use client";
import { BellIcon, LaptopIcon, Package2Icon, PackageIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./button";
import { usePathname } from "next/navigation";
const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 lg:w-[30%]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="">IoT Platform</span>
          </Link>
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className={` mb-4 ${
                pathname === "/device-management"
                  ? "bg-gray-100 flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50 "
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
              href="/device-management"
            >
              <PackageIcon className="h-4 w-4" />
              Device Management
            </Link>
            <Link
              className={`${
                pathname === "/firmware-update"
                  ? "bg-gray-100 flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50 "
                  : "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              }`}
              href="/firmware-update"
            >
              <LaptopIcon className="h-4 w-4" />
              Firmware Update
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
