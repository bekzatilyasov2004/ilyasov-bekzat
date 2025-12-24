"use client";

import { useState } from "react";
import { auth } from "@/config/firebase.conf";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      if (user.email !== email) {
        await signOut(auth);
        setError("Admin panelga kirishga ruxsatingiz yo‘q.");
        return;
      }

      router.push("/admin");
    } catch (err) {
      setError("Email yoki parol noto‘g‘ri!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Soft floating gradients */}
      <div className="absolute w-[300px] h-[300px] bg-purple-400/20 rounded-full blur-3xl top-10 left-20" />
      <div className="absolute w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-3xl bottom-10 right-20" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/5 shadow-2xl rounded-2xl p-10"
      >
        {/* Title */}
        <h1 className="text-center text-3xl font-bold mb-8 text-white">
          Admin Login
        </h1>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-300 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-purple-400 outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-300 text-sm mb-1">Parol</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-purple-400 outline-none transition"
              placeholder="********"
            />
          </div>

          {/* Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.01 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-purple-500/20 transition disabled:opacity-50"
          >
            {loading ? "Kirilmoqda..." : "Kirish"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
