export default function normalizeTextOtro(text) {
  return text
    .replace(/[^\w\s$*_+~.,()'"”!\-:@/•\f\n\r\t\v\u00a0\u1680\u2000\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/gi, '')
    .replace(/\s+/g, ' ');
}
