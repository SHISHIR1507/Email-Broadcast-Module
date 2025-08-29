import axios from 'axios';

const API_BASE_URL = 'http://localhost:5007/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const sendBroadcast = async (data) => {
  const response = await api.post('/emails/send', data);
  return response.data;
};

export const testEmailConnection = async () => {
  const response = await api.get('/emails/test-connection');
  return response.data;
};

export const getLogs = async ({ page = 1, limit = 10, status = '', search = '' }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (status) params.append('status', status);
  if (search) params.append('search', search);
  
  const response = await api.get(`/logs?${params}`);
  return response.data;
};

export const exportLogs = async ({ format = 'csv', status = '' }) => {
  const params = new URLSearchParams({ format });
  if (status) params.append('status', status);
  
  const response = await api.get(`/logs/export?${params}`, {
    responseType: format === 'csv' ? 'text' : 'json'
  });
  
  return response.data;
};