"use client";

import { useState } from "react";
import Link from "next/link";
import Content from "./content.mdx";

export function Bottom() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="flex gap-4 text-sm text-gray-600">
        <Link
          href="https://github.com/rhotter/rhotter2/blob/main/app/posts/harmonics/SphericalHarmonicsVisualization.tsx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 underline"
        >
          View source code
        </Link>{" "}
        |
        <a
          onClick={() => setShowContent(!showContent)}
          className="text-gray-600 hover:text-gray-900 underline cursor-pointer"
        >
          What are spherical harmonics?
        </a>
      </div>
      {showContent && (
        <div className="mt-8 px-4 border border-gray-200 rounded-lg shadow-lg">
          <Content />
        </div>
      )}
    </div>
  );
}
