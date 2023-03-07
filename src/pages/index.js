import Github from "../components/Github";
import Nav from "../components/Nav";
import Style from "../components/Style";
import UserInput from "../components/UserInput";
import { useState } from "react";
import Typewriter from "react-typewriter-animate";

export default function Home() {
  const styles = ["Funny", "Stoic", "Humorous", "Informative", "Playful"];
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);
  const [text, setText] = useState("");
  const prompt = `Generate 2 ${selectedStyle} social media post captions with no hashtags and clearly labeled "1." and "2.".`;
  //     Make sure each generated caption is less than 10 words, has short sentences that are found in social media posts, and base them on this context: ${text}${
  //   text.slice(-1) === "." ? "" : "."
  // }`;

  async function generateCaption() {
    console.log(prompt);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <Nav />
      <main className="w-full p-4 flex flex-col gap-8 items-center">
        <Github />
        <h1 className="text-center font-bold text-3xl h-full">
          Generate your next{" "}
          <Typewriter
            cursor={{ char: " " }}
            timeBeforeDelete={2000}
            loop
            dataToRotate={[
              [{ type: "word", text: ` Instagram` }],
              [{ type: "word", text: ` Facebook` }],
              [{ type: "word", text: ` Twitter` }],
            ]}
          />
          caption with the help of ChatGPT
        </h1>
        <ul className="flex flex-col gap-8">
          <li className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 text-sm items-start sm:items-center">
              <span className="w-5 h-5 rounded-full font-bold text-xs bg-black flex-shrink-0 flex items-center justify-center text-white">
                1
              </span>
              <p>
                Describe <strong>relevant things in your post</strong> that
                you'd like in your caption!
              </p>
            </div>
            <UserInput text={text} setText={setText} />
          </li>
          <li className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 text-sm items-start sm:items-center">
              <span className="w-5 h-5 rounded-full font-bold text-xs bg-black flex-shrink-0 flex items-center justify-center text-white">
                2
              </span>
              <p>Choose your desired style of caption</p>
            </div>
            <Style
              styles={styles}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
            />
          </li>
        </ul>
        <button
          onClick={() => generateCaption()}
          className="bg-gradient-to-br from-red-500 to-purple-500 hover:hue-rotate-[-90deg] duration-200 transition ease-linear px-3 py-2 rounded-xl font-medium text-white w-full whitespace-nowrap max-w-sm"
        >
          Generate your caption &rarr;
        </button>
      </main>
    </div>
  );
}
