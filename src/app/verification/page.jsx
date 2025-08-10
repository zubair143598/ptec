"use client";
import React from "react";
import dynamic from "next/dynamic";
import Hero from "@/component/verification/Hero";

// Dynamically import Verification so it only runs on client
const VerificationForm = dynamic(
  () => import("@/component/verification/Verification"),
  { ssr: false }
);

const Page = () => {
  return (
    <div>
      <Hero />
      <VerificationForm />
    </div>
  );
};

export default Page;
