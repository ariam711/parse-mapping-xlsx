export function normalizeText(text: string): string {
  return text
    .replace(/[^\w$*_+~.,()'"”!\-:@/•\n\t ]+/gi, '')
    .replace(//gi, '•')
    .replace(/ +/gi, ' ');
}
