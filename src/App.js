
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [boardSize, setBoardSize] = useState({ rows: 4, cols: 4 });
  const [board, setBoard] = useState([]);

  useEffect(() => {
    console.log("Initializing board...");

    initializeBoard();
  }, []);

  console.log("Board:", board); 

  const initializeBoard = () => {
    const newBoard = [];
    let counter = 1;
  
    // Starta brädet med vald storlek
    for (let i = 0; i < boardSize.rows; i++) {
      const row = [];
      for (let j = 0; j < boardSize.cols; j++) {
        row.push(counter++);
      }
      newBoard.push(row);
    }
  
    newBoard[boardSize.rows - 1][boardSize.cols - 1] = 0;
  
    setBoard(newBoard);
  };

  const shuffleBoard = () => {
  const shuffledBoard = [...board];

  // Slumpar
  for (let i = shuffledBoard.length - 1; i > 0; i--) {
    for (let j = shuffledBoard[i].length - 1; j > 0; j--) {
      const randRow = Math.floor(Math.random() * (i + 1));
      const randCol = Math.floor(Math.random() * (j + 1));
      [shuffledBoard[i][j], shuffledBoard[randRow][randCol]] = [shuffledBoard[randRow][randCol], shuffledBoard[i][j]];
    }
  }

  setBoard(shuffledBoard);
};

  const handleTileClick = (row, col) => {
    const emptyRow = board.findIndex(row => row.includes(0));
    const emptyCol = board[emptyRow].indexOf(0);

    if ((row === emptyRow && Math.abs(col - emptyCol) === 1) || (col === emptyCol && Math.abs(row - emptyRow) === 1)) {
      const newBoard = [...board];
      [newBoard[row][col], newBoard[emptyRow][emptyCol]] = [newBoard[emptyRow][emptyCol], newBoard[row][col]];
      setBoard(newBoard);
    }
  };

  
  const isSolved = () => {
    if (!board || !board.length) {
      console.log("Brädet startade inte korrekt eller är tomt");
      return false;
    }
  
    for (let i = 0; i < boardSize.rows; i++) {
      for (let j = 0; j < boardSize.cols; j++) {
        if (board[i][j] !== i * boardSize.cols + j + 1) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div className="App">
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((value, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className={`tile ${value === 0 ? 'empty' : ''}`} onClick={() => handleTileClick(rowIndex, colIndex)}>
                {value !== 0 && value}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={shuffleBoard}>Slumpa</button>
      {isSolved() && <p>Grattis!</p>}
    </div>
  );
};

export default App;