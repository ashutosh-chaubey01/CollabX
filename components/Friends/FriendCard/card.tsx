import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  name: string;
  title?: string;
  slug: string;
}

function Card({ image, name, title, slug }: Props) {
  return (
    <Link
      href={`/u/${slug}`}
      className="h-[240px] w-full rounded-md bg-white shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out p-4 flex flex-col justify-start items-center gap-4 border border-black/5">
      <Image
        src={image}
        alt={name}
        height={200}
        width={200}
        className="rounded-md object-cover h-[140px] w-full"
      />
      <div className="w-full flex flex-col items-start px-1">
        <p className="text-xl font-semibold text-black/70">{name}</p>
        {title && <p className="text-xs text-black/40">{title}</p>}
      </div>
    </Link>
  );
}

export default Card;
