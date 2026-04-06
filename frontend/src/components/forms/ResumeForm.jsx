import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { aiApi, uploadApi } from "../../services/endpoints";

const inputCls = "w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm";

const Section = ({ title, children, actions }) => (
  <section className="glass rounded-xl p-4">
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-sm font-bold uppercase tracking-wide text-sky-300">{title}</h3>
      {actions}
    </div>
    <div className="space-y-3">{children}</div>
  </section>
);

const AiButton = ({ onClick, loading, children }) => (
  <button onClick={onClick} disabled={loading} className="flex items-center gap-2 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60">
    <Sparkles size={14} /> {loading ? "Thinking..." : children}
  </button>
);

const ResumeForm = ({ resume, setResume }) => {
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [expLoadingIndex, setExpLoadingIndex] = useState(-1);
  const [uploading, setUploading] = useState(false);
  const [removeBackground, setRemoveBackground] = useState(false);

  const updateField = (path, value) => {
    if (path.includes(".")) {
      const [root, key] = path.split(".");
      setResume((prev) => ({ ...prev, [root]: { ...prev[root], [key]: value } }));
      return;
    }
    setResume((prev) => ({ ...prev, [path]: value }));
  };

  const updateArrayItem = (key, idx, field, value) => {
    setResume((prev) => {
      const list = [...prev[key]];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, [key]: list };
    });
  };

  const addItem = (key, item) => setResume((prev) => ({ ...prev, [key]: [...prev[key], item] }));
  const removeItem = (key, idx) => setResume((prev) => ({ ...prev, [key]: prev[key].filter((_, i) => i !== idx) }));

  const onEnhanceSummary = async () => {
    setSummaryLoading(true);
    try {
      const { data } = await aiApi.enhanceSummary({
        role: resume.experience?.[0]?.role,
        skills: resume.skills.join(", "),
        summary: resume.summary
      });
      updateField("summary", data.data.content || "");
    } finally {
      setSummaryLoading(false);
    }
  };

  const onImproveExperience = async (index) => {
    setExpLoadingIndex(index);
    try {
      const item = resume.experience[index];
      const { data } = await aiApi.improveExperience({ role: item.role, text: item.description });
      updateArrayItem("experience", index, "description", data.data.content || item.description);
    } finally {
      setExpLoadingIndex(-1);
    }
  };

  const onUploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("removeBackground", String(removeBackground));

    setUploading(true);
    try {
      const { data } = await uploadApi.uploadProfileImage(formData);
      updateField("personalInfo.imageUrl", data.data.url);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Section title="General">
        <input className={inputCls} value={resume.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Resume title" />
      </Section>

      <Section title="Personal Info">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input className={inputCls} placeholder="Full name" value={resume.personalInfo.fullName} onChange={(e) => updateField("personalInfo.fullName", e.target.value)} />
          <input className={inputCls} placeholder="Email" value={resume.personalInfo.email} onChange={(e) => updateField("personalInfo.email", e.target.value)} />
          <input className={inputCls} placeholder="Phone" value={resume.personalInfo.phone} onChange={(e) => updateField("personalInfo.phone", e.target.value)} />
          <input className={inputCls} placeholder="Location" value={resume.personalInfo.location} onChange={(e) => updateField("personalInfo.location", e.target.value)} />
        </div>

        <div className="rounded-lg border border-slate-700 p-3">
          <label className="mb-2 block text-xs">Upload profile image</label>
          <input type="file" accept="image/*" onChange={onUploadImage} className="text-xs" />
          <label className="mt-2 flex items-center gap-2 text-xs text-slate-300">
            <input type="checkbox" checked={removeBackground} onChange={(e) => setRemoveBackground(e.target.checked)} />
            Remove background (if configured)
          </label>
          {uploading && <p className="mt-2 text-xs text-sky-300">Uploading image...</p>}
          {resume.personalInfo.imageUrl && <img src={resume.personalInfo.imageUrl} alt="profile" className="mt-3 h-20 w-20 rounded-full object-cover" />}
        </div>
      </Section>

      <Section title="Professional Summary" actions={<AiButton loading={summaryLoading} onClick={onEnhanceSummary}>Enhance Summary</AiButton>}>
        <motion.textarea
          animate={summaryLoading ? { opacity: [1, 0.6, 1] } : { opacity: 1 }}
          transition={{ duration: 1.2, repeat: summaryLoading ? Infinity : 0 }}
          className={`${inputCls} min-h-28`}
          value={resume.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          placeholder="Write a short summary"
        />
      </Section>

      <Section title="Experience" actions={<button onClick={() => addItem("experience", { role: "", company: "", startDate: "", endDate: "", location: "", description: "" })} className="rounded-lg border border-slate-700 px-2 py-1 text-xs">+ Add</button>}>
        {resume.experience.map((exp, idx) => (
          <div key={idx} className="rounded-lg border border-slate-700 p-3">
            <div className="mb-2 grid grid-cols-1 gap-2 md:grid-cols-2">
              <input className={inputCls} placeholder="Role" value={exp.role} onChange={(e) => updateArrayItem("experience", idx, "role", e.target.value)} />
              <input className={inputCls} placeholder="Company" value={exp.company} onChange={(e) => updateArrayItem("experience", idx, "company", e.target.value)} />
            </div>
            <textarea className={`${inputCls} min-h-24`} placeholder="Description" value={exp.description} onChange={(e) => updateArrayItem("experience", idx, "description", e.target.value)} />
            <div className="mt-2 flex gap-2">
              <AiButton loading={expLoadingIndex === idx} onClick={() => onImproveExperience(idx)}>Improve Job Description</AiButton>
              <button onClick={() => removeItem("experience", idx)} className="rounded-lg bg-rose-500 px-3 py-1.5 text-xs text-white">Remove</button>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Education" actions={<button onClick={() => addItem("education", { degree: "", institution: "", startDate: "", endDate: "", description: "" })} className="rounded-lg border border-slate-700 px-2 py-1 text-xs">+ Add</button>}>
        {resume.education.map((edu, idx) => (
          <div key={idx} className="rounded-lg border border-slate-700 p-3">
            <input className={`${inputCls} mb-2`} placeholder="Degree" value={edu.degree} onChange={(e) => updateArrayItem("education", idx, "degree", e.target.value)} />
            <input className={inputCls} placeholder="Institution" value={edu.institution} onChange={(e) => updateArrayItem("education", idx, "institution", e.target.value)} />
            <button onClick={() => removeItem("education", idx)} className="mt-2 rounded-lg bg-rose-500 px-3 py-1.5 text-xs text-white">Remove</button>
          </div>
        ))}
      </Section>

      <Section title="Projects" actions={<button onClick={() => addItem("projects", { name: "", techStack: "", link: "", description: "" })} className="rounded-lg border border-slate-700 px-2 py-1 text-xs">+ Add</button>}>
        {resume.projects.map((project, idx) => (
          <div key={idx} className="rounded-lg border border-slate-700 p-3">
            <input className={`${inputCls} mb-2`} placeholder="Project name" value={project.name} onChange={(e) => updateArrayItem("projects", idx, "name", e.target.value)} />
            <textarea className={`${inputCls} min-h-20`} placeholder="Description" value={project.description} onChange={(e) => updateArrayItem("projects", idx, "description", e.target.value)} />
            <button onClick={() => removeItem("projects", idx)} className="mt-2 rounded-lg bg-rose-500 px-3 py-1.5 text-xs text-white">Remove</button>
          </div>
        ))}
      </Section>

      <Section title="Skills">
        <input
          className={inputCls}
          value={resume.skills.join(", ")}
          onChange={(e) => updateField("skills", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))}
          placeholder="React, Node.js, MongoDB"
        />
      </Section>
    </div>
  );
};

export default ResumeForm;