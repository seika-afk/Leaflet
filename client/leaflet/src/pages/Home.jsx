import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="absolute top-10 left-8 flex flex-col gap-4">
        <a
          href="https://github.com/seika-afk"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-600 hover:text-neutral-300 transition"
        >
          <FaGithub size={18} />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-600 hover:text-neutral-300 transition"
        >
          <FaXTwitter size={18} />
        </a>
      </div>

      <section className="flex flex-col items-center justify-center min-h-screen max-w-6xl mx-auto px-8 text-center">
        <h1 className="bitText text-4xl font-bold leading-tight text-neutral-400">
          a dead <span className="text-neutral-100">simple</span> .md publisher
        </h1>

        <div className="mt-2 flex items-center gap-6">
          <div className="h-px w-20 bg-neutral-700"></div>
          <span className="text-sm tracking-[0.3em] text-neutral-500">
            Upload .md
          </span>
          <div className="h-px w-20 bg-neutral-700"></div>
        </div>

        <p className="mt-3 max-w-xl text-base leading-8 text-neutral-500">
          Free Markdown hosting platform — host your blogs, Obsidian notes
          (especially), and much more anonymously.
        </p>

        <div className="mt-7 flex gap-4">
          <button
            onClick={() => navigate("/register")}
            className="rounded-sm text-sm  font-semibold text-gray-300 transition hover:bg-gray-300 cursor-pointer px-3 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
