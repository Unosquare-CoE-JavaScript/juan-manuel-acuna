"use strict";

const moviePlanets = async function (movieNum) {
  let url = "https://swapi.dev/api/films/";
  try {
    if (isNaN(movieNum)) {
      throw "You must put a number";
    }
    let movieO = await $.getJSON(url + movieNum + "/");
    console.log(movieO.title);

    let promises = movieO.planets.map((url) => $.getJSON(url));

    //   response.planets.forEach((p) =>
    //     $.getJSON(p).then((pl) => console.log(pl.name))
    //   );
    for await (let pl of promises) {
      console.log(pl.name);
    }
  } catch {
    console.error;
  }
};

moviePlanets(3);

console.log("Remaining Code");
