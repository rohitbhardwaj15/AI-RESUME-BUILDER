import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50" id="hero">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 lg:grid-cols-2 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">AI Resume Builder</p>
          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Build a Job-Winning Resume in Minutes
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
            Create polished resumes with smart AI suggestions, beautiful templates, and one-click export. Fast, modern, and built for real hiring outcomes.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/signup" className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700">
              Create Resume Free
            </Link>
            <Link to="/login" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
              Improve Existing Resume
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg">
          <div className="grid grid-cols-[30%_1fr] overflow-hidden rounded-2xl border border-slate-200">
            <div className="bg-sky-700" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-40 rounded bg-slate-300" />
              <div className="h-3 w-24 rounded bg-slate-200" />
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-2 rounded bg-slate-100" />
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-slate-500">
            <div className="rounded-xl bg-slate-50 p-2">ATS Friendly</div>
            <div className="rounded-xl bg-slate-50 p-2">PDF Export</div>
            <div className="rounded-xl bg-slate-50 p-2">Public Share</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;