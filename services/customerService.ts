import { Customer } from "./../types/customer.types";
import { Address } from "./../types/customerAddress.types";
import { ResourceNotFoundError } from "./../errorhandler/resourceNotFound.errorhandler";
import { InvalidEntityError } from "./../errorhandler/invalidEntityErrorHandler";
import { ShopifyAPIError } from "./../errorhandler/shopifyAPI.errorhandler";
import { ShopifyClient } from "./apiServices";

export class CustomerService {
  private readonly shopifyClient: ShopifyClient;

  constructor() {
    this.shopifyClient = new ShopifyClient(
      `${process.env.SHOPIFY_APP_NAME}`,
      `${process.env.SHOPIFY_APP_ACCESS_TOKEN}`
    );
  }

  async getAllCustomers(): Promise<Customer[] | null> {
    try {
      const response = await this.shopifyClient.get<{customers: Customer[]}>(
        "/customers.json"
      );
      const customers = response.customers;
      if (!customers) {
        throw new ResourceNotFoundError("Customers");
      }
      return customers;
    } catch (error: any) {
      console.error("Error fetching all customers:", error.message);
      throw new ShopifyAPIError("Failed to fetch customers from Shopify API.");
    }
  }

  async getAddressForCustomer(customerId: number): Promise<Address[] | null> {
    try {
      if (!customerId || isNaN(customerId) || customerId <= 0) {
        throw new InvalidEntityError("Invalid customer ID.");
      }
      const addresses = await this.shopifyClient.get<Address[]>(
        `/customers/${customerId}/addresses.json`
      );
      if (!addresses) {
        throw new ResourceNotFoundError(
          `Addresses for customer with ID ${customerId}`
        );
      }
      return addresses;
    } catch (error: any) {
      console.error(
        `Error fetching addresses for customer with ID ${customerId}:`,
        error.message
      );
      throw new ShopifyAPIError(
        "Failed to fetch addresses for customer from Shopify API."
      );
    }
  }

  async updateCustomerAddress(
    customerId: number,
    addressId: number,
    updatedAddress: Address
  ): Promise<Address | null> {
    try {
      if (!customerId || isNaN(customerId) || customerId <= 0) {
        throw new InvalidEntityError("Invalid customer ID.");
      }
      if (!addressId || isNaN(addressId) || addressId <= 0) {
        throw new InvalidEntityError("Invalid address ID.");
      }
      const updatedAddressResponse = await this.shopifyClient.put<Address>(
        `/customers/${customerId}/addresses/${addressId}.json`,
        updatedAddress
      );
      if (!updatedAddressResponse) {
        throw new ResourceNotFoundError(
          `Address with ID ${addressId} for customer with ID ${customerId}`
        );
      }
      return updatedAddressResponse;
    } catch (error: any) {
      console.error(
        `Error updating address for customer with ID ${customerId} and address ID ${addressId}:`,
        error.message
      );
      throw new ShopifyAPIError(
        "Failed to update address for customer using Shopify API."
      );
    }
  }

  async setDefaultCustomerAddress(
    customerId: number,
    addressId: number
  ): Promise<Address | null> {
    try {
      if (!customerId || isNaN(customerId) || customerId <= 0) {
        throw new InvalidEntityError("Invalid customer ID.");
      }
      if (!addressId || isNaN(addressId) || addressId <= 0) {
        throw new InvalidEntityError("Invalid address ID.");
      }
      const updatedAddressResponse = await this.shopifyClient.put<Address>(
        `/customers/${customerId}/addresses/${addressId}/default.json`,
        {}
      );
      if (!updatedAddressResponse) {
        throw new ResourceNotFoundError(
          `Address with ID ${addressId} for customer with ID ${customerId}`
        );
      }
      return updatedAddressResponse;
    } catch (error: any) {
      console.error(
        `Error setting default address for customer with ID ${customerId} and address ID ${addressId}:`,
        error.message
      );
      throw new ShopifyAPIError(
        "Failed to set default address for customer using Shopify API."
      );
    }
  }
}

export const customerService = new CustomerService();
