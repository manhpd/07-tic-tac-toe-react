
export default function GameOver({ winner = "", onRestart }: { winner: string, onRestart: () => void }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            <h1>{winner ? `Player ${winner} wins!` : 'It\'s a draw!'}</h1>
            <button onClick={onRestart}>Restart</button>
        </div>
    )
}