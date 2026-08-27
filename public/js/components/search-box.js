import { createElement, createLoader, createMessage, getRequiredElement } from '../utils/dom.js';
import { searchSongs } from '../services/search.js';
import { createSearchResult } from './search-result.js';

export function setupSearch({ translate, randomTranslation, onAlbumSelect }) {
  const input = getRequiredElement('#search-input');
  const button = getRequiredElement('#search-btn');
  const results = getRequiredElement('#search-results');
  let timer;

  function render(result, query) {
    const heading = [createMessage(`${translate('search.resultsFor')} "${query}"`, 'search__results-heading')];
    if (result.suggestion && result.suggestion.toLowerCase() !== query.toLowerCase()) {
      heading.push(createMessage(
        randomTranslation(result.close ? 'search.funCloseOptions' : 'search.funOopsOptions'),
        'search__suggestion-note'
      ));
      heading.push(createElement('div', { className: 'search__suggestion' }, [
        document.createTextNode(`${translate('search.didYouMean')} `),
        createElement('button', {
          className: 'search__suggestion-btn', text: result.suggestion,
          attrs: { type: 'button', 'data-suggestion-query': result.suggestion }
        }),
        document.createTextNode(` (${translate(`search.by${result.type[0].toUpperCase()}${result.type.slice(1)}`)})?`)
      ]));
    }
    if (!result.songs.length) {
      results.replaceChildren(...heading, createMessage(translate('search.empty'), 'search__no-results'));
      return;
    }
    results.replaceChildren(...heading, ...result.songs.map((song, index) =>
      createSearchResult(song, index, { translate, onAlbumSelect })
    ));
  }

  async function submit() {
    const query = input.value.trim();
    if (!query) return results.replaceChildren();
    results.replaceChildren(createLoader());
    try {
      render(await searchSongs(query), query);
    } catch (error) {
      console.error('Error buscando:', error);
      results.replaceChildren(createMessage(translate('song.error'), 'search__no-results'));
    }
  }

  input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(submit, 400); });
  input.addEventListener('keydown', (event) => { if (event.key === 'Enter') submit(); });
  button.addEventListener('click', submit);
  results.addEventListener('click', (event) => {
    const suggestion = event.target.closest('[data-suggestion-query]')?.dataset.suggestionQuery;
    if (suggestion) { input.value = suggestion; submit(); }
  });
}
