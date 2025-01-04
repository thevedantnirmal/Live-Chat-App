import { useEffect, useRef, useState } from "react"


function App() {
  const [socket,setSocket]=useState()
  const inputRef=useRef()
  const sendMessage=()=>{
    const input=inputRef.current.value;
    socket.send(input)
  
  }

  useEffect(()=>{
  const ws=new WebSocket("ws://localhost:3000")
  setSocket(ws)
  ws.onmessage=(e)=>{
    alert(e.data)
    
  }
  }
  ,[])

  return (
    <div>
      <input ref={inputRef} placeholder="Text" type="text"/>
      <button onClick={sendMessage}>Send</button>

    </div>)
}

export default App
