import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { loginThunk } from "../store/authSlice";
import Navbar from "../components/layout/Navbar";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    const action = await dispatch(loginThunk(form));
    if (loginThunk.fulfilled.match(action)) {
      toast.success("Welcome back");
      navigate("/dashboard");
    } else toast.error(action.payload || "Login failed");
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-md px-4 py-16">
        <form onSubmit={onSubmit} className="glass rounded-2xl p-6">
          <h1 className="mb-4 text-2xl font-bold">Login</h1>
          <input className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          <input type="password" className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" placeholder="Password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
          <button disabled={loading} className="w-full rounded-lg bg-sky-500 py-2 font-semibold text-white">{loading ? "Please wait..." : "Login"}</button>
          <p className="mt-3 text-sm text-slate-300">No account? <Link to="/signup" className="text-sky-300">Create one</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;