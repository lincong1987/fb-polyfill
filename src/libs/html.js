/**
 * polyfill for IE8 in HTML
 * https://html.spec.whatwg.org
 */
(function (global) {

  if (!global) { return; }

  if (!('document' in global)) {
    return
  }
  // document.head
  document.head = document.head || document.getElementsByTagName('head')[0]

  // HTML Tag shiv
  void [
    'abbr', 'article', 'aside', 'audio', 'bdi', 'canvas', 'data', 'datalist',
    'details', 'dialog', 'figcaption', 'figure', 'footer', 'header', 'hgroup',
    'main', 'mark', 'meter', 'nav', 'output', 'picture', 'progress', 'section',
    'summary', 'template', 'time', 'video'
  ].forEach(function (tag) {
    document.createElement(tag)
  })

})((typeof self === 'object' && self.self === self && self) ||
  (typeof global === 'object' && global.global === global && global) ||
  this)