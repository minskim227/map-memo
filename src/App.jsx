import { useState } from 'react'
import './index.css'
import Map from './components/Map'
import Memo from './components/Memo'

function App() {
  const [openMemo, setOpenMemo] = useState(false)
  const [provId, setProvId] = useState(-1)

  function handleClick(id) {
    setOpenMemo(true)
    setProvId(id)
  }

  function goBack() {
    setOpenMemo(false)
  }

   return (
    <div>
      {openMemo ? <Memo provId={provId} goBack={goBack} /> : <Map handleClick={id => handleClick(id)}/>}
    </div>
  )
}

export default App