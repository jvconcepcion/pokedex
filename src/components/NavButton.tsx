import React from "react";
import { NavButtonProps } from "@/types";

const NavButton: React.FC<NavButtonProps> = ({
  onPrev,
  onNext,
  disablePrev,
  disableNext,
  loading
}) => {
  return (
    <div className="flex justify-between mt-8 mb-2">
      <button
        onClick={onPrev}
        disabled={disablePrev || loading}
        className={`w-full mr-1 py-2 rounded bg-[#5e5e96] text-white font-medium shadow transition-opacity ${disablePrev || loading ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
          }`}
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={disableNext || loading}
        className={`w-full ml-1 py-2 rounded bg-[#5e5e96] text-white font-medium shadow transition-opacity ${disableNext || loading ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
          }`}
      >
        Next
      </button>
    </div>
  )
}

export default NavButton;
