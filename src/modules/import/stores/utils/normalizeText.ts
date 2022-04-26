export function normalizeText(text: string): string {
  return text
    .replace(/[·]/gi, '•')
    .replace(/[^\w$*_+~.,()'"”!\-:@/•\n\t ]+/gi, '')
    .replace(/ +/gi, ' ');
}
