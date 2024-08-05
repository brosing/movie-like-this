"use client";

import { useChat } from "ai/react";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const { messages, handleSubmit, setInput } = useChat();
  const [inputValue, setInputValue] = useState("");

  const refineInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const prompt = `Find me 5 movies and 5 series recommendation, based on this title: ${value}`;
    setInput(prompt);
    setInputValue(value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-black uppercase mb-1">Movie like this</h1>
        <p>
          Find another movies or series recommendations, based on title input
          below.
        </p>
        <div className="rounded-2xl bg-neutral-100 py-4 px-6 my-8">
          <p className="opacity-75">
            For better result please include movie / series region & release
            date. <br />
            If the title is too common, you can add the some details as well.{" "}
            <br />
            Example: You series netflix / Encounter, Korea, 2018.
          </p>
        </div>

        {/* TODO: apply .active on search */}
        <form
          className="input-wrapper h-[40px] w-[500px]"
          onSubmit={handleSubmit}
        >
          <input
            className="input-content text-center"
            placeholder="Just press enter to begin search"
            onChange={refineInputChange}
            value={inputValue}
            onSubmit={handleSubmit}
          />
        </form>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center bg-neutral-100 py-4 px-6 mt-12">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
      </div>
    </main>
  );
}
