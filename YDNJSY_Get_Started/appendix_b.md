#Appendix B: Practice, Practice, Practice!

####Practicing Comparisons
`scheduleMeeting(..)` should take a start time (in 24-hour format as a string “hh:mm”) and a meeting duration (number of minutes). It should return true if the meeting falls entirely within the work day (according to the times specified in `dayStart` and `dayEnd`); return false if the meeting violates the work day bounds.

```jsx
const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime, durationMinutes) {
  // ..TODO..
}

scheduleMeeting("7:00", 15); // false
scheduleMeeting("07:15", 30); // false
scheduleMeeting("7:30", 30); // true
scheduleMeeting("11:30", 60); // true
scheduleMeeting("17:00", 45); // true
scheduleMeeting("17:30", 30); // false
scheduleMeeting("18:00", 15); // false
```

<hr/>
####Practicing Closure
The `range(..)` function takes a number as its first argument, representing the first number in a desired range of numbers. The second argument is also a number representing the end of the desired range (inclusive). If the second argument is omitted, then another function should be returned that expects that argument.

```jsx
function range(start, end) {
  // ..TODO..
}

range(3, 3); // [3]
range(3, 8); // [3,4,5,6,7,8]
range(3, 0); // []

var start3 = range(3);
var start4 = range(4);

start3(3); // [3]
start3(8); // [3,4,5,6,7,8]
start3(0); // []
start4(6); // [4,5,6]
```

####Practicing Prototypes
Define a slot machine with three reels that can individually `spin()`, and then `display()` the current contents of all the reels.
The basic behavior of a single reel is defined in the `reel` object below. But the slot machine needs individual `reels objects` that delegate to `reel`, and which each have a `position` property.
A `reel` only _knows how_ to `display()` its current slot symbol, but a slot machine typically shows three symbols per reel: the current `slot(position)`, one slot above `(position - 1)`, and one slot below `(position + 1)`. So displaying the slot machine should end up displaying a 3 x 3 grid of slot symbols.

```jsx
function randMax(max) {
  return Math.trunc(1e9 * Math.random()) % max;
}

var reel = {
  symbols: ["X", "Y", "Z", "W", "$", "*", "<", "@"],
  spin() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
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
  ],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    // TODO
  },
};

slotMachine.spin();
slotMachine.display();
// < | @ | *
// @ | X | <
// X | Y | @

slotMachine.spin();
slotMachine.display();
// Z | X | W
// W | Y | $
// $ | Z | *
```

#SOLUTIONS
In this chapter (appendix) I'm going to present the solution propossed by the author, and then mine. Obviously I reached my solution without seeing the author's solution (that's the idea, right?).

####Practicing Comparisons

```jsx
// AUTHOR SOLUTION

const dayStart = "07:30";
const dayEnd = "17:45";
function scheduleMeeting(startTime, durationMinutes) {
  var [, meetingStartHour, meetingStartMinutes] =
    startTime.match(/^(\d{1,2}):(\d{2})$/) || [];
  durationMinutes = Number(durationMinutes);
  if (
    typeof meetingStartHour == "string" &&
    typeof meetingStartMinutes == "string"
  ) {
    let durationHours = Math.floor(durationMinutes / 60);
    durationMinutes = durationMinutes - durationHours * 60;
    let meetingEndHour = Number(meetingStartHour) + durationHours;
    let meetingEndMinutes = Number(meetingStartMinutes) + durationMinutes;
    if (meetingEndMinutes >= 60) {
      meetingEndHour = meetingEndHour + 1;
      meetingEndMinutes = meetingEndMinutes - 60;
    }
    // re-compose fully-qualified time strings
    // (to make comparison easier)
    let meetingStart = `${meetingStartHour.padStart(
      2,
      "0"
    )}:${meetingStartMinutes.padStart(2, "0")}`;
    let meetingEnd = `${String(meetingEndHour).padStart(2, "0")}:${String(
      meetingEndMinutes
    ).padStart(2, "0")}`;
    // NOTE: since expressions are all strings,
    // comparisons here are alphabetic, but it's
    // safe here since they're fully qualified
    // time strings (ie, "07:15" < "07:30")
    return meetingStart >= dayStart && meetingEnd <= dayEnd;
  }
  return false;
}

scheduleMeeting("7:00", 15); // false
scheduleMeeting("07:15", 30); // false
scheduleMeeting("7:30", 30); // true
scheduleMeeting("11:30", 60); // true
scheduleMeeting("17:00", 45); // true
scheduleMeeting("17:30", 30); // false
scheduleMeeting("18:00", 15); // false
```

```jsx
// MY SOLUTION
const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime, durationMinutes) {
  // We need a baseDate to create the Date object
  const baseDate = "2022-01-01";

  // Just a safety check, just in case...
  durationMinutes = durationMinutes * 1;

  // With the dateBase we can create:
  // - day_start
  // - day_end
  // - start_meeting_dt
  const day_start = new Date(`${baseDate} ${dayStart}`);
  const day_end = new Date(`${baseDate} ${dayEnd}`);
  const start_meeting_dt = new Date(`${baseDate} ${startTime}`);

  // end_meeting_dt is slightly different, because we use
  // the start_meeting_td to calculate, but with
  // the getTime() method, to get a copied value, not
  // a reference, to avoid errors.
  let end_meeting_dt = new Date(start_meeting_dt.getTime());
  end_meeting_dt = new Date(
    end_meeting_dt.setMinutes(end_meeting_dt.getMinutes() + durationMinutes)
  );

  // Here we can make a proper comparison between datetimes, to
  // determinate if it meets the condition, or not.
  if (start_meeting_dt >= day_start && end_meeting_dt <= day_end) {
    return true;
  }
  return false;
}

console.log(scheduleMeeting("7:00", 15)); // false
console.log(scheduleMeeting("07:15", 30)); // false
console.log(scheduleMeeting("7:30", 30)); // true
console.log(scheduleMeeting("11:30", 60)); // true
console.log(scheduleMeeting("17:00", 45)); // true
console.log(scheduleMeeting("17:30", 30)); // false
console.log(scheduleMeeting("18:00", 15)); // false
```

In both cases, the solutions were achieved.

####Practicing Closure

```jsx
// AUTHOR SOLUTION
function range(start, end) {
  start = Number(start) || 0;

  if (end === undefined) {
    return function getEnd(end) {
      return getRange(start, end);
    };
  } else {
    end = Number(end) || 0;
    return getRange(start, end);
  }

  // **********************

  function getRange(start, end) {
    var ret = [];
    for (let i = start; i <= end; i++) {
      ret.push(i);
    }
    return ret;
  }
}

range(3, 3); // [3]
range(3, 8); // [3,4,5,6,7,8]
range(3, 0); // []

var start3 = range(3);
var start4 = range(4);

start3(3); // [3]
start3(8); // [3,4,5,6,7,8]
start3(0); // []
start4(6); // [4,5,6]
```

```jsx
// MY SOLUTION

function range(start, end) {
  start = start * 1;

  if (end === undefined) {
    return function ender(end) {
      return loop(start, end);
    };
  } else {
    return loop(start, end);
  }

  function loop(start, end) {
    let arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  }
}

console.log(range(3, 3)); // [3]
console.log(range(3, 8)); // [3,4,5,6,7,8]
console.log(range(3, 0)); // []

var start3 = range(3);
var start4 = range(4);

console.log(start3(3)); // [3]
console.log(start3(8)); // [3,4,5,6,7,8]
console.log(start3(0)); // []
console.log(start4(6)); // [4,5,6]
```

Well, in this case, I have to say, my solution was pretty close to the author's solution. That's nice.

In both cases, the solutions were achieved.

####Practicing Prototypes

```jsx
// AUTHOR SOLUTION
function randMax(max) {
  return Math.trunc(1e9 * Math.random()) % max;
}
var reel = {
  symbols: ["X", "Y", "Z", "W", "$", "*", "<", "@"],
  spin() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    this.position = (this.position + 100 + randMax(100)) % this.symbols.length;
  },
  display() {
    if (this.position == null) {
      this.position = randMax(this.symbols.length - 1);
    }
    return this.symbols[this.position];
  },
};

var slotMachine = {
  reels: [Object.create(reel), Object.create(reel), Object.create(reel)],
  spin() {
    this.reels.forEach(function spinReel(reel) {
      reel.spin();
    });
  },
  display() {
    var lines = [];
    // display all 3 lines on the slot machine
    for (let linePos = -1; linePos <= 1; linePos++) {
      let line = this.reels.map(function getSlot(reel) {
        var slot = Object.create(reel);
        slot.position =
          (reel.symbols.length + reel.position + linePos) % reel.symbols.length;
        return reel.display.call(slot);
      });
      lines.push(line.join(" | "));
    }
    return lines.join("\n");
  },
};
slotMachine.spin();
slotMachine.display();
// < | @ | *
// @ | X | <
// X | Y | @
slotMachine.spin();
slotMachine.display();
// Z | X | W
// W | Y | $
// $ | Z | *
```

```jsx
// MY SOLUTION
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
        // let spos = Math.floor(Math.random() * length);
        let spos = (length + pos + linePosition) % length;
        // console.log("spos: ", spos);
        slot.position = spos;
        return reel.display.call(slot);
      });
      lines.push(line.join("  |  "));
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
```

I'm really not sure whie the author used: `for (let linePos = -1; linePos <= 1; linePos++) {`

In both cases, the solutions were achieved.
