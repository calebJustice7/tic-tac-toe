import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";

function NavBar() {
  const { status, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = async () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="drawer">
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-black">
          <div className="flex-1 px-2 mx-2">
            <Link to="/">Tic Tac Toe</Link>
          </div>
          <div className="flex-none">
            <ul className="flex items-center">
              {status === "authenticated" && (
                <button onClick={logoutUser} className="btn btn-secondary text-secondary-content">
                  Logout
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
