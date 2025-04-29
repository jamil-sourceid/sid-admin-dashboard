/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

export interface VerificationRequestPayload {
  [key: string]: string | number | boolean | null | undefined;
}

export interface VerificationResponse {
  [key: string]: string | number | boolean | null | undefined;
}

interface JsonDataCardProps {
  verificationRequestPayload?: VerificationRequestPayload | string;
  verificationResponse?: VerificationResponse | string;
  variant?: "request" | "response";
}

const JsonDataCard: React.FC<JsonDataCardProps> = ({
  verificationRequestPayload,
  verificationResponse,
  variant = "request",
}) => {
  const [copied, setCopied] = useState(false);

  let parsedRequest = verificationRequestPayload;
  let parsedResponse = verificationResponse;

  if (typeof verificationRequestPayload === "string") {
    try {
      parsedRequest = JSON.parse(verificationRequestPayload);
    } catch (error) {
      throw error;
    }
  }

  if (typeof verificationResponse === "string") {
    try {
      parsedResponse = JSON.parse(verificationResponse);
    } catch (error) {
      throw error;
    }
  }

  const jsonData = {
    verificationRequestPayload: parsedRequest,
    verificationResponse: parsedResponse,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const bgColor = variant === "request" ? "bg-[#100C3A]" : "bg-[#1F2937]";

  return (
    <div
      className={`${bgColor} text-white p-4 rounded-lg shadow-md min-h-[35vh] max-h-[50vh] flex flex-col`}
    >
      <div className="flex justify-between items-center mb-2">
        <button
          className="text-white text-sm flex gap-2 ml-auto"
          onClick={handleCopy}
        >
          <img src="/assets/icons/copy.svg" alt="copy" />{" "}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-2 overflow-auto text-sm whitespace-pre-wrap break-words flex-1">
        {JSON.stringify(jsonData, null, 2)}
      </pre>
    </div>
  );
};

export default JsonDataCard;
