"use client";
import dynamic from "next/dynamic";

const LightStream = dynamic(() => import("./LightStream"), { ssr: false });

export default function StreamMount() {
  return (
    <>
      <div aria-hidden="true" className="stream-base pointer-events-none fixed inset-0 z-0" />
      <LightStream />
    </>
  );
}
