import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PenSquare, Search } from "lucide-react";
import Navbar from "../components/layout/Navbar";

const ctaPrimary = "rounded-full bg-[#f4c04d] px-8 py-3 text-[32px] font-bold text-[#14213d] shadow-sm hover:brightness-95";
const ctaSecondary = "rounded-full border-2 border-[#354abf] px-8 py-3 text-[32px] font-bold text-[#233ca8] hover:bg-[#f3f7ff]";

const TemplateCard = ({ tone = "blue" }) => {
  const leftColor = tone === "blue" ? "#0c567b" : tone === "pink" ? "#d7b0e6" : tone === "cream" ? "#f3f7ff" : "#c8d8f4";
  return (
    <div className="relative h-[322px] w-[232px] overflow-hidden rounded-lg border border-slate-300 bg-white">
      <div className="absolute inset-y-0 left-0 w-[30%]" style={{ background: leftColor }} />
      <div className="absolute right-3 top-4 left-[35%] space-y-1.5">
        <div className="h-2.5 w-20 rounded bg-slate-400" />
        <div className="h-1.5 w-14 rounded bg-slate-300" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-1.5 w-full rounded bg-slate-200" />
        ))}
        <div className="mt-2 h-2 w-14 rounded bg-slate-300" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={`x${i}`} className="h-1.5 w-full rounded bg-slate-200" />
        ))}
      </div>
      <button className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-[#2f71de] text-white">+</button>
    </div>
  );
};

const StepIllustration = ({ variant }) => (
  <div className="mx-auto mb-6 h-44 w-72 rounded-[40px] bg-[#e8eef5] p-5">
    {variant === 1 && (
      <div className="relative h-full">
        <div className="absolute left-5 top-4 h-28 w-16 -rotate-12 rounded bg-[#f0ad53]" />
        <div className="absolute left-12 top-2 h-34 w-24 -rotate-6 rounded border border-slate-300 bg-white" />
        <div className="absolute left-20 top-0 h-36 w-24 -rotate-3 rounded border border-slate-300 bg-[#f8fafc]" />
      </div>
    )}
    {variant === 2 && (
      <div className="relative h-full">
        <div className="absolute left-9 top-3 h-24 w-44 rounded-lg border border-slate-300 bg-white" />
        <div className="absolute left-0 top-14 w-40 rounded-lg border border-slate-300 bg-white p-2">
          <div className="mb-2 h-2 w-24 rounded bg-slate-300" />
          <div className="h-2 w-32 rounded bg-slate-200" />
        </div>
      </div>
    )}
    {variant === 3 && (
      <div className="relative h-full">
        <div className="absolute right-8 top-4 h-34 w-28 rounded-lg border border-slate-300 bg-white" />
        <div className="absolute left-8 top-12 rounded bg-[#0f2242] px-4 py-2 text-white">COLOR</div>
      </div>
    )}
  </div>
);

