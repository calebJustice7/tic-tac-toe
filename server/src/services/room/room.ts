import mongoose, { Schema } from "mongoose";

const RoomsSchema = new Schema<Room>({
    user1: { type: String, required: false },
    user2: { type: String, required: false },
    roomId: { type: String, required: true },
});

const Rooms = mongoose.model<Room>("Rooms", RoomsSchema);

export default Rooms;
