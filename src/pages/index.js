import Github from "../components/Github";
import Nav from "../components/Nav";
import Style from "../components/Style";
import UserInput from "../components/UserInput";
import { useRef, useState } from "react";
import Typewriter from "react-typewriter-animate";
import randomBlurb from "../utils/randomBlurb";
import Caption from "../components/Caption";
import Link from "next/link";

export default function Home() {
  const styles = [
    "Funny",
    "Creative",
    "Short",
    "Informative",
    "Quirky",
    "Robotic",
  ];
  const [loading, setLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);
  const [text, setText] = useState("");
  const [generatedCaptions, setGeneratedCaptions] = useState("");
  const [blurb, setBlurb] = useState("");
  const captionsRef = useRef(null);

  const prompt = `Generate 2 ${selectedStyle} social media post captions. Do not generate a caption that contains hashtags or quotation marks. Clearly label them "1." and "2.". ${
    selectedStyle === "Creative" &&
    "Be creative and clever, utilize puns and rhyme."
  }
  ${
    selectedStyle === "Robotic" &&
    "Be robotic and impersonal. The caption should sound like it was written by an AI model and not a human."
  }
  ${
    selectedStyle === "Informative" &&
    "Be informative and educational. Insert facts and statistics."
  }
      ${
        selectedStyle === "Short"
          ? "Do not generate a caption that exceed 10 words"
          : "Do not generate a caption that exceed 20 words"
      }, has short sentences that are found in social media posts, and base them on this description: ${text}${
    text.slice(-1) === "." ? "" : "."
  }`;

  async function generateCaption(e) {
    e.preventDefault();
    //Reset previously generated captions
    setGeneratedCaptions("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    let newBlurb = randomBlurb();
    setBlurb(newBlurb);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedCaptions((prev) => prev + chunkValue);
    }
    if (captionsRef.current !== null) {
      captionsRef.current.scrollIntoView({ behavior: "smooth" });
    }

    setLoading(false);
  }

  return (
    <>
      <Nav />
      <div className="w-full h-full flex flex-col items-center">
        <main className="w-full h-full p-4 sm:p-6 lg:py-12 xl:py-24 flex flex-col gap-8 lg:gap-12 items-center">
          <Github />
          <h1 className="text-center font-bold text-3xl xl:text-4xl h-full">
            Generate your next{" "}
            <Typewriter
              cursor={{ char: " " }}
              timeBeforeDelete={2000}
              loop
              dataToRotate={[
                [{ type: "word", text: ` Instagram` }],
                [{ type: "word", text: ` Facebook` }],
                [{ type: "word", text: ` Youtube` }],
                [{ type: "word", text: ` Twitter` }],
              ]}
            />
            caption with the help of ChatGPT
          </h1>
          <ul className="flex flex-col gap-8">
            <li className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 text-sm xl:text-base items-start sm:items-center">
                <span className="w-5 h-5 xl:w-6 xl:h-6 rounded-full font-bold text-xs xl:text-sm bg-black flex-shrink-0 flex items-center justify-center text-white">
                  1
                </span>
                <p>
                  Describe <strong>relevant things in your post</strong> that
                  you&apos;d like in your caption.
                </p>
              </div>
              <UserInput text={text} setText={setText} />
            </li>
            <li className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 text-sm xl:text-base items-start sm:items-center">
                <span className="w-5 h-5 xl:w-6 xl:h-6 rounded-full font-bold text-xs xl:text-sm bg-black flex-shrink-0 flex items-center justify-center text-white">
                  2
                </span>
                <p>
                  Choose your <strong>desired caption style</strong>.
                </p>
              </div>
              <Style
                styles={styles}
                selectedStyle={selectedStyle}
                setSelectedStyle={setSelectedStyle}
              />
            </li>
          </ul>
          <button
            onClick={(e) => generateCaption(e)}
            disabled={loading}
            className={`${
              loading && "animate-pulse"
            } disabled:brightness-90 disabled:cursor-not-allowed text-base xl:text-lg bg-gradient-to-br from-red-500 to-purple-500 hover:hue-rotate-[-90deg] duration-200 transition ease-linear px-3 py-2 rounded-xl font-bold text-white w-full whitespace-nowrap max-w-sm`}
          >
            Generate your caption &rarr;
          </button>
          {generatedCaptions.length > 0 && (
            <section
              ref={captionsRef}
              className="flex flex-col gap-4 w-full items-center"
            >
              <h3 className="text-center font-bold text-xl xl:text-2xl">
                {blurb}
              </h3>
              {generatedCaptions
                .substring(3)
                .split("2. ")
                .map((caption, key) => {
                  return <Caption text={caption} key={key} />;
                })}
            </section>
          )}
        </main>
        <footer className="w-full flex sm:flex-row flex-col-reverse gap-4 items-center max-w-7xl p-4 sm:px-12 h-fit">
          <div className="flex flex-col w-full">
            <span className="text-sm xl:text-base">
              Powered by <strong>ChatGPT and Vercel Edge Functions</strong>.
            </span>
            <span className="text-sm xl:text-base">
              Based on
              <Link
                className="text-blue-600 font-bold"
                target={"_blank"}
                href="https://github.com/Nutlope/twitterbio"
              >
                {" "}
                twitterBio by @nutlope
              </Link>
            </span>
          </div>
          <div className="flex flex-row w-fit gap-6">
            <Link href="https://github.com/zhao-stanley" target={"_blank"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 sm:w-6 h-auto fill-neutral-900 hover:fill-neutral-600 transition ease-linear"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />{" "}
              </svg>
            </Link>
            <Link href="https://twitter.com/stanleyzha0" target={"_blank"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 sm:w-6 h-auto fill-neutral-900"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
