"use client";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { Configuration, OpenAIApi } from "openai";

export default function Chatbot() {
  const [answer, setAnswer] = useState<string | undefined>("");
  const [inputText, setInputText] = useState("");
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const chatHandler = async () => {
    const openai = new OpenAIApi(configuration);
    const response = await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: inputText,
        temperature: 0,
        max_tokens: 50,
      })
      .then((response) => {
        const choices = response.data.choices;
        setAnswer(choices[0].text);
      });
  };

  const router = useRouter();

  return (
    <div className="flex flex-col ">
      <textarea
        className="border border-fuchsia-400"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <button
        className="border border-black p-4 rounded-md shadow-md m-4"
        onClick={chatHandler}
      >
        Chat
      </button>
      <p>{answer}</p>
    </div>
  );
}
