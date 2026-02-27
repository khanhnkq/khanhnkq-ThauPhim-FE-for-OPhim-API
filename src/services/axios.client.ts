import axios from 'axios';

const ophimClient = axios.create({
  baseURL: 'https://ophim1.com/v1/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor — unwrap `{ status, data }` envelope
ophimClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const url = error.config?.url ?? 'unknown';
    console.error(`[ophimClient] Request failed: ${url}`, error.message);
    return Promise.reject(error);
  }
);

export default ophimClient;
