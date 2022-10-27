function toPixel(num) {
  return num + 'px';
}

function isEqual(pos1, pos2) {
  return pos1.x == pos2.x && pos1.y == pos2.y;
}

export { toPixel, isEqual };
