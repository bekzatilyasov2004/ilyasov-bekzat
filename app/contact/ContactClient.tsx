'use client';

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { db } from "@/config/firebase.conf";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);


const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget; // HTMLFormElement
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !message) {
        setLoading(false);
        alert("Iltimos barcha maydonlarni to'ldiring.");
        return;
    }

    try {
        // Firebase ga saqlash
        await addDoc(collection(db, "contactMessages"), {
            name,
            email,
            message,
            createdAt: serverTimestamp(),
        });

        setSent(true);
        form.reset(); // <- shu joy endi ishlaydi
    } catch (err) {
        console.error("Firebase ga xabar yuborishda xato:", err);
        alert("Xabarni yuborishda xato yuz berdi.");
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
            <Head>
                <title>Contact Me | Bekzat Ilyasov</title>
                <meta name="description" content="Get in touch with Bekzat Ilyasov for collaborations or inquiries." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* BACKGROUND SHAPES */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 blur-3xl rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full animate-pulse"></div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl w-full bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10"
            >
                {/* HEADER */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl font-bold mb-4 text-center"
                >
                    Get in Touch
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-zinc-400 mb-10 text-center max-w-2xl mx-auto"
                >
                    If you’d like to collaborate or just want to say hi — feel free to
                    contact me via the form below or social media.
                </motion.p>

                {/* CONTACT CARDS */}
                <div className="grid md:grid-cols-3 gap-6 mb-14">

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        href="mailto:bekzatilyasov2704@gmail.com"
                        className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-purple-500 transition cursor-pointer"
                    >
                        <Mail className="w-8 h-8 text-purple-400 mb-3" />
                        <h3 className="font-semibold text-xl mb-1">Email</h3>
                        <p className="text-zinc-300">bekzatilyasov2704@gmail.com</p>
                        <p className="text-zinc-300">bekzatilyasov2004@gmail.com</p>
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        href="tel:+998900272704"
                        className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-green-500 transition cursor-pointer"
                    >
                        <Phone className="w-8 h-8 text-green-400 mb-3" />
                        <h3 className="font-semibold text-xl mb-1">Phone</h3>
                        <p className="text-zinc-300">+998 90 027 27 04</p>
                        <p className="text-zinc-300">+998 93 824 27 04</p>
                    </motion.a>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-blue-500 transition cursor-pointer"
                    >
                        <MapPin className="w-8 h-8 text-blue-400 mb-3" />
                        <h3 className="font-semibold text-xl mb-1">Location</h3>
                        <p className="text-zinc-300">Tashkent, Uzbekistan</p>
                    </motion.div>

                </div>

                {/* SOCIAL LINKS */}
                <div className="flex justify-center gap-6 mb-14">

                    {/* GitHub */}
                    <Link href="https://github.com/bekzatilyasov2004" target="_blank">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-zinc-400 transition cursor-pointer"
                        >
                            <Github className="w-7 h-7" />
                        </motion.div>
                    </Link>

                    {/* LinkedIn */}
                    <Link href="https://linkedin.com/in/bekzatilyasov" target="_blank">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-blue-500 transition cursor-pointer"
                        >
                            <Linkedin className="w-7 h-7 text-blue-500" />
                        </motion.div>
                    </Link>

                    {/* Telegram */}
                    <Link href="https://t.me/bekzat_ilyasov" target="_blank">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-cyan-400 transition cursor-pointer"
                        >
                            <svg
                                className="w-7 h-7 text-cyan-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9.99996 14.31L9.89996 18.42C10.289 18.42 10.457 18.252 10.657 18.052L12.539 16.244L16.603 19.219C17.349 19.633 17.88 19.412 18.078 18.514L20.938 5.078C21.236 3.882 20.508 3.37 19.789 3.65L3.61596 9.854C2.44796 10.302 2.45496 10.97 3.40296 11.262L7.53996 12.554L17.448 6.346C17.916 6.048 18.34 6.208 18.002 6.536L9.99996 14.31Z" />
                            </svg>
                        </motion.div>
                    </Link>

                    {/* Instagram */}
                    <Link href="https://instagram.com/bekzat_ilyasov_004" target="_blank">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-pink-500 transition cursor-pointer"
                        >
                            <svg
                                className="w-7 h-7 text-pink-500"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7 2C4.243 2 2 4.243 2 7V17C2 19.757 4.243 22 7 22H17C19.757 22 22 19.757 22 17V7C22 4.243 19.757 2 17 2H7ZM12 7C14.757 7 17 9.243 17 12C17 14.757 14.757 17 12 17C9.243 17 7 14.757 7 12C7 9.243 9.243 7 12 7ZM18 6C18 6.552 17.552 7 17 7C16.448 7 16 6.552 16 6C16 5.448 16.448 5 17 5C17.552 5 18 5.448 18 6Z" />
                            </svg>
                        </motion.div>
                    </Link>

                </div>

                {/* FORM */}
                <motion.form
                    onSubmit={sendMessage}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10"
                >
                    <h2 className="text-3xl font-semibold mb-6">Send Me a Message</h2>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <input
                            name="name"
                            required
                            type="text"
                            placeholder="Full Name"
                            className="p-4 w-full bg-black/30 rounded-xl border border-zinc-700 text-white focus:border-purple-500 outline-none"
                        />
                        <input
                            name="email"
                            required
                            type="email"
                            placeholder="Email Address"
                            className="p-4 w-full bg-black/30 rounded-xl border border-zinc-700 text-white focus:border-purple-500 outline-none"
                        />
                    </div>

                    <textarea
                        name="message"
                        required
                        placeholder="Your Message..."
                        rows={4}
                        className="w-full p-4 bg-black/30 rounded-xl border border-zinc-700 text-white focus:border-purple-500 outline-none mb-6"
                    />

                    <button
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition disabled:bg-purple-900"
                    >
                        <Send className="w-5 h-5" />
                        {loading ? "Sending..." : "Send Message"}
                    </button>

                    {sent && (
                        <p className="text-green-400 mt-4">Message sent successfully! ✔</p>
                    )}
                </motion.form>
            </motion.div>
        </div>
    );
}
