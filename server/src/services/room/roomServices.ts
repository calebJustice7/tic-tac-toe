import rDAL from "./roomDAL";

export const getRoom = async (id: string) => {
    return await rDAL.getRoom(id);
};

export const createRoom = async (roomId: string, user1SocketId: string) => {
    return rDAL.createRoom(roomId, user1SocketId);
};

export const handleDeleteRoom = async (userSocketId: string) => {
    const activeRooms = await rDAL.getActiveRooms(userSocketId);

    const roomsIdsToDelete = activeRooms
        .filter((room) => {
            if (room.user1 === userSocketId && !room.user2) return true;
            if (room.user2 === userSocketId && !room.user1) return true;
            return false;
        })
        .map((room) => room._id);

    const updatePromises = activeRooms
        .filter((room) => {
            if (room.user1 && room.user2) return true;
            else return false;
        })
        .map((room) => {
            return rDAL.updateRoom(
                { roomId: room.roomId },
                { $unset: { [room.user1 === userSocketId ? "user1" : "user2"]: true } },
            );
        });

    return Promise.all([rDAL.deleteRooms(roomsIdsToDelete), ...updatePromises]);
};

export const addUserToRoom = async (userPosition: "user1" | "user2", userSocketId: string, roomId: string) => {
    return await rDAL.updateRoom({ roomId: roomId }, { [userPosition]: userSocketId });
};

export const getRoomBySocketId = async (userSocketId: string) => {
    const rooms = await rDAL.getActiveRooms(userSocketId);
    if (rooms && rooms.length) {
        return rooms[0].roomId;
    } else {
        return null;
    }
};

// 1st row
// 2nd row
// 3rd row

// 1st col
// 2nd col
// 3rd col

// corner top
// corner bottom
export const checkForWin = (game: ("x" | "o" | null)[][], playersChar: "x" | "o") => {
    if (game[0].every((char) => char === playersChar)) return "win";
    if (game[1].every((char) => char === playersChar)) return "win";
    if (game[2].every((char) => char === playersChar)) return "win";

    if (game[0][0] === playersChar && game[1][0] === playersChar && game[2][0] === playersChar) return "win";
    if (game[0][1] === playersChar && game[1][1] === playersChar && game[2][1] === playersChar) return "win";
    if (game[0][2] === playersChar && game[1][2] === playersChar && game[2][2] === playersChar) return "win";

    if (game[0][0] === playersChar && game[1][1] === playersChar && game[2][2] === playersChar) return "win";
    if (game[0][2] === playersChar && game[1][1] === playersChar && game[2][0] === playersChar) return "win";

    if (
        game[0].every((char) => char !== null) &&
        game[1].every((char) => char !== null) &&
        game[2].every((char) => char !== null)
    )
        return "draw";

    return "no-change";
};
