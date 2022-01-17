const swapi = function (num) {
  let url = "https://swapi.dev/api/people/";

  fetch(url + num + "/")
    .then((data) => data.json())
    .then((obj) => {
      console.log("obj: ", obj);
      console.log("obj.homeworld: ", obj.homeworld);
      return fetch(obj.homeworld);
    })
    .then((hwdata) => hwdata.json())
    .then((hwobj) => console.log(hwobj));
};

swapi(3);

console.log("Other commands!");
