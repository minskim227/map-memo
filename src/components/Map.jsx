import { useEffect, useState } from "react"
import provData from "../provData.js"

export default function Map(props) {

  const notes = JSON.parse(localStorage.getItem('notes')) || []
  const [provinces, setProvinces] = useState(provData)

  function ClearStorage() {
    localStorage.clear()
    location.reload()
  }

  const provArray = provinces.map(place => {
    const numberOfNotes = notes.filter(note => note.provId === place.id).length
    let nameWidth = ""
    return (
    <div key={place.id} id={place.id} onClick={() => props.handleClick(place.id)}
      className={`group absolute text-base text-purple-400 cursor-pointer rounded-full ${place.padding} ${place.top} ${place.left}`}
    >
      <button className={numberOfNotes ? "text-sky-300 font-bold text-s" : "font-bold text-xs"}>
        <p>{numberOfNotes || "◯"}</p>
      </button>
      <h3 className={`text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-12
        border bg-zinc-400 p-2 text-base text-white scale-0 transition group-hover:scale-100 z-10
        ${nameWidth = place.name.length < 3 ? "w-14" : place.name.length < 4 ? "w-20" : "w-24"} ${nameWidth}`}
      >
        {place.name}
      </h3>
    </div>
  )})

    return (
      <div className="flex flex-col text-center justify-center py-2">
        <h1 className="text-2xl font-bold pb">Map Memo</h1>
        <div className='relative self-center'>
          <img className='min-h-[660px] min-w-[660px]' src='images/map.jpg' />
          {provArray}
          {notes[0] && <div className="absolute text-center top-[1%] right-[2%] group">
            <button onDoubleClick={ClearStorage}
              className="border-8 border-black border-double font-bold text-md p-2"
            >
              DELETE ALL NOTES
            </button>
            <span className="hidden transition group-hover:block text-sm mt-1">(double click)</span>
          </div>}
        </div>
      </div>
    )
}