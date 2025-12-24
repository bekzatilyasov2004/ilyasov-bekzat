"use client";
import React, { useEffect, useState } from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { db } from "@/config/firebase.conf";
import { collection, getDocs } from "firebase/firestore";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface SkillItem {
  id: string;
  title: string;
  description: string;
  badges?: string[];
  level?: number;
  url: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadingStates = [
    { text: "Loading frontend skills..." },
    { text: "Rendering UI/UX components..." },
    { text: "Fetching React & Next.js assets..." },
    { text: "Preparing smooth animations..." },
    { text: "Almost ready!" },
  ];

  const fetchSkills = async () => {
    try {
      const snapshot = await getDocs(collection(db, "skillsImages"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as SkillItem[];
      setSkills(data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const content = skills.map((skill) => ({
    createdAt: skill.id,
    title: skill.title,
    description: skill.description,
    badges: skill.badges,
    level: skill.level,
    content: (
      <img
        src={skill.url}
        alt={skill.title}
        className="w-full h-full object-cover shadow-lg mb-4 rounded-md"
      />
    ),
  }));

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center relative overflow-hidden px-4">
      {/* Background soft blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full animate-pulse"></div>
    <div className="w-full flex justify-start mt-5 px-4">
      <Link
        href="/"
        className="flex items-center gap-2 px-2 py-1   transition-colors duration-200 text-white rounded-full shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base font-medium">Back</span>
      </Link>
    </div>
      {/* Page title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white text-center mt-10">
        My Skills
      </h1>
      <p className="text-center mt-4 mb-10 text-gray-300 max-w-3xl">
        Where logic meets creativity — skills honed to build meaningful applications.
      </p>

      {/* Loader */}
      {loading && (
        <div className="w-full flex justify-center mb-10">
          <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={2000} />
        </div>
      )}

      {/* Skills content */}
      {!loading && content.length > 0 && (
        <div className="w-full max-w-6xl mb-20">
          <StickyScroll content={content} contentClassName="lg:block" />
        </div>
      )}

      {!loading && content.length === 0 && (
        <p className="text-white text-lg mt-10">No skills found.</p>
      )}

      {/* GitHub link section */}
      {!loading && skills.length > 0 && (
        <div className="mt-10 text-center">
          <p className="text-gray-300 mb-4">
            Want to see more of my skills and experience? Check out my GitHub page:
          </p>
          <a
            href="https://github.com/YourGitHubUsername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
          >
            Visit My GitHub
          </a>
        </div>
      )}
    </div>
  );
}
