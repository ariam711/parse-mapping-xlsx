export function normalizeText(text: any): string {
  return text.replace(/[^\w$*_+~.,()'"”!\-:@/•\s]+/gi, '').replace(/ +/gi, ' ');
}
