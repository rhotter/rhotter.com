import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { SphericalHarmonicsVisualization } from "./SphericalHarmonicsVisualization";
import Link from "next/link";

export const metadata = {
  title: "Spherical Harmonics",
  date: "2024-12-19",
};

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-8">
        Spherical Harmonics <InlineMath math="Y_{\ell,m}" />
      </h2>
      <SphericalHarmonicsVisualization />
      <Link
        href="https://github.com/rhotter/rhotter2/blob/main/app/posts/harmonics/SphericalHarmonicsVisualization.tsx"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-sm text-gray-600 hover:text-gray-900 underline"
      >
        View source code
      </Link>
    </div>
  );
}
