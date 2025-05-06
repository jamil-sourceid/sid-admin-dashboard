/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

export interface objectAfterUpdate {
  [key: string]: string | number | boolean | null | undefined;
}

export interface objectBeforeUpdate {
  [key: string]: string | number | boolean | null | undefined;
}

interface JsonDataCardProps {
  objectAfterUpdate?: objectAfterUpdate | string;
  objectBeforeUpdate?: objectBeforeUpdate | string;
}

const JsonDataCard: React.FC<JsonDataCardProps> = ({
  objectAfterUpdate,
  objectBeforeUpdate,
}) => {
  const [copied, setCopied] = useState(false);

  let parsedAfter = objectAfterUpdate;
  let parsedBefore = objectBeforeUpdate;

  if (typeof objectAfterUpdate === "string") {
    try {
      parsedAfter = JSON.parse(objectAfterUpdate);
    } catch (error) {
      console.error("Failed to parse objectAfterUpdate", error);
    }
  }

  if (typeof objectBeforeUpdate === "string") {
    try {
      parsedBefore = JSON.parse(objectBeforeUpdate);
    } catch (error) {
      console.error("Failed to parse objectBeforeUpdate", error);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(
      JSON.stringify(
        { objectBeforeUpdate: parsedBefore, objectAfterUpdate: parsedAfter },
        null,
        2
      )
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#1F2937] text-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-semibold">Before Update</h4>
        </div>
        <pre className="overflow-auto text-sm whitespace-pre-wrap break-words max-h-[25vh]">
          {JSON.stringify(parsedBefore, null, 2)}
        </pre>
      </div>

      <div className="bg-[#100C3A] text-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-semibold">After Update</h4>
          <button
            className="text-white text-xs flex gap-2"
            onClick={handleCopy}
          >
            <img src="/assets/icons/copy.svg" alt="copy" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="overflow-auto text-sm whitespace-pre-wrap break-words max-h-[25vh]">
          {JSON.stringify(parsedAfter, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default JsonDataCard;
