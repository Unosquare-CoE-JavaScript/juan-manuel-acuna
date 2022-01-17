"use strict";

const asyncFunction = function (time) {
  try {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve("!");
      }, time);
    });
  } catch (error) {
    reject(error);
  }
};
