"use client";

import { useState } from "react";

interface HideProps {
  children: React.ReactNode;
  prompt: string;
}

const Hide = ({ children, prompt }: HideProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setShow(!show);
        }}
        className="text-teal-700 flex items-center gap-1"
      >
        {show ? "▾" : "▸"}

        <span>{`${prompt}`}</span>
      </button>
      {show && (
        <div className="border-l-4 border-teal-700 pl-4">{children}</div>
      )}
    </>
  );
};

export default Hide;
