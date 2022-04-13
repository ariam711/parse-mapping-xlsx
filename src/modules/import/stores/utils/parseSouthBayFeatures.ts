import { normalizeText } from './normalizeText';

export function parseSouthBayFeatures(text: string, obj: any) {
  let normalized = normalizeText(text);
  if (!normalized) return;
  normalized = normalized.replace(/(\s*MATTRESS FEATURES:\s*)/gi, '$I$$$MF$');
  normalized = normalized.replace(/(\s*ADJUSTABLE BASE FEATURES:\s*)/gi, '$I$$$AF$');
  normalized = normalized.replace(/(\s*ADJUSTABLE BASE POSITIONS:\s*)/gi, '$I$$$AP$');
  normalized = normalized.replace(/(\s*SET-UP, DELIVERY, SAFETY, WARRANTY:\s*)/gi, '$I$$$DL$');

  const [description, ...rest] = normalized.split('$I$');
  obj['description'] = description;

  rest.forEach(value => {
    if (value.startsWith('$MF$')) {
      value = value.substr(4);
      let features = 0;
      value.split('\n').forEach(t => {
        const feat = t
          .trim()
          .replace(/\s+/gi, ' ')
          .replace(/\s*•\s*/, '');
        if (feat) obj[`feature_${++features}`] = feat;
      });
    }
  });
}
