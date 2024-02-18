import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { toast } from "react-toastify";

function NavBar() {
  const { status, logout } = useContext(AuthContext);
  const { id } = useParams({ from: "/game/$id" });
  const navigate = useNavigate();

  const logoutUser = async () => {
    logout();
    navigate({ to: "/login" });
  };

  const copyText = () => {
    navigator.clipboard.writeText(id);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="drawer">
      <div className="drawer-content flex flex-col">
        <div className="w-full bg-black flex space-around flex justify-between items-center p-2">
          <div className="px-2 mx-2">
            <Link to="/">Tic Tac Toe</Link>
          </div>
          {!!id && (
            <div className="mr-3 flex items-center">
              <div>Room ID: {id}</div>
              <svg
                onClick={copyText}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{ cursor: "pointer" }}
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </div>
          )}

          <div>
            {status === "authenticated" && (
              <button onClick={logoutUser} className="btn btn-secondary text-secondary-content">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
