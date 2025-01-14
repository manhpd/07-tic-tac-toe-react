import React from 'react';
import { useState } from 'react';

export default function Player({ name, symbol, isActive, onNameSubmit}: { name: string, symbol: string, isActive: boolean, onNameSubmit: (symbol: string, newName: string) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    const toggleEdit = () => {
        setIsEditing((prev) => !prev);
        if (isEditing) {
            // Save the new name
        }
        onNameSubmit(symbol, newName);
    };

    const handeleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName((prev) => e.target.value);
    };
    let playerName =
            <span className="player-name">{newName}</span>;
    if (isEditing) {
        playerName =
                <input type="text" required value={newName} onChange={handeleChange}/>
            ;
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
                <button onClick={toggleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
            </span>
        </li>
    )
}