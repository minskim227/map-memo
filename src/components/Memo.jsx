import { useEffect, useReducer } from "react"
import Note from "./Note.jsx"
import provData from "../provData.js"

export default function Memo(props) {

    const reducer = (state, action) => {
        switch(action.type) {
            case "incrementCount":
                return {...state, count: state.count + 1}
            case "newNote":
                return {...state, notes: action.payload}
            case "deleteNote":
                return {...state, notes: action.payload}
            case "setNotes":
                return {...state, notes: action.payload}
            case "setSelectedNoteId":
                return {...state, selectedNoteId: action.payload}
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        count: JSON.parse(localStorage.getItem('id')) || 0,
        notes: JSON.parse(localStorage.getItem('notes')) || [],
        selectedNoteId: -1,
        currentProv: props.provId,
        opened: false
    })

    const ACTION = {
        INCREMENT_COUNT: "incrementCount",
        NEW_NOTE: "newNote",
        DELETE_NOTE: "deleteNote",
        SET_NOTES: "setNotes",
        SET_SELECTED_NOTE_ID: "setSelectedNoteId"
    }

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(state.notes))
    },[state.notes])

    useEffect(() => {
        localStorage.setItem('id', JSON.stringify(state.count))
    },[state.count])

    const maxNotes = state.notes.filter(note => note.provId === state.currentProv)

    function CreateNote() {
        if (maxNotes.length < 20) {
            const newNote = {
                noteId: state.count,
                provId: props.provId,
                title: 'New Note',
                content: ''
            }
            dispatch({type: ACTION.INCREMENT_COUNT})
            dispatch({type: ACTION.NEW_NOTE, payload: [...state.notes, newNote]})
        }
    }

    function DeleteNote(id) {
        dispatch({type: ACTION.DELETE_NOTE, payload: state.notes.filter((prev) => prev.noteId !== id)})
    }

    function HandleSelected(id) {
        dispatch({type: ACTION.SET_SELECTED_NOTE_ID, payload: state.selectedNoteId === id ? -1 : id})
    }

    const notesArray = state.notes.map(note => {
        return <Note key={note.noteId} noteId={note.noteId} provId={note.provId} title={note.title} content={note.content}
            notes={state.notes} setNotes={(updatedNotes) => {dispatch({type: ACTION.SET_NOTES, payload: updatedNotes})}}
            opened={note.noteId === state.selectedNoteId} currentProv={state.currentProv}
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