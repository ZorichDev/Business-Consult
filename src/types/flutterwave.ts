// Shared global type for the Flutterwave inline checkout script.
// Centralised here so HeroSlider.tsx and SiteHeader.tsx don't each
// re-declare Window and clash with one another (TS2717).

interface FlutterwaveConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options?: string;
  customer: {
    email: string;
    phone_number?: string;
    name: string;
  };
  customizations?: {
    title?: string;
    description?: string;
    logo?: string;
  };
  meta?: Record<string, unknown>;
  tokenization?: boolean;
  callback: (response: FlutterwaveResponse) => void;
  onclose: () => void;
}

interface FlutterwaveResponse {
  status: string;
  transaction_id?: string | number;
  card_token?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    FlutterwaveCheckout: (config: FlutterwaveConfig) => void;
  }
}

export {};