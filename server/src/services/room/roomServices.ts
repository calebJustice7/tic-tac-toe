import rDAL from "./roomDAL";

export const getRoom = async (id: string) => {
    return rDAL.getRoom(id);
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

    return rDAL.deleteRooms(roomsIdsToDelete);
};
