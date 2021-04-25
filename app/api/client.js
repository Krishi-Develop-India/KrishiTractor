import { create } from 'apisauce';
import Network from '../config/network';

const apiClient = create({
    baseURL: Network.server_host+'/api',
});

apiClient.addAsyncRequestTransform(async request => {
    request.data.user = 'tractor';
});

export default apiClient;