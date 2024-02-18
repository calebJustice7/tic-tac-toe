import { FilterQuery, UpdateQuery } from "mongoose";
import Rooms from "./room";

const getRoom = (id: string) => {
    return Rooms.findOne({ roomId: id });
};

const createRoom = async (roomId: string, user1SocketId: string) => {
    const room = new Rooms({ user1: user1SocketId, roomId });

    return await room.save();
};

const getActiveRooms = (userSocketId: string) => {
    return Rooms.find({ $or: [{ user1: userSocketId }, { user2: userSocketId }] });
};

const deleteRooms = (roomIds: ObjectId[]) => {
    return Rooms.deleteMany({ _id: { $in: roomIds } });
};

const updateRoom = async (filter: FilterQuery<Room>, update: UpdateQuery<Room>) => {
    return await Rooms.updateOne(filter, update);
};

export default {
    getRoom,
    createRoom,
    deleteRooms,
    getActiveRooms,
    updateRoom,
};
