"use strict";

const swapiFilms = async function () {
  const url = "https://swapi.dev/api/films";

  let filmsData = await fetch(url).then((data) => data.json());

  let films = filmsData.results.map((item) => item.title);
  console.log(films);
};

swapiFilms();

console.log("Remaining code");
