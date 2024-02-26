import '../styles/main.css';

interface REPLHistoryProps{
    // TODO: Fill with some shared state tracking all the pushed commands
    commands: string[];
}
export function REPLHistory(props : REPLHistoryProps) {
    return (
        <div className="repl-history">
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
            {props.commands.map((item, index) => (
                <text>{item}<br></br></text>
            ))}
        </div>
    );
}