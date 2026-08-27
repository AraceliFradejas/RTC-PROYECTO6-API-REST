import { api } from './api.js';
import { levenshteinDistance, normalizeForSearch, uniqueById } from '../utils/text.js';

let songIndex;

function directMatches(query, songs, property) {
  const normalizedQuery = normalizeForSearch(query);
  return songs.filter((song) => {
    const value = property === 'album' ? song.album?.title : song[property];
    const normalizedValue = normalizeForSearch(value);
    return normalizedValue
      && (normalizedValue.includes(normalizedQuery) || normalizedQuery.includes(normalizedValue));
  });
}

function bestCandidate(query, songs) {
  const normalizedQuery = normalizeForSearch(query);
  const groups = {
    song: [...new Set(songs.map((song) => song.title).filter(Boolean))],
    album: [...new Set(songs.map((song) => song.album?.title).filter(Boolean))],
    author: [...new Set(songs.map((song) => song.author).filter(Boolean))]
  };
  return Object.entries(groups).flatMap(([type, terms]) => terms.map((term) => {
    const normalized = normalizeForSearch(term);
    return { type, term, ratio: levenshteinDistance(normalizedQuery, normalized) / Math.max(normalized.length, normalizedQuery.length, 1) };
  })).sort((a, b) => a.ratio - b.ratio)[0];
}

export async function searchSongs(query) {
  const requests = [api.getSongs({ title: query }), api.getSongs({ author: query })];
  if (/^\d{4}$/.test(query)) requests.push(api.getSongs({ year: query }));
  const results = uniqueById((await Promise.all(requests)).flat());
  if (results.length) return { songs: results };

  songIndex ||= await api.getSongs();
  for (const [type, property] of [['song', 'title'], ['album', 'album'], ['author', 'author']]) {
    const matches = uniqueById(directMatches(query, songIndex, property)).slice(0, 25);
    if (matches.length) {
      const suggestion = type === 'album' ? matches[0].album.title : matches[0][property];
      return { songs: matches, suggestion, type, close: true };
    }
  }

  const candidate = bestCandidate(query, songIndex);
  if (!candidate || candidate.ratio > 0.34) return { songs: [] };
  const property = candidate.type === 'song' ? 'title' : candidate.type;
  const matches = songIndex.filter((song) =>
    (candidate.type === 'album' ? song.album?.title : song[property]) === candidate.term
  );
  return { songs: uniqueById(matches).slice(0, 25), suggestion: candidate.term, type: candidate.type };
}
