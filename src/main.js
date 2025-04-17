"use strict";
import "./style.css";

const typeListEl = document.querySelector(".type-list");

const pokemonListEl = document.querySelector(".pokemons-list");

// fetch("https://pokeapi.co/api/v2/pokemon/6/")
//   .then((response) => response.json())
//   .then((data) => console.log(data.sprites.front_default))
//   .catch((error) => console.error(error));

typeListEl.addEventListener("click", function (e) {
  if (!e.target.closest(".type-item")) return;

  pokemonListEl.innerHTML = "";
  const typeId = e.target.closest(".type-item").dataset.id;

  fetch(`https://pokeapi.co/api/v2/type/${typeId}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.pokemon[0].pokemon.name);

      data.pokemon.forEach((pokemon, i) => {
        // console.log(pokemon);
        // console.log(`${i + 1}`, pokemon.pokemon.name);

        let pokemonItem = document.createElement("li");
        pokemonItem.innerHTML = `${pokemon.pokemon.name}`;

        // console.log(pokemon.id);
        pokemonItem.className = "pokemon-list-item";
        pokemonItem.setAttribute("data-id", pokemon.pokemon.url);

        pokemonListEl.appendChild(pokemonItem);
      });
    })
    .catch((error) => console.error(error));
});

pokemonListEl.addEventListener("click", function (e) {
  if (!e.target.classList.contains("pokemon-list-item")) return;

  const pokemonId = e.target.dataset.id;

  fetch(pokemonId)
    .then((response) => response.json())
    .then((data) => console.log(data.id))
    .catch((error) => console.error(error));
});
