import { useContext } from 'react';

import SocketContext from './context';
import { io } from "socket.io-client";

import { socket_host } from '../config/network';
import AuthStorage from '../auth/storage';
import connection from './connection';

export default useSocket = () => {

    const {socket, setSocket} = useContext(SocketContext);

    const connectSocket = async setConnect => {
        console.log("In connect socket");
        if(socket == null) {
            console.log("Making a new socket");
            const token = await AuthStorage.getToken();
            let newSocket = io('http://192.168.43.103:80', {auth: {token: token}});
            console.log(newSocket.connected);
            connection(newSocket, setConnect); //events dispatch
            setSocket(newSocket);
        } else if(!socket.connected) {
            console.log("Using an old socket");
            socket.connect();
        } else {
            //socket is already connected and working. Do nothing.
        }
    };

    const logout = async () => {
        setSocket(null);
    };

    return { socket, setSocket, connectSocket, logout };
}
