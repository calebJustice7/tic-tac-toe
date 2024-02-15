import { Server, Socket } from "socket.io";
import { AsyncRequestHandler, syncErrorWrapper } from "../../error/errorWrapper";

export const initializeSocketListeners = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(socket);
        console.log("A user connected");
    });
};

const createRoom: AsyncRequestHandler = async (req, res) => {
    const roomId = "123";

    res.status(200).send(roomId);
};

export default {
    createRoom: syncErrorWrapper(createRoom),
    initializeSocketListeners,
};
