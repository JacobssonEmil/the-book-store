import '../scss/style.scss';
import * as bootstrap from 'bootstrap';
const $ = el => document.querySelector(el);

const fetchText = async url => (await (await (fetch(url))).text())
  .replace(/<script.+?vite\/client.+?<\/script>/g, '');

function replaceElement(element, html, remove = true) {
  let div = document.createElement('div');
  div.innerHTML = html;
  for (let newElement of [...div.children]) {
    element.after(newElement, element);
  }
  remove && element.remove();
}

async function componentMount() {
  while (true) {
    let c = $('component');
    if (!c) { break; }
    let src = `/html${c.getAttribute('src')}.html`;
    let html = await fetchText(src);
    replaceElement(c, html);
  }
  repeatElements();
}

function repeatElements() {
  while (true) {
    let r = $('[repeat]');
    if (!r) { break; }
    let count = Math.max(1, +r.getAttribute('repeat'));
    r.removeAttribute('repeat');
    for (let i = 0; i < count - 1; i++) {
      let html = unsplashFix(r.outerHTML);
      replaceElement(r, html, false);
    }
  }
}

function unsplashFix(html) {
  return html.replace(
    /(https:\/\/source.unsplash.com\/random\/?[^"]*)/g,
    '$1&' + Math.random()
  );
}

$('body').addEventListener('click', e => {
  let aElement = e.target.closest('a');
  if (!aElement) { return; }
  let href = aElement.getAttribute('href');
  if (href.indexOf('http') === 0) { return; }
  if (href === '#') { return; }
  e.preventDefault();
  history.pushState(null, null, href);
  loadPage(href);
});

window.addEventListener('popstate', () => loadPage());

const pageCache = {};
async function loadPage(src = location.pathname) {
  src = src === '/' ? '/start' : src;
  src = `/html/pages/${src}.html`;
  let html = pageCache[src] || await fetchText(src);
  pageCache[src] = html;
  $('main').innerHTML = html;
  componentMount();
  setActiveLinkInNavbar();
}

function setActiveLinkInNavbar() {
  let href = location.pathname;
  let oldActive = $('nav .active');
  let newActive = $(`nav a[href="${href}"]:not(.navbar-brand)`);
  if (!newActive) {
    for (let aTag of $('nav').querySelectorAll('a')) {
      let startsWith = aTag.getAttribute('active-if-url-starts-with');
      newActive = startsWith && href.indexOf(startsWith) === 0 && aTag;
      if (newActive) { break; }
    }
  }
  oldActive && oldActive.classList.remove('active');
  newActive && newActive.classList.add('active');
}

componentMount().then(x => loadPage());