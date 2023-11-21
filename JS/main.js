const pokemonesCompletos = [];

const main = document.querySelector("main");

const formularioBusqueda = document.getElementById("busqueda");
//const botonBuscar = document.getElementById("btn-buscar");

const url = "https://pokeapi.co/api/v2/pokemon?limit=102&offset=0";

const getPokemons = async () => {
  try {
    //hacemos la petición
    const respuestaPeticion = await fetch(url);

    //console.log(respuestaPeticion);

    //recogemos la respuesta y la transforma a formato JSON
    const respuestaJSON = await respuestaPeticion.json();

    //console.log(respuestaJSON);

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

      //console.log(datosPokemonJson);

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
    <p class="idPokemon">#${pokemon.idPokemon}</p>
              <div class="bg-pokemon">
                  <img class="card-image" src="${pokemon.imagenPokemon}" alt="${pokemon.nombrePokemon}" />
              </div>
  
              <div class="bg-pokemon-description">
                  <p class="pokemon-name">
                  ${pokemon.nombrePokemon}
                  </p>
                  <div class="bg-tipo-pokemon">
                  ${pokemon.tiposPokemon}
                  </div>
                  <p class="habilidades">Habilidades</p>
                  <div class="bg-habilidades">
                  ${pokemon.habilidadesPokemon}
                  </div>
                  <p class="peso-pokemon">${pokemon.pesoPokemon}kg</p>
              </div>
  
          </article>
    `);

    main.append(article);
  }
};

const getCaracteristicas = (nombrePokemon, datosPokemon) => {
  const idPokemon = datosPokemon.id;
  const imagenPokemon = datosPokemon.sprites.other["dream_world"].front_default;

  //extrayendo los tipos de cada pokemon
  let tiposPokemon = datosPokemon.types.map(
    (tipo) => `
    <p class="tipo-${tipo.type.name} tipo">${tipo.type.name}</p>
  `
  );

  tiposPokemon = tiposPokemon.join("");

  //console.log(tiposPokemon);

  const pesoPokemon = datosPokemon.weight;

  //obteniendo las habilidades por cada pokemon
  let habilidadesPokemon = datosPokemon.abilities.map(
    (habilidad) => `
  <p class="habilidad">${habilidad.ability.name}</p>
`
  );

  habilidadesPokemon = habilidadesPokemon.join("");

  //armando el pokemon con sus propiedades
  const pokemonCompleto = {
    idPokemon,
    nombrePokemon,
    imagenPokemon,
    pesoPokemon,
    habilidadesPokemon,
    tiposPokemon
  };

  //agregando al arreglo de pokemones completos
  pokemonesCompletos.push(pokemonCompleto);
};

getPokemons();


formularioBusqueda.addEventListener('keyup', (e)=>{
 if (e.target.matches("#busqueda")) {
  document.querySelectorAll(".pokemon-card").forEach(tarjetaPokemon => {
   const nombrePokemon = tarjetaPokemon.querySelector('.pokemon-name').textContent;

  //console.log(nombrePokemon);

   nombrePokemon.includes(e.target.value) ? tarjetaPokemon.classList.remove("filtro") : tarjetaPokemon.classList.add("filtro")

  }) 
 }
});
