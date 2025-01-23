// src/utils/denomValidation.ts
import { DenomTrace } from '../types';

export function validateDenomTrace(trace: DenomTrace): boolean {
  const channels = trace.path.match(/channel-\d+/g) || [];
  if (channels.length !== 1) return false;

  const pathSegments = trace.path.split('/');
  return pathSegments.length === 2;
}