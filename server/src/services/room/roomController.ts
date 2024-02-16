import { Server, Socket } from "socket.io";
import { AsyncRequestHandler, asyncErrorWrapper } from "../../error/errorWrapper";
import { HttpStatusCode } from "axios";
import { createRoom, getRoom, handleDeleteRoom } from "./roomServices";
import { getRoomValidator } from "./roomValidators";
import z from "zod";

export const initializeSocketListeners = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        socket.on("create-room", async (id: string, cb: (id: string) => void) => {
            socket.join(id);
            await createRoom(id, socket.id);
            cb(id);
        });

        socket.on("disconnect", () => {
            try {
                handleDeleteRoom(socket.id);
            } catch (er) {
                console.log(er, "OHNO");
            }
        });
    });
};

const getRoomController: AsyncRequestHandler = async (req, res) => {
    const { params } = req as unknown as z.infer<typeof getRoomValidator>;

    const room = await getRoom(params.id);

    res.status(HttpStatusCode.Ok).json(room);
};

export default {
    initializeSocketListeners,
    getRoom: asyncErrorWrapper(getRoomController),
};
