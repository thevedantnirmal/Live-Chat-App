import { useEffect, useRef, useState } from "react"
import { jsx } from "react/jsx-runtime";


function App() {
  const [message,setMessage]=useState(["hello","Namaste", "Konichiva"]);
  const inputRef=useRef();
  const wsRef=useRef();


  useEffect(()=>{
    const ws=new WebSocket("ws://localhost:3000");
    wsRef.current=ws;
    console.log(wsRef)
    ws.onmessage=(eve)=>{
      setMessage((m)=>[...m,eve.data]);

    }
    ws.onopen=()=>{
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          room:"red"
        }
      }))
    }
  },[])
  
  return (
    <div className="bg-black h-screen">

      <br/><br/>
      <div className="h-[80vh] flex flex-col">
        {
          message.map(e=><span className="bg-white w-24 m-1 px-6 py-3 rounded flex justify-center">
            {e}
          </span>)
        }

        <div className="my-36 mx-5">
          <input className="px-10 py-5 rounded-l-lg" type="text" placeholder="type" ref={inputRef}/>
          <button className="bg-purple-600  px-10 py-5 rounded-r-lg" onClick={()=>{
            //@ts-ignore
            //const message
            wsRef.current?.send(JSON.stringify({
              type:"chat",
              payload:{
                message:inputRef.current.value
              }
            }))
          }}>Send</button>
        </div>


      </div>

      
      

    </div>)
}

export default App
