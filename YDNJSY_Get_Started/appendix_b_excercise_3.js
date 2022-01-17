function randMax(max) {
  return Math.trunc(1e9 * Math.random()) % max;
}

var reel = {
  symbols: ["X", "Y", "Z", "W", "$", "*", "<", "@"],
  // Generate a random array
  spin() {
    if (this.position == null) {
      const rand = randMax(this.symbols.length - 1);
      // console.log("rand: ", rand);
      this.position = rand;
    }
    this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
    // console.log("this.position: ", this.position);
  },
  display() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    return this.symbols[this.position];
  },
};

var slotMachine = {
  reels: [
    // this slot machine needs 3 separate reels
    // hint: Object.create(..)
    Object.create(reel),
    Object.create(reel),
    Object.create(reel),
  ],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    // TODO

    let lines = [];
    for (let linePosition = 0; linePosition <= 2; linePosition++) {
      let line = this.reels.map(function getSlot(reel) {
        let slot = Object.create(reel);
        let length = reel.symbols.length;
        let pos = reel.position;
        let spos = (length + pos + linePosition) % length;
        slot.position = spos;
        return reel.display.call(slot);
      });
      lines.push(line.join("|"));
    }
    return lines.join("\n");
  },
};

slotMachine.spin();
console.log(slotMachine.display());
// < | @ | *
// @ | X | <
// X | Y | @

slotMachine.spin();
console.log(slotMachine.display());
// Z | X | W
// W | Y | $
// $ | Z | *
