import NoteItem from "../NoteItem"
import { INote } from "../../types/types";
import "./index.scss"
interface INoteListProps {
    notes: INote[];
    removeNote: (id: string) => void;
    saveNotes: (notes: INote[]) => void;
    checkNotes: (string: string) => string[];
}


const NoteList: React.FC<INoteListProps> = ({
    notes,
    removeNote,
    saveNotes,
    checkNotes
}) => {
  return (
    <div className="notes">
        {!notes.length && <h1>No notes</h1>}
        {notes.map(note => (
            <NoteItem
                key={note.id}
                removeNote={removeNote}
                notes={notes}
                saveNotes={saveNotes}
                checkNotes={checkNotes}
                {...note}
            />
        ))}
    </div>
  )
}

export default NoteList