"use client";

import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useJobApplyMutation } from "@/redux/api/baseApi";
import { usePathname } from "next/navigation";

export default function Confirmation() {
  const pathName = usePathname();
  const [isModalOpen, setisModalOpen] = useState(false);

  // const file = useAppSelector((state) => state.resume.resumeFile);
  const [jobApply, { isLoading }] = useJobApplyMutation();

  useEffect(() => {
    if (pathName == "/premium/confirmation") {
      setisModalOpen(true);
    }
  }, [pathName]);

  async function handleSubmit() {
    const sessionEmailBody = sessionStorage.getItem("premiumUserPlayLoad");
    const parsedEmailBody = JSON.parse(sessionEmailBody);

    // console.log(parsedEmailBody.emailBody);

    // console.log("parsedEmailBody", parsedEmailBody);

    // console.log("stringifyEmailBody", JSON.stringify(parsedEmailBody));

    // console.log(file);

    // const formdata = new FormData();
    // formdata.append("pdf", file);
    // formdata.append("emailBody", JSON.stringify(parsedEmailBody));

    const userPlayLoad = {
      emailbody: parsedEmailBody,
      userEmail: "khhniloy0@gmail.com",
    };
    const res = await jobApply(userPlayLoad);
    console.log(res)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
        </DialogHeader>
        <div className="">
          <Button onClick={handleSubmit} type="submit">
            Hit the final button and submit!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
