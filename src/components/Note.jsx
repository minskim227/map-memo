import { useEffect, useState } from "react"

function Small(props) {
    return (
        <div onClick={props.HandleClick} className="flex justify-center items-center border border-sky-200 border-solid rounded-md
            p-4 bg-sky-50 h-24 w-auto cursor-pointer">
            <p className="text-lg md:text-xl text-slate-700 font-bold max-h-20 text-center overflow-hidden">{props.title}</p>
        </div>)
}

function Large(props) {
    return (
        <div className="flex flex-col w-full gap-2 absolute top-[10.5%] left-0 border-2 border-sky-200 border-solid rounded-lg p-4 bg-sky-100 h-[595px]">
            <button onClick={props.HandleClick} ><img className="absolute h-8 top-2 left-2" src="images/back.png"/></button>
            <button onClick={props.DeleteNote} ><img className="absolute h-8 top-2 right-2" src="images/trash.png"/></button>
            <input type="text" name="title" value={props.title} onChange={props.HandleChange}
                className="flex justify-center mx-auto text-2xl font-bold bg-slate-50 text-slate-700 rounded-lg text-center py-2 w-3/4"
            />
            <textarea name="content" value={props.content} placeholder="Add Notes..." onChange={props.HandleChange}
                className="resize-none bg-slate-50 text-slate-700 text-lg rounded-md p-4 flex-grow" />
        </div>
    )
}

export default function Note(props) {
    
    const [currentNote, setCurrentNote] = useState(props.notes.find(note => note.noteId === props.noteId))

    useEffect(() => {
        const updatedNotes = props.notes.map(prevNote => {
            return prevNote.noteId === currentNote.noteId ? currentNote : prevNote;
        })
        props.setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }, [currentNote]);

    function HandleChange(event) {
        const {name, value} = event.target
        setCurrentNote(prevNote => {
            return(
                {...prevNote, [name]: value}
            )
        })
    }

    return (
        (props.currentProv === props.provId &&
            <div>
                {props.opened ?
                    <Large title={currentNote.title} content={currentNote.content}
                        HandleClick={props.HandleSelected} HandleChange={HandleChange} DeleteNote={props.DeleteNote}
                    /> : 
                    <Small title={currentNote.title} HandleClick={props.HandleSelected} />}
            </div>
        )
    )
}