"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/config/firebase.conf";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";

// Highlight component
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-700/[0.2] text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

// Card type
type FeedbackCard = {
  id: string;
  name: string;
  comment: string;
};

const GetFeedback = () => {
  const [cards, setCards] = useState<FeedbackCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const fetchedCards: FeedbackCard[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          comment: doc.data().comment,
          role: doc.data().role,
        }));

        setCards(fetchedCards);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // Convert Firebase feedback to CardStack format
  const CARD_STACK_ITEMS = cards.map((c, idx) => ({
    id: idx,
    name: c.name,
    designation: c.role || "User",
    content: (
      <p className="text-sm md:text-base text-neutral-300">
        {c.comment.split(" ").map((word, i) =>
          word.startsWith("@") || word.startsWith("#") ? (
            <Highlight key={i}>{word} </Highlight>
          ) : (
            word + " "
          )
        )}
      </p>
    ),
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-neutral-400 text-lg">Loading feedback...</p>
      </div>
    );
  }

  if (CARD_STACK_ITEMS.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-neutral-400 text-lg">No feedback yet.</p>
      </div>
    );
  }

  return (
    <div className="h-[20rem] flex text-neutral-200 items-center justify-center w-full">
      <CardStack items={CARD_STACK_ITEMS} />
    </div>
  );
};

export default GetFeedback;
