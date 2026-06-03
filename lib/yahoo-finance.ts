import yahooFinance from 'yahoo-finance2';

// Simple placeholder caching functions to match your imports
export async function fromCache(key: string) {
  // Your caching retrieval logic here
  return null;
}

export async function setCache(key: string, data: any, ttl: number) {
  // Your caching storage logic here
}

export function toApiError(error: any) {
  return {
    message: error.message || "Internal Server Error",
    status: error.status || 500
  };
}

export default yahooFinance;