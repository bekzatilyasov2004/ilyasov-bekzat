"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/config/firebase.conf";
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: Timestamp;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  // Agar login qilmagan bo'lsa, admin login page ga yo'naltirish
  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/admin/login";
    }
  }, [authLoading, user]);

  // Firestore'dan xabarlarni olish
  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        const q = query(
          collection(db, "contactMessages"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);

        const msgs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Message, "id">),
        }));

        setMessages(msgs);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user]);

  // Reply yuborish funksiyasi
  const handleReply = async (toEmail: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const replyMessage = formData.get("reply") as string;

    if (!replyMessage) return;

    try {
      const res = await fetch("/api/sendReply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail,
          subject: "Reply from Bekzat Blog",
          message: replyMessage,
        }),
      });

      if (!res.ok) throw new Error("Failed to send reply");

      form.reset();
      alert("Reply sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send reply.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        Loading messages...
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        No messages yet.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-black min-h-screen text-white">
      {messages.map((msg) => (
        <div key={msg.id} className="border border-white/20 p-4 rounded-lg bg-white/5">
          <p className="font-bold">
            {msg.name}{" "}
            <span className="text-gray-400 text-sm">({msg.email})</span>
          </p>
          <p className="mt-2">{msg.message}</p>

          {/* Reply form */}
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => handleReply(msg.email, e)}
          >
            <input
              name="reply"
              placeholder="Write your reply..."
              className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-lg hover:opacity-90 transition"
            >
              Send
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default Chat;
