"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { LinkPreview } from "./ui/link-preview";
import { Link } from "lucide-react";

const Education = () => {
  const data = [
    {
      title: "2025 — Present",
      content: (
        <div>
          <p className="mb-6 text-xs md:text-sm text-neutral-200">
            Today marks the most advanced stage of my educational and
            professional journey. In 2025, I stepped into a new era of personal
            development — focusing on mastering full-stack concepts, polishing
            UI/UX craftsmanship, and building production-grade systems that are
            stable, scalable, and future-proof. This year represents a powerful
            shift in mindset: from simply building projects to building
            *high-quality*, *thoughtfully engineered*, and *user-centered*
            digital experiences.
          </p>

          <p className="text-xs text-neutral-200 md:text-sm mb-3 font-medium">
            ✨ Key Highlights of 2025:
          </p>

          <ul className="list-disc ml-4 mb-6 text-xs md:text-sm leading-relaxed text-neutral-300">
            <li>
              Deepened expertise in <strong>Next.js 14/15 App Router</strong>,
              Server Components, Streaming, and Server Actions.
            </li>
            <li>
              Built multiple real-world applications focusing efficiency and
              modern DX.
            </li>
            <li>
              Improved Firebase Firestore structuring, authentication flows,
              secure writes, indexing, caching, and optimized listening.
            </li>
            <li>
              Reached senior-level mastery in <strong>Zustand</strong> with
              slices, middleware, persistence, and scalable state architecture.
            </li>
            <li>
              Adopted clean engineering principles such as SOLID, composable
              architecture, atomic design, and high cohesion.
            </li>
            <li>
              Stepped into advanced UI animations with Framer Motion + Tailwind,
              creating smooth, premium user experiences.
            </li>
          </ul>

          <p className="text-xs md:text-sm text-neutral-200 font-medium mb-3">📚 Certificates:</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <LinkPreview url="https://upskill.us.qwasar.io/certificates/MTIwMy1pbHlhc292X2ItbWFyLTIwMjEtMTEtOWY0Yw==">
            <img src="/certificate/cLanguage.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
            <LinkPreview url="https://upskill.us.qwasar.io/certificates/MTM0Ni1pbHlhc292X2ItanVsLTIwMjEtMzAtYTExOQ==">
            <img src="/certificate/fullStack.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
            <LinkPreview url="https://motion.dev/">
            <img src="/certificate/motion.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
            <LinkPreview url="https://firebase.google.com/">
            <img src="/certificate/firebase.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
          </div>

          <p className="text-xs md:text-sm leading-relaxed text-neutral-300">
            🚀 Current focus: mastering distributed systems, caching strategies,
            full-stack security, real-time design, and building SaaS-level
            products with polished and professional user experiences.
          </p>
        </div>
      ),
    },

    {
      title: "2024",
      content: (
        <div>
          <p className="mb-6 text-xs md:text-sm text-neutral-200">
            2024 was a transformational year filled with discipline, rapid skill
            growth, and countless hours of hands-on coding. This year, I moved
            from being a “frontend developer who can build interfaces” to a
            “developer who understands systems, state management, performance,
            and proper engineering.”
          </p>

          <p className="text-xs text-neutral-200 md:text-sm mb-3 font-medium">
            ⭐ Core Achievements of 2024:
          </p>

          <ul className="list-disc text-neutral-200 ml-4 mb-6 text-xs md:text-sm leading-relaxed">
            <li>
              Mastered React fundamentals: hooks, custom hooks, lifecycle,
              context, memoization, optimization.
            </li>
            <li>
              Built more than <strong>15+ real projects</strong> – including
              dashboards, todo systems, portfolio websites, API-integrated
              apps, authentication-based platforms, and UI libraries.
            </li>
            <li>
              Learned TypeScript deeply — generics, interfaces, narrowing,
              utility types, union handling, and API data typing.
            </li>
            <li>
              Created a personal UI system using TailwindCSS + Framer Motion.
            </li>
            <li>
              Worked with Three.js models, responsive design, accessibility,
              modular architecture, and component abstraction.
            </li>
            <li>
              Improved problem-solving through building custom hooks, reusable
              components, and scalable architecture.
            </li>
          </ul>

          <p className="text-xs text-neutral-200 md:text-sm mb-3 font-medium">
            📚 Courses Completed:
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
           <LinkPreview url="https://www.sammi.ac/">
            <img src="/edu/sammi.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
            <LinkPreview url="https://www.codecademy.com/">
            <img src="/edu/code.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
            <LinkPreview url="https://www.coursera.org/">
            <img src="/edu/cursera.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
            <LinkPreview url="https://www.edx.org/cs50">
            <img src="/edu/harverd.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
          </div>

          <p className="text-xs text-neutral-200 md:text-sm leading-relaxed">
            Challenges faced: understanding async flows, performance tuning,
            large-scale component trees.  
            How I overcame them: rewriting code, reading documentation,
            practicing daily, and intentionally building harder projects.
          </p>
        </div>
      ),
    },

    {
      title: "2022 — 2023",
      content: (
        <div>
          <p className="mb-6 text-xs md:text-sm leading-relaxed text-neutral-200">
            These years represent the shift from “beginner curiosity” to
            “consistent commitment.” I built my first real apps, learned core
            programming concepts, and started understanding how the web truly
            works. The foundation of everything I know today was born during
            this period.
          </p>

          <p className="text-xs text-neutral-200 md:text-sm mb-3 font-medium">🔥 What I Built:</p>

          <ul className="list-disc ml-4 text-neutral-200 mb-6 text-xs md:text-sm leading-relaxed">
            <li>My first fully responsive landing pages</li>
            <li>Portfolio websites using only HTML + CSS + JS</li>
            <li>Weather app with public APIs</li>
            <li>Basic games like Snake, Calculator, Tic Tac Toe</li>
            <li>Mini UI components: dropdowns, modals, sliders</li>
          </ul>

          <p className="text-xs text-neutral-200 md:text-sm mb-3 font-medium">
            📚 Books & Tutorials:
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <LinkPreview url="https://bekzatilyasov.netlify.app/">
            <img src="/pro/astrum.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
            <LinkPreview url="https://in-game-bekadev.vercel.app/">
            <img src="/pro/ingame.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
            <LinkPreview url="https://bekadev-fullstask-todo.vercel.app/">
            <img src="/pro/task.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
            <LinkPreview url="https://tic-tac-toe-ai-tau-pearl.vercel.app/">
            <img src="/pro/tictactoe.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
          </div>

          <p className="text-xs text-neutral-200 md:text-sm leading-relaxed">
            This era was filled with doubts, slow progress, and many mistakes —
            but it built patience, discipline, and long-term thinking. It taught
            me that great developers are not born; they are shaped through
            consistent, daily practice.
          </p>
        </div>
      ),
    },

    {
      title: "2020 — The Beginning",
      content: (
        <div>
          <p className="mb-6 text-neutral-200 text-xs md:text-sm leading-relaxed">
            Everything started here — the moment I wrote my first line of code.
            I didn’t understand much at the time, but I felt excitement. I was
            drawn by the idea of building something from nothing. Even small
            things like changing a background color felt magical. This was the
            spark that ignited my passion for technology.
          </p>

          <p className="text-xs text-neutral-200 md:text-sm mb-3 font-medium">🌱 What I Learned:</p>

          <ul className="list-disc text-neutral-200 ml-4 mb-6 text-xs md:text-sm leading-relaxed">
            <li>HTML structure & correct semantics</li>
            <li>Basic CSS styling, animations, gradients</li>
            <li>Simple JavaScript interactions</li>
            <li>Copying website designs to understand layout</li>
            <li>Fundamental problem-solving and logical thinking</li>
          </ul>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <LinkPreview url="https://www.w3schools.com/">
            <img src="/certificate/html.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
            <LinkPreview url="https://www.qwasar.io/">
            <img src="/certificate/qwasar.png" className="h-20 w-full rounded-lg object-cover shadow" />
            </LinkPreview>
          </div>

          <p className="text-xs text-neutral-200 md:text-sm">
            I didn’t know it then — but this tiny beginning would shape my
            entire future.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full py-10">
      <h1 className="text-3xl text-neutral-200 text-center font-bold  mb-10">
        My Education Journey
      </h1>
      <Timeline data={data} />
    </div>
  );
};

export default Education;
