import { Address } from "./customerAddress.types";

export interface Customer {
    id: number;
    email: string;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    orders_count: number;
    state: string;
    total_spent: string;
    last_order_id: number;
    note: string;
    verified_email: boolean;
    multipass_identifier: any;
    tax_exempt: boolean;
    tags: string;
    last_order_name: string;
    currency: string;
    phone: string;
    addresses: Address[];
    accepts_marketing: boolean;
    accepts_marketing_updated_at: string | null;
    marketing_opt_in_level: string;
    tax_exemptions: any[]; 
    email_marketing_consent: EmailMarketingConsent;
    sms_marketing_consent: SmsMarketingConsent;
    admin_graphql_api_id: string;
    default_address: Address;
}

interface EmailMarketingConsent {
    state: string;
    opt_in_level: string;
    consent_updated_at: string | null;
}

interface SmsMarketingConsent {
    state: string;
    opt_in_level: string;
    consent_updated_at: string | null;
    consent_collected_from: string;
}