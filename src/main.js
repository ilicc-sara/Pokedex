"use strict";
import "./style.css";

const typeListEl = document.querySelector(".type-list");

typeListEl.addEventListener("click", function (e) {
  if (!e.target.closest(".type-item")) return;

  const typeId = e.target.closest(".type-item").dataset.id;

  fetch(`https://pokeapi.co/api/v2/type/${typeId}`)
    .then((response) => response.json())
    .then((data) => console.log(data.pokemon[0].pokemon.name))
    .catch((error) => console.error(error));
});
