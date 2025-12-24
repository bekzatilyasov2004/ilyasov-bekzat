"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { db } from "@/config/firebase.conf";
import { collection, getDocs } from "firebase/firestore";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  badges?: string[];
  github?: string;
  demo?: string;
}

const loadingStates = [
  { text: "Loading frontend skills..." },
  { text: "Rendering UI/UX components..." },
  { text: "Fetching React & Next.js assets..." },
  { text: "Preparing smooth animations..." },
  { text: "Almost ready!" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const snapshot = await getDocs(collection(db, "projectsImages"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Project[];
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ########################################################## //

  const cards = projects.map((project) => ({
    title: project.title,
    description: project.description,
    src: project.url,
    ctaText: project.github,
    ctaLink: project.demo,
    badges: project.badges,
  })
  )


  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));


  return (
    <div className="min-h-screen w-full bg-black text-white  relative overflow-hidden px-4">
      <div className="w-full flex justify-start mt-5 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 px-2 py-1   transition-colors duration-200 text-white rounded-full shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base font-medium">Back</span>
        </Link>
      </div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full animate-pulse"></div>

      {/* Loader */}
      <MultiStepLoader loadingStates={loadingStates} loading={loading} />

      {!loading && (
        <>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-semibold text-center mb-3"
          >
            My Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center text-zinc-400 max-w-2xl mx-auto mb-16"
          >
            A carefully curated selection of my finest works — soft, minimal, and deeply crafted.
          </motion.p>

          <AnimatePresence>
            {active && typeof active === "object" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 h-full w-full z-10"
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {active && typeof active === "object" ? (
              <div className="fixed inset-0  grid place-items-center z-[100]">
                <motion.button
                  key={`button-${active.title}-${id}`}
                  layout
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.05,
                    },
                  }}
                  className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>
                <motion.div
                  layoutId={`card-${active.title}-${id}`}
                  ref={ref}
                  className="w-full max-w-[500px] no-scrollbar h-full md:h-fit md:max-h-[90%]  flex flex-col bg-neutral-900 sm:rounded-3xl overflow-y-auto"
                >
                  <motion.div layoutId={`image-${active.title}-${id}`}>
                    <img
                      src={active.src}
                      alt={active.title}
                      className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                    />
                  </motion.div>

                  <div>
                    <div className="flex justify-between items-start p-4">
                      <div className="">
                        <motion.h3
                          layoutId={`title-${active.title}-${id}`}
                          className="font-bold text-neutral-200"
                        >
                          {active.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${active.description}-${id}`}
                          className="text-neutral-400"
                        >
                          {active.description}
                        </motion.p>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-2 mt-1">
                        {active.ctaLink && (
                          <motion.a
                            layoutId={`button-${active.title}-${id}`}
                            href={active.ctaLink}
                            target="_blank"
                            className="flex items-center justify-center gap-1 px-4 w-[80px] py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                          >
                            Demo
                          </motion.a>
                        )}

                        {active.ctaText && (
                          <motion.a
                            href={active.ctaText}
                            target="_blank"
                            className="flex items-center justify-center gap-1 px-4 w-[80px] py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                          >
                            Github
                          </motion.a>
                        )}
                      </div>


                    </div>
                    <div className="px-4 flex flex-wrap gap-2">
                      {active.badges && active.badges.map((badge, index) => (
                        <span key={index} className="text-xs bg-neutral-800 text-neutral-300 px-2 py-1 rounded-full mr-2">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 relative px-4">
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className=" text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-autotext-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                      >
                        {typeof active.content === "function"
                          ? active.content()
                          : active.content}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>
          <ul className="max-w-2xl mx-auto w-full gap-4">
            {cards.map((card, index) => (
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                key={`card-${card.title}-${id}`}
                onClick={() => setActive(card)}
                className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-800 rounded-xl cursor-pointer"
              >
                <div className="flex  gap-4 flex-col md:flex-row ">
                  <motion.div className="md:w-[100px] w-full p-2 md:block flex items-center justify-center" layoutId={`image-${card.title}-${id}`}>
                    <div className=" w-[50px] h-[50px]">
                      <img
                        width={100}
                        height={100}
                        src={card.src}
                        alt={card.title}
                        className="h-full w-full md:h-14 md:w-14 rounded-lg object-cover  object-top"
                      />
                    </div>
                  </motion.div>
                  <div className="">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-medium text-neutral-200 text-center md:text-left"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-neutral-400 line-clamp-1 text-center md:text-left"
                    >
                      {card.description}
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  layoutId={`button-${card.title}-${id}`}
                  className="px-4 py-2 w-[80px] text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                >
                  View
                </motion.button>
              </motion.div>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};