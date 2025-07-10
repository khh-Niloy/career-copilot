"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
// import axios from "axios";

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
import z from "zod";
import CreateResumeCTA from "./components/CreateResumeCTA";
import GeneratedEmailBody from "./components/GeneratedEmailBody";
import MagicIcon from "../../../../components/icons/MagicIcon";
import { useGenerateEmailBodyMutation } from "@/redux/api/baseApi";
import Spinner from "@/components/icons/Spinner";
import { useAppDispatch } from "@/redux/hooks/hooks";
// import { storeResumeFile } from "@/redux/features/resumeSlice";

export default function ApplyViaEmail() {
  const [files, setFiles] = useState<File[]>([]);
  const [emailBody, setEmailBody] = useState<any>(null);
  // const [pdfBuffer, setpdfBuffer] = useState<any>(null);
  const { register, handleSubmit } = useForm();

  const [generateEmailBody, { isLoading }] = useGenerateEmailBodyMutation();
  const dispatch = useAppDispatch();

  const formZodSchema = z.object({
    files: z.array(z.instanceof(File)).min(1, "Please upload your resume"),
    jobDescription: z.string().min(1, "Please give job description"),
  });
  async function validateFormInput(jobDescription: string, files: File[]) {
    const result = await formZodSchema.safeParseAsync({
      files,
      jobDescription,
    });
    if (result.success == false) {
      toast.error(`${result?.error?.issues[0]?.message}`);
      return false;
    }
    return true;
  }

  interface IData {
    jobDescription: string;
  }

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  async function submitResumeAndJobDes(data: IData) {
    if (!validateFormInput(data.jobDescription, files)) return;

    const formdata = new FormData();
    formdata.append("pdf", files[0]);
    formdata.append("jobDescription", data.jobDescription);
    // ! have to send user email

    try {
      // dispatch(storeResumeFile(files[0]));
      const res = await generateEmailBody(formdata);
      console.log(res);
      if (res?.data?.status == 200) {
        setEmailBody(res?.data?.aiGeneratedText);
        // setpdfBuffer(res?.data?.pdfBuffer);
      }
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
        <DialogContent className=" sm:max-w-4xl h-[30rem] overflow-y-auto">
          {emailBody !== null ? (
            <GeneratedEmailBody
              setEmailBody={setEmailBody}
              emailBody={emailBody}
              // pdfBuffer={pdfBuffer}
            />
          ) : (
            <>
              {isLoading ? (
                <Spinner />
              ) : (
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
                        {...register("jobDescription")}
                        rows={3}
                        placeholder="Paste the job description here..."
                        className="relative border-t border-dashed placeholder:text-black/70 custom-scrollbar focus:outline-0 place-content-end resize-none
                     text-black bg-white p-3 sm:p-4 rounded-b-lg border-black/50 w-full"
                      />
                    </div>

                    <CreateResumeCTA />
                  </div>
                  <DialogFooter>
                    <Button className="w-full mt-3" type="submit">
                      <MagicIcon /> Let AI Craft the Perfect Email for You!
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
