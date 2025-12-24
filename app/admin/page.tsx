'use client';

import { useState, useEffect } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/server/uploadthing";
import { db } from "@/config/firebase.conf";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";   
import { FolderKanban, BadgeCheck, UploadCloud, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboard() {
  const [section, setSection] = useState<"skills" | "projects">("skills");

    const { user, loading: authLoading } = useAuth();
  
  
     useEffect(() => {
      if (!authLoading && !user) {
        window.location.href = "/admin/login"; // login page ga yo‘naltirish
      }
    }, [authLoading, user]);

  // GENERAL FIELDS
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(``);

  // SKILLS
  const [badges, setBadges] = useState<string[]>([]);
  const [newBadge, setNewBadge] = useState("");
  const [level, setLevel] = useState(70);

  

  // PROJECTS
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");

  // IMAGE
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  // DATA
  const [items, setItems] = useState<any[]>([]); // Firestore datalari

  // --- FUNCTIONS ---
  const handleUploadComplete = (res: any) => {
    const url = res[0]?.fileUrl || res[0]?.ufsUrl;
    if (url) setImageUrl(url);
  };

  const addBadge = () => {
    if (newBadge.trim() === "") return;
    setBadges([...badges, newBadge.trim()]);
    setNewBadge("");
  };

  const removeBadge = (index: number) => {
    const updated = badges.filter((_, i) => i !== index);
    setBadges(updated);
  };

  const fetchItems = async () => {
    const colName = section === "skills" ? "skillsImages" : "projectsImages";
    const snapshot = await getDocs(collection(db, colName));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(data);
  };

  const deleteItem = async (id: string) => {
    const colName = section === "skills" ? "skillsImages" : "projectsImages";
    await deleteDoc(doc(db, colName, id));
    fetchItems(); // Refresh
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!imageUrl) return alert("Rasm yuklanmagan!");
    setSaving(true);

    try {
      if (section === "skills") {
        await addDoc(collection(db, "skillsImages"), {
          title,
          description: `${description}`,
          level,
          url: imageUrl,
          createdAt: new Date(),
        });
      } else {
        await addDoc(collection(db, "projectsImages"), {
          title,
          description,
          badges,
          github,
          demo,
          url: imageUrl,
          createdAt: new Date(),
        });
      }

      alert("Ma'lumot muvaffaqiyatli saqlandi!");

      // FORMNI TOZALASH
      setTitle("");
      setDescription("");
      setBadges([]);
      setNewBadge("");
      setGithub("");
      setDemo("");
      setLevel(70);
      setImageUrl("");

      fetchItems(); // Form saqlangandan keyin refresh
    } catch (error) {
      console.error(error);
      alert("Xatolik yuz berdi!");
    }

    setSaving(false);
  };

  useEffect(() => {
    fetchItems();
  }, [section]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white shadow-xl p-6 flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>

          <button
            onClick={() => setSection("skills")}
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              section === "skills"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            <BadgeCheck /> Skills Page
          </button>

          <button
            onClick={() => setSection("projects")}
            className={`flex items-center gap-3 p-3 rounded-xl transition ${
              section === "projects"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            <FolderKanban /> Projects Page
          </button>
        </aside>

        {/* MAIN AREA */}
        <main className="flex-1 p-10">
          <motion.h2
            key={section}
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {section === "skills" ? "Skills Management" : "Projects Management"}
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

            {/* FORM */}
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <input
                type="text"
                placeholder="Title"
                className="w-full border p-3 rounded-xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <textarea
                placeholder="Description"
                rows={3}
                className="w-full border p-3 rounded-xl"
                value={`${description}`}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              {section === "skills" && (
                <>

                  <div>
                    <p className="font-medium mb-1">Skill Level: {level}%</p>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={level}
                      onChange={(e) => setLevel(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </>
              )}

              {section === "projects" && (
                <>
                  <input
                    type="text"
                    placeholder="GitHub Link"
                    className="w-full border p-3 rounded-xl"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Live Demo URL"
                    className="w-full border p-3 rounded-xl"
                    value={demo}
                    onChange={(e) => setDemo(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add badge"
                      className="flex-1 border p-2 rounded-xl"
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                    />
                    <button type="button" onClick={addBadge} className="bg-blue-600 text-white px-4 rounded-xl">
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {badges.map((b, i) => (
                      <span
                        key={i}
                        className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {b}
                        <button type="button" onClick={() => removeBadge(i)}>✕</button>
                      </span>
                    ))}
                  </div>
                  
                </>
              )}

              {/* <div className="space-y-2">
                <UploadButton<OurFileRouter>
                  endpoint="imageUploader"
                  onClientUploadComplete={handleUploadComplete}
                  className="w-full bg-blue-600 text-white p-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <UploadCloud /> Upload Image
                </UploadButton>

                {imageUrl && (
                  <img
                    src={imageUrl}
                    className="w-full h-48 object-cover rounded-xl shadow-lg mt-3"
                    alt="uploaded preview"
                  />
                )}
              </div> */}
              <div className="space-y-2">
  <UploadButton<OurFileRouter, "imageUploader">
    endpoint="imageUploader"
    onClientUploadComplete={handleUploadComplete}
    className="w-full bg-blue-600 text-white p-3 rounded-xl flex items-center justify-center gap-2"
  >
    <UploadCloud /> Upload Image
  </UploadButton>

  {imageUrl && (
    <img
      src={imageUrl}
      className="w-full h-48 object-cover rounded-xl shadow-lg mt-3"
      alt="uploaded preview"
    />
  )}
</div>


              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                {saving ? "Saving..." : "Save Data"}
              </button>
            </motion.form>
          </div>

          {/* --- DATA GRID --- */}
          <h3 className="text-2xl font-bold mb-4">Saved {section === "skills" ? "Skills" : "Projects"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-md relative">
                <img src={item.url} className="w-full h-40 object-cover rounded-xl mb-3" />
                <h4 className="font-bold">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>

                {section === "skills" && item.badges && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.badges.map((b: string, i: number) => (
                      <span key={i} className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">{b}</span>
                    ))}
                  </div>
                )}

                {section === "skills" && item.level && (
                  <div className="mt-2 w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.level}%` }}></div>
                  </div>
                )}

                {section === "projects" && (
                  <div className="flex flex-col gap-1 mt-2 text-sm">
                    {item.github && <a href={item.github} target="_blank" className="text-blue-600 underline">GitHub</a>}
                    {item.demo && <a href={item.demo} target="_blank" className="text-blue-600 underline">Demo</a>}
                  </div>
                )}

                <button
                  onClick={() => deleteItem(item.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
