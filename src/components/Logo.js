import { useState } from "react";

export default function Logo() {
  const themes = ["ig", "twt", "fb", "tik"];
  const [theme, setTheme] = useState("ig");
  return (
    <h1
      className="text-2xl font-bold cursor-pointer select-none"
      onClick={() =>
        setTheme(themes[Math.floor(Math.random() * themes.length)])
      }
    >
      {theme === "ig" ? (
        <>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
            caption
          </span>
          <span>gen</span>
        </>
      ) : theme === "fb" ? (
        <>
          <span className="text-[#3b5998]">caption</span>
          <span>gen</span>
        </>
      ) : theme === "twt" ? (
        <>
          <span className="text-[#00acee]">caption</span>
          <span>gen</span>
        </>
      ) : (
        <>
          <span className="text-[#ff0050]">caption</span>
          <span className="text-[#00f2ea]">gen</span>
        </>
      )}
    </h1>
  );
}
