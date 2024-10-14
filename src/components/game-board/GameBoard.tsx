// render 3 x 3 Grid

import React from 'react';
import { useState } from 'react';
const initialGrid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export default function GameBoard() {
    return (
        <ol id="game-board">
            {initialGrid.map((row, rowIndex) => (
                <li key={rowIndex} className="row">
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <button key={colIndex} className="cell">{playerSymbol}</button>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}