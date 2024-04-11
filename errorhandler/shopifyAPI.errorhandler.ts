import { ApplicationError, ErrorType } from './application.errorhandler';

export class ShopifyAPIError extends ApplicationError {
  constructor(message: string) {
    super(`Shopify API Error: ${message}`, ErrorType.API);
    this.name = 'ShopifyAPIError';
  }
}
