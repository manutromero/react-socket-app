import React, { Component } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';


class App extends Component{

  constructor(){
    super();
    this.state = {
      endpoint: '192.168.0.12:4001',
      color: 'white',
      mensaje: "Escribe un mensaje"
    };
  }

  send =  () => {

    const socket = socketIOClient(this.state.endpoint);
    socket.emit('change color', this.state.color);
    console.log("send")
    socket.emit('enviar mensaje',this.state.mensaje);
  }
  
  setColor = (color)=>{
    this.setState({color});
  }
  handleSubmit = (event)=>{
    event.preventDefault()
    let mensaje = event.target.value
    this.setState({
      mensaje
    })    
  }
  componentDidMount = ()=>{
    console.log("se cambio de estado")
    const socket = socketIOClient(this.state.endpoint);

    socket.on('change color', (col) =>{
        document.body.style.backgroundColor = col;
    })
    socket.on('enviar mensaje',(men) => {
        document.getElementById("HistorialMensajes").innerHTML += `<p> ${men} </p> `;
    })
  }
  

  render(){

    const socket = socketIOClient(this.state.endpoint);

    return(
      <div style={{ textAlign: "center" }}>
      
      <button onClick={() => this.send() }>Change Color</button>


      <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
      <button id="red" onClick={() => this.setColor('red')}>Red</button>

        <div >
          <input onChange={this.handleSubmit} type="text" name="mensaje" />
          <button  onClick={() => this.send() } >Send</button>
        </div>

        <div id="HistorialMensajes">

        </div>
    </div>
    )

  }

}



export default App;
