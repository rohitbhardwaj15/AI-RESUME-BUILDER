import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import ResumeForm from "../components/forms/ResumeForm";
import ResumePreview from "../components/preview/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPickerPanel from "../components/ColorPickerPanel";
import { aiApi, resumeApi } from "../services/endpoints";
import { exportResumeToPDF } from "../utils/pdf";

const ResumeBuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const [resume, setResume] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsTips, setAtsTips] = useState([]);

  const shareUrl = useMemo(() => {
    if (!resume?.slug) return "";
    return `${window.location.origin}/shared/${resume.slug}`;
  }, [resume]);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await resumeApi.get(id);
        setResume(data.data);
      } catch {
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id, navigate]);

  const saveResume = async () => {
    if (!resume) return;
    setSaving(true);
    try {
      const { data } = await resumeApi.update(id, resume);
      setResume(data.data);
      toast.success("Resume saved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const toggleShare = async () => {
    const { data } = await resumeApi.toggleVisibility(id);
    setResume((prev) => ({ ...prev, visibility: data.data.visibility }));
    await navigator.clipboard.writeText(shareUrl);
    toast.success(`Visibility: ${data.data.visibility}. Link copied.`);
  };

  const downloadPdf = async () => {
    if (previewRef.current) await exportResumeToPDF(previewRef.current, resume.title || "resume");
  };

  const checkATS = async () => {
    setAtsLoading(true);
    try {
      const payload = {
        targetRole: resume.experience?.[0]?.role,
        resumeText: `${resume.summary}\n${resume.experience.map((e) => e.description).join("\n")}`
      };
      const { data } = await aiApi.atsSuggestions(payload);
      setAtsTips(data.data.suggestions || []);
    } finally {
      setAtsLoading(false);
    }
  };

  if (loading) return <div className="grid min-h-screen place-items-center">Loading builder...</div>;
  if (!resume) return null;

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-[1600px] px-4 py-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <button onClick={saveResume} className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white">{saving ? "Saving..." : "Save"}</button>
          <button onClick={downloadPdf} className="rounded-lg border border-slate-700 px-4 py-2 text-sm">Download PDF</button>
          <button onClick={toggleShare} className="rounded-lg border border-slate-700 px-4 py-2 text-sm">{resume.visibility === "public" ? "Make Private" : "Make Public"}</button>
          <button onClick={checkATS} className="rounded-lg border border-slate-700 px-4 py-2 text-sm">{atsLoading ? "Analyzing..." : "ATS Suggestions"}</button>
          <button onClick={() => navigator.clipboard.writeText(shareUrl)} className="rounded-lg border border-slate-700 px-4 py-2 text-sm">Copy Share Link</button>
        </div>

        {atsTips.length > 0 && (
          <div className="mb-4 glass rounded-xl p-3">
            <p className="mb-2 text-sm font-semibold text-sky-300">ATS Improvement Tips</p>
            <ul className="list-inside list-disc text-sm text-slate-200">
              {atsTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[500px_1fr]">
          <div className="space-y-4">
            <TemplateSelector value={resume.template} onChange={(template) => setResume((prev) => ({ ...prev, template }))} />
            <ColorPickerPanel value={resume.accentColor} onChange={(accentColor) => setResume((prev) => ({ ...prev, accentColor }))} />
            <ResumeForm resume={resume} setResume={setResume} />
          </div>

          <div className="glass rounded-2xl p-4">
            <div ref={previewRef} className="mx-auto max-w-[794px] overflow-auto rounded-lg bg-white shadow-2xl">
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
