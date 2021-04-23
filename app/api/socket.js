import { io } from "socket.io-client";
import storage from '../auth/storage';

const host = 'http://192.168.43.102:80';

let socket;

const setSocket = async () => {

    const availableToken = await storage.getToken();

    console.log(io.sockets);
    
    socket = io(host, {auth: { token: availableToken }});

    socket.on("connect", () => {
        console.log('Socket Connected'); 
    });

    socket.on("request", data => {
        const { price, area, distance, customerRating, id } = data;
        console.log(price, area, distance, customerRating, id);
    });

    socket.on("contact", data => {
        console.log("Contact hit");
    });

}

const socketEvents = {
    sendLocation: socket => {

    },
    disconnect: socket => {
        socket.disconnect();
    },
};


module.exports = {
    setSocket,
    socketEvents,
    socket,
};