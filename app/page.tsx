"use client";

import { useCompletion } from "ai/react";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const { completion, handleSubmit, setInput, isLoading } = useCompletion();
  const [inputValue, setInputValue] = useState("");

  const refineInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const prompt = process.env.NEXT_PUBLIC_PROMPT;
    const key = process.env.NEXT_PUBLIC_PROMPT_KEY;
    if (prompt && key) {
      setInput(prompt.replace(key, value));
      setInputValue(value);
    } else {
      alert("PROMPT / KEY not found!");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center py-20 px-4 min-h-screen max-w-screen-lg m-auto">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase mb-1">
          Movie like this
        </h1>
        <p>
          Find other movies or series recommendations based on the title input
          below.
        </p>
        <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-800 py-4 px-6 my-8">
          <p className="opacity-75">
            For better results please include movie / series region & release
            date. <br className="hidden md:block" />
            If the title is too common, you can add some details as well.{" "}
            <br className="hidden md:block" />
            Example: You series netflix / Encounter, Korea, 2018.
          </p>
        </div>

        <form
          className={`${
            isLoading ? "active" : ""
          } input-wrapper h-[40px] w-full md:w-[500px]`}
          onSubmit={handleSubmit}
        >
          <input
            name="prompt"
            className="input-content text-center"
            placeholder="Just press enter to begin search"
            onChange={refineInputChange}
            value={inputValue}
            onSubmit={handleSubmit}
            disabled={isLoading}
          />
        </form>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center px-6">
        <div
          dangerouslySetInnerHTML={{ __html: completion }}
          className="recommendations"
        />
      </div>
    </main>
  );
}
