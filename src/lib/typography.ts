const NBSP = ' ';

// Reglas de espacio-no-separable para evitar palabras huérfanas en español.
//
// Importante: nunca se encadenan dos uniones consecutivas (p. ej. "Lo que construyen"
// nunca se vuelve "Lo·que·construyen" con dos NBSP seguidos): eso crea una cadena sin
// espacios reales que puede desbordar su contenedor en pantallas angostas. Cada unión
// deja al menos un espacio real antes de la siguiente. Por la misma razón, esto sólo
// se aplica a texto de párrafo (p, dd, blockquote) — nunca a títulos, botones o
// elementos de una sola línea con tipografía grande, que ya usan `text-wrap: balance`
// en CSS (seguro contra desbordes, a diferencia de un NBSP manual).

const GLUED_PHRASES = ['Nexus Labs', 'Universidad Panamericana', 'Computer Science'];
const BLOCK_END = new Set(['p', 'dd', 'blockquote']);
const SKIP = new Set(['script', 'style', 'svg', 'textarea', 'pre', 'code', 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

function glueConsecutiveSafely(text: string, isGlueable: (word: string) => boolean): string {
  const tokens = text.split(/( +)/); // alterna: palabra, espacios, palabra, espacios...
  let lastWasGlued = false;

  for (let i = 0; i < tokens.length - 2; i += 2) {
    const word = tokens[i];
    const gap = tokens[i + 1];
    if (!word || gap !== ' ' || lastWasGlued) {
      lastWasGlued = false;
      continue;
    }
    if (isGlueable(word)) {
      tokens[i + 1] = NBSP;
      lastWasGlued = true;
    } else {
      lastWasGlued = false;
    }
  }

  return tokens.join('');
}

export function tie(text: string): string {
  let out = text;

  for (const phrase of GLUED_PHRASES) {
    out = out.split(phrase).join(phrase.replace(/ /g, NBSP));
  }

  out = out.replace(/ (?=[·→←↑])/g, NBSP);
  out = out.replace(/ &amp; /g, `${NBSP}&amp;${NBSP}`);

  out = glueConsecutiveSafely(out, (word) => {
    const letters = word.replace(/[^\p{L}\p{N}]/gu, '');
    return letters.length > 0 && letters.length <= 3;
  });

  return out;
}

function bindLastWords(text: string): string {
  const trimmed = text.replace(/\s+$/, '');
  const trailing = text.slice(trimmed.length);
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace < 0) return text;
  const lastWord = trimmed.slice(lastSpace + 1);
  if (trimmed.length < 24 || lastWord.length > 16) return text;
  return `${trimmed.slice(0, lastSpace)}${NBSP}${lastWord}${trailing}`;
}

export function tieHtml(html: string): string {
  const parts = html.split(/(<[^>]*>)/);
  const stack: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (i % 2 === 1) {
      const match = /^<(\/?)([a-zA-Z][\w-]*)/.exec(part);
      if (!match) continue;
      const closing = match[1] === '/';
      const name = match[2].toLowerCase();
      const selfClosing = part.endsWith('/>');
      if (!closing && !selfClosing) stack.push(name);
      else if (closing) {
        const idx = stack.lastIndexOf(name);
        if (idx !== -1) stack.length = idx;
      }
      continue;
    }

    if (!part.trim()) continue;
    if (stack.some((tag) => SKIP.has(tag))) continue;

    const currentTag = stack[stack.length - 1];
    if (!currentTag || !BLOCK_END.has(currentTag)) continue;

    let text = tie(part);
    const nextTag = /^<\/([a-zA-Z][\w-]*)/.exec(parts[i + 1] ?? '');
    if (nextTag && nextTag[1].toLowerCase() === currentTag) text = bindLastWords(text);
    parts[i] = text;
  }

  return parts.join('');
}
