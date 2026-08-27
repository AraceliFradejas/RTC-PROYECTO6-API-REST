export function normalizeText(text = '') {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeForSearch(text = '') {
  return normalizeText(text).replace(/\s+/g, '');
}

export function levenshteinDistance(a = '', b = '') {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let row = 1; row <= a.length; row += 1) {
    let diagonal = previous[0];
    previous[0] = row;
    for (let column = 1; column <= b.length; column += 1) {
      const above = previous[column];
      previous[column] = Math.min(
        previous[column] + 1,
        previous[column - 1] + 1,
        diagonal + (a[row - 1] === b[column - 1] ? 0 : 1)
      );
      diagonal = above;
    }
  }
  return previous[b.length];
}

export function uniqueById(items = []) {
  const seen = new Set();
  return items.filter((item) => item?._id && !seen.has(item._id) && seen.add(item._id));
}
