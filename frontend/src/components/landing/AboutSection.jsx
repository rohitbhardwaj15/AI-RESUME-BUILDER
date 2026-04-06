import { motion } from "framer-motion";

const stats = [
  { label: "Resume Templates", value: "20+" },
  { label: "Users Assisted", value: "10K+" },
  { label: "Avg Build Time", value: "8 min" }
];

const AboutSection = () => (
  <section className="mx-auto max-w-7xl px-4 py-14" id="about">
    <div className="grid grid-cols-1 gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
      <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">About AI Resume Builder</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
          We combine intuitive design with AI-powered writing assistance so anyone can build a professional resume quickly. Our platform focuses on clarity, ATS optimization, and recruiter-friendly presentation.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-3 gap-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl bg-slate-50 p-4 text-center">
            <p className="text-xl font-bold text-sky-700 md:text-2xl">{item.value}</p>
            <p className="mt-1 text-xs text-slate-500">{item.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default AboutSection;