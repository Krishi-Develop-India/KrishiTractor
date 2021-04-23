import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'http://192.168.43.102/api',
});

apiClient.addAsyncRequestTransform(async request => {
    request.data.user = 'tractor';
});

export default apiClient;