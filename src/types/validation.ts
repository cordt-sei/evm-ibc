// src/types/validation.ts
export interface AddressValidation {
  isValid: boolean;
  error?: string;
}

export interface AmountValidation {
  isValid: boolean;
  error?: string;
  formattedAmount?: string;
}

export interface DenomValidation {
  isValid: boolean;
  error?: string;
  trace?: {
    path: string;
    baseDenom: string;
  };
}

export interface ChainValidation {
  isValid: boolean;
  error?: string;
  supportedChainIds: (string | number)[];
}