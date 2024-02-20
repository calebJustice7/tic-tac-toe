import { useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { v1 } from "uuid";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function Home() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const queryClient = useQueryClient();

  const handleCreateRoom = async () => {
    socket.emit("create-room", v1(), (id: string) => {
      navigate({ to: "/game/" + id });
    });
  };

  const joinRoom = () => {
    socket.emit("join-room", roomId, (message: string) => {
      if (message === "Success") {
        toast.success("Room Joined");
        queryClient.removeQueries({ queryKey: ["room"] });
        navigate({ to: "/game/" + roomId });
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <>
      <h1 className="text-4xl text-center mt-10 px-2">Create a room and invite your friend!</h1>
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
            <input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              type="text"
              placeholder="Room ID"
              className="input mt-2 input-bordered w-full max-w-xs"
            />
            <button className="btn btn-primary" disabled={!roomId.length} onClick={joinRoom}>
              Join
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
