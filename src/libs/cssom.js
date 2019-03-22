//----------------------------------------------------------------------
//
// CSSOM View Module
// https://dev.w3.org/csswg/cssom-view/
//
//----------------------------------------------------------------------

// Fix for IE8-'s Element.getBoundingClientRect()
(function (global) {
  if (!global) { return; }
  if ('TextRectangle' in global && !('width' in global.TextRectangle.prototype)) {
    Object.defineProperties(global.TextRectangle.prototype, {
      'width': { get: function () { return this.right - this.left } },
      'height': { get: function () { return this.bottom - this.top } }
    })
  }
})((typeof self === 'object' && self.self === self && self) ||
  (typeof global === 'object' && global.global === global && global) ||
  this)