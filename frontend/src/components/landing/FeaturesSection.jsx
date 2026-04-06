import { motion } from "framer-motion";
import { Bot, Eye, FileCheck2, Share2 } from "lucide-react";

const features = [
  { icon: Bot, title: "AI Content Suggestions", text: "Enhance summary and job descriptions with ATS-focused language." },
  { icon: Eye, title: "Live Resume Preview", text: "Watch your resume update instantly as you edit each section." },
  { icon: FileCheck2, title: "PDF Export", text: "Download polished resumes as print-ready PDF files." },
  { icon: Share2, title: "Public Share Link", text: "Share your resume instantly with recruiters via secure link." }
];

const FeaturesSection = () => (
  <section className="bg-white" id="features">
    <div className="mx-auto max-w-7xl px-4 py-14">
      <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">Services & Features</h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 md:text-base">Everything you need to create, improve, and share standout resumes.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <Icon size={20} className="text-sky-700" />
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

export default FeaturesSection;