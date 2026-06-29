import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col gap-5 w-full max-w-sm px-8">
        <div>
          <p className="text-neutral-700 text-xs tracking-[0.2em] uppercase mb-3">
            Leaflet
          </p>
          <h1 className="bitText text-2xl font-bold text-neutral-200">
            Create Account
          </h1>
        </div>

        <div className="h-px w-full bg-neutral-800" />

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="bg-transparent border border-neutral-800 rounded-sm px-4 py-3 text-sm text-neutral-300 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="bg-transparent border border-neutral-800 rounded-sm px-4 py-3 text-sm text-neutral-300 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="bg-transparent border border-neutral-800 rounded-sm px-4 py-3 text-sm text-neutral-300 placeholder-neutral-700 focus:outline-none focus:border-neutral-600 transition"
        />

        {error && <p className="text-xs text-red-500 tracking-wide">{error}</p>}

        <button
          onClick={handleSubmit}
          className="rounded-sm bg-gray-600 px-4 py-3 text-sm font-semibold text-gray-200 tracking-wide transition hover:bg-gray-500 cursor-pointer active:scale-95"
        >
          Register
        </button>

        <p className="text-xs text-neutral-700 text-center tracking-wide">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-neutral-500 cursor-pointer hover:text-neutral-300 transition"
          >
            Log In
          </span>
        </p>
      </div>
    </main>
  );
}
