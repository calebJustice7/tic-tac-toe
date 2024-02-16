import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import { v1 } from "uuid";
import { useNavigate } from "@tanstack/react-router";

function Home() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    socket.emit("create-room", v1(), (id: string) => {
      navigate({ to: "/game/" + id });
    });
  };

  return (
    <>
      <h1 className="text-4xl text-center mt-10">Create a room and invite your friend!</h1>
      <div>
        <div className="container mx-auto text-center">
          <button onClick={handleCreateRoom} className="btn btn-secondary text-secondary-content mt-3">
            Create Room
          </button>
        </div>
        <div className="my-8 text-center text-2xl">or</div>
        <div className="mt-10 text-center container mx-auto">
          <div className="mr-3 text-2xl">Join a room</div>
          <div>
            <input type="text" placeholder="Room ID" className="input mt-2 input-bordered w-full max-w-xs" />
            <button className="btn btn-primary">Join</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
