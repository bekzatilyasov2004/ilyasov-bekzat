"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<HTMLElement[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Toggle search input
  const toggleSearch = () => setOpen((prev) => !prev);

  // Highlight all matches across the page
  useEffect(() => {
    // Clear previous highlights
    document.querySelectorAll("mark.site-search").forEach((el) => {
      const parent = el.parentNode;
      if (!parent) return;
      parent.replaceChild(document.createTextNode(el.textContent || ""), el);
    });

    if (!query) return setMatches([]);

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    const foundNodes: HTMLElement[] = [];

    while ((node = walker.nextNode())) {
      if (
        node.parentElement?.closest("#site-search-wrapper") ||
        node.parentElement?.closest("script") ||
        node.parentElement?.closest("style")
      )
        continue; // skip input, scripts, and styles

      const text = node.textContent || "";
      if (text.toLowerCase().includes(query.toLowerCase())) {
        const span = document.createElement("span");
        span.innerHTML = text.replace(
          new RegExp(query, "gi"),
          `<mark class="site-search bg-yellow-400/50 text-black cursor-pointer rounded px-1">${query}</mark>`
        );
        node.parentNode?.replaceChild(span, node);
        foundNodes.push(span as HTMLElement);
      }
    }

    setMatches(foundNodes);
  }, [query]);

  // Add click event to scroll to highlighted marks
  useEffect(() => {
    matches.forEach((node) => {
      node.querySelectorAll("mark.site-search").forEach((mark) => {
        mark.addEventListener("click", () => {
          (mark as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
          // highlight the clicked mark
          (mark as HTMLElement).classList.add(
            "ring-2",
            "ring-indigo-500",
            "transition-all",
            "duration-500"
          );
          setTimeout(() => {
            (mark as HTMLElement).classList.remove("ring-2", "ring-indigo-500");
          }, 1500);
        });
      });
    });
  }, [matches]);

  const placeholders = [
    "Search skills, projects, or any text...",
    "Try typing 'frontend', 'UI/UX', or 'React'...",
    "Find any section on this page..."
  ];

  return (
    <>
      {/* Floating Search Button */}
      <button
        onClick={toggleSearch}
        className="fixed bottom-8 right-8 z-50 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
      >
        🔍
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Search Input Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl rounded-2xl shadow-2xl p-6 flex flex-col gap-3 bg-gray-900 text-white border border-gray-700"
            ref={searchRef}
          >
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={(e) => setQuery(e.target.value)}
              onSubmit={(e) => e.preventDefault()}
            />

            {/* Search Results */}
            {matches.length > 0 && (
              <div className="max-h-64 overflow-y-auto mt-2 bg-gray-800/50 rounded-lg p-2">
                {matches.map((node, i) => (
                  <div
                    key={i}
                    className="p-2 cursor-pointer hover:bg-indigo-700/50 rounded transition-all duration-300"
                    onClick={() => {
                      node.scrollIntoView({ behavior: "smooth", block: "center" });
                      node.querySelectorAll("mark.site-search").forEach((mark) => {
                        (mark as HTMLElement).classList.add(
                          "ring-2",
                          "ring-indigo-500",
                          "transition-all",
                          "duration-500"
                        );
                        setTimeout(() => {
                          (mark as HTMLElement).classList.remove(
                            "ring-2",
                            "ring-indigo-500"
                          );
                        }, 1500);
                      });
                    }}
                  >
                    <span className="text-sm text-gray-200">
                      {query} found
                    </span>
                  </div>
                ))}
              </div>
            )}
            {matches.length === 0 && query && (
              <div className="text-gray-400 mt-2 text-sm">No matches found.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
