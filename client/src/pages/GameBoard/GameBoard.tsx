import { useNavigate, useParams } from "@tanstack/react-router";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { useGetRoom } from "../../queries/Room";

function GameBoard() {
  const { id } = useParams({ from: "/game/$id" });
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const query = useGetRoom(id);

  useEffect(() => {
    console.log(query.data, socket);
    if ((query.status === "success" && !query.data) || (query.data && query.data.user1 && query.data.user2)) {
      navigate({ to: "/" });
    }
    // eslint-disable-next-line
  }, [query.data]);

  return (
    <div>
      <button className="btn btn-primary">Welcome</button>
    </div>
  );
}

export default GameBoard;
