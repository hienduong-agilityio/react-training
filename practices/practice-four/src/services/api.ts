// Constants
import { HTTP_METHODS } from '@/constants';

type MethodRequest = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

export const apiRequest = async <T>({ url, method, data }: { url: string; method: MethodRequest; data?: T }) => {
  const requestOptions: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (method === HTTP_METHODS.POST || method === HTTP_METHODS.PUT) {
    requestOptions.body = JSON.stringify(data);
  }

  const response = await fetch(url, requestOptions);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error?.message);
  }
  return result;
};
