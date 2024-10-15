import { Turn } from "../../App";

export default function Log({ log }: { log: Turn[] }) {
    return (
        <ol id="log">
            {log.map((turn, index) => (
                <li key={index}>{`Player ${turn.player} go at row: ${turn.square.row + 1} - col: ${turn.square.col}`}</li>
            ))}
        </ol>
    );
}