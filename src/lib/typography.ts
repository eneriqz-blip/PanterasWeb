const NBSP = ' ';
const WS = '[ \\t\\r\\n]+';

const SHORT_WORD = new RegExp(`(?<![\\p{L}\\p{N}])([\\p{L}\\p{N}]{1,3})${WS}(?=[\\p{L}\\p{N}¿¡"“«(])`, 'gu');
const SYMBOL_SPACE = new RegExp(`${WS}(?=[·→←↑])`, 'g');
const AMPERSAND = new RegExp(`${WS}&amp;${WS}`, 'g');
const GLUED_PHRASES = ['Nexus Labs', 'Universidad Panamericana', 'Computer Science'].map(
  (phrase) => new RegExp(phrase.split(' ').join(WS), 'g')
);
const LAST_GAP = new RegExp(`${WS}(?=\\S+$)`);

const BLOCK_END = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'dd', 'blockquote']);
const SKIP = new Set(['script', 'style', 'svg', 'textarea', 'pre', 'code', 'title']);

export function tie(text: string): string {
  let out = text.replace(SHORT_WORD, `$1${NBSP}`);
  out = out.replace(SYMBOL_SPACE, NBSP);
  out = out.replace(AMPERSAND, `${NBSP}&amp;${NBSP}`);
  GLUED_PHRASES.forEach((pattern, i) => {
    const phrase = ['Nexus Labs', 'Universidad Panamericana', 'Computer Science'][i];
    out = out.replace(pattern, phrase.replace(/ /g, NBSP));
  });
  return out;
}

function bindLastWords(text: string): string {
  const trimmed = text.replace(/\s+$/, '');
  const trailing = text.slice(trimmed.length);
  const match = LAST_GAP.exec(trimmed);
  if (!match || trimmed.length < 24 || trimmed.length - match.index > 18) return text;
  return `${trimmed.slice(0, match.index)}${NBSP}${trimmed.slice(match.index + match[0].length)}${trailing}`;
}

export function tieHtml(html: string): string {
  const parts = html.split(/(<[^>]*>)/);
  let skipping: string | null = null;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (i % 2 === 1) {
      const match = /^<(\/?)([a-zA-Z][\w-]*)/.exec(part);
      if (!match) continue;
      const closing = match[1] === '/';
      const name = match[2].toLowerCase();
      if (!closing && SKIP.has(name) && !part.endsWith('/>')) skipping = name;
      else if (closing && name === skipping) skipping = null;
      continue;
    }

    if (skipping || !part.trim()) continue;

    let text = tie(part);
    const nextTag = /^<\/([a-zA-Z][\w-]*)/.exec(parts[i + 1] ?? '');
    if (nextTag && BLOCK_END.has(nextTag[1].toLowerCase())) text = bindLastWords(text);
    parts[i] = text;
  }

  return parts.join('');
}
