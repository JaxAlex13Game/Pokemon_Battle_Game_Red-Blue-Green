
// Add this at the beginning of your script.js

// Title Screen Functionality
const titleScreen = document.getElementById("title-screen");
const gameScreen = document.getElementById("game-screen");
const startGameBtn = document.getElementById("start-game");
const howToPlayBtnTitle = document.getElementById("how-to-play-btn");

startGameBtn.addEventListener("click", () => {
  titleScreen.style.display = "none";
  gameScreen.style.display = "block";
  
  // Initialize game with random Pokémon
  const [initialPokemon1, initialPokemon2] = getTwoUniquePokemon();
  currentPokemon1 = { ...initialPokemon1 };
  currentPokemon2 = { ...initialPokemon2 };
  displayPokemon(currentPokemon1, pokemon1Element);
  displayPokemon(currentPokemon2, pokemon2Element);
});

howToPlayBtnTitle.addEventListener("click", () => {
  modal.style.display = "block";
});

// The rest of your existing JavaScript code remains the same...
// Type effectiveness chart
const typeEffectiveness = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
};

// Pokémon data
// Sample Pokémon data
const pokemonList = [
  { name: "Bulbasaur", hp: 68, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/bulbasaur.png" },
  { name: "Ivysaur", hp: 97, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/ivysaur.png" },
  { name: "Venusaur", hp: 134, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/venusaur.png" },
  { name: "Charmander", hp: 65, types: ["fire"], image: "https://img.pokemondb.net/sprites/red-blue/normal/charmander.png" },
  { name: "Charmeleon", hp: 95, types: ["fire"], image: "https://img.pokemondb.net/sprites/red-blue/normal/charmeleon.png" },
  { name: "Charizard", hp: 129, types: ["fire", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/charizard.png" },
  { name: "Squirtle", hp: 61, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/squirtle.png" },
  { name: "Wartortle", hp: 84, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/wartortle.png" },
  { name: "Blastoise", hp: 131, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/blastoise.png" },
  { name: "Caterpie", hp: 55, types: ["bug"], image: "https://img.pokemondb.net/sprites/red-blue/normal/caterpie.png"},
  { name: "Metapod", hp: 65, types: ["bug"], image: "https://img.pokemondb.net/sprites/red-blue/normal/metapod.png"},
  { name: "Butterfree", hp: 84, types: ["bug", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/butterfree.png"},
  { name: "Weedle", hp: 43, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/weedle.png"},
  { name: "Kakuna", hp: 51, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/kakuna.png"},
  { name: "Beedrill", hp: 83, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/beedrill.png"},
  { name: "Pidgey", hp: 55, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/pidgey.png"},
  { name: "Pidgeotto", hp: 78, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/pidgeotto.png"},
  { name: "Pidgeot", hp: 118, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/pidgeot.png"},
  { name: "Rattata", hp: 51, types: ["normal"], image: "https://img.pokemondb.net/sprites/red-blue/normal/rattata.png"},
  { name: "Raticate", hp: 78, types: ["normal"], image: "https://img.pokemondb.net/sprites/red-blue/normal/raticate.png"},
  { name: "Spearow", hp: 58, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/spearow.png"},
  { name: "Fearow", hp: 106, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/fearow.png"},
  { name: "Ekans", hp: 61, types: ["poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/ekans.png"},
  { name: "Arbok", hp: 86, types: ["poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/arbok.png"},
  { name: "Pikachu", hp: 56, types: ["electric"], image: "https://img.pokemondb.net/sprites/red-blue/normal/pikachu.png"},
  { name: "Raichu", hp: 94, types: ["electric"], image: "https://img.pokemondb.net/sprites/red-blue/normal/raichu.png"},
  { name: "Sandshrew", hp: 61, types: ["ground"], image: "https://img.pokemondb.net/sprites/red-blue/normal/sandshrew.png"},
  { name: "Sandslash", hp: 90, types: ["ground"], image: "https://img.pokemondb.net/sprites/red-blue/normal/sandslash.png"},
  { name: "Nidoran(Female)", hp: 64, types: ["poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/nidoran-f.png"},
  { name: "Nidorina", hp: 88, types: ["poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/nidorina.png"},
  { name: "Nidoqueen", hp: 114, types: ["poison", "ground"], image: "https://img.pokemondb.net/sprites/red-blue/normal/nidoqueen.png"},
  { name: "Nidoran(Male)", hp: 62, types: ["poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/nidoran-m.png"},
  { name: "Nidorino", hp: 90, types: ["poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/nidorino.png"},
  { name: "Nidoking", hp: 116, types: ["poison", "ground"], image: "https://img.pokemondb.net/sprites/red-blue/normal/nidoking.png"},
  { name: "Clefairy", hp: 81, types: ["fairy"], image: "https://img.pokemondb.net/sprites/red-blue/normal/clefairy.png"},
  { name: "Clefable", hp: 128, types: ["fairy"], image: "https://img.pokemondb.net/sprites/red-blue/normal/clefable.png"},
  { name: "Vulpix", hp: 61, types: ["fire"], image: "https://img.pokemondb.net/sprites/red-blue/normal/vulpix.png"},
  { name: "Ninetales", hp: 90, types: ["fire"], image: "https://img.pokemondb.net/sprites/red-blue/normal/ninetales.png"},
  { name: "Jigglypuff", hp: 118, types: ["normal", "fairy"], image: "https://img.pokemondb.net/sprites/red-blue/normal/jigglypuff.png" },
  { name: "Wigglytuff", hp: 150, types: ["normal", "fairy"], image: "https://img.pokemondb.net/sprites/red-blue/normal/wigglytuff.png" },
  { name: "Zubat", hp: 53, types: ["poison", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/zubat.png"},
  { name: "Golbat", hp: 83, types: ["poison", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/golbat.png"},
  { name: "Oddish", hp: 61, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/oddish.png"},
  { name: "Gloom", hp: 81, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/gloom.png"},
  { name: "Vileplume", hp: 102, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/vileplume.png"},
  { name: "Paras", hp: 54, types: ["bug", "grass"], image: "https://img.pokemondb.net/sprites/red-blue/normal/paras.png"},
  { name: "Parasect", hp: 76, types: ["bug", "grass"], image: "https://img.pokemondb.net/sprites/red-blue/normal/parasect.png"},
  { name: "Venonat", hp: 79, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/venonat.png"},
  { name: "Venomoth", hp: 101, types: ["bug", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/venomoth.png"},
  { name: "Diglett", hp: 42, types: ["ground"], image: "https://img.pokemondb.net/sprites/red-blue/normal/diglett.png"},
  { name: "Dugtrio", hp: 66, types: ["ground"], image: "https://img.pokemondb.net/sprites/red-blue/normal/dugtrio.png"},
  { name: "Meowth", hp: 59, types: ["normal"], image: "https://img.pokemondb.net/sprites/red-blue/normal/meowth.png" },
  { name: "Persian", hp: 83, types: ["normal"], image: "https://img.pokemondb.net/sprites/red-blue/normal/persian.png" },
  { name: "Psyduck", hp: 67, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/psyduck.png" },
  { name: "Golduck", hp: 102, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/golduck.png" },
  { name: "Mankey", hp: 69, types: ["fighting"], image: "https://img.pokemondb.net/sprites/red-blue/normal/mankey.png"},
  { name: "Primeape", hp: 97, types: ["fighting"], image: "https://img.pokemondb.net/sprites/red-blue/normal/primeape.png"},
  { name: "Growlithe", hp: 66, types: ["fire"], image: "https://img.pokemondb.net/sprites/red-blue/normal/growlithe.png"},
  { name: "Arcanine", hp: 113, types: ["fire"], image: "https://img.pokemondb.net/sprites/red-blue/normal/arcanine.png" },
  { name: "Poliwag", hp: 70, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/poliwag.png"},
  { name: "Poliwhirl", hp: 91, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/poliwhirl.png"},
  { name: "Poliwrath", hp: 121, types: ["water", "fighting"], image: "https://img.pokemondb.net/sprites/red-blue/normal/poliwrath.png"},
  { name: "Abra", hp: 50, types: ["psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/abra.png"},
  { name: "Kadabra", hp: 70, types: ["psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/kadabra.png" },
  { name: "Alakazam", hp: 90, types: ["psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/alakazam.png" },
  { name: "Machop", hp: 85, types: ["fighting"], image: "https://img.pokemondb.net/sprites/red-blue/normal/machop.png" },
  { name: "Machoke", hp: 95, types: ["fighting"], image: "https://img.pokemondb.net/sprites/red-blue/normal/machoke.png" },
  { name: "Machamp", hp: 125, types: ["fighting"], image: "https://img.pokemondb.net/sprites/red-blue/normal/machamp.png" },
  { name: "Bellsprout", hp: 74, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/bellsprout.png"},
  { name: "Weepinbell", hp: 94, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/weepinbell.png"},
  { name: "Victreebel", hp: 112, types: ["grass", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/victreebel.png"},
  { name: "Tentacool", hp: 73, types: ["water", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/tentacool.png"},
  { name: "Tentacruel", hp: 106, types: ["water", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/tentacruel.png"},
  { name: "Geodude", hp: 75, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/red-blue/normal/geodude.png"},
  { name: "Graveler", hp: 88, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/red-blue/normal/graveler.png"},
  { name: "Golem", hp: 103, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/red-blue/normal/golem.png"},
  { name: "Ponyta", hp: 69, types: ["fire"], image: "https://img.pokemondb.net/sprites/red-blue/normal/ponyta.png"},
  { name: "Rapidash", hp: 87, types: ["fire"], image: "https://img.pokemondb.net/sprites/red-blue/normal/rapidash.png"},
  { name: "Slowpoke", hp: 124, types: ["water", "psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/slowpoke.png"},
  { name: "Slowbro", hp: 140, types: ["water", "psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/slowbro.png"},
  { name: "Magnemite", hp: 51, types: ["electric", "steel"], image: "https://img.pokemondb.net/sprites/red-blue/normal/magnemite.png"},
  { name: "Magneton", hp: 76, types: ["electric", "steel"], image: "https://img.pokemondb.net/sprites/red-blue/normal/magneton.png"},
  { name: "Farfetch'd", hp: 82, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/farfetchd.png"},
  { name: "Doduo", hp: 67, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/doduo.png"},
  { name: "Dodrio", hp: 90, types: ["normal", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/dodrio.png"},
  { name: "Seel", hp: 74, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/seel.png"},
  { name: "Dewgong", hp: 122, types: ["water", "ice"], image: "https://img.pokemondb.net/sprites/red-blue/normal/dewgong.png"},
  { name: "Grimer", hp: 108, types: ["poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/grimer.png"},
  { name: "Muk", hp: 126, types: ["poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/muk.png"},
  { name: "Shellder", hp: 62, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/shellder.png"},
  { name: "Cloyster", hp: 84, types: ["water", "ice"], image: "https://img.pokemondb.net/sprites/red-blue/normal/cloyster.png"},
  { name: "Gastly", hp: 62, types: ["ghost", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/gastly.png" },
  { name: "Haunter", hp: 79, types: ["ghost", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/haunter.png" },
  { name: "Gengar", hp: 95, types: ["ghost", "poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/gengar.png" },
  { name: "Onix", hp: 64, types: ["rock", "ground"], image: "https://img.pokemondb.net/sprites/red-blue/normal/onix.png"},
  { name: "Drowzee", hp: 74, types: ["psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/drowzee.png"},
  { name: "Hypno", hp: 113, types: ["psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/hypno.png"},
  { name: "Krabby", hp: 63, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/krabby.png"},
  { name: "Kingler", hp: 86, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/kingler.png"},
  { name: "Voltorb", hp: 73, types: ["electric"], image: "https://img.pokemondb.net/sprites/red-blue/normal/voltorb.png"},
  { name: "Electrode", hp: 92, types: ["electric"], image: "https://img.pokemondb.net/sprites/red-blue/normal/electrode.png"},
  { name: "Exeggcute", hp: 81, types: ["grass", "psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/exeggcute.png"},
  { name: "Exeggutor", hp: 112, types: ["grass", "psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/exeggutor.png"},
  { name: "Cubone", hp: 68, types: ["ground"], image: "https://img.pokemondb.net/sprites/red-blue/normal/cubone.png"},
  { name: "Marowak", hp: 91, types: ["ground"], image: "https://img.pokemondb.net/sprites/red-blue/normal/marowak.png"},
  { name: "Hitmonlee", hp: 81, types: ["fighting"], image: "https://img.pokemondb.net/sprites/red-blue/normal/hitmonlee.png"},
  { name: "Hitmonchan", hp: 84, types: ["fighting"], image: "https://img.pokemondb.net/sprites/red-blue/normal/hitmonchan.png"},
  { name: "Lickitung", hp: 117, types: ["normal"], image: "https://img.pokemondb.net/sprites/red-blue/normal/lickitung.png"},
  { name: "Koffing", hp: 64, types: ["poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/koffing.png"},
  { name: "Weezing", hp: 88, types: ["poison"], image: "https://img.pokemondb.net/sprites/red-blue/normal/weezing.png"},
  { name: "Rhyhorn", hp: 102, types: ["ground", "rock"], image: "https://img.pokemondb.net/sprites/red-blue/normal/rhyhorn.png"},
  { name: "Rhydon", hp: 134, types: ["ground", "rock"], image: "https://img.pokemondb.net/sprites/red-blue/normal/rhydon.png"},
  { name: "Chansey", hp: 227, types: ["normal"], image: "https://img.pokemondb.net/sprites/red-blue/normal/chansey.png"},
  { name: "Tangela", hp: 79, types: ["grass"], image: "https://img.pokemondb.net/sprites/red-blue/normal/tangela.png"},
  { name: "Kangaskhan", hp: 118, types: ["normal"], image: "https://img.pokemondb.net/sprites/red-blue/normal/kangaskhan.png"},
  { name: "Horsea", hp: 57, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/horsea.png"},
  { name: "Seadra", hp: 87 ,types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/seadra.png"},
  { name: "Goldeen", hp: 54, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/goldeen.png"},
  { name: "Seaking", hp: 97, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/seaking.png"},
  { name: "Staryu", hp: 64, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/staryu.png"},
  { name: "Starmie", hp: 84, types: ["water", "psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/starmie.png"},
  { name: "Mr. Mime", hp: 69, types: ["psychic", "fairy"], image: "https://img.pokemondb.net/sprites/red-blue/normal/mr-mime.png"},
  { name: "Scyther", hp: 83, types: ["bug", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/scyther.png"},
  { name: "Jynx", hp: 93, types: ["ice", "psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/jynx.png"},
  { name: "Electabuzz", hp: 85, types: ["electric"], image: "https://img.pokemondb.net/sprites/red-blue/normal/electabuzz.png"},
  { name: "Magmar", hp: 90, types: ["fire"], image: "https://img.pokemondb.net/sprites/red-blue/normal/magmar.png"},
  { name: "Pinsir", hp: 87, types: ["bug"], image: "https://img.pokemondb.net/sprites/red-blue/normal/pinsir.png"},
  { name: "Tauros", hp: 103, types: ["normal"], image: "https://img.pokemondb.net/sprites/red-blue/normal/tauros.png"},
  { name: "Magikarp", hp: 45, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/magikarp.png"},
  { name: "Gyrados", hp: 123, types: ["water", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/gyarados.png" },
  { name: "Lapras", hp: 150, types: ["water", "ice"], image: "https://img.pokemondb.net/sprites/red-blue/normal/lapras.png"},
  { name: "Ditto", hp: 79, types: ["normal"], image: "https://img.pokemondb.net/sprites/red-blue/normal/ditto.png"},
  { name: "Eevee", hp: 86, types: ["normal"], image: "https://img.pokemondb.net/sprites/red-blue/normal/eevee.png" },
  { name: "Vaporeon", hp: 135, types: ["water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/vaporeon.png"},
  { name: "Jolteon", hp: 86, types: ["electric"], image: "https://img.pokemondb.net/sprites/red-blue/normal/jolteon.png"},
  { name: "Flareon", hp: 99, types: ["fire"], image: "https://img.pokemondb.net/sprites/red-blue/normal/flareon.png"},
  { name: "Porygon", hp: 94, types: ["normal"], image: "https://img.pokemondb.net/sprites/red-blue/normal/porygon.png"},
  { name: "Omanyte", hp: 70, types: ["rock", "water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/omanyte.png"},
  { name: "Omastar", hp: 100, types: ["rock", "water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/omastar.png"},
  { name: "Kabuto", hp: 62, types: ["rock", "water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/kabuto.png"},
  { name: "Kabutops", hp: 90, types: ["rock", "water"], image: "https://img.pokemondb.net/sprites/red-blue/normal/kaputops.png"},
  { name: "Aerodactyl", hp: 102, types: ["rock", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/aerodactyl.png"},
  { name: "Snorlax", hp: 182, types: ["normal"], image: "https://img.pokemondb.net/sprites/red-blue/normal/snorlax.png" },
  { name: "Articuno", hp: 124, types: ["ice", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/articuno.png"},
  { name: "Zapdos", hp: 121, types: ["electric", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/zapdos.png"},
  { name: "Moltres", hp: 123, types: ["fire", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/moltres.png"},
  { name: "Dratini", hp: 76, types: ["dragon"], image: "https://img.pokemondb.net/sprites/red-blue/normal/dratini.png"},
  { name: "Dragonair", hp: 94, types: ["dragon"], image: "https://img.pokemondb.net/sprites/red-blue/normal/dragonair.png"},
  { name: "Dragonite", hp: 118, types: ["dragon", "flying"], image: "https://img.pokemondb.net/sprites/red-blue/normal/dragonite.png" },
  { name: "Mewtwo", hp: 136, types: ["psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/mewtwo.png" },
  { name: "Mew", hp: 134, types: ["psychic"], image: "https://img.pokemondb.net/sprites/red-blue/normal/mew.png" },
  ]; 

// DOM Elements
const pokemon1Element = document.getElementById("pokemon1");
const pokemon2Element = document.getElementById("pokemon2");
const startBattleButton = document.getElementById("start-battle");
const battleLog = document.getElementById("battle-log");

// Game state
let battleInterval = null;
let currentPokemon1 = null;
let currentPokemon2 = null;

// Helper functions
function getRandomPokemon() {
  return pokemonList[Math.floor(Math.random() * pokemonList.length)];
}

function getTwoUniquePokemon() {
  let pokemon1 = getRandomPokemon();
  let pokemon2 = getRandomPokemon();
  
  while (pokemon1.name === pokemon2.name) {
    pokemon2 = getRandomPokemon();
  }
  
  return [pokemon1, pokemon2];
}

function calculateEffectiveness(attackerTypes, defenderTypes) {
  let effectiveness = 1;
  
  attackerTypes.forEach(atkType => {
    defenderTypes.forEach(defType => {
      if (typeEffectiveness[atkType] && typeEffectiveness[atkType][defType] !== undefined) {
        effectiveness *= typeEffectiveness[atkType][defType];
      }
    });
  });

  return effectiveness;
}

function getEffectivenessMessage(effectiveness) {
  if (effectiveness === 0) return "It has no effect!";
  if (effectiveness < 1) return "It's not very effective...";
  if (effectiveness > 1) return "It's super effective!";
  return "";
}

function displayPokemon(pokemon, element) {
  const img = element.querySelector(".pokemon-image");
  const name = element.querySelector(".pokemon-name");
  const types = element.querySelector(".pokemon-types");
  const hp = element.querySelector(".pokemon-hp");
  
  img.src = pokemon.image;
  img.alt = pokemon.name;
  name.textContent = pokemon.name;
  hp.textContent = `HP: ${pokemon.hp}`;
  
  // Clear previous types
  types.innerHTML = "";
  
  // Add new type badges
  pokemon.types.forEach(type => {
    const typeBadge = document.createElement("span");
    typeBadge.className = `type-badge type-${type}`;
    typeBadge.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    types.appendChild(typeBadge);
  });
  
  // Remove all animation classes
  element.classList.remove("attack-animation", "damage-animation", "victory-animation", "faint-animation");
}

function simulateBattle(pokemon1, pokemon2) {
  // Reset battle log
  battleLog.innerHTML = "";
  
  // Disable start button
  startBattleButton.disabled = true;
  
  // Reset Pokémon display
  displayPokemon(pokemon1, pokemon1Element);
  displayPokemon(pokemon2, pokemon2Element);
  
  let attacker = pokemon1;
  let defender = pokemon2;
  let attackerElement = pokemon1Element;
  let defenderElement = pokemon2Element;
  
  battleInterval = setInterval(() => {
    if (pokemon1.hp <= 0 || pokemon2.hp <= 0) {
      endBattle(pokemon1, pokemon2);
      return;
    }
    
    // Calculate damage with type effectiveness
    const baseDamage = Math.floor(Math.random() * 10) + 1;
    const effectiveness = calculateEffectiveness(attacker.types, defender.types);
    const damage = Math.max(1, Math.floor(baseDamage * effectiveness));
    
    defender.hp -= damage;
    
    // Update HP display
    defenderElement.querySelector(".pokemon-hp").textContent = `HP: ${Math.max(0, defender.hp)}`;
    
    // Log the attack
    let logMessage = `${attacker.name} attacks! `;
    logMessage += getEffectivenessMessage(effectiveness);
    logMessage += ` ${defender.name} takes ${damage} damage! (${defender.hp > 0 ? defender.hp : 0} HP left)<br>`;
    battleLog.innerHTML += logMessage;
    battleLog.scrollTop = battleLog.scrollHeight;
    
    // Animations
    attackerElement.classList.add("attack-animation");
    defenderElement.classList.add("damage-animation");
    
    // Remove animations after they complete
    setTimeout(() => {
      attackerElement.classList.remove("attack-animation");
      defenderElement.classList.remove("damage-animation");
      
      // Check if defender fainted
      if (defender.hp <= 0) {
        defenderElement.classList.add("faint-animation");
        endBattle(pokemon1, pokemon2);
      }
    }, 500);
    
    // Switch roles for next turn
    [attacker, defender] = [defender, attacker];
    [attackerElement, defenderElement] = [defenderElement, attackerElement];
    
  }, 1500); // 1.5 seconds between turns
}

function endBattle(pokemon1, pokemon2) {
  clearInterval(battleInterval);
  battleInterval = null;
  
  const winner = pokemon1.hp > 0 ? pokemon1 : pokemon2;
  const winnerElement = winner === pokemon1 ? pokemon1Element : pokemon2Element;
  
  battleLog.innerHTML += `<strong>${winner.name} wins the battle!</strong><br>`;
  battleLog.scrollTop = battleLog.scrollHeight;
  
  winnerElement.classList.add("victory-animation");
  
  // Re-enable start button
  startBattleButton.disabled = false;
}
// Add this to your existing JavaScript code, right before the event listeners section

// How to Play Modal functionality
const howToPlayBtn = document.getElementById("how-to-play");
const modal = document.getElementById("how-to-play-modal");
const span = document.getElementsByClassName("close")[0];

howToPlayBtn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// The rest of your existing JavaScript code remains the same...
// Event listeners
startBattleButton.addEventListener("click", () => {
  // Stop any ongoing battle
  if (battleInterval) {
    clearInterval(battleInterval);
    battleInterval = null;
  }
  
  // Get new Pokémon
  const [pokemon1, pokemon2] = getTwoUniquePokemon();
  
  // Reset their HP
  const originalPokemon1 = pokemonList.find(p => p.name === pokemon1.name);
  const originalPokemon2 = pokemonList.find(p => p.name === pokemon2.name);
  
  currentPokemon1 = { ...originalPokemon1 };
  currentPokemon2 = { ...originalPokemon2 };
  
  // Start battle
  simulateBattle(currentPokemon1, currentPokemon2);
});

// Initialize with random Pokémon
const [initialPokemon1, initialPokemon2] = getTwoUniquePokemon();
currentPokemon1 = { ...initialPokemon1 };
currentPokemon2 = { ...initialPokemon2 };
displayPokemon(currentPokemon1, pokemon1Element);
displayPokemon(currentPokemon2, pokemon2Element);
