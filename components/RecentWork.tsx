import React from "react";
import { ContainerTextFlip } from "./ui/container-text-flip";
import { GlowingEffectDemo } from "./GlowingCard";

const RecentWork: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center gap-4 mt-20 mb-16 px-4 sm:px-6 lg:px-8">
      
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
        Recent Work
      </h2>

      {/* Subtitle with Text Flip */}
      <h1 className="text-2xl md:text-5xl font-semibold text-gray-300 mt-2">
        Take a look at my recent{" "}
        <span className=" ">
          <ContainerTextFlip 
            words={["Design Ventures", "Frontend Projects", "Creative Solutions", "UI Experiments", "And Games", "Web Apps"]} 
          />
        </span>{" "}
      </h1>

      {/* Optional Divider */}
      <div className="w-50  h-1 bg-cyan-400 rounded-full mb-5 mt-5"></div>

    <GlowingEffectDemo />
    </div>
  );
};

export default RecentWork;
