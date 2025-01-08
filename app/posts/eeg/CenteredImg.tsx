import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export default function CenteredImg({
  src,
  alt,
  className = "",
}: {
  src: string | StaticImport;
  alt: string;
  className?: string;
}) {
  return (
    <div className="flex justify-center">
      <Image src={src} alt={alt} className={`h-48 w-auto ${className}`} />
    </div>
  );
}
