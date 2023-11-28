import { useEffect, useState } from "react"
import Note from "./Note.jsx"
import provData from "../provData.js"

export default function Memo(props) {

    const [count, setCount] = useState(() => JSON.parse(localStorage.getItem('id')) || 0)
    const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || [])
    const [selectedNoteId, setSelectedNoteId] = useState(-1)
    const [currentProv, setCurrentProv] = useState(props.provId)
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))
    },[notes])

    useEffect(() => {
        localStorage.setItem('id', JSON.stringify(count))
    },[count])

    const maxNotes = notes.filter(note => note.provId === currentProv)

    function CreateNote() {
        if (maxNotes.length < 20) {
            const newNote = {
                noteId: count,
                provId: props.provId,
                title: 'New Note',
                content: ''
            }
            setCount(prev => prev + 1)
            setNotes(prev => [...prev, newNote])
        }
    }

    function DeleteNote(id) {
        setNotes(prev => {
            return prev.filter((prev) => prev.noteId !== id)
        })
    }

    function HandleSelected(id) {
        setSelectedNoteId(prevId => (prevId === id ? -1 : id))
    }

    const notesArray = notes.map(note => {
        return <Note key={note.noteId} noteId={note.noteId} provId={note.provId} title={note.title} content={note.content}
            notes={notes} setNotes={setNotes}
            opened={note.noteId === selectedNoteId} currentProv={currentProv}
            HandleSelected={() => HandleSelected(note.noteId)} DeleteNote={() => DeleteNote(note.noteId)}
            className="border border-solid rounded-md p-4 bg-teal-100 h-24"
            />
    })

    return (
        <div className="flex justify-center py-2 relative">
            <div className="fixed w-full max-w-[660px] min-h-[660px] rounded-md bg-gray-100">
                <button onClick={props.goBack} ><img className="absolute h-8 top-2 left-2" src="images/back.png"/></button>
                {maxNotes.length < 20 && <button onClick={CreateNote} ><img className="absolute h-8 top-2 right-2" src="images/plus.png"/></button>}
                <h1 className="text-2xl font-bold text-center py-2">{(provData[props.provId].name)}</h1>
                <div className="grid grid-cols-4 p-2 gap-x-4 gap-y-6">
                    {notesArray}
                </div>
            </div>
        </div>
    )
}