import React from "react";

export default function CreateResumeCTA() {
  return (
    <div
      className="w-[50%] border rounded-lg flex flex-col  border-dashed
     border-neutral-200 justify-center items-center relative"
    >
      <h1 className="absolute top-5 text-xl font-semibold">Coming Soon!</h1>

      <div className="text-black/30 text-center">
        <h1 className="text-2xl font-semibold">Dont have resume?</h1>
        <h2>Create now!</h2>
      </div>
    </div>
  );
}
