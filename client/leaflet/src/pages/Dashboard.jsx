import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    fetch("https://leaflet-iywf.onrender.com/notes/blogs", { credentials: "include" })
      .then((r) => r.json())
      .then(setBlogs)
      .catch(console.error);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setTitle(file.name.replace(".md", ""));
    const reader = new FileReader();
    reader.onload = (ev) => setContent(ev.target.result);
    reader.readAsText(file);
  };

  const handleCreate = async () => {
    try {
      const res = await fetch("https://leaflet-iywf.onrender.com/notes/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content, userId: null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setBlogs([data, ...blogs]);
      setShowModal(false);
      setTitle("");
      setContent("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-neutral-700 text-xs tracking-[0.2em] uppercase mb-1">
              Leaflet
            </p>
            <h1 className="bitText text-2xl font-bold text-neutral-200">
              Dashboard
            </h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-sm bg-gray-600 px-4 py-2 text-xs font-semibold text-gray-200 tracking-wide hover:bg-gray-500 transition cursor-pointer active:scale-95"
          >
            + New Post
          </button>
        </div>

        <div className="h-px w-full bg-neutral-800 mt-6 mb-10" />

        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-32 gap-2">
            <p className="text-neutral-700 text-xs tracking-[0.3em] uppercase">
              No Posts Yet
            </p>
            <p className="text-neutral-800 text-xs">
              Upload your first .md file to get started
            </p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-neutral-900">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="flex items-center justify-between py-4 cursor-pointer group"
              >
                <span className="text-neutral-300 text-sm group-hover:text-white transition">
                  {blog.title}
                </span>
                <span className="text-neutral-700 text-xs tracking-wide">
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-950 border border-neutral-800 rounded-sm p-8 w-full max-w-md flex flex-col gap-5">
            <div>
              <p className="text-neutral-700 text-xs tracking-[0.2em] uppercase mb-2">
                New Post
              </p>
              <h2 className="bitText text-lg font-bold text-neutral-200">
                Upload Markdown
              </h2>
            </div>

            <div className="h-px w-full bg-neutral-800" />

            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border border-neutral-800 rounded-sm px-4 py-3 text-sm text-neutral-300 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition"
            />

            <div
              onClick={() => fileRef.current.click()}
              className="border border-dashed border-neutral-800 rounded-sm px-4 py-8 text-center cursor-pointer hover:border-neutral-600 transition"
            >
              <p className="text-neutral-600 text-xs tracking-[0.2em] uppercase">
                {content ? "✓ File Loaded" : "Click To Upload .md File"}
              </p>
              <input
                ref={fileRef}
                type="file"
                accept=".md"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 tracking-wide">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCreate}
                className="flex-1 rounded-sm bg-gray-600 px-4 py-3 text-sm font-semibold text-gray-200 tracking-wide hover:bg-gray-500 transition cursor-pointer active:scale-95"
              >
                Publish
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}
                className="flex-1 rounded-sm border border-neutral-800 px-4 py-3 text-sm text-neutral-500 hover:border-neutral-600 hover:text-neutral-400 transition cursor-pointer active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
