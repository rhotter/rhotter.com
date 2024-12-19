"use client";

import { useState } from "react";

interface HideProps {
  children: React.ReactNode;
  prompt: string;
}

export const Hide = ({ children, prompt }: HideProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <a
        onClick={(e) => {
          e.preventDefault();
          setShow(!show);
        }}
        style={{
          color: "rgb(133 77 14)",
          fontStyle: "italic",
        }}
        href="#"
      >{`[${prompt}]`}</a>
      {show && (
        <div className="border-l-4 border-gray-400 pl-4">{children}</div>
      )}
    </>
  );
};
