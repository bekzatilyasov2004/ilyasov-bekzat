'use client';

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/server/uploadthing";
import { db } from "@/config/firebase.conf";
import { collection, addDoc } from "firebase/firestore";

type PageType = "skills" | "projects" | "badges";

export default function ImageUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [page, setPage] = useState<PageType>("skills");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUploadComplete = async (res: any) => {
    if (!res || res.length === 0) return;

    const url = res[0]?.fileUrl || res[0]?.ufsUrl;
    if (!url) {
      console.error("Fayl URL topilmadi");
      return;
    }

    setLoading(true);
    try {
      const colName =
        page === "skills"
          ? "skillsImages"
          : page === "projects"
          ? "projectsImages"
          : "badges";

      await addDoc(collection(db, colName), {
        url,
        title,
        description,
        createdAt: new Date(),
      });

      setTitle("");
      setDescription("");
      setPage("skills");
      setSuccess(true);

      setTimeout(() => setSuccess(false), 4000); // Success message 4s ko‘rinadi
    } catch (err) {
      console.error("Firestore saqlash xato:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <form className="w-full max-w-md bg-black rounded-2xl shadow-lg p-8 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Upload Image</h2>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Description</label>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Select Page</label>
          <select
            value={page}
            onChange={(e) => setPage(e.target.value as PageType)}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="skills">Skills Page</option>
            <option value="projects">Projects Page</option>
            <option value="badges">Badge Page</option>
          </select>
        </div>

        <div className="flex justify-center">
          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(err) => console.error("Upload xato:", err.message)}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </UploadButton>
        </div>

        {success && (
          <p className="text-green-500 text-center font-medium">
            Image uploaded successfully!
          </p>
        )}
      </form>
    </div>
  );
}
