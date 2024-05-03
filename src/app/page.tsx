"use client"; // Add this directive at the top

import React, { useEffect, useState } from "react";
import Otapage1 from "@/components/dashboard";
import Otapage2 from "@/components/firmware-update";
import { useRouter } from "next/navigation";
export default function Home() {
  return <Otapage1 />;
}
