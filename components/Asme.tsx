import React from "react";

const Asme: React.FC = () => {
  const stats = [
    { id: 1, value: "2+", label: "Years of Experience", color: "from-cyan-400 to-blue-500" },
    { id: 2, value: "2x", label: "Award Winner", color: "from-pink-400 to-purple-500" },
    { id: 3, value: "120+", label: "Projects Completed", color: "from-green-400 to-teal-500" },
    { id: 4, value: "10+", label: "Happy Clients", color: "from-yellow-400 to-orange-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between backdrop-blur-md border border-cyan-400/50 shadow-lg rounded-3xl px-6 py-6 md:px-10 md:py-8 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center flex-1 min-w-[140px]">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent drop-shadow-lg transition-transform transform hover:scale-105`}
            >
              {stat.value}
            </h2>
            <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-200">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Asme;
