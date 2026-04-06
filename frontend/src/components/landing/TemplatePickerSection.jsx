import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const templates = [
  { name: "Executive", tone: "#0f4c81" },
  { name: "Modern", tone: "#7b3fe4" },
  { name: "Classic", tone: "#334155" },
  { name: "Creative", tone: "#0284c7" }
];

const TemplatePreviewCard = ({ name, tone }) => (
  <motion.article whileHover={{ y: -4 }} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="relative h-64 bg-slate-50 p-4">
      <div className="absolute inset-y-4 left-4 w-[26%] rounded-lg" style={{ backgroundColor: tone }} />
      <div className="ml-[32%] space-y-1.5">
        <div className="h-3 w-24 rounded" style={{ backgroundColor: tone, opacity: 0.6 }} />
        <div className="h-2 w-16 rounded bg-slate-300" />
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-1.5 rounded bg-slate-200" />
        ))}
      </div>
    </div>
    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
      <p className="text-sm font-semibold text-slate-700">{name}</p>
      <Link to="/signup" className="text-xs font-semibold text-sky-700 hover:underline">Use Template</Link>
    </div>
  </motion.article>
);

const TemplatePickerSection = () => (
  <section className="mx-auto max-w-7xl px-4 py-14" id="templates">
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Pick a Resume Template</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
        Choose from recruiter-friendly designs and personalize colors, fonts, and sections in seconds.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {templates.map((template) => (
        <TemplatePreviewCard key={template.name} {...template} />
      ))}
    </div>

    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <Link to="/signup" className="rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">
        Create New Resume
      </Link>
      <Link to="/login" className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        Improve My Resume
      </Link>
    </div>
  </section>
);

export default TemplatePickerSection;