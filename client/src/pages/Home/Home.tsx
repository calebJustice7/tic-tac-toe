import { useEffect } from "react";
import { useCreateRoom } from "../../queries/Room";
// import io from "socket.io-client";

function Home() {
  const createRoom = useCreateRoom();

  useEffect(() => {
    // console.log(io);
    // const socket = io(import.meta.env.VITE_SERVER_URL);
    // socket.on("connect", () => {
    // console.log("YEAH");
    // });
  }, []);

  const handleCreateRoom = async () => {
    const roomId = await createRoom.mutateAsync();
    console.log(roomId);
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
