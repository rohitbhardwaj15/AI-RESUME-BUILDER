import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import ResumeCard from "../components/ResumeCard";
import { createResumeThunk, fetchResumesThunk } from "../store/resumeSlice";
import { resumeApi } from "../services/endpoints";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector((s) => s.resume);
  const [title, setTitle] = useState("My Resume");

  useEffect(() => {
    dispatch(fetchResumesThunk());
  }, [dispatch]);

  const createResume = async () => {
    const action = await dispatch(createResumeThunk({ title }));
    if (createResumeThunk.fulfilled.match(action)) {
      toast.success("Resume created");
      navigate(`/builder/${action.payload._id}`);
    }
  };

  const deleteResume = async (id) => {
    await resumeApi.remove(id);
    toast.success("Resume deleted");
    dispatch(fetchResumesThunk());
  };

  const toggleVisibility = async (id) => {
    const { data } = await resumeApi.toggleVisibility(id);
    const url = data.data.shareUrl;
    await navigator.clipboard.writeText(url);
    toast.success(`Visibility updated. Link copied: ${url}`);
    dispatch(fetchResumesThunk());
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 glass rounded-2xl p-4">
          <h1 className="text-2xl font-bold">Resume Dashboard</h1>
          <div className="mt-3 flex flex-col gap-2 md:flex-row">
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 md:max-w-md" />
            <button onClick={createResume} className="rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white">Create New Resume</button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-40 animate-pulse rounded-2xl bg-slate-800" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {list.map((resume) => (
              <ResumeCard key={resume._id} resume={resume} onDelete={deleteResume} onToggleVisibility={toggleVisibility} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;