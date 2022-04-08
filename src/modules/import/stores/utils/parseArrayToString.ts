export function parseArrayToString(obj: Record<string, any>, key: string) {
  const value = obj[key];
  if (value && Array.isArray(value)) {
    obj[key] = value.join(',');
  }
}
