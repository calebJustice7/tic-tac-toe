import "./square.css";

interface SquareProps {
  idx: number;
  handleClick: () => void;
  char: "x" | "o" | null;
  currentPlayerTurn: string | null;
  userSocketId: string;
}
function Square({ idx, handleClick, char, currentPlayerTurn, userSocketId }: SquareProps) {
  return (
    <div
      onClick={handleClick}
      className={`square square-${idx} ${currentPlayerTurn === userSocketId ? "" : "opponent-turn"}`}
    >
      {char !== null && <div>{char}</div>}
    </div>
  );
}

export default Square;
