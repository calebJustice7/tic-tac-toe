import { useMutation } from "@tanstack/react-query";
import api from "../api/api";

export const useCreateRoom = () => {
  const createRoom = async (): Promise<string> => {
    return api.post("/rooms").then((res) => res.data);
  };

  return useMutation({
    mutationFn: createRoom,
  });
};
