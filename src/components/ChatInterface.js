import { useState} from 'react';
import io from 'socket.io-client';
const socket = io('chat-react-express-socketio-server.vercel.app');

const ChatInterface = ({nombre})=>{
    const [mensaje,setMensaje] = useState([]);
    const [mensajes,setMensajes] = useState([]);
    

    socket.on('message',(data)=>{
        setMensajes([...mensajes,data])
        
    })

    const enviar = (event)=>{
        event.preventDefault();
        socket.emit('message',{body:mensaje,from:nombre});
        setMensajes([...mensajes,{
            body:mensaje,
            from:"Me"
        }])
        setMensaje('');
    }

    

    return(
        <div id="chat-interface" className="h-100">
            <div id="chat" className="p-5">
                {
                    mensajes.map((msj,index)=>(
                        <div className="row" key={index}>
                            <div className={`${msj.from==="Me"?'msg-box-out':'msg-box-in'}`} key={index}>
                                <p>
                                    <span className="nombreChat">{msj.from}</span>
                                <br />
                                    <span className='mensajeChat'>{msj.body}</span>
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div id="actions" className="w-100">
                <form onSubmit={(e)=>enviar(e)}>
                    <input type="text" value={mensaje} id="mensajeInput" placeholder="Ingrese un mensaje" 
                    onChange={(e)=>{setMensaje(e.target.value)}}/> 
                    <button className="btn btn-primary" type="submit">
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatInterface