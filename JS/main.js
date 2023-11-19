const pokemonesCompletos = [];

const main = document.querySelector("main");

const url = "https://pokeapi.co/api/v2/pokemon?limit=102&offset=0";

const getPokemons = async () => {
  try {
    //hacemos la petición
    const respuestaPeticion = await fetch(url);

    console.log(respuestaPeticion);

    //recogemos la respuesta y la transforma a formato JSON
    const respuestaJSON = await respuestaPeticion.json();

    console.log(respuestaJSON);

    //del JSON resultante, mem interesa la propiedad con el nombre RESULTS la cual tiene el arreglo con los pokemones
    const pokemones = respuestaJSON.results;

    console.log(pokemones);

    //recorriendo el arreglo de pokemones
    for (const pokemon of pokemones) {
      const nombrePokemon = pokemon.name;
      const urlPokemon = pokemon.url;

      //consultado la URL con las racteriticas del pokemon
      const respuestaDatosPokemon = await fetch(urlPokemon);
      const datosPokemonJson = await respuestaDatosPokemon.json();

      console.log(datosPokemonJson);

      //aramando al pokemon
      getCaracteristicas(nombrePokemon, datosPokemonJson);
    }

    renderizadoTarjetasPokemon();
  } catch (error) {
    throw error;
  }
};

const renderizadoTarjetasPokemon = () => {
  for (const pokemon of pokemonesCompletos) {
    const article = document.createRange().createContextualFragment(`
    <article class="pokemon-card">
    <p class="idPokemon">${pokemon.idPokemon}</p>
              <div class="bg-pokemon">
                  <img class="card-image" src="${pokemon.imagenPokemon}" alt="${pokemon.nombrePokemon}" />
              </div>
  
              <div class="bg-pokemon-description">
                  <p class="pokemon-name">${pokemon.nombrePokemon}</p>
                  <p class="tipo-pokemon"></p>
                  <p class="tipo-pokemon"></p>
                  <p class="peso-pokemon">Peso: ${pokemon.pesoPokemon}</p>
              </div>
  
          </article>
    `);

    main.append(article);
  }
};

const getCaracteristicas = (nombrePokemon, datosPokemon) => {
  const idPokemon = datosPokemon.id;
  const imagenPokemon = datosPokemon.sprites.other["dream_world"].front_default;
  const tipoPokemon = [];

  for (const tipo of datosPokemon.types) {
    tipoPokemon.push(tipo.type.name);
  }
  //tipoPokemon.push(datosPokemon.types[0].type.name);
  //tipoPokemon.push(datosPokemon.types[0].type.name);

  const pesoPokemon = datosPokemon.weight;
  const habilidadesPokemon = [];

  for (const habilidad of datosPokemon.moves) {
    habilidadesPokemon.push(habilidad.move.name);
  }

  //aramando el pokemon con sus propiedades

  const pokemonCompleto = {
    idPokemon,
    nombrePokemon,
    imagenPokemon,
    tipoPokemon,
    pesoPokemon,
    habilidadesPokemon
  };

  //agregando al arreglo de pokemones completos
  pokemonesCompletos.push(pokemonCompleto);
};

getPokemons();
