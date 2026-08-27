import { loadAlbums } from './components/albums-grid.js';
import { createAlbumModal } from './components/album-modal.js';
import { setupNavigation } from './components/navigation.js';
import { setupSearch } from './components/search-box.js';
import { applyLanguage, randomTranslation, toggleLanguage, translate } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  applyLanguage();

  const modal = createAlbumModal(translate);
  const dependencies = { translate, randomTranslation, onAlbumSelect: modal.open };
  setupNavigation(toggleLanguage);
  setupSearch(dependencies);
  loadAlbums(dependencies);
});
