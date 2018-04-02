var uuid = require('uuid');
var WebSocket = require('ws');
var rooms = require("./rooms");

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws) => {
        ws.id = uuid.v1();

        //connection is up, let's add a simple simple event
        ws.on('message', (message) => {

            //log the received message and send it back to the client
            console.log('received: %s', message);

            const broadcastRegex = /^broadcast\:/i;
            const joinRegex = /^join\:/i;

            if (broadcastRegex.test(message)) {
                message = message.replace(broadcastRegex, '');

                //send back the message to the other clients
                rooms.friends(ws.room, ws).forEach(client => {
                    client.send(`Hello, broadcast message from ${ws.id} -> ${message}`);
                });
                
            } else if(joinRegex.test(message)) {
                room = message.replace(joinRegex, '');
                rooms.join(room, ws);
            
                rooms.friends(ws.room, ws).forEach(client => {
                    client.send(`Hello, client ${ws.id} has joined the room`);
                });

                ws.send(`Hello, you joined the room "${room}"`);
            }
            else {
                ws.send(`Hello, you sent -> ${message}`);
            }
        });
        //send immediatly a feedback to the incoming connection    
        ws.send('connected, first join a room by sending "join: <room>", then you can broadcast with "broadcast: <message>"');
    });
}