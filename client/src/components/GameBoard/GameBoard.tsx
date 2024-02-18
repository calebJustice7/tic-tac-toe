import Square from "../Square";

interface GameBoardProps {
  game: ("x" | "o" | null)[][];
  updateBoard: (rowIdx: number, squareIdx: number) => void;
  currentPlayerTurn: string | null;
  userSocketId: string;
}
function GameBoard({ game, updateBoard, currentPlayerTurn, userSocketId }: GameBoardProps) {
  const handleClick = (rowIdx: number, squareIdx: number) => {
    if (currentPlayerTurn !== userSocketId || game[rowIdx][squareIdx] !== null) return;
    updateBoard(rowIdx, squareIdx);
  };

  return (
    <div className="mt-10 w-100 h-100 mx-auto container flex items-center justify-center flex-col">
      <div className="mt-2 mb-10 text-center text-4xl">
        {currentPlayerTurn && (userSocketId === currentPlayerTurn ? "Your turn" : "Opponents turn")}
        {!currentPlayerTurn && "Waiting for player"}
      </div>
      {game.map((row, rowIdx) => (
        <div className="flex flex-center" key={rowIdx + "_key"}>
          {row.map((char, squareIdx) => (
            <Square
              currentPlayerTurn={currentPlayerTurn}
              userSocketId={userSocketId}
              key={rowIdx * 3 + (squareIdx + 1)}
              handleClick={() => handleClick(rowIdx, squareIdx)}
              idx={rowIdx * 3 + (squareIdx + 1)}
              char={char}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
