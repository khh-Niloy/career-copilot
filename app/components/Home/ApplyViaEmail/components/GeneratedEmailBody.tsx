import { Button } from "@/components/ui/button";
import { useJobApplyMutation } from "@/redux/api/baseApi";
import { useAppSelector } from "@/redux/hooks/hooks";
import axios from "axios";
import { Copy, RotateCcw, Send } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

export default function GeneratedEmailBody({
  setEmailBody,
  emailBody,
  // pdfBuffer,
}) {
  const emailRef = useRef(null);
  const [isCopied, setisCopied] = useState(false);

  const [jobApply, { isLoading }] = useJobApplyMutation();

  async function handleCopyEmailBody() {
    setisCopied(true);
    const emailBodyText = emailRef?.current?.innerText;
    navigator.clipboard.writeText(emailBodyText).then((res) => {
      setTimeout(() => {
        setisCopied(false);
      }, 2000);
    });
  }

  // const file = useAppSelector((state) => state.resume.resumeFile);

  async function handleApplyJob() {
    console.log("clicked apply job");

    const formattedEmailBody = {
      ...emailBody,
      currentUserEmail: "niloy.dev.101@gmail.com",
    };

    // const formdata = new FormData();
    // formdata.append("pdf", file);
    // formdata.append("emailBody", JSON.stringify(formattedEmailBody));

    const userEmail = {
      email: "khhniloy0@gmail.com",
    };
    const res = await axios.post(
      "http://localhost:8000/api/v1/user/premium/check/rftoken",
      userEmail
    );

    console.log("res after api/v1/user/premium/check/rftoken", res);

    if (!res.data.isRefTokenExist) {
      const sessionEmailBody = {
        emailBody: formattedEmailBody,
      };
      sessionStorage.setItem(
        "premiumUserPlayLoad",
        JSON.stringify(sessionEmailBody)
      );
      window.location.href = "http://localhost:8000/api/v1/user/premium/google/auth";
    }

    // const decodedBuffer = Buffer.from(pdfBuffer, "base64").toString("base64");

    // await axios.get("http://localhost:8000/api/premium/auth/login");
    // Redirect user to your server login route

    // const res = await jobApply(formdata);

    // console.log(res);
  }

  return (
    <div className="flex gap-5 h-[26rem] ">
      <div className=" w-1/2 flex flex-col items-start gap-3 relative ">
        <div className="whitespace-pre-line h-[80%] text-sm border border-dashed border-neutral-300 rounded-lg overflow-y-auto">
          <Button
            size={"sm"}
            onClick={() => setEmailBody(null)}
            className="absolute top-4 right-4 text-[10px] flex cursor-pointer"
          >
            <RotateCcw style={{ width: "12px", height: "12px" }} /> Regenerate
          </Button>

          <div
            ref={emailRef}
            contentEditable
            suppressContentEditableWarning={true}
            className="outline-0 p-4"
          >
            <p>Email: {emailBody?.email}</p>
            <p className="mt-5">Subject: {emailBody?.subjectLine}</p>
            <p className="mt-5">{emailBody?.greeting}</p>
            <p className="mt-5">{emailBody?.introduction}</p>
            <p className="mt-5">{emailBody?.technicalSkills}</p>
            {emailBody?.projects?.length > 0 && (
              <p className="mt-5">
                My Key Project: <br />{" "}
                {emailBody?.projects?.map((e, index) => (
                  <p key={index}>
                    {e.projectName}: {e.liveSite}
                  </p>
                ))}
              </p>
            )}
            <p className="mt-5">
              {emailBody?.fitInterestAndWillingnessToLearn}
            </p>

            <div className="mt-5">
              {emailBody?.attachementsAndLinks?.map((item, idx) => (
                <div key={idx}>
                  {item.name}:{" "}
                  <span className="text-blue-600">
                    <Link href={item.links}>{item.links}</Link>
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5">{emailBody?.closingAndContact?.closing}</p>

            <div className="mt-3">
              <h1>{emailBody?.closingAndContact?.contacts?.name}</h1>
              <h1>{emailBody?.closingAndContact?.contacts?.phone}</h1>
              <h1>
                Linkedin:{" "}
                <Link
                  href={emailBody?.closingAndContact?.contacts?.linkedin || "#"}
                >
                  <span className="text-blue-600">
                    {emailBody?.closingAndContact?.contacts?.linkedin}
                  </span>
                </Link>
              </h1>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm">
            <h1 className="text-xs font-medium mb-2">
              *you can edit the email body
            </h1>

            <span className="text-sm font-bold">Suggested by AI: </span>
            {emailBody?.aiSuggetion}
          </p>
        </div>
      </div>

      <div className="flex flex-col w-1/2 border border-dashed border-neutral-300 rounded-lg">
        <div className="p-2 relative h-1/2 border-b border-dashed border-neutral-300 flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <h1 className="text-xl font-semibold">Premium User</h1>
            <p className="text-sm">
              We have crafted your email. No need to copy, paste, or send it
              manually — just click once and skip the hassle!
            </p>
            <Button
              onClick={handleApplyJob}
              // disabled
              className="text-xs cursor-pointer"
            >
              <Send /> Send My Application
            </Button>
          </div>
        </div>
        <div className="p-2 h-1/2 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm">
            Your email body is ready. Copy and send it manually via your email
            client.
          </p>
          <Button
            onClick={handleCopyEmailBody}
            className="text-xs cursor-pointer"
          >
            <Copy /> {isCopied ? "Copied" : "Copy Email Body"}
          </Button>
        </div>
      </div>
    </div>
  );
}
