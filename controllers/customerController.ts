import { Request, Response } from "express";
import { CustomerService } from "../services/customerService";
import { Address } from "../types/customerAddress.types";
import { EntityNotFoundError } from "../errorhandler/entityNotFound.errorhandler";
import { ResourceNotFoundError } from "../errorhandler/resourceNotFound.errorhandler";
import { ApplicationError } from "../errorhandler/application.errorhandler";
import { InvalidEntityError } from "./../errorhandler/invalidEntityErrorHandler";
import { Customer } from "./../types/customer.types";
import { shopify } from "./../server";
export class CustomerController {
  private readonly customerService: CustomerService;

  constructor(customerService: CustomerService) {
    this.customerService = customerService;
  }

  async getCustomerAddressList(req: Request, res: Response) {
    const phoneNumber: string = req.params.phoneNumber;
    console.log("hey");
    if (!phoneNumber) {
      return res
        .status(400)
        .json({ error: "Phone Number is required in the request body" });
    }

    try {
      const customers = await this.customerService.getAllCustomers();
      if (!customers || customers.length === 0) {
        throw new ResourceNotFoundError("Customers not found");
      }

      const customerIds: number[] = [];
      customers.forEach((customer) => {
        if (customer.phone === phoneNumber) {
          customerIds.push(customer.id);
        }
      });

      const addressesPromises = customerIds.map(async (customerId) => {
        const addresses = await this.customerService.getAddressForCustomer(
          customerId
        );
        if (!addresses || addresses.length === 0) {
          throw new EntityNotFoundError(
            `Addresses for customer with ID ${customerId} not found`
          );
        }
        return addresses;
      });

      const addresses = await Promise.all(addressesPromises);

      res.status(200).json(addresses);
    } catch (error: any) {
      console.error(
        `Error fetching addresses for customers with phone number ${phoneNumber}:`,
        error.message
      );
      if (
        error instanceof EntityNotFoundError ||
        error instanceof ResourceNotFoundError
      ) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof InvalidEntityError) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof ApplicationError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async updateCustomerAddress(req: Request, res: Response) {
    const addressId: number = parseInt(req.params.addressId);
    const updatedAddress: Address = req.body;

    if (isNaN(addressId) || addressId <= 0) {
      return res.status(400).json({ error: "Invalid Address ID" });
    }

    try {
      const customers: Customer[] | null =
        await this.customerService.getAllCustomers();
      if (!customers) {
        throw new EntityNotFoundError("Customers");
      }

      const customerIds: number[] = [];
      customers.forEach((customer) => {
        customer.addresses.forEach((address) => {
          if (address.id === addressId) {
            customerIds.push(customer.id);
          }
        });
      });

      if (customerIds.length === 0) {
        throw new EntityNotFoundError(
          `No customers found with address ID ${addressId}`
        );
      }

      const promises = customerIds.map((customerId) => {
        return Promise.all([
          this.customerService.updateCustomerAddress(
            customerId,
            addressId,
            updatedAddress
          ),
          this.customerService.setDefaultCustomerAddress(customerId, addressId),
        ]);
      });

      const updatedAddresses = await Promise.all(promises);

      res.status(200).json({ success: true, updatedAddresses });
    } catch (error: any) {
      console.error(
        `Error updating address for address ${addressId}:`,
        error.message
      );
      if (
        error instanceof EntityNotFoundError ||
        error instanceof InvalidEntityError
      ) {
        res.status(404).json({ error: error.message });
      } else if (error instanceof ApplicationError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
}

const customerServices = new CustomerService(shopify);
export const customer = new CustomerController(customerServices);
