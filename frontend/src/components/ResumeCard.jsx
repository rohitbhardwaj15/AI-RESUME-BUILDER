import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ResumeCard = ({ resume, onDelete, onToggleVisibility }) => (
  <motion.div whileHover={{ y: -4 }} className="glass rounded-2xl p-4">
    <h3 className="text-lg font-bold">{resume.title}</h3>
    <p className="mt-1 text-xs text-slate-300">Updated: {new Date(resume.updatedAt).toLocaleString()}</p>
    <p className="mt-1 text-xs uppercase tracking-wide text-sky-300">{resume.visibility}</p>

    <div className="mt-4 flex flex-wrap gap-2">
      <Link to={`/builder/${resume._id}`} className="rounded-lg bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white">
        Edit
      </Link>
      <button onClick={() => onToggleVisibility(resume._id)} className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm">
        Toggle Share
      </button>
      <button onClick={() => onDelete(resume._id)} className="rounded-lg bg-rose-500 px-3 py-1.5 text-sm text-white">
        Delete
      </button>
    </div>
  </motion.div>
);

export default ResumeCard;