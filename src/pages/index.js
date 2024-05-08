import Github from "../components/Github";
import Nav from "../components/Nav";
import Style from "../components/Style";
import UserInput from "../components/UserInput";
import { useRef, useState } from "react";
import Typewriter from "react-typewriter-animate";
import randomBlurb from "../utils/randomBlurb";
import Caption from "../components/Caption";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createParser } from "eventsource-parser";

const KeyPanel = dynamic(() => import("../components/KeyPanel"), {
  ssr: false,
});

export default function Home() {
  const styles = ["Funny", "Creative", "Informative", "Quirky", "Robotic"];
  const [loading, setLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);
  const [text, setText] = useState("");
  const [generatedCaptions, setGeneratedCaptions] = useState("");
  const [blurb, setBlurb] = useState("");
  const captionsRef = useRef(null);
  const [openKeyPanel, setOpenKeyPanel] = useState(false);

  const prompt = `The selected style is ${selectedStyle}. ${
    selectedStyle === "Funny" &&
    "Be funny and humorous, utilize jokes and other aspects of common humor."
  } ${
    selectedStyle === "Creative" &&
    "Make sure it's creative and clever, utilize puns and rhyme."
  }
  ${
    selectedStyle === "Robotic" &&
    "Make sure it's robotic and impersonal, refrain from using any emotion."
  }
  ${
    selectedStyle === "Quirky" &&
    "Make sure it's quirky and unique, utilize memes and other aspects of niche internet culture."
  }
  ${
    selectedStyle === "Informative" &&
    `Make sure it's informative and educational, insert facts and statistics.`
  }\nCaption Context: "${text}".`;

  async function generateCaption(e) {
    e.preventDefault();
    if (text.length === 0) return;
    //Reset previously generated captions
    setGeneratedCaptions("");
    setLoading(true);

    const apiKey = localStorage.getItem("openai_api_key");
    if (!apiKey) {
      setOpenKeyPanel(true);
      setLoading(false);
      return;
    }

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, key: apiKey }),
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

    const onParseGPT = (event) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? "";
          setGeneratedCaptions((prev) => prev + text);
        } catch (e) {
          console.error(e);
        }
      }
    };

    const reader = data.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(onParseGPT);
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      parser.feed(chunkValue);
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
            Generate the perfect{" "}
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
          <div
            className="rounded-2xl p-[0.1875rem] rainbow-wave cursor-pointer"
            onClick={() => setOpenKeyPanel(true)}
          >
            <div className="bg-white text-black rounded-[14px] px-3 py-2 text-sm font-medium flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Enter OpenAI API key
            </div>
          </div>
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
            disabled={loading || text.length === 0}
            className={`${
              loading && "animate-pulse"
            } disabled:brightness-90 disabled:cursor-not-allowed text-base xl:text-lg bg-gradient-to-br from-red-500 to-purple-500 hover:hue-rotate-[-90deg] duration-200 transition ease-linear px-3 py-2 rounded-xl font-bold text-white w-full whitespace-nowrap max-w-sm`}
          >
            {loading ? "Generating..." : "Generate your caption →"}
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
        <KeyPanel
          openKeypanel={openKeyPanel}
          setOpenKeypanel={setOpenKeyPanel}
        />
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
            <Link href="https://szhao.dev/" target={"_blank"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 sm:w-6 h-auto stroke-neutral-900 hover:stroke-neutral-600 transition ease-linear"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
