import axios, {AxiosRequestConfig} from 'axios';

import {ExceptionMapper, InvalidResponseError} from './APIException';
import {ClientOptions, HttpMethod, RequestOptions} from './interfaces/';

export class RequestService {
  private apiUrl = 'https://app.absence.io/api/v2';
  private readonly apiKey?: string;
  private readonly apiKeyId?: string;

  constructor(options: ClientOptions) {
    if (options) {
      if (options.apiUrl) {
        this.setApiUrl(options.apiUrl);
      }
      this.apiKey = options.apiKey;
      this.apiKeyId = options.apiKeyId;
    }
  }

  public isApiKeySet(): boolean {
    return Boolean(this.apiKey);
  }

  public delete<T>(endpoint: string, parameters?: RequestOptions): Promise<T> {
    return this.request<T>('delete', endpoint, parameters);
  }

  public get<T>(endpoint: string, parameters?: RequestOptions): Promise<T> {
    return this.request<T>('get', endpoint, parameters);
  }

  public post<T>(endpoint: string, parameters?: RequestOptions): Promise<T> {
    return this.request<T>('post', endpoint, parameters);
  }

  public put<T>(endpoint: string, parameters?: RequestOptions): Promise<T> {
    return this.request<T>('put', endpoint, parameters);
  }

  public setApiUrl(apiUrl: string): void {
    this.apiUrl = apiUrl;
  }

  private async request<T>(method: HttpMethod, endpoint: string, parameters?: RequestOptions): Promise<T> {
    const params = {
      ...parameters,
      apiKey: this.apiKey,
      apiKeyId: this.apiKeyId,
    };

    const config: AxiosRequestConfig = {
      method,
      params,
      url: `${this.apiUrl}${endpoint}`,
    };

    try {
      const {data, headers} = await axios.request<T>(config);
      const contentType = headers['content-type'] ? String(headers['content-type']) : undefined;

      if (contentType) {
        if (contentType.includes('application/json')) {
          return data;
        } else {
          throw new InvalidResponseError('The server responded with invalid data: No JSON sent.');
        }
      } else {
        throw new InvalidResponseError('The server responded with invalid data: No Content-Type set.');
      }
    } catch (error) {
      throw ExceptionMapper(error);
    }
  }
}
