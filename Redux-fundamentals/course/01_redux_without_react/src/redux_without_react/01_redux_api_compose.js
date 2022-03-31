import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
} from "redux";

const makeLouder = (string) => string.toUpperCase();
const repeatThreeTimes = (string) => string.repeat(3);
const embolden = (string) => string.bold();

const makeLouderRepeatThreeTimesEmbolden = (string) =>
  embolden(repeatThreeTimes(makeLouder(string))); // This one is stacking things ... not so clean, not so good
console.log(makeLouderRepeatThreeTimesEmbolden("Hola mundo! "));

const makeLouderRepeatThreeTimesEmbolden2 = compose(
  embolden,
  repeatThreeTimes,
  makeLouder
); // This one is made with "compose", much more clear.
console.log(makeLouderRepeatThreeTimesEmbolden2("Hola mundo! "));
