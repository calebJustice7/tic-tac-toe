import { useNavigate, useParams } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { useGetRoom } from "../../queries/Room";
import { toast } from "react-toastify";
import GameBoard from "../../components/GameBoard";
import { useQueryClient } from "@tanstack/react-query";

function Game() {
  const { id } = useParams({ from: "/game/$id" });
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const query = useGetRoom(id);
  const [game, setGame] = useState<("x" | "o" | null)[][]>(new Array(3).fill(new Array(3).fill(null)));
  const queryClient = useQueryClient();
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState<string | null>(null);

  const resetGame = () => {
    setGame(new Array(3).fill(new Array(3).fill(null)));

    if (!query.data) {
      toast.error("An unknown error occured");
      return;
    }
    if (query.data.user1 && query.data.user2) {
      setCurrentPlayerTurn(query.data.user1);
    } else {
      setCurrentPlayerTurn(null);
    }
  };

  useEffect(() => {
    socket.on("user-join", (msg: string) => {
      toast.success(msg);
      queryClient.refetchQueries({ queryKey: ["room"] });
      resetGame();
    });

    socket.on("user-leave", (msg: string) => {
      toast.warning(msg);
      queryClient.refetchQueries({ queryKey: ["room"] });
      resetGame();
    });

    socket.on("player-move", (game: ("x" | "o" | null)[][], userSocketId: string) => {
      setGame(game);
      setCurrentPlayerTurn(userSocketId);
    });

    return () => {
      socket.off("user-join");
      socket.off("user-leave");
      socket.off("player-move");
    };
    // eslint-disable-next-line
  }, [query.data, game]);

  const updateBoard = (rowIdx: number, squareIdx: number) => {
    if (!query.data) return;
    socket.emit("player-move", rowIdx, squareIdx, game, query.data);
  };

  useEffect(() => {
    if (
      (query.status === "success" && !query.data) ||
      (query.data && !query.data.user1 && !query.data.user2) ||
      (query.data && !(query.data.user1 === socket.id || query.data.user2 === socket.id))
    ) {
      navigate({ to: "/" });
    }
    if (query.data && query.data.user1 && query.data.user2 && !currentPlayerTurn) {
      setCurrentPlayerTurn(query.data.user1);
    }
    // eslint-disable-next-line
  }, [query.data]);

  if (!socket.id) return null;

  return (
    <div>
      <GameBoard userSocketId={socket.id} currentPlayerTurn={currentPlayerTurn} game={game} updateBoard={updateBoard} />
    </div>
  );
}

export default Game;
