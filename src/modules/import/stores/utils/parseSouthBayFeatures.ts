import { normalizeText } from './normalizeText';

const FEATURES = ['$MF$', '$AF$'];

export function parseSouthBayFeatures(text: string, obj: any) {
  let normalized = normalizeText(text);
  if (!normalized) return;
  normalized = normalized.replace(/(\s*MATTRESS FEATURES:\s*)/gi, '$I$$$MF$');
  normalized = normalized.replace(/(\s*ADJUSTABLE BASE FEATURES:\s*)/gi, '$I$$$AF$');
  normalized = normalized.replace(/(\s*ADJUSTABLE BASE POSITIONS:\s*)/gi, '$I$$$AP$');
  normalized = normalized.replace(/(\s*SET-UP, DELIVERY, SAFETY, WARRANTY:\s*)/gi, '$I$$$DL$');

  const [description, ...rest] = normalized.split('$I$');

  let featText = '';

  rest.forEach(value => {
    if (FEATURES.includes(value.substr(0, 4))) {
      featText = `${featText}\n${value.substr(4)}`;
    }
  });

  let features = 0;

  const parseFeatureArray = (arr: string[]) => {
    arr.forEach(t => {
      if (features >= 15) return;
      const feat = t
        .trim()
        .replace(/\s+/gi, ' ')
        .replace(/\s*•\s*/, '');
      if (feat) obj[`feature_${++features}`] = feat;
    });
  };

  parseFeatureArray(
    featText
      ? featText.split('\n')
      : description
          .replace(/\s*•\s*/gi, '•')
          .split('•')
          .slice(1)
  );

  obj['description'] = featText ? description : '';
}
