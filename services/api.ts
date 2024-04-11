import axios, { AxiosInstance, AxiosResponse } from "axios";

export  class ShopifyClient {
  private readonly client: AxiosInstance;

  constructor(private readonly shop: string, private readonly accessToken: string) {
    if (!shop || !accessToken) {
      throw new Error("Shop and access token are required.");
    }

    this.client = axios.create({
      baseURL: `https://${shop}/admin/api/2022-01`,
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    });
  }

  private async handleRequest<T>(request: Promise<AxiosResponse<T>>) {
    try {
      const response = await request;
      if (response.status >= 400) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.data;
    } catch (error : any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(`API error: ${error.response.status} - ${error.response.data}`);
        } else {
          throw new Error(`Network error: ${error.message}`);
        }
      } else {
        throw new Error(`Unknown error: ${error.message}`);
      }
    }
  }

  async get<T>(path: string): Promise<T> {
    return this.handleRequest(this.client.get<T>(path));
  }

  async post<T>(path: string, data: any): Promise<T> {
    return this.handleRequest(this.client.post<T>(path, data));
  }

  async put<T>(path: string, data: any): Promise<T> {
    return this.handleRequest(this.client.put<T>(path, data));
  }

  async delete<T>(path: string): Promise<T> {
    return this.handleRequest(this.client.delete<T>(path));
  }

}
