import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import { authApi } from "../services/endpoints";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword(token, { password });
      toast.success("Password reset successful. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-md px-4 py-16">
        <form onSubmit={onSubmit} className="glass rounded-2xl p-6">
          <h1 className="mb-3 text-2xl font-bold">Reset Password</h1>
          <p className="mb-4 text-sm text-slate-300">Set your new password below.</p>

          <input
            type="password"
            className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button disabled={loading} className="w-full rounded-lg bg-sky-500 py-2 font-semibold text-white">
            {loading ? "Updating password..." : "Reset Password"}
          </button>

          <p className="mt-4 text-sm text-slate-300">
            Back to <Link to="/login" className="text-sky-300">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;