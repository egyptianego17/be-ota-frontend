"use client";
import axios from 'axios';
import Link from "next/link";
import { useEffect, useState } from "react";
import config from "./config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Otapage2() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? config.production.baseUrl
      : config.development.baseUrl;

  const [firmwareVersions, setFirmwareVersions] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState("");
  const [firmwareFile, setFirmwareFile] = useState<File | null>(null);
  const [firmwareVersion, setFirmwareVersion] = useState("");

  // Fetch firmware versions from the API
  useEffect(() => {
    const fetchFirmwareVersions = async () => {
      try {
        const response = await axios.get(`${baseUrl}/firmware-versions`);
        setFirmwareVersions(response.data);
      } catch (error) {
        console.error('Error fetching firmware versions:', error);
        alert('Error fetching firmware versions.');
      }
    };

    fetchFirmwareVersions();
  }, [baseUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".bin")) {
      setFirmwareFile(file);
    } else {
      alert("Please select a .bin file");
    }
  };

  const handleVersionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirmwareVersion(event.target.value);
  };

  const handleVersionSelect = (version: string) => {
    setSelectedVersion(version);
  };

  const handleUpdateFirmware = async () => {
    if (!firmwareFile || !firmwareVersion) {
      alert('Please select a firmware file and provide a version.');
      return;
    }

    const formData = new FormData();
    formData.append('firmwareFile', firmwareFile);
    formData.append('firmwareVersion', firmwareVersion);

    try {
      const response = await axios.post(`${baseUrl}/firmware-update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Firmware update successful!');
      } else {
        alert(`Firmware update failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating firmware:', error);
      alert(`Firmware update failed: ${error}`);
    }
  };

  const handleSetStableLatestVersion = async () => {
    // Ensure firmwareVersion is provided
    if (!selectedVersion) {
        console.error('Firmware version is required');
        alert('Please select a firmware version to set as the latest stable version.');
        return;
    }

    try {
        // Use the selected version directly in the URL
        const response = await axios.get(`${baseUrl}/set-stable-latest-version`, {
            params: {
                firmwareVersion: selectedVersion,
            },
        });

        // Log successful response
        console.log('Stable latest version set successfully:', response.data);
        alert('Stable latest version set successfully.');
        // Handle the response data as needed here

    } catch (error) {
        // Log error information
        if (axios.isAxiosError(error)) {
            console.error('Error response from server:', error.response?.data);
            alert(`Error response from server: ${error.response?.data}`);
        } else {
            console.error('Unknown error:', error);
            alert('An unknown error occurred.');
        }
    }
};


  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search devices..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="https://freesvg.org/img/icon_user_whiteongrey.png"
                  style={{ aspectRatio: "32/32", objectFit: "cover" }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Firmware Update</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firmware-version">Firmware Version</Label>
                  <Input
                    id="firmware-version"
                    placeholder="e.g. 3.2.1"
                    value={firmwareVersion}
                    onChange={handleVersionChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="firmware-file">Firmware File</Label>
                  <Input
                    id="firmware-file"
                    type="file"
                    accept=".bin"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <Button onClick={handleUpdateFirmware}>
                Update Firmware
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Set Latest Stable Version</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="latest-stable-version">Select a firmware version</Label>
                <select
                  id="latest-stable-version"
                  value={selectedVersion}
                  onChange={(e) => handleVersionSelect(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg p-2"
                >
                  <option value="" disabled>
                    Select a firmware version
                  </option>
                  {firmwareVersions.map((version) => (
                    <option key={version} value={version} className="bg-gray-900 text-white">
                      {version}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={handleSetStableLatestVersion}>
                Set Latest Stable Version
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}


function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LaptopIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function RefreshCwIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ThermometerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    </svg>
  );
}
