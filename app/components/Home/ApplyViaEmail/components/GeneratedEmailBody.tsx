import { Button } from "@/components/ui/button";
import { Copy, RotateCcw, Send } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

export default function GeneratedEmailBody({ setEmailBody, emailBody }) {
  const emailRef = useRef(null);
  const [isCopied, setisCopied] = useState(false);

  async function handleCopyEmailBody() {
    setisCopied(true);
    const emailBodyText = emailRef?.current?.innerText;
    navigator.clipboard.writeText(emailBodyText).then((res) => {
      setTimeout(() => {
        setisCopied(false);
      }, 2000);
    });
  }

  return (
    <div className="flex gap-5 h-[26rem]">
      <div className="px-4 relative whitespace-pre-line text-sm w-1/2 border border-dashed border-neutral-300 rounded-lg overflow-y-auto">
        <Button
          size={"sm"}
          onClick={() => setEmailBody(null)}
          className="sticky top-5 text-[10px] left-[90%] cursor-pointer"
        >
          <RotateCcw style={{ width: "12px", height: "12px" }} /> Regenerate
        </Button>

        <p className="text-xs font-bold mb-5">*you can edit email body</p>

        <div
          ref={emailRef}
          contentEditable
          suppressContentEditableWarning={true}
          className="outline-0 pb-6"
        >
          <p>Subject: {emailBody?.subjectLine}</p>
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
          <p className="mt-5">{emailBody?.fitInterestAndWillingnessToLearn}</p>

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
              <Link href={emailBody?.closingAndContact?.contacts?.linkedin}>
                <span className="text-blue-600">
                  {emailBody?.closingAndContact?.contacts?.linkedin}
                </span>
              </Link>
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-1/2 border border-dashed border-neutral-300 rounded-lg">
        <div className="p-2 relative h-1/2 border-b border-dashed border-neutral-300 flex flex-col items-center justify-center gap-2 text-center">
          <h1 className="absolute top-3 text-xl font-semibold">Coming Soon!</h1>
          <div className="opacity-25 flex flex-col items-center justify-center gap-2 text-center">
            <h1 className="text-xl font-semibold mt-6">Premium User</h1>
            <p className="text-sm">
              We have crafted your email. No need to copy, paste, or send it
              manually — just click once and skip the hassle!
            </p>
            <Button disabled className="text-xs cursor-pointer">
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
