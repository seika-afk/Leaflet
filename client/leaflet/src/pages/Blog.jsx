import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Blog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://leaflet-iywf.onrender.com/notes/blogs/${id}`, { credentials: "include" })
      .then((r) => r.json())
      .then(setBlog)
      .catch(() => setError("Blog not found."));
  }, [id]);

  if (error)
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-neutral-600 text-sm tracking-widest">{error}</p>
      </main>
    );

  if (!blog)
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-neutral-800 text-xs tracking-[0.3em] uppercase">
          Loading
        </p>
      </main>
    );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-8 py-12">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-neutral-700 text-xs tracking-[0.2em] uppercase hover:text-neutral-400 transition mb-16 block"
        >
          ← Dashboard
        </button>

        <div className="flex items-center gap-3 mb-4">
          <p className="text-neutral-700 text-xs tracking-[0.2em] uppercase">
            {new Date(blog.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {blog.users?.username && (
            <>
              <span className="text-neutral-800 text-xs">·</span>
              <p className="text-neutral-600 text-xs tracking-[0.15em] uppercase">
                {blog.users.username}
              </p>
            </>
          )}
        </div>

        <h1 className="bitText text-4xl font-bold text-neutral-100 leading-tight mb-8">
          {blog.title}
        </h1>

        <div className="h-px w-12 bg-neutral-700 mb-12" />

        <div className="prose prose-invert prose-neutral max-w-none prose-p:text-neutral-400 prose-p:leading-8 prose-headings:text-neutral-200 prose-headings:bitText prose-code:text-neutral-300 prose-strong:text-neutral-300 prose-a:text-neutral-400 prose-a:underline-offset-4">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
