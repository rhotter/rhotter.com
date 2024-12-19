import Image from "next/image";

export const ImageGrid = ({
  images,
}: {
  images: { src: any; alt: string }[];
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
    {images.map(({ src, alt }) => (
      <div key={alt} className="space-y-1">
        <Image src={src} alt={alt} className="w-full h-48 object-cover" />
        <p className="text-xs text-gray-500 text-center">{alt}</p>
      </div>
    ))}
  </div>
);
