"use client";

import { useCompletion } from "ai/react";
import { ChangeEvent, useState } from "react";
import Modal from "./_components/modal-tips";

export default function Home() {
  const { completion, handleSubmit, setInput, isLoading } = useCompletion();
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
        <h1 className="text-4xl md:text-7xl font-black uppercase mb-1 cursor-pointer" title="click for search tips" onClick={toggleModal}>
          Movie like this
        </h1>
        <p className="text-sm md:text-base">
          Find other movies or series recommendations based on the title input
          below.
        </p>
        
        <Modal isOpen={isModalOpen} onClose={toggleModal} />

        <form
          className={`${
            isLoading ? "active" : ""
          } input-wrapper h-[50px] w-full md:w-[500px] mt-8`}
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
