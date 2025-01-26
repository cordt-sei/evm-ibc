// src/types/errors.ts
export interface APIError extends Error {
  code?: string;
  statusCode?: number;
  data?: unknown;
}

export interface TransactionError extends Error {
  code?: string;
  receipt?: unknown;
  transaction?: unknown;
}

export interface ValidationError extends Error {
  field?: string;
  value?: unknown;
  constraint?: string;
}