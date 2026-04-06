import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold text-sky-300">
          ResumeForge AI
        </Link>

        <div className="flex items-center gap-3">
          {!token ? (
            <>
              <Link to="/login" className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm hover:border-sky-400">
                Login
              </Link>
              <Link to="/signup" className="rounded-lg bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-600">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm hover:border-sky-400">
                Dashboard
              </Link>
              <button onClick={onLogout} className="rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-600">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;