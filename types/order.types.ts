import { Customer } from "./customer.types";
import { Address } from "./customerAddress.types";

export interface Order {
  id: number;
  admin_graphql_api_id: string;
  app_id: number;
  browser_ip: string;
  buyer_accepts_marketing: boolean;
  cancel_reason: string | null;
  cancelled_at: string | null;
  cart_token: string | null;
  checkout_id: number;
  checkout_token: string;
  client_details: {
    accept_language: string | null;
    browser_height: number | null;
    browser_ip: string;
    browser_width: number | null;
    session_hash: string | null;
    user_agent: string;
  };
  closed_at: string | null;
  company: string | null;
  confirmation_number: string;
  confirmed: boolean;
  contact_email: string;
  created_at: string;
  currency: string;
  current_subtotal_price: string;
  current_subtotal_price_set: MoneySet;
  current_total_additional_fees_set: MoneySet | null;
  current_total_discounts: string;
  current_total_discounts_set: MoneySet;
  current_total_duties_set: MoneySet | null;
  current_total_price: string;
  current_total_price_set: MoneySet;
  current_total_tax: string;
  current_total_tax_set: MoneySet;
  customer_locale: string;
  device_id: string | null;
  discount_codes: any[]; 
  email: string;
  estimated_taxes: boolean;
  financial_status: string;
  fulfillment_status: string | null;
  landing_site: string | null;
  landing_site_ref: string | null;
  location_id: number | null;
  merchant_of_record_app_id: number | null;
  name: string;
  note: string | null;
  note_attributes: any[]; 
  number: number;
  order_number: number;
  order_status_url: string;
  original_total_additional_fees_set: MoneySet | null;
  original_total_duties_set: MoneySet | null;
  payment_gateway_names: string[];
  phone: string;
  po_number: string | null;
  presentment_currency: string;
  processed_at: string;
  reference: string;
  referring_site: string | null;
  source_identifier: string;
  source_name: string;
  source_url: string | null;
  subtotal_price: string;
  subtotal_price_set: MoneySet;
  tags: string;
  tax_exempt: boolean;
  tax_lines: TaxLine[];
  taxes_included: boolean;
  test: boolean;
  token: string;
  total_discounts: string;
  total_discounts_set: MoneySet;
  total_line_items_price: string;
  total_line_items_price_set: MoneySet;
  total_outstanding: string;
  total_price: string;
  total_price_set: MoneySet;
  total_shipping_price_set: MoneySet;
  total_tax: string;
  total_tax_set: MoneySet;
  total_tip_received: string;
  total_weight: number;
  updated_at: string;
  user_id: number;
  billing_address: Address;
  customer: Customer;
  discount_applications: any[]; 
  fulfillments: any[]; 
  line_items: LineItem[];
  payment_terms: string | null;
  refunds: any[];
  shipping_address: Address;
  shipping_lines: any[]; 
}

interface MoneySet {
    shop_money: Money;
    presentment_money: Money;
}

interface Money {
    amount: string;
    currency_code: string;
}

interface TaxLine {
    price: string;
    rate: number;
    title: string;
    price_set: MoneySet;
    channel_liable: boolean;
}

interface LineItem {
    id: number;
    admin_graphql_api_id: string;
    attributed_staffs: any[]; 
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: string | null;
    gift_card: boolean;
    grams: number;
    name: string;
    price: string;
    price_set: MoneySet;
    product_exists: boolean;
    product_id: number;
    properties: any[];
    quantity: number;
    requires_shipping: boolean;
    sku: string;
    taxable: boolean;
    title: string;
    total_discount: string;
    total_discount_set: MoneySet;
    variant_id: number;
    variant_inventory_management: string;
    variant_title: string;
    vendor: string;
    tax_lines: TaxLine[];
    duties: any[]; 
    discount_allocations: any[]; 
}
