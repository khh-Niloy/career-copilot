"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";

export default function ResumeUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    // console.log(files);
  };

  async function handleUpload() {
    const formdata = new FormData();
    formdata.append("pdf", files[0]);
    const res = await axios.post(
      "http://localhost:8000/pdf-to-text",
      formdata
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );
    const data = await res.data;
    console.log(data);
  }

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
      <button onClick={handleUpload}>Submit</button>
    </div>
  );
}
