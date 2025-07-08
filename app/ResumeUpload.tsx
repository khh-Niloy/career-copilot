"use client";
import React, { useRef, useState } from "react";
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
import { Copy, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import z from "zod";

export default function ResumeUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [emailBody, setEmailBody] = useState<any>(null);
  const emailRef = useRef(null);
  const [isCopied, setisCopied] = useState(false);

  const { register, handleSubmit } = useForm();

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

  async function handleCopyEmailBody() {
    const emailBodyText = emailRef?.current?.innerText;
    await navigator.clipboard.writeText(emailBodyText);

    setTimeout(() => {
      setisCopied(true);
    }, 2000);
    setisCopied(false);
  }

  async function submitResumeAndJobDes(data: IData) {
    if (!validateFormInput(data.jobDescription, files)) return;

    const formdata = new FormData();
    formdata.append("pdf", files[0]);
    formdata.append("jobDescription", data.jobDescription);

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
      console.log(res);

      if (res.status == 200) {
        // setisEmailBodyGenerated(true);
        setEmailBody(res.data);
      }

      // if (res.status == 200) {
      //   const {
      //     data: {
      //       subjectLine,
      //       greeting,
      //       introduction,
      //       technicalSkills,
      //       projects,
      //       fitInterest,
      //       willingnessToLearn,
      //       attachementsAndLinks,
      //       closingAndContact,
      //     },
      //   } = res;
      //   setEmailBody({
      //     subjectLine,
      //     greeting,
      //     introduction,
      //     technicalSkills,
      //     projects,
      //     fitInterest,
      //     willingnessToLearn,
      //     attachementsAndLinks,
      //     closingAndContact,
      //   });
      //   setisEmailBodyGenerated(true);
      // }
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
          {emailBody ? (
            <div className="">
              <div className=" border border-black/15 rounded-lg p-5">
                <Button
                  onClick={handleCopyEmailBody}
                  className="sticky top-5 left-[90%] cursor-pointer"
                >
                  <Copy /> {isCopied ? "Copied" : "Copy"}
                </Button>
                <Button
                  onClick={() => setEmailBody(null)}
                  className="sticky top-16 left-[90%] cursor-pointer"
                >
                  <RotateCcw /> Regenerate
                </Button>

                <div ref={emailRef}>
                  <h1>Subject: {emailBody?.subjectLine}</h1>
                  <h1 className="mt-5">{emailBody?.greeting}</h1>
                  <h1 className="mt-5">{emailBody?.introduction}</h1>
                  <h1 className="mt-5">{emailBody?.technicalSkills}</h1>
                  <h1 className="mt-5">
                    {emailBody.projects && (
                      <div>
                        My Key Project: <br />{" "}
                        {emailBody?.projects?.map((e, index) => (
                          <p key={index}>
                            {e.projectName}: {e.liveSite}
                          </p>
                        ))}
                      </div>
                    )}
                  </h1>
                  <h1 className="mt-5">{emailBody?.fitInterest}</h1>
                  <h1 className="mt-5">{emailBody?.willingnessToLearn}</h1>

                  <div className="mt-5">
                    {emailBody?.attachementsAndLinks?.map((item, idx) => (
                      <div key={idx}>
                        {item.name}:{" "}
                        <span className="text-blue-600">{item.links}</span>
                      </div>
                    ))}
                  </div>

                  <h1 className="mt-5">
                    {emailBody?.closingAndContact?.closing}
                  </h1>

                  <div className="mt-3">
                    {emailBody?.closingAndContact?.contacts?.map(
                      (contact, idx) => (
                        <div key={idx}>
                          <h1>{contact.name}</h1>
                          <h1>{contact.phone}</h1>
                          <h1>
                            linkedin:
                            <span className="text-blue-600">
                              {contact.linkedin}
                            </span>
                          </h1>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
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

                <div className="w-[50%] border rounded-lg flex flex-col  border-dashed border-neutral-200 justify-center items-center relative">
                  <h1 className="absolute top-5 text-xl font-semibold">
                    Coming Soon!
                  </h1>

                  <div className="text-black/30 text-center">
                    <h1 className="text-2xl font-semibold">
                      Dont have resume?
                    </h1>
                    <h2>Create now!</h2>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full mt-3" type="submit">
                  Let AI Craft the Perfect Email for You!
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
