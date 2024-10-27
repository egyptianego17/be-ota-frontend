"use client"; // Add this directive at the top

import React, { useEffect, useState } from "react";
import Dashboard from "@/components/dashboard";

import { useRouter } from "next/navigation";
export default function Home() {
  return <Dashboard/>;
}
