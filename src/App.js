import './App.css';
import ChatUsersList from './components/ChatUsersList';
import ChatInterface from './components/ChatInterface';
import {Modal} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


function App() {
  
  const [show,setShow] = useState(false);
  const [nombre,setNombre] = useState([]);


  useEffect(()=>{
    setShow(true);
  },[])


  const guardarNombre = ()=>{
    if(nombre!==""){
      setShow(false);
      Swal.fire({
        title: 'Añadido!',
        text: 'Bienvenido '+nombre+ ' comienza a chatear!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      console.log(nombre);
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Agrega un nombre para continuar',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  return (
    
    <div className="App">
      {/* Modal ingresa tu nombre */}
      <Modal show={show}>
        <Modal.Header>
          <p>Nombre</p>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="nombre">Ingresa tu nombre</label>
          <input type="text" className='form-control mt-3 mb-3' name="nombre" 
          id="nombre" onChange={(e)=>setNombre(e.target.value)} required/>
          <button className='btn btn-info w-100' onClick={()=>{guardarNombre()}}>Guardar</button>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>

      </Modal>


      {/* EndModal */}

      <header className="App-header">
        
      </header>
      <section id="chat-container" className="container">
        <div className="row h-100">
          <div className="col-md-4 h-100">
            <div id="chat-users" className="h-100">
              <h2 className="p-3">Chats</h2>
              <ChatUsersList/>
            </div>
          </div>
          <div className="col-md-8 h-100">
            <div id="chat-interface" className="h-100">
              <ChatInterface nombre={nombre}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
