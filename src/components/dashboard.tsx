"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import SearchIcon from "@/components/icons/SearchIcon";
import Package2Icon from "@/components/icons/Package2Icon";
import ClockIcon from "@/components/icons/ClockIcon";
import ThermometerIcon from "@/components/icons/ThermometerIcon";
import LaptopIcon from "@/components/icons/LaptopIcon";
import RefreshCwIcon from "@/components/icons/RefreshCwIcon";
import ColoredCircle from "@/components/icons/ColoredCircle";
import { getDeviceStatus, getSensorData, getSerialMessages } from "@/services/apis";
import Spinner from "@/components/ui/Spinner"; 
import Navbar from "@/components/navbar";

export default function Dashboard() {
  const [status, setStatus] = useState({ status: "Offline", lastSeen: "A long time ago." });
  const [sensorData, setSensorData] = useState({ temperature: "0.0", humidity: "0.0", firmwareVersion: "1.0" });
  const [serialMessages, setSerialMessages] = useState("");
  const [isGreen, setIsGreen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("common");

  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  const fetchDeviceStatus = async () => {
    try {
      const data = await getDeviceStatus();
      setStatus({ status: data.status, lastSeen: formatTimeAgo(data.lastSeen) });
      setIsGreen(data.status === "Online");
      if (data.status === "Online") await fetchSensorData();
    } catch (error) {
      console.error("Error fetching device status:", error);
    }
  };

  const fetchSensorData = async () => {
    try {
      const data = await getSensorData();
      setSensorData({
        temperature: data.temperature.toFixed(2),
        humidity: data.humidity.toFixed(2),
        firmwareVersion: data.firmwareVersion,
      });
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  const fetchSerialMessages = async () => {
    try {
      const messages = await getSerialMessages();
      setSerialMessages(messages.map((msg: { message: string }) => `> ${msg.message}`).join("\n"));
    } catch (error) {
      console.error("Error fetching serial messages:", error);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const lastSeenDate = new Date(timestamp);
    const timeDiff = (Date.now() - lastSeenDate.getTime()) / 1000;
    if (timeDiff < 60) return `${Math.round(timeDiff)} seconds ago`;
    if (timeDiff < 3600) return `${Math.floor(timeDiff / 60)} minutes ago`;
    if (timeDiff < 86400) return `${Math.floor(timeDiff / 3600)} hours ago`;
    return `${Math.floor(timeDiff / 86400)} days ago`;
  };

  useEffect(() => {
    updateOnlineStatus();
    const fetchData = async () => {
      await fetchDeviceStatus();
      await fetchSerialMessages();
      setLoading(false); // Disable loading once data is fetched
    };

    fetchData();
    const statusInterval = setInterval(fetchDeviceStatus, 5000);
    const serialMessagesInterval = setInterval(fetchSerialMessages, 5000);

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    
    return () => {
      clearInterval(statusInterval);
      clearInterval(serialMessagesInterval);
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div className="grid min-h-screen w-full">
      <Navbar /> {/* Add the Navbar here */}
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner loading={loading} color="#ffffff" size={100} />
          </div>
        ) : !isOnline ? (
          <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 pb-40 rounded-lg shadow-md"> 
            <h1 className="text-xl font-bold text-red-700 mb-2">{t("No Internet Connection")}</h1>
            <p className="text-white mb-4 text-center"> {/* Fixed the color class here */}
              {t("Please check your network connection and try again.")}
            </p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              style={{ backgroundColor: 'white', color: 'black', border: '1px solid gray' }}
              className="mt-4 hover:bg-gray-200"
            >
              {t("Retry")}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Device Status Card */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("Device Status")}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <ColoredCircle isGreen={isGreen} />
                    <span>{status.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>{t("Last seen")}: {status.lastSeen}</span>
                  </div>
                </CardContent>
              </Card>

              {/* System Monitoring Card */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("System Monitoring")}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <ThermometerIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>{t("Humidity")}: {sensorData.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThermometerIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>{t("Temperature")}: {sensorData.temperature}°C</span>
                  </div>
                </CardContent>
              </Card>

              {/* Firmware Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("Firmware Information")}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <LaptopIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>{t("Version")}: {sensorData.firmwareVersion}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Serial Monitoring Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t("Serial Monitoring")}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div
                  className="bg-gray-100 rounded-lg p-4 dark:bg-gray-800"
                  style={{ height: "150px", overflowY: "auto" }}
                >
                  <pre className="font-mono text-sm text-gray-500 dark:text-gray-400">
                    {serialMessages}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      )}
    </div>
  );
}
