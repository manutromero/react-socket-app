const express = require('express');
const http = require('http');
const socketIO = require('socket.io');


//Nuestro puerto localhost
const port = 4001;

const app = express();

//Nuestra instacia del servidor;
const server = http.createServer(app);

//Creamos el socket.io usando nuestro servidor;
const io = socketIO(server);

io.on('connection', socket => {
    console.log('New client connected');

    socket.on('change color',(color) => {
        console.log("El color selecionado es", color);
        io.sockets.emit('change color', color);
    })

    socket.on('enviar mensaje', (mensaje) =>{
        console.log("el mensaje es: ", mensaje)
        io.sockets.emit('enviar mensaje',mensaje);
    })
    socket.on('disconnect', () => {
        console.log('User disconnet')
    })
})


server.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
})