function Keyboard() {
  this.fired = false;

  this.keydown = function (handelKeys) {
    window.onkeydown = (e) => {
      // skip repeated keys
      if (this.fired || e.repeat) return;

      // delay between keys
      this.fired = true;
      setTimeout(() => (this.fired = false), 10);

      // handel keys
      handelKeys(e.key);
    };
  };
}

export default Keyboard;
