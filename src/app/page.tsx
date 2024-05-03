"use client"; // Add this directive at the top

import React, { useState } from "react";
import Otapage1 from "@/components/dashboard";
import Otapage2 from "@/components/firmware-update";

export default function Home() {
  // Create state for current page
  const [currentPage, setCurrentPage] = useState(1); // Start with Page 1

  // Function to switch to Page 1
  const showPage1 = () => {
    setCurrentPage(1);
  };

  // Function to switch to Page 2
  const showPage2 = () => {
    setCurrentPage(2);
  };

  return (
    <div>
      {/* Conditional rendering based on the current page */}
      {currentPage === 1 && <Otapage1 />}
      {currentPage === 2 && <Otapage2 />}
    </div>
  );
}
