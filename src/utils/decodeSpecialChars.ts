const pairs: { [key: string]: string } = {
  "&#34;": '"',
  "&#39;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
};
const decodeSpecialChars = (input: string) => {
  for (const key of Object.keys(pairs)) {
    const value = pairs[key];
    if (!value) continue;
    input = input.replaceAll(key, value);
  }
  return input;
};

export { decodeSpecialChars };
