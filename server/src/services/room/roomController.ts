import { Server, Socket } from "socket.io";
import { AsyncRequestHandler, asyncErrorWrapper } from "../../error/errorWrapper";
import { HttpStatusCode } from "axios";
import { addUserToRoom, createRoom, getRoom, handleDeleteRoom, getRoomBySocketId, checkForWin } from "./roomServices";
import { getRoomValidator } from "./roomValidators";
import z from "zod";

export const initializeSocketListeners = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        socket.on("create-room", async (id: string, cb: (id: string) => void) => {
            await createRoom(id, socket.id);

            socket.join(id);
            cb(id);
        });

        socket.on("join-room", async (id: string, cb: (message: string) => void) => {
            const room = await getRoom(id);
            if (!room) cb("Room Not Found");
            if (room && room.user1 && room.user2) cb("Room Full");
            else if (room && !room.user1) {
                await addUserToRoom("user1", socket.id, id);
                socket.join(id);
                cb("Success");
                socket.to(id).emit("user-join", `User ${socket.id} joined`, { ...room.toObject(), user1: socket.id });
            } else if (room && !room.user2) {
                await addUserToRoom("user2", socket.id, id);
                socket.join(id);
                cb("Success");
                socket.to(id).emit("user-join", `User ${socket.id} joined`, { ...room.toObject(), user2: socket.id });
            } else {
                cb("Unknown Error");
            }
        });

        socket.on("player-move", (rowIdx: number, squareIdx: number, game: ("x" | "o" | null)[][], room: Room) => {
            const playersChar = socket.id === room.user1 ? "x" : "o";
            const nextPlayersTurn = socket.id === room.user1 ? room.user2 : room.user1;
            game[rowIdx][squareIdx] = playersChar;
            const result = checkForWin(game, playersChar);
            socket.nsp.to(room.roomId).emit("player-move", game, nextPlayersTurn, result, socket.id);
        });

        socket.on("disconnect", async () => {
            const room = await getRoomBySocketId(socket.id);
            await handleDeleteRoom(socket.id);
            if (room) {
                socket.to(room).emit("user-leave", `User ${socket.id} left the game`, room);
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
