import authClient from './authClient';

const endpointSwitchTractor = '/switchTractor';

const switchTractor = async (latitude, longitude, status) => {
    try {
        return await authClient.post(endpointSwitchTractor, {latitude, longitude, status});
    } catch(error) {
        console.log("Error in switch tractor", error);
    }
};

module.exports = {
    switchTractor,
};