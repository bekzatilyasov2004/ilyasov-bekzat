'use client';

import { db } from "@/config/firebase.conf";
import { collection, getDocs, DocumentData, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

interface ImageData {
  url: string;
  title: string;
  description: string;
  createdAt: any;
}

export default function ImageList() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // createdAt bo‘yicha sortlash
        const q = query(collection(db, "skillsImages"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data: ImageData[] = snapshot.docs.map((doc: DocumentData) => ({
          url: doc.data()?.url || "",
          title: doc.data()?.title || "",
          description: doc.data()?.description || "",
          createdAt: doc.data()?.createdAt?.toDate?.() || new Date(),
        }));

        setImages(data);
      } catch (err) {
        console.error("Firestore dan o‘qishda xato:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Rasmlar yuklanmoqda...</p>;
  if (images.length === 0) return <p className="text-center mt-10 text-gray-600">Hozircha rasmlar yo‘q.</p>;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
        >
          <div className="w-full h-64 overflow-hidden">
            <img
              src={images[idx].url}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="p-4 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">{img.title}</h3>
            <p className="text-gray-600 mt-1 text-sm">{img.description}</p>
            <p className="text-gray-400 mt-2 text-xs">
              {new Date(img.createdAt).toLocaleString("uz-UZ", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
