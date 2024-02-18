import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useGetRoom = (id: string) => {
  const getRoom = async (): Promise<Room> => {
    return api.get(`/rooms/${id}`).then((res) => res.data);
  };

  return useQuery({
    queryFn: getRoom,
    queryKey: ["room", id],
  });
};
