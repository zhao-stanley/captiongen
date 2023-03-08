import { useState } from "react";

export default function Caption({ text }) {
  const [copied, setCopied] = useState(false);

  return (
    <p
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      }}
      className="cursor-pointer text-sm xl:text-base text-center font-medium bg-white w-full rounded-xl shadow-md p-4 hover:bg-gray-100 transition border xl:max-w-lg 2xl:max-w-xl"
    >
      {copied ? "Copied to clipboard" : text}
    </p>
  );
}
