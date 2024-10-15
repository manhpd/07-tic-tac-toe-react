// render 3 x 3 Grid

import React from 'react';
import { Cell, Turn } from '../../App';

export default function GameBoard({onSelectSquare, board}: {onSelectSquare: (row: number, col: number) => void, board: Cell[][]}) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex} className="row">
                    <ol>
                        {row.map((symbol, colIndex) => (
                            <button 
                                key={colIndex} 
                                className="cell" 
                                onClick={()=>onSelectSquare(rowIndex,colIndex)}
                                disabled={symbol !== null}
                            >{symbol}</button>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}