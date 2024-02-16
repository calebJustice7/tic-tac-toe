import Rooms from "./room";

const getRoom = (id: string) => {
    return Rooms.findOne({ roomId: id });
};

const createRoom = (roomId: string, user1SocketId: string) => {
    const room = new Rooms({ user1: user1SocketId, roomId });

    return room.save();
};

const getActiveRooms = (userSocketId: string) => {
    return Rooms.find({ $or: [{ user1: userSocketId }, { user2: userSocketId }] });
};

const deleteRooms = (roomIds: ObjectId[]) => {
    return Rooms.deleteMany({ _id: { $in: roomIds } });
};

export default {
    getRoom,
    createRoom,
    deleteRooms,
    getActiveRooms,
};
