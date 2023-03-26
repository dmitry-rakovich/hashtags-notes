import { INote } from "../../types/types";
import "./index.scss"

interface ITagsProps {
    notes: INote[];
    setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
    tags: string[];
}

const Tags: React.FC<ITagsProps> = ({notes, setNotes, tags}) => {

    const filterNotes = (text: string) => {
    
        const filterNotes = notes.concat().filter(note => note.tags.includes(text))
        setNotes(filterNotes)
    }

  return (
    <div className="tags">
        {
            !!tags.length && 
            <span onClick={() => setNotes(JSON.parse(localStorage.getItem('hashtags-notes')!))}>
                Show all notes
            </span>
        }
        {
            tags.map(tag => 
            <span key={tag} onClick={() => filterNotes(tag)}>
                {tag}
            </span>)
        }
    </div>
  )
}

export default Tags