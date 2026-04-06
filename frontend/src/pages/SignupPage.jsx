import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { registerThunk } from "../store/authSlice";
import Navbar from "../components/layout/Navbar";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    const action = await dispatch(registerThunk(form));
    if (registerThunk.fulfilled.match(action)) {
      toast.success("Account created");
      navigate("/dashboard");
    } else toast.error(action.payload || "Signup failed");
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-md px-4 py-16">
        <form onSubmit={onSubmit} className="glass rounded-2xl p-6">
          <h1 className="mb-4 text-2xl font-bold">Create Account</h1>
          <input className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          <input className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          <input type="password" className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="Password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
          <div className="mb-4 text-right">
            <Link to="/forgot-password" className="text-sm text-sky-300 hover:underline">Forgot password?</Link>
          </div>
          <button disabled={loading} className="w-full rounded-lg bg-sky-500 py-2 font-semibold text-white">{loading ? "Please wait..." : "Sign up"}</button>
          <p className="mt-3 text-sm text-slate-300">Already registered? <Link to="/login" className="text-sky-300">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
