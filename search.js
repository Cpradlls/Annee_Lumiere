"use strict";

// définir votre clé d'accès à l'API de OMDb
let APIkey = "7b1b3201";

// création d'une fonction `dbSearch`
let dbSearch = async function(movieTitle) {
  try { 
    let url = `https://www.omdbapi.com/?apikey=${APIkey}&t=${movieTitle}&plot=full`;
    let response = await fetch(url, { cache: "no-cache" });
    let json = await response.json();
    if (json.Response != "False") {
      document.getElementById("pageStyle").setAttribute("href","style02.css");
      document.querySelector(".resultat").innerHTML =
       `<legend>Résultat de la recherche "${movieTitle}"</legend>`
       
       +`<div class="img"><img src="${json.Poster}" alt="affiche du film"></div>`
       +`<div class="ul"><h1>${json.Title}</h1>`
       +`<ul>`
       +`<li>Réalisateur : ${json.Director}</li>`
       +`<li>Année de sortie : ${json.Year}</li>`
       +`<li>Durée : ${json.Runtime}</li>`
       +`<li>Avec : ${json.Actors}</li>`
       +`<li>Genre (en anglais) : ${json.Genre}</li>`
       +`<li>Intrigue (en anglais) : ${json.Plot}</li>`
       +`</ul></div>`;
    } else {
      document.querySelector(".resultat").innerHTML =
       `<legend>Résultat de la recherche "${movieTitle}"</legend>`
       +`<p>Désolé mais je n'ai pas de résultat pour cette recherche (${json.Error})</p>`;
    }
  } catch (error) {
    alert(`Aïe!\nZut!\nUne erreur (diabolique, forcément) est survenue :\n${error}`);
  }
}

// écoute l'envoi du formulaire
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // bloque l'envoi par défaut
  dbSearch(event.target[0].value); // récupère la valeur du premier élément et la transmet à notre fonction `dbSearch`
});