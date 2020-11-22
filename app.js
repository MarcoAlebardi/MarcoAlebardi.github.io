const content_div = document.getElementById("contenitore")

let data = [];
let n_pokemon = 600;
async function main() {
    data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=" + n_pokemon).then(r => r.json()).then(k => data = k.results);
    for (const pokemon of data) {
        let card = await toCard(pokemon);
        content_div.appendChild(card);
    }
}

main()


async function getDati(url) {
    let abilità = "mosse: ";
    let tipi = "";
    let data = await fetch(url).then(r => r.json());
    // abilità
    data.abilities.forEach(e => {
        abilità += e.ability.name + ', ';
    });
    //tipi
    data.types.forEach(e => {
        tipi += e.type.name + ' - ';
    });
    // rimuovo la virgola ed il trattino finali
    abilità = abilità.substr(0, abilità.length - 2);
    tipi = tipi.substr(0, tipi.length - 3);

    const id = String(data.id).padStart(3, '0')
    return { ID: id, abilità: abilità, tipi: tipi };
}

async function toCard(pokemon) { 
    const dati_pokemon = await getDati(pokemon.url);
    //crea la card di boostrap
    let card = document.createElement("div");
    card.className = "card";
    // card body
    let cardBody = document.createElement("div");
    cardBody.className = "card-body align-self-center"; //allinea al centro
    card.appendChild(cardBody);
    // titolo card
    let titolo = document.createElement("h5");
    titolo.className = "card-title";
    let nome = pokemon.name + ' - ' + dati_pokemon.ID;
    nome = nome.charAt(0).toUpperCase() + nome.slice(1); //maiuscola prima lettera
    titolo.innerHTML = nome;
    cardBody.appendChild(titolo);
    // sottotitolo card
    let sottotitolo = document.createElement("h6");
    sottotitolo.className = "card-subtitle mb-2 text-muted";
    sottotitolo.innerHTML = dati_pokemon.tipi;
    cardBody.appendChild(sottotitolo);
    // testo card
    let testo = document.createElement("p");
    testo.className = "card-text";
    testo.innerHTML = dati_pokemon.abilità;
    cardBody.appendChild(testo);
    // immagine
    let immagine = document.createElement("img");
    immagine.className = "card-img-bottom";
    immagine.alt = pokemon.name;
    immagine.src = "https://raw.githubusercontent.com/rileynwong/pokemon-images-dataset-by-type/master/all/" + pokemon.name + ".png";
    card.appendChild(immagine);
    return card;
}