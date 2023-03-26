import { useState } from "react";
import { INote } from "../../types/types";
import "./index.scss"

interface INoteProps extends INote {
    notes: INote[], 
    removeNote: (id: string) => void;
    saveNotes: (notes: INote[]) => void;
    checkNotes: (text: string) => string[];
}

const NoteItem: React.FC<INoteProps> = ({
    id,
    text,
    notes, 
    removeNote,
    saveNotes,
    checkNotes
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [newText, setNewText] = useState(text)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.target.value)
  }
  const handleSave = () => {
    const newNotes: INote[] = notes.map(note => {
      if(note.id === id) {
        note.text = newText
        note.tags = [...checkNotes(newText)]
      }
      return note
    })
    saveNotes(newNotes)
    setIsEdit(!isEdit)
  }

  return (
    <div className="note">
        {
          isEdit
          ? <textarea
              onChange={handleChange}
              value={newText}
            >
            </textarea>
          : <p>{text}</p>
        }
        {
          isEdit
          ? <button
              onClick={handleSave}
              disabled={!newText.trim() ? true : false}
            >
              Save
            </button>
          : <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
        }
        <button onClick={() => removeNote(id)}>Delete</button>
    </div>
  )
}

export default NoteItem