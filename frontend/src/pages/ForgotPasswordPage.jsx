import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import { authApi } from "../services/endpoints";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await authApi.forgotPassword({ email });
      setResetUrl(data?.data?.resetUrl || "");
      toast.success("If the email exists, reset instructions are ready.");
    } catch (err) {
      const fallbackMsg =
        window.location.hostname.includes("vercel.app")
          ? "Reset link request failed. Configure VITE_API_URL in Vercel to your deployed backend API."
          : "Failed to request reset link";
      toast.error(err.response?.data?.message || fallbackMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-md px-4 py-16">
        <form onSubmit={onSubmit} className="glass rounded-2xl p-6">
          <h1 className="mb-3 text-2xl font-bold">Forgot Password</h1>
          <p className="mb-4 text-sm text-slate-300">Enter your registered email to generate a password reset link.</p>

          <input
            className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button disabled={loading} className="w-full rounded-lg bg-sky-500 py-2 font-semibold text-white">
            {loading ? "Generating link..." : "Send Reset Link"}
          </button>

          {resetUrl && (
            <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900 p-3 text-xs text-slate-200">
              <p className="mb-1 font-semibold">Reset link (dev preview):</p>
              <Link to={resetUrl.replace(window.location.origin, "")} className="break-all text-sky-300 underline">
                {resetUrl}
              </Link>
            </div>
          )}

          <p className="mt-4 text-sm text-slate-300">
            Remembered your password? <Link to="/login" className="text-sky-300">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
