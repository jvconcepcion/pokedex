import React from "react";
import Image from "next/image";
import { PokeCardProps } from "@/types";

const PokeCard: React.FC<PokeCardProps> = ({
  name,
  imageUrl,
  description,
  loading
}) => {

  return (
    <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-8 mb-6 w-full max-w-xs mx-auto">
      {(loading || !imageUrl) ? (
        <div className="mb-4 w-[120px] h-[120px] rounded-full bg-[#b6e6e4]/40 animate-pulse" />
      ) : (
        <Image
          src={imageUrl}
          alt={name}
          width={120}
          height={120}
          className="mb-4 bg-[#b6e6e4]/20 rounded-full object-contain shadow-[0_4px_12px_0_rgba(0,0,0,0.2)]"
          priority
        />
      )}
      <h2 className="text-2xl font-bold mb-2 text-center capitalize">{(loading || !name) ? <span className="inline-block w-24 h-6 bg-gray-200 rounded animate-pulse" /> : name}</h2>
      <p className="text-base text-center text-black/80">
        {(loading || !description) ? <span className="inline-block w-32 h-4 bg-gray-100 rounded animate-pulse" /> : description}
      </p>
    </div>
  )
}

export default PokeCard
