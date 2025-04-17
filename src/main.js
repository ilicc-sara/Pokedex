"use strict";
import "./style.css";

const typeListEl = document.querySelector(".type-list");

const pokemonListEl = document.querySelector(".pokemons-list");

const pokemonDetailsEl = document.querySelector(".pokemon-details");
const overlay = document.querySelector(".overlay");

// fetch("https://pokeapi.co/api/v2/pokemon/6/")
//   .then((response) => response.json())
//   .then((data) => console.log(data.sprites.front_default))
//   .catch((error) => console.error(error));

function displayPokemonList(data, id) {
  // console.log(data.pokemon[0].pokemon.name);

  data.pokemon.forEach((pokemon, i) => {
    // console.log(pokemon);
    // console.log(`${i + 1}`, pokemon.pokemon.name);

    let pokemonItem = document.createElement("li");
    pokemonItem.innerHTML = `${pokemon.pokemon.name}`;

    console.log(pokemon);
    pokemonItem.className = "pokemon-list-item";
    pokemonItem.id = id;
    pokemonItem.setAttribute("data-id", pokemon.pokemon.url);

    pokemonListEl.appendChild(pokemonItem);
  });
}

function displayPokemonDetails(data) {
  console.log(data);

  pokemonDetailsEl.classList.remove("hidden");
  overlay.classList.remove("hidden");

  let type = pokemonListEl.querySelector(".pokemon-list-item").id;
  console.log(type);

  pokemonDetailsEl.querySelector(".pokemon-img").src =
    data.sprites.front_default;

  pokemonDetailsEl.querySelector(".pokemon-name").textContent = data.name;
  pokemonDetailsEl.querySelector(".pokemon-height").textContent = data.height;
  pokemonDetailsEl.querySelector(".pokemon-weight").textContent = data.weight;
  pokemonDetailsEl.querySelector(".pokemon-type").textContent = type;
  pokemonDetailsEl.querySelector(".pokemon-id").textContent = data.id;
}

typeListEl.addEventListener("click", function (e) {
  if (!e.target.closest(".type-item")) return;

  pokemonListEl.innerHTML = "";
  const typeId = e.target.closest(".type-item").dataset.id;

  fetch(`https://pokeapi.co/api/v2/type/${typeId}`)
    .then((response) => response.json())
    .then((data) => displayPokemonList(data, typeId))
    .catch((error) => console.error(error));
});

pokemonListEl.addEventListener("click", function (e) {
  if (!e.target.classList.contains("pokemon-list-item")) return;

  const pokemonId = e.target.dataset.id;

  fetch(pokemonId)
    .then((response) => response.json())
    .then((data) => displayPokemonDetails(data))
    .catch((error) => console.error(error));
});

overlay.addEventListener("click", function (e) {
  console.log(e.target);
  pokemonDetailsEl.classList.add("hidden");
  overlay.classList.add("hidden");
});
