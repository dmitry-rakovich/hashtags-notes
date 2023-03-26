import { useState, useEffect } from 'react'
import Header from './components/Header'
import { INote } from './types/types'
import './App.scss'
import NoteList from './components/NoteList'
import Tags from './components/Tags'
import { regexp } from './regexp'

const App: React.FC = () => {
  const savedNotes = localStorage.getItem('hashtags-notes');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState<INote[]>(savedNotes ? JSON.parse(savedNotes) : []);
  const [tags, setTags] = useState<string[]>([])

    useEffect(() => {
      refreshStorage(notes)
    }, [])


    const refreshStorage = (notes: INote[]) => {
      setNotes(notes)
      localStorage.setItem('hashtags-notes', JSON.stringify(notes))
      setTags(Array.from(new Set(notes.flatMap(note => note.tags.map(tag => tag)))))
    }

    const addNote = () => {

      if (value.trim()) {
        const newNotes = [{
          id: window.crypto.randomUUID(),
          text: value,
          tags: checkNotes(value)
        }, ...notes]
        refreshStorage(newNotes)
        setValue('');
      }
  };

  const removeNote = (id: string) => {
    const newNotes = notes.filter((note: INote) => note.id !== id);
    refreshStorage(newNotes)
  };


  const saveNotes = (notes: INote[]) => {
    refreshStorage(notes)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addNote();
};

const checkNotes = (str: string) => {
  /*
  из текста заметки получаем итерируемый объект с элементами,
  подходящими под шаблон регулярного выражения,
  преобразуем в массив хэштегов
  */
  const allTagsFromNote = Array.from(str.matchAll(regexp)).map(item => item[0])
  //создаём массив уникальный хэштегов
  const uniqueTagsfromNote = Array.from(new Set(allTagsFromNote))
  return uniqueTagsfromNote
  }

  return (
    <div className='container'>
      <Header
                value={value}
                onAdd={addNote}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
            />
      <Tags
        notes={notes}
        setNotes={setNotes}
        tags={tags}
      />
      <NoteList
                notes={notes}
                removeNote={removeNote}
                saveNotes={saveNotes}
                checkNotes={checkNotes}
            />
    </div>
  )
}

export default App