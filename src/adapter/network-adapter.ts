import fetch, { HeaderInit, Response } from 'node-fetch';
import { adapterContainer, loadInContainer } from '../declarations/inversify';
import { KeyValue } from '../typings/request-response-type';
import { AOPError } from '../util/error/a-o-p-error';
import { ThreadLocalStorageAdapter } from './thread-local-storage-adapter';

class NetworkAdapter {
  private static async transformResponse(response: Response): Promise<KeyValue> {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    const errorMessage = await response.text();
    throw new AOPError({
      message: errorMessage,
      code: `${response.status}`,
    });
  }

  private static addHeaders(headers_: HeaderInit): void {
    const headers = headers_;
    if (headers.authorization) {
      const token = ThreadLocalStorageAdapter.get('token') || 'dummyToken';
      if (token) {
        headers.authorization = `Token ${token}`;
      }
    }
    headers['Content-Type'] = 'application/json';
  }

  async delete(url: string, { body, headers = {} }: { body?: string; headers?: HeaderInit; } = {}): Promise<KeyValue> {
    NetworkAdapter.addHeaders(headers);
    const response = await fetch(url, { method: 'DELETE', body, headers });
    return NetworkAdapter.transformResponse(response);
  }

  async put(url: string, { body, headers = {} }: { body?: string; headers?: HeaderInit; } = {}): Promise<KeyValue> {
    NetworkAdapter.addHeaders(headers);
    const response = await fetch(url, { method: 'PUT', body, headers });
    return NetworkAdapter.transformResponse(response);
  }

  async post(url: string, { body, headers = {} }: { body?: string; headers?: HeaderInit; } = {}): Promise<KeyValue | Array<KeyValue>> {
    NetworkAdapter.addHeaders(headers);
    const response = await fetch(url, { method: 'POST', body, headers });
    return NetworkAdapter.transformResponse(response);
  }

  async get(url: string): Promise<KeyValue> {
    const response = await fetch(url);
    return NetworkAdapter.transformResponse(response);
  }
}

loadInContainer(adapterContainer, NetworkAdapter);

export { NetworkAdapter };
