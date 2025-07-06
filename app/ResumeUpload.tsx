"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ResumeUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    // console.log(files);
  };

  const { register, handleSubmit } = useForm();

  async function submitResumeAndJobDes(data) {
    // if (files.length == 0 || !files) {
    //   toast.error("Please upload your resume");
    //   return;
    // }
    const formdata = new FormData();
    formdata.append("pdf", files[0]);
    formdata.append("jobDescription", data.jobDescription);

    // if (data.jobDescription == "" || data.jobDescription == undefined) {
    //   toast.error("Please give job description");
    //   return;
    // }
    // console.log(data);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}resume/jobdes`,
        formdata
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl">
          <form onSubmit={handleSubmit(submitResumeAndJobDes)}>
            {/* <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader> */}
            <div className="flex gap-5">
              <div className="w-[50%] mx-auto border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                <FileUpload onChange={handleFileUpload} />

                <textarea
                  {...register("jobDescription", {
                    required: "Please provide the job description",
                  })}
                  rows={3}
                  placeholder="Paste the job description here..."
                  className="relative border-t border-dashed placeholder:text-black/70 custom-scrollbar focus:outline-0 place-content-end resize-none
                     text-black bg-white p-3 sm:p-4 rounded-b-lg border-black/50 w-full"
                />
              </div>

              <div className="w-[50%] border rounded-lg flex flex-col  border-dashed border-neutral-200 justify-center items-center relative">
                <h1 className="absolute top-5 text-xl font-semibold">
                  Coming Soon!
                </h1>

                <div className="text-black/30 text-center">
                  <h1 className="text-2xl font-semibold">Dont have resume?</h1>
                  <h2>Create now!</h2>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className="w-full" type="submit">
                Let AI Craft the Perfect Email for You!
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
