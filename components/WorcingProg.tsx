import React from "react";
import { CardSpotlight } from "./ui/card-spotlight";
import { Lightbulb, Search, PenTool, CheckCircle } from "lucide-react";

const WorcingProg: React.FC = () => {
  const cards = [
    { 
      id: 1,
      icon: <Lightbulb className="h-10 w-10 text-cyan-400" />,
      title: "Brainstorming",
      description: "Sparking fresh ideas that set the foundation for groundbreaking solutions.",
    },
    {
      id: 2,
      icon: <Search className="h-10 w-10 text-green-400" />,
      title: "Research",
      description: "Uncovering insights and trends that shape meaningful user experiences.",
    },
    {
      id: 3,
      icon: <PenTool className="h-10 w-10 text-pink-400" />,
      title: "Design",
      description: "Transforming ideas into intuitive and engaging UI/UX designs.",
    },
    {
      id: 4,
      icon: <CheckCircle className="h-10 w-10 text-yellow-400" />,
      title: "Testing",
      description: "Ensuring quality and perfection through meticulous testing and iterations.",
    },
  ];

  return (
    <div className="w-full mt-16 flex flex-col p-4 lg:p-8">
      {/* Header */}
      <h2 className="text-lg md:text-xl uppercase font-bold text-white mb-4">
        Working Progress
      </h2>
      <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-6 mb-10">
        <div className="lg:w-1/2 flex flex-col">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            To design with perfect <br /> strategy
          </h1>
        </div>
        <div className="lg:w-1/2 flex flex-col">
          <p className="text-sm sm:text-base md:text-lg text-white">
            In my working progress, I dive into a whirlwind of ideas, research, and design, crafting digital experiences that resonate.
          </p>
        </div>
      </div>

      {/* Cards horizontal scroll */}
      <div className="w-full flex overflow-x-auto no-scrollbar pb-4 mx-auto gap-5 scroll-smooth">
        {cards.map((card, index) => (
          <CardSpotlight
            key={card.id}
            className={`flex-shrink-0 h-90 w-72 ${
              index % 2 !== 0 ? "mt-12" : ""
            } flex flex-col justify-start items-center p-6`}
          >
            <div className="mb-4 p-10 border border-blue-200 rounded-2xl flex items-center justify-center">
              {card.icon}
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 text-center">
              {card.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 text-center mt-4">
              {card.description}
            </p>
          </CardSpotlight>
        ))}
      </div>
    </div>
  );
};

export default WorcingProg;
