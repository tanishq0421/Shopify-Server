import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import {
  ApplicationError,
  ErrorType,
} from "./../errorhandler/application.errorhandler";

export class ShopifyClient {
  private readonly client: AxiosInstance;

  constructor(
    private readonly shop: string,
    private readonly accessToken: string
  ) {
    if (!shop || !accessToken) {
      throw new Error("Shop and access token are required.");
    }

    this.client = axios.create({
      baseURL: `https://${shop}.myshopify.com/admin/api/2023-10`,
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    });

    // this.handleRequest = this.handleRequest.bind(this)
    // this.get = this.get.bind(this)
  }

  private async handleRequest<T>(request: Promise<AxiosResponse<T>>) {
    try {
      const response = await request;
      if (response.status >= 400) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          throw new ApplicationError(
            `API error: ${axiosError.response.status} - ${axiosError.response.data}`,
            ErrorType.API
          );
        } else {
          throw new ApplicationError(
            `Network error: ${error.message}`,
            ErrorType.NETWORK
          );
        }
      } else {
        throw new ApplicationError(
          `Unknown error: ${error.message}`,
          ErrorType.GENERAL
        );
      }
    }
  }

  async get<T>(path: string): Promise<T> {
    return this.handleRequest<T>(this.client.get<T>(path));
  }

  async post<T>(
    path: string,
    data?: any,
  ): Promise<T> {
    return this.handleRequest<T>(this.client.post<T>(path, data));
  }

  async put<T>(
    path: string,
    data?: any,
  ): Promise<T> {
    return this.handleRequest<T>(this.client.put<T>(path, data));
  }

  async delete<T>(path: string): Promise<T> {
    return this.handleRequest<T>(this.client.delete<T>(path));
  }
}

export const shopify = new ShopifyClient(
  `${process.env.SHOPIFY_APP_NAME}`,
  `${process.env.SHOPIFY_APP_ACCESS_TOKEN}`
);
