import * as SecureStore from 'expo-secure-store';

const key = 'socket';

const storeSocket = async socket => {
    try{
        await SecureStore.setItemAsync(key, JSON.stringify(socket));
    } catch(error) {
        console.log('Error storing the socket',error);
    }
}

const getSocket = async () => {
    try{
        return JSON.parse(await SecureStore.getItemAsync(key));
    } catch(error) {
        console.log('Error getting the socket',error);
    }
}

const removeSocket = async() => {
    try{
        await SecureStore.deleteItemAsync(key);
    } catch(error) {
        console.log('Error removing the socket', error);
    }
}

export default {
    getSocket,
    storeSocket,
    removeSocket,
};