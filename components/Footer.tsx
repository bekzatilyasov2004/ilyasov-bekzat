"use client";

import React, { useState } from "react";
import { db } from "@/config/firebase.conf";
import { collection, addDoc } from "firebase/firestore";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState(""); // yangi state
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment || !role) return; // role ham tekshiriladi

    try {
      setLoading(true);

      await addDoc(collection(db, "feedback"), {
        name,
        role, // saqlanadi
        comment,
        createdAt: new Date(),
      });

      setDone(true);
      setName("");
      setRole("");
      setComment("");

      setTimeout(() => setDone(false), 2500);
    } catch (err) {
      console.error("Error saving feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full bg-black text-white mt-20 border-t border-white/10 pt-16 pb-10 relative overflow-hidden">
      {/* GRADIENT BACKGROUND */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Bekzat Blog</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              A personal tech blog focused on frontend, React, Next.js, UI/UX,
              and modern web development. Stay updated with the latest content.
            </p>

            <div className="flex gap-4 mt-5">
              <a href="https://github.com/bekzatilyasov2004" className="hover:text-purple-400 transition"><Github size={20} /></a>
              <a href="https://linkedin.com/in/bekzatilyasov" className="hover:text-purple-400 transition"><Linkedin size={20} /></a>
              <a href="https://instagram.com/bekzat_ilyasov" className="hover:text-purple-400 transition"><Instagram size={20} /></a>
              <a href="mailto:bekzatilyasov@gmail.com" className="hover:text-purple-400 transition"><Mail size={20} /></a>
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white transition cursor-pointer">About Me</li>
              <li className="hover:text-white transition cursor-pointer">Projects</li>
              <li className="hover:text-white transition cursor-pointer">Skills</li>
              <li className="hover:text-white transition cursor-pointer">Blog</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white transition cursor-pointer">Documentation</li>
              <li className="hover:text-white transition cursor-pointer">Github Repo</li>
              <li className="hover:text-white transition cursor-pointer">Tutorials</li>
              <li className="hover:text-white transition cursor-pointer">Community</li>
            </ul>
          </div>

          {/* FEEDBACK FORM */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Send Feedback</h3>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 bg-white/5 backdrop-blur-xl p-4 border border-white/10 rounded-xl"
            >
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/10 rounded-lg 
                           text-sm text-white placeholder-gray-400 focus:border-purple-500 outline-none"
              />

              {/* ROLE INPUT */}
              <input
                type="text"
                placeholder="Your role (e.g., Frontend Developer)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-sm text-white placeholder-gray-400 focus:border-purple-500 outline-none"
              />


              <textarea
                placeholder="Your message..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/10 rounded-lg
                           text-sm text-white placeholder-gray-400 h-20 focus:border-purple-500 outline-none"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="mt-1 bg-gradient-to-r from-purple-600 to-blue-600 
                           text-white px-4 py-2 rounded-lg text-sm font-medium 
                           hover:opacity-90 transition disabled:opacity-40"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>

            {done && (
              <p className="text-green-400 text-sm mt-2">Message sent successfully ✔</p>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Bekzat Blog — All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
