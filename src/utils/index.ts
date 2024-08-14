import {AxiosResponse} from 'axios';

export const handleResponse = <T>(response: Response): ReadableStream<Uint8Array> | null => {
  return response.body;
};