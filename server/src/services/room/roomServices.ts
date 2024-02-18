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
