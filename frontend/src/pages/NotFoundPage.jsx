import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="grid min-h-screen place-items-center px-4 text-center">
    <div>
      <h1 className="text-5xl font-black text-sky-300">404</h1>
      <p className="mt-2 text-slate-300">Resume or page not found.</p>
      <Link to="/" className="mt-4 inline-block rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white">Back Home</Link>
    </div>
  </div>
);

export default NotFoundPage;