import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { SphericalHarmonicsVisualization } from "./SphericalHarmonicsVisualization";
import { Bottom } from "./Bottom";

export const metadata = {
  title: "Spherical Harmonics",
  date: "2024-12-19",
};

export default function Page() {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-8">
          Spherical Harmonics <InlineMath math="Y_{\ell,m}" />
        </h2>
        <SphericalHarmonicsVisualization />
        <Bottom />
      </div>
    </>
  );
}
