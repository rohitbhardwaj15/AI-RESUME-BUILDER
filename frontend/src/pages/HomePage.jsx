import { motion } from "framer-motion";
import { CheckCircle2, FilePenLine, Palette, PenSquare, Sparkles, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const templateCards = [
  { id: 1, color: "#0b4f71", accent: "#e2b64f" },
  { id: 2, color: "#8f1d3e", accent: "#d6d9e5" },
  { id: 3, color: "#c18ad9", accent: "#f4f4f4" },
  { id: 4, color: "#b7c7ea", accent: "#f5f7ff" }
];

const StepCard = ({ icon, title, subtitle }) => (
  <motion.div whileHover={{ y: -4 }} className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200">
    <div className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-2xl bg-slate-100 text-blue-700">{icon}</div>
    <h3 className="text-[38px] font-semibold text-slate-800">{title}</h3>
    <p className="mt-2 text-lg text-slate-600">{subtitle}</p>
  </motion.div>
);

const ResumeMini = ({ color, accent }) => (
  <div className="relative h-[370px] w-[230px] overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
    <div className="h-full w-[30%]" style={{ backgroundColor: color }} />
    <div className="absolute left-[33%] top-5 right-4 space-y-2">
      <div className="h-3 w-24 rounded" style={{ backgroundColor: color, opacity: 0.55 }} />
      <div className="h-2 w-16 rounded bg-slate-300" />
      <div className="mt-5 h-2 w-full rounded bg-slate-200" />
      <div className="h-2 w-[92%] rounded bg-slate-200" />
      <div className="h-2 w-[84%] rounded bg-slate-200" />
      <div className="mt-6 h-2 w-24 rounded" style={{ backgroundColor: accent }} />
      <div className="h-2 w-full rounded bg-slate-200" />
      <div className="h-2 w-[90%] rounded bg-slate-200" />
      <div className="h-2 w-[78%] rounded bg-slate-200" />
      <div className="mt-6 h-2 w-20 rounded" style={{ backgroundColor: accent }} />
      <div className="h-2 w-full rounded bg-slate-200" />
      <div className="h-2 w-[86%] rounded bg-slate-200" />
      <div className="h-2 w-[72%] rounded bg-slate-200" />
    </div>
  </div>
);

const HomePage = () => (
  <div className="bg-[#f6f8fc] text-slate-800">
    <Navbar variant="light" />

    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-12 pt-10 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
        <p className="text-4xl font-bold text-blue-800">Fast. Easy. Effective.</p>
        <h1 className="text-6xl font-black leading-tight text-slate-900">ResumeForge. The Best Resume Maker Online.</h1>
        <p className="max-w-2xl text-2xl leading-relaxed text-slate-600">
          Build a resume from scratch or improve an existing one with AI support, beautiful templates, and real-time customization.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/signup" className="rounded-full bg-[#f3be4b] px-8 py-4 text-xl font-bold text-slate-900 shadow-sm hover:brightness-95">
            Create new resume
          </Link>
          <Link to="/login" className="rounded-full border-2 border-blue-700 px-8 py-4 text-xl font-bold text-blue-700 hover:bg-blue-50">
            Improve my resume
          </Link>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="relative rounded-3xl bg-[#e9edf5] p-6">
        <div className="absolute -left-6 top-16 h-28 w-28 rounded-full border-[6px] border-[#f4c34f] bg-white shadow-md" />
        <div className="relative overflow-hidden rounded-2xl border border-slate-300 bg-white p-4 shadow-lg">
          <div className="grid grid-cols-[28%_1fr] gap-3">
            <div className="rounded-xl bg-[#a23215]" />
            <div className="space-y-2 py-2">
              <div className="h-4 w-56 rounded bg-[#a23215]/80" />
              <div className="h-3 w-24 rounded bg-slate-300" />
              <div className="h-2 w-full rounded bg-slate-200" />
              <div className="h-2 w-[94%] rounded bg-slate-200" />
              <div className="h-2 w-[82%] rounded bg-slate-200" />
              <div className="mt-4 h-3 w-20 rounded bg-[#a23215]/70" />
              <div className="h-2 w-full rounded bg-slate-200" />
              <div className="h-2 w-[90%] rounded bg-slate-200" />
              <div className="h-2 w-[74%] rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>

    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-4 py-5 text-3xl font-bold text-slate-500">
        <span>TCS</span>
        <span>amazon</span>
        <span>Paytm</span>
        <span>Infosys</span>
        <span>Accenture</span>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-8 text-center text-5xl font-extrabold text-slate-900">Pick a resume template</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {templateCards.map((card) => (
          <motion.div key={card.id} whileHover={{ y: -5 }} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <ResumeMini color={card.color} accent={card.accent} />
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button className="rounded-full bg-[#f3be4b] px-10 py-4 text-xl font-bold text-slate-900">View more templates</button>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StepCard icon={<FilePenLine size={40} />} title="Pick a resume template." subtitle="Choose a sleek design and layout to get started." />
        <StepCard icon={<Wand2 size={40} />} title="Fill in the blanks." subtitle="Type a few words. Let AI fill the rest." />
        <StepCard icon={<Palette size={40} />} title="Customize your document." subtitle="Make it truly yours in just a few clicks." />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/signup" className="rounded-full bg-[#f3be4b] px-8 py-4 text-xl font-bold text-slate-900">Create new resume</Link>
        <Link to="/login" className="rounded-full border-2 border-blue-700 px-8 py-4 text-xl font-bold text-blue-700">Improve my resume</Link>
      </div>
    </section>

    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-16 lg:grid-cols-2">
      <div className="rounded-3xl bg-[#e8edf3] p-8">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-300 bg-white p-6">
          <div className="mb-4 flex items-center gap-3 text-blue-700"><Sparkles /> <span className="text-xl font-bold">Smart Customization</span></div>
          <div className="space-y-3">
            <div className="h-2 w-full rounded bg-slate-200" />
            <div className="h-2 w-[90%] rounded bg-slate-200" />
            <div className="h-2 w-[82%] rounded bg-slate-200" />
            <div className="h-12 w-48 rounded-xl bg-slate-900 text-white grid place-items-center text-lg">COLOR</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {["Enhance your resume with our expert content", "Resume and cover letter in one place", "Professionally designed templates", "Expert tips & guidance", "Apply for jobs with confidence"].map((item, index) => (
          <div key={item} className={index === 1 ? "rounded-xl bg-[#e8eff7] p-4" : "p-1"}>
            <p className="text-[34px] font-bold text-slate-900"><span className="mr-3 inline-grid h-8 w-8 place-items-center rounded-full bg-emerald-400 text-base font-black text-slate-900">{index + 1}</span>{item}</p>
          </div>
        ))}

        <div className="pt-3 flex flex-wrap gap-4">
          <Link to="/signup" className="rounded-full bg-[#f3be4b] px-8 py-4 text-xl font-bold text-slate-900">Create new resume</Link>
          <Link to="/login" className="rounded-full border-2 border-blue-700 px-8 py-4 text-xl font-bold text-blue-700">Improve my resume</Link>
        </div>
      </div>
    </section>

    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-wrap gap-6 text-lg text-slate-500">
          <a href="#" className="hover:text-slate-700">About</a>
          <a href="#" className="hover:text-slate-700">Accessibility</a>
          <a href="#" className="hover:text-slate-700">Contact</a>
          <a href="#" className="hover:text-slate-700">Privacy Policy</a>
          <a href="#" className="hover:text-slate-700">Terms</a>
          <a href="#" className="hover:text-slate-700">Pricing</a>
        </div>
      </div>
    </footer>

    <Link to="/dashboard" className="fixed bottom-12 left-8 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#f3be4b] text-slate-900 shadow-lg">
      <PenSquare size={22} />
    </Link>
  </div>
);

export default HomePage;