import React, { useState, useEffect } from 'react';
import './App.css';
import './assets/fonts/OpenSans-VariableFont_wdth,wght.ttf'

const App = () => {

  // Justera cols och rows
  const [boardSize, setBoardSize] = useState({ cols: 4, rows:4 });


  const [board, setBoard] = useState([]);

  useEffect(() => {
    console.log("Initializing board...");
    initializeBoard();
    
  }, []);

  console.log("Board:", board); 

  const initializeBoard = () => {
    const newBoard = [];
    let counter = 1;
  
    // Start the board with the selected size
    for (let i = 0; i < boardSize.cols; i++) {
      const row = [];
      for (let j = 0; j < boardSize.rows; j++) {
        row.push(counter++);
      }
      newBoard.push(row);
    }
  
    // Set the last element as the empty space
    newBoard[boardSize.cols - 1][boardSize.rows - 1] = 0;
  
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
    
    let emptyRow = board.findIndex(row => row.includes(0));
let emptyCol = board[emptyRow].indexOf(0);

    if ((row === emptyRow && Math.abs(col - emptyCol) === 1) || (col === emptyCol && Math.abs(row - emptyRow) === 1)) {
      const newBoard = [...board];
  
      if (row === emptyRow) {
        const start = Math.min(col, emptyCol);
        const end = Math.max(col, emptyCol);
  
        for (let i = start; i <= end; i++) {
          [newBoard[row][i], newBoard[emptyRow][emptyCol]] = [newBoard[emptyRow][emptyCol], newBoard[row][i]];
        }
      } else if (col === emptyCol) {
        const start = Math.min(row, emptyRow);
        const end = Math.max(row, emptyRow);
  
        for (let i = start; i <= end; i++) {
          [newBoard[i][col], newBoard[emptyRow][emptyCol]] = [newBoard[emptyRow][emptyCol], newBoard[i][col]];
        }
      }
  
      setBoard(newBoard);
    } else {
      const newBoard = [...board];
      let start, end;
  
      if (row === emptyRow) {
        start = Math.min(col, emptyCol);
        end = Math.max(col, emptyCol);
  
        for (let i = start; i <= end; i++) {
          if (newBoard[row][i] !== 0) {
            const temp = newBoard[row][i];
            newBoard[row][i] = newBoard[emptyRow][emptyCol];
            newBoard[emptyRow][emptyCol] = temp;
            emptyCol = i; // Uppdatera kolumnen för den tomma rutan
          }
        }
      } else if (col === emptyCol) {
        start = Math.min(row, emptyRow);
        end = Math.max(row, emptyRow);
  
        for (let i = start; i <= end; i++) {
          if (newBoard[i][col] !== 0) {
            const temp = newBoard[i][col];
            newBoard[i][col] = newBoard[emptyRow][emptyCol];
            newBoard[emptyRow][emptyCol] = temp;
            emptyRow = i; // Uppdatera raden för den tomma rutan
          }
        }
      }
  
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
      <button id="slump-button" onClick={shuffleBoard}>Slumpa</button>
      {isSolved() && <p>Grattis!</p>}
    </div>
  );
};

export default App;