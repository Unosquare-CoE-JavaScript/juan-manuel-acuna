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
console.log(" ");
console.log(scheduleMeeting("07:15", 30)); // false
console.log(" ");
console.log(scheduleMeeting("7:30", 30)); // true
console.log(" ");
console.log(scheduleMeeting("11:30", 60)); // true
console.log(" ");
console.log(scheduleMeeting("17:00", 45)); // true
console.log(" ");
console.log(scheduleMeeting("17:30", 30)); // false
console.log(" ");
console.log(scheduleMeeting("18:00", 15)); // false
console.log(" ");
