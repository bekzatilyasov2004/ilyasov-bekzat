"use client";

import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { CometCard } from "./ui/comet-card";

export function GlowingEffectDemo() {
  const items = [
    {
      id: 1,
      img: "/Astrum.png",
      title: "Do things the right way",
      description: "We follow the best practices to deliver top-notch solutions.",
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1657632843433-e6a8b7451ac6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8fDA%3D",
      title: "The best AI code editor ever",
      description: "Our tools make coding faster, easier, and more enjoyable.",
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1657632843433-e6a8b7451ac6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8fDA%3D",
      title: "Buy Aceternity UI Pro",
      description: "Experience premium UI components for your projects.",
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1657632843433-e6a8b7451ac6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8fDA%3D",
      title: "This card is built by Cursor",
      description: "Interactive and beautiful components to impress users.",
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1657632843433-e6a8b7451ac6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8fDA%3D",
      title: "Coming soon on Aceternity UI",
      description: "Stay tuned for new exciting features and updates!",
      area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
    },
  ];

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-auto xl:grid-rows-auto">
      {items.map((item) => (
        <GridItem
          key={item.id}
          area={item.area}
          img={item.img}
          title={item.title}
          description={item.description}
        />
      ))}
    </ul>
  );
}

interface GridItemProps {
  area: string;
  img: string;
  title: string;
  description: string;
}

const GridItem: React.FC<GridItemProps> = ({ area, img, title, description }) => {
  return (
    <li className={`list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
       
        <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} />
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl p-4 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          {/* Image */}
          <div className="w-full overflow-hidden rounded-lg">
            <img
              src={img}
              alt={title}
              className="w-full h-40 object-cover rounded-lgz md:h-48"
            />
          </div>
          {/* Text */}
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-semibold text-white break-words">
              {title}
            </h3>
            <p className="text-sm md:text-base text-gray-300 break-words">
              {description}
            </p>
          </div>
        </div>
        
      </div>
    </li>
  );
};
