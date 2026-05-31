import { countTokens } from 'gpt-tokenizer';

type CountRequest = {
  id: number;
  text: string;
};

function countWords(text: string): number {
  let words = 0;
  let isInWord = false;

  for (const char of text) {
    if (/\s/.test(char)) {
      isInWord = false;
      continue;
    }

    if (!isInWord) {
      words += 1;
      isInWord = true;
    }
  }

  return words;
}

self.addEventListener('message', (event: MessageEvent<CountRequest>) => {
  const { id, text } = event.data;
  const hasText = text.trim().length > 0;

  self.postMessage({
    id,
    chars: text.length,
    words: hasText ? countWords(text) : 0,
    tokens: hasText ? countTokens(text) : 0,
  });
});
