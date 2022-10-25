import { unit } from './unit.js';
import { board } from '../app.js';

function Dom() {
  this.addElement = function (className, styles) {
    const element = document.createElement('div');

    if (styles) {
      this.setStyles(element, styles);
    }

    this.setClassName(element, className);

    board.element.appendChild(element);

    return element;
  };

  this.removeElement = function (element) {
    board.element.removeChild(element);
  };

  this.setClassName = function (el, className) {
    if (typeof className == 'string') el.classList.add(className);
    else el.classList.add(...className);
  };

  this.setStyles = function (el, styles) {
    for (const key in styles) {
      if (typeof styles[key] === 'number') {
        styles[key] = unit.px(styles[key]);
      }
    }

    Object.assign(el.style, styles);
  };

  this.setSize = function (el, { width, height } = {}) {
    if (!width || !height) return false;

    this.setStyles(el, { width, height });
  };
}

export default Dom;
