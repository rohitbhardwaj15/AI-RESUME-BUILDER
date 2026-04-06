import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ResumePreview from "../components/preview/ResumePreview";
import { resumeApi } from "../services/endpoints";

const SharedResumePage = () => {
  const { slug } = useParams();
  const [resume, setResume] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await resumeApi.getShared(slug);
        setResume(data.data);
      } catch {
        setNotFound(true);
      }
    };
    load();
  }, [slug]);

  if (notFound) {
    return (
      <div className="grid min-h-screen place-items-center text-center">
        <div>
          <h1 className="text-3xl font-bold">Resume Not Found</h1>
          <p className="mt-2 text-slate-300">This resume is private or the link is invalid.</p>
          <Link to="/" className="mt-4 inline-block rounded-lg bg-sky-500 px-4 py-2 text-white">Go Home</Link>
        </div>
      </div>
    );
  }

  if (!resume) return <div className="grid min-h-screen place-items-center">Loading public resume...</div>;

  return (
    <div className="min-h-screen bg-slate-900 px-3 py-8">
      <div className="mx-auto max-w-[820px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <ResumePreview resume={resume} />
      </div>
    </div>
  );
};

export default SharedResumePage;