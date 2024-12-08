import CryptoJS from 'crypto-js';

export const secureRequest = async (endpoint: string, data: any) => {
  const timestamp = Date.now();
  const signature = CryptoJS.HmacSHA256(
    `${timestamp}${JSON.stringify(data)}`, 
    import.meta.env.VITE_API_KEY
  ).toString();

  const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_API_KEY,
      'x-timestamp': timestamp.toString(),
      'x-signature': signature
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error('Request failed');
  return response.json();
};