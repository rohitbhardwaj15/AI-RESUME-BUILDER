import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";

const Navbar = ({ variant = "dark" }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const isLight = variant === "light";

  return (
    <nav className={isLight ? "sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur" : "sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur"}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className={isLight ? "flex items-center gap-1.5 text-[38px] font-black lowercase text-[#162747]" : "text-lg font-bold text-sky-300"}>
          {isLight ? (
            <>
              <span>zety</span>
              <span className="inline-block h-0 w-0 border-b-[7px] border-l-[11px] border-t-[7px] border-b-transparent border-t-transparent border-l-[#4b8cf4]" />
            </>
          ) : (
            "ResumeForge"
          )}
        </Link>

        <div className="flex items-center gap-3">
          {!token ? (
            <>
              <Link to="/login" className={isLight ? "rounded-full border border-slate-300 px-4 py-1.5 text-sm font-semibold text-slate-700 hover:border-slate-500" : "rounded-lg border border-slate-700 px-3 py-1.5 text-sm hover:border-sky-400"}>
                {isLight ? "MY ACCOUNT" : "Login"}
              </Link>
              {!isLight && (
                <Link to="/signup" className="rounded-lg bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-sky-600">
                  Get Started
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/dashboard" className={isLight ? "rounded-full border border-slate-300 px-4 py-1.5 text-sm font-semibold text-slate-700 hover:border-slate-500" : "rounded-lg border border-slate-700 px-3 py-1.5 text-sm hover:border-sky-400"}>
                Dashboard
              </Link>
              <button onClick={onLogout} className={isLight ? "rounded-full bg-slate-800 px-4 py-1.5 text-sm font-semibold text-white hover:bg-black" : "rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-600"}>
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