const HomePage = () => (
  <div className="bg-[#f5f7fb] text-slate-800">
    <Navbar variant="light" />

    <section className="border-b border-slate-200 bg-[#e9edf5]">
      <div className="mx-auto grid max-w-[1040px] grid-cols-1 items-center gap-8 px-4 py-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="mb-3 text-[45px] font-bold text-[#1f3fbb]">Fast. Easy. Effective.</p>
          <h1 className="max-w-xl text-[67px] font-black leading-[1.05] text-[#121f3f]">Zety. The Best Resume Maker Online.</h1>
          <p className="mt-4 max-w-[620px] text-[36px] leading-[1.35] text-slate-700">
            Whether you want to build a new resume from scratch or improve an existing one, let ResumeForge help you present your work.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/signup" className={ctaPrimary}>Create new resume</Link>
            <Link to="/login" className={ctaSecondary}>Improve my resume</Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="relative mx-auto max-w-[500px]">
            <div className="absolute -left-6 top-12 z-10 h-24 w-24 rounded-full border-[6px] border-[#f4c04d] bg-white shadow-sm" />
            <div className="relative overflow-hidden rounded-xl border border-slate-300 bg-white shadow-lg">
              <div className="grid grid-cols-[24%_1fr]">
                <div className="bg-[#a73418]" />
                <div className="p-4">
                  <div className="h-4 w-44 rounded bg-[#a73418]/80" />
                  <div className="mt-2 h-2 w-20 rounded bg-slate-300" />
                  {Array.from({ length: 22 }).map((_, i) => (
                    <div key={i} className="mt-1.5 h-1.5 rounded bg-slate-200" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-slate-200 bg-white/95">
        <div className="mx-auto flex max-w-[1040px] flex-wrap items-center justify-between gap-6 px-4 py-4 text-slate-800">
          <div className="flex items-center gap-3 text-[24px]">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#f4c04d] text-slate-900"><PenSquare size={19} /></div>
            <div>
              <p className="font-semibold">higher chance of getting a job*</p>
              <p className="text-[24px] text-emerald-600">42% higher response rate from recruiters</p>
            </div>
          </div>
          <p className="text-[30px] font-bold text-slate-700">Our users have been hired at</p>
          <div className="flex gap-6 text-[42px] font-black text-slate-700">
            <span>TCS</span><span>amazon</span><span>paytm</span><span>Infosys</span>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1040px] px-4 py-12">
      <h2 className="mb-8 text-center text-[58px] font-black text-[#12254a]">Pick a resume template</h2>
      <div className="flex flex-wrap justify-center gap-6">
        <TemplateCard tone="blue" />
        <TemplateCard tone="pink" />
        <TemplateCard tone="cream" />
        <TemplateCard tone="light" />
      </div>
      <div className="mt-8 text-center">
        <button className={ctaPrimary}>View more templates</button>
      </div>
    </section>

    <section className="mx-auto max-w-[1040px] px-4 py-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="text-center">
          <StepIllustration variant={1} />
          <h3 className="text-[44px] font-bold text-[#243651]">Pick a resume template.</h3>
          <p className="mx-auto mt-2 max-w-[320px] text-[34px] text-slate-700">Choose a sleek design and layout to get started.</p>
        </div>
        <div className="text-center">
          <StepIllustration variant={2} />
          <h3 className="text-[44px] font-bold text-[#243651]">Fill in the blanks.</h3>
          <p className="mx-auto mt-2 max-w-[320px] text-[34px] text-slate-700">Type in a few words. Let the wizard fill the rest.</p>
        </div>
        <div className="text-center">
          <StepIllustration variant={3} />
          <h3 className="text-[44px] font-bold text-[#243651]">Customize your document.</h3>
          <p className="mx-auto mt-2 max-w-[320px] text-[34px] text-slate-700">Make it truly yours. Uniqueness in a few clicks.</p>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/signup" className={ctaPrimary}>Create new resume</Link>
        <Link to="/login" className={ctaSecondary}>Improve my resume</Link>
      </div>
    </section>

    <section className="mx-auto grid max-w-[1040px] grid-cols-1 items-center gap-8 px-4 py-12 lg:grid-cols-2">
      <div className="rounded-[36px] bg-[#e8eef5] p-7">
        <div className="mx-auto max-w-[380px] rounded-xl border border-slate-300 bg-white p-4">
          <div className="mb-3 h-3 w-32 rounded bg-slate-300" />
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="mb-1.5 h-2 rounded bg-slate-200" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {["Enhance your resume with our expert content", "Resume and cover letter in one place", "Professionally designed templates", "Expert tips & guidance", "Apply for jobs with confidence"].map((item, index) => (
          <div key={item} className={index === 1 ? "rounded-md bg-[#e5edf6] p-4" : "p-1"}>
            <p className="text-[44px] font-bold text-[#101a2f]">
              <span className="mr-3 inline-grid h-8 w-8 place-items-center rounded-full bg-[#35cc84] text-[20px] font-black text-[#092312]">{index + 1}</span>
              {item}
            </p>
            {index === 1 && <p className="mt-2 text-[34px] text-slate-700">Create a brand for yourself with matching resume and cover letter templates.</p>}
          </div>
        ))}
        <div className="pt-2 flex gap-4">
          <Link to="/signup" className={ctaPrimary}>Create new resume</Link>
          <Link to="/login" className={ctaSecondary}>Improve my resume</Link>
        </div>
      </div>
    </section>

    <footer className="mx-auto max-w-[1040px] px-4 pb-8 pt-2 text-slate-500">
      <div className="flex items-center justify-between text-[20px]">
        <p>*Based on survey responses shared by job seekers</p>
        <p>Call Us <a href="#" className="text-[#2f71de] underline">800-985-7561</a></p>
      </div>
      <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-300 pt-4 text-[30px]">
        <a href="#">About</a>
        <a href="#">Accessibility</a>
        <a href="#">Contact</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Our Resume Templates</a>
        <a href="#">Pricing</a>
      </div>
    </footer>

    <Link to="/dashboard" className="fixed bottom-12 left-8 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#f4c04d] text-[#14213d] shadow-md">
      <PenSquare size={20} />
    </Link>

    <button className="fixed bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-slate-200 text-slate-700 shadow"> 
      <Search size={18} />
    </button>
  </div>
);

export default HomePage;