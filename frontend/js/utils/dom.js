export function createElement(tag, { className = '', text = '', attrs = {} } = {}, children = []) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== '') element.textContent = text;
  Object.entries(attrs).forEach(([name, value]) => element.setAttribute(name, String(value)));
  children.filter(Boolean).forEach((child) => element.append(child));
  return element;
}

export function createLoader(fullWidth = false) {
  const loader = createElement('div', { className: `loader${fullWidth ? ' loader--full' : ''}` }, [
    createElement('div', { className: 'loader__spinner' })
  ]);
  return loader;
}

export function createMessage(text, className = '') {
  return createElement('p', { className, text });
}

export function getRequiredElement(selector, parent = document) {
  const element = parent.querySelector(selector);
  if (!element) throw new Error(`No se encontró el elemento requerido: ${selector}`);
  return element;
}
