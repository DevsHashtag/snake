import { mainElement, CLASS_NAMES } from '../settings.js';
import { toPixel } from './position.js';

export default function Dom() {
  this.mainElement = mainElement;

  this.init = function () {
    this.containerElement = this.renderElement(CLASS_NAMES.container);
  };

  this.addElement = function (className, type = 'div') {
    const element = document.createElement(type);

    this.setClassName(element, className);

    return element;
  };

  this.setClassName = function (element, className) {
    if (!className) return;

    if (typeof className == 'string') element.classList.add(className);
    else element.classList.add(...className);
  };

  this.setSize = function (element, { width, height } = {}) {
    if (!width || !height) return false;

    element.style.width = toPixel(width);
    element.style.height = toPixel(height);

    return true;
  };

  this.setPosition = function (element, position) {
    if (!position) return false;

    element.style.left = toPixel(position.x);
    element.style.top = toPixel(position.y);

    return true;
  };

  this.renderElement = function (className, parent = this.mainElement, type = 'div') {
    const element = this.addElement(className, type);

    parent.appendChild(element);

    return element;
  };
}
