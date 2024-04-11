import { Address } from "./customerAddress.types";

export interface Customer {
    id: number;
    email: string;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    state: string;
    note: string;
    verified_email: boolean;
    multipass_identifier: string | null;
    tax_exempt: boolean;
    phone: string;
    email_marketing_consent: Consent;
    sms_marketing_consent: Consent;
    tags: string;
    currency: string;
    accepts_marketing: boolean;
    accepts_marketing_updated_at: string | null;
    marketing_opt_in_level: string;
    tax_exemptions: any[]; // Update with actual type if available
    admin_graphql_api_id: string;
    default_address: Address;
}

interface Consent {
    state: string;
    opt_in_level: string;
    consent_updated_at: string | null;
    consent_collected_from?: string;
}