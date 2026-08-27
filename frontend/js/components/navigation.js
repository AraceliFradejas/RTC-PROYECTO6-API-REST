import { getRequiredElement } from '../utils/dom.js';

export function setupNavigation(onLanguageChange) {
  const toggle = getRequiredElement('.nav__toggle');
  const links = getRequiredElement('.nav__links');

  const close = () => {
    toggle.classList.remove('active');
    links.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('active');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  links.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  getRequiredElement('#lang-toggle').addEventListener('click', onLanguageChange);
}
