"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AI() {
  const genAI = new GoogleGenerativeAI(
    "YOUR API KEY"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [req, setReq] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePrompt = async () => {
    setLoading(true);
    if (!req) {
      await setContent("No prompt yet !");
    }
    try {
      const result = await model.generateContent(req);
      const res = await result.response;
      setContent(res.text());
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col w-screen h-screen bg-slate-300 items-center justify-center gap-4">
      <div className="relative h-[400px] bg-black text-white w-[80%] p-4 pt-0 overflow-scroll overflow-x-hidden">
        <h1 className="font-medium text-[50px] border-b-[1px] mb-2 sticky top-0 bg-black mt-4">
          Google Gen AI Chat
        </h1>
        {loading ? (
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <p>
              <Skeleton />
            </p>
          </SkeletonTheme>
        ) : (
          content
        )}
      </div>
      <input
        type="text"
        placeholder="Let's Chat"
        onChange={(e) => setReq(e.target.value)}
        value={req}
        className="w-[80%] outline-none border-none p-2"
      />
      <button
        className="w-[80%] bg-black text-white p-3"
        onClick={handlePrompt}
      >
        Send
      </button>
    </div>
  );
}
