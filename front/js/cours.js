/*************************************************************************************************
 * VARIABLES
 *************************************************************************************************/

/* Chaque variable est constitué comme suis :
 * typeDeVariable index = valeur
 * Il existe trois type de variables
 * + constante
 * + dynamique
 * + var (obsolète dc OSEF) */

/* CONSTANTE
 * Variable dont le paramètre ne peut être changé */
const prenom = "Frédéric";
const nom = "Giustini";

/* DYNAMIQUE
 * Variable dont le paramètre peut être changé en appelant son nom */
let age = 18;
age = 35;

/*************************************************************************************************
 * CONCATENATION
 *************************************************************************************************/

/* DEF :
 * Mettre bout à bout deux chaines de caractere afin d'en creer une 3e
 * Additionner des chaines de caracteres */

let identite = `Identité de la personne : ${prenom} ${nom} ${age} ans`; // alt gr 7 pour les ``

console.log(identite);

/*************************************************************************************************
 * TYPES DE VALEUR
 *************************************************************************************************/

// Chaine de caractere
let string = "Je suis une chaîne de caractère";

// Nombre
let number = 20;

// Boolean
let boolean = true;

// Tableau - Considéré comme la même chose que object par JS
let array = ["Prénom", "Nom", "Age", "Région", "ville", "Code Postal"];

// Object - Considéré comme la même chose que array par JS
let object = {
  firstName: "Céline",
  lastName: "Bouhafs",
  old: 24,
  site: "Occitanie",
  city: "Toulouse",
  postalCode: "31500",
};

// Pour définir le type de variable : typeof
console.log(`Type de valeur de la variable "string" : ${typeof string}`); // string
console.log(`Type de valeur de la variable "number" : ${typeof number}`); // number
console.log(`Type de valeur de la variable "boolean" : ${typeof boolean}`); // boolean
console.log(`Type de valeur de la variable "array" : ${typeof array}`); // object
console.log(`Type de valeur de la variable "object" : ${typeof object}`); // object

// Null (variable dont la valeur est null) - Considéré comme object par JS avec une valeur nulle
let argent = null;

// Undefined (variable dont la valeur est undéfinie)
let clop = ""; // ou
let clops;

/*************************************************************************************************
 * OPERATEURS
 *************************************************************************************************/

console.log(`Addition : ${5 + 4}`); // 9
console.log(`Soustraction : ${5 - 4}`); // 1
console.log(`Multiplication : ${5 * 4}`); // 20
console.log(`Division : ${5 / 4}`); // 1.25
console.log(`Puissance : ${5 ** 4}`); // 625
console.log(`Modulo : ${5 % 4}`); // 1

/*************************************************************************************************
 * OPERATEURS (SIMPLIFIES) D'AFFECTATION
 *************************************************************************************************/

let a = 1,
  b = 2,
  c = 3,
  d = 4,
  e = 5,
  f = 6;

// Type d'opérateurs d'affectation -------------------------------------------------------------

let alpha = a++; // additionne 1 après stockage de la valeur a - total 1 sur cette ligne
console.log(`a : ${a}`);
let alphaPrime = ++a; // additionne 1 avant stockage de la valeur a (et apres alpha) - total 3
console.log(`a : ${a}`);
let bravo = b--; // soustraie 1 apres stockage de la valeur b - total 2 sur cette ligne
console.log(`b : ${b}`);
let bravoPrime = --b; // soustraie 1 apres stockage de la valeur b (et apres bravo) - total 0
console.log(`b : ${b}`);
let charlie = (c += 2); // additionne 2 - total 5
let delta = (d -= 3); // soustraie 3 - total 2
let echo = (e *= 4); // multiplie 4 - total 625
let foxtrot = (f /= 5); // divise 2 - total 1.2

console.log(`a++ alpha : ${alpha}`);
console.log(`++a alphaPrime : ${alphaPrime}`);
console.log(`b-- bravo : ${bravo}`);
console.log(`--b bravoPrime : ${bravoPrime}`);
console.log(`+= charlie : ${charlie}`);
console.log(`-= delta : ${delta}`);
console.log(`*= echo : ${echo}`);
console.log(`/= foxtrot : ${foxtrot}`);

// Succession d'opérateur -----------------------------------------------------------------------

let total = 0;

total++; // total = 0
total++; // total = 1
total++; // total = 2
total++; // total = 3
// total = 4

console.log(`Total succession de ++ : ${total}`);

/*************************************************************************************************
 * COMPARATEURS & OPERATEURS / IF ELSE
 *************************************************************************************************/

// Comparateurs
/* ==		  est égal à (en valeur)
 * !=		  es différent de (en valeur)
 * ===		est égale à (en valeur et en type)
 * !==		est différent de (en valeur et en type)
 * <		  est inférieur à
 * <=		  est inférieur ou égal à
 * >		  est supérieur
 * >		  est supérieur ou égal à */

// Opérateurs
/* &&     And
 * ||     Or
 * !      Contraire/inverse */

// If ... ----------------------------------------------------------------------------------
let heure = 9;

if (heure < 12) {
  console.log("Bonjour");
}

// If ... Else ... --------------------------------------------------------------------------

if (heure < 12) {
  console.log("Le soleil vient de se lever");
} else {
  console.log("Le soleil entame sa descente");
}

// If ... Else if ... Else if ... Else and && ------------------------------------------------

if (heure >= 0 && heure < 12) {
  console.log("C'est le matin");
} else if (heure === 12) {
  console.log("il est 12h pile");
} else if (heure > 12 && heure <= 18) {
  consolelog("C'est l'après-midi");
} else if (heure > 18 && heure <= 24) {
  console.log("C'est le soir");
} else {
  console.log("La valeur entrée ne semble pas valide");
}

// If ... Else and || -------------------------------------------------------------------------

if (heure < 0 || heure > 24) {
  console.log("Format horaire invalide");
} else {
  console.log("Format horaire valide");
}

// If ... Else and ! ---------------------------------------------------------------------------

if (!heure >= 16) {
  console.log("Il est 16h ou plus");
} else {
  console.log("Il est moins de 16h");
}

// Concaténation --------------------------------------------------------------------------------

if (heure < 12) {
  console.log(`Il est actuellement ${heure}h du matin`);
} else if (heure === 12) {
  console.log(`Il est actuellement ${heure}h pile`);
} else if (heure > 12 && heure < 18) {
  console.log(`Il est actuellement ${heure}h de l'après-midi`);
} else if (heure >= 18 && heure < 24) {
  console.log(`Il est actuellement ${heure}h du soir`);
} else {
  console.log(`Il est actuellement ${heure}h de la nuit`);
}

// Function Ternaire -----------------------------------------------------------------------------

heure == 24
  ? console.log(`Il est ${heure}h pile`)
  : console.log(`Il n'est pas minuit`);

/*************************************************************************************************
 * FUNCTIONS
 *************************************************************************************************/

/* DEF & PROS
 * + Execute un bloc de code pour effectuer un tâche précise
 *   Ex : function alert affiche un message dans une boite de dialogue
 * + Gain de temps car non nécessaire de redefinir le code des function à chaque fois
 * + Une fois créé, il suffit d'appeler la function en mentionnant leurs noms pour les utiliser
 * + Function native
 * + Function custom */

// Déclaration de la function (ne l'applique pas mais l'enregistre)
function NomDeLaFonction(parametreDynamique) {
  console.log("Fonction simple : Instruction 1");
  console.log("Fonction simple : Instruction 2");
}

// Appel de la function pour la faire appliquer
NomDeLaFonction();

/*************************************************************************************************
 * FUNCTIONS FLECHEES
 *************************************************************************************************/

const fonctionFlecheeA = () => {
  console.log("Fonction fléchées A : Instruction 1");
  console.log("Fonction fléchées A : Instruction 2");
};

let fonctionFlecheeB = () => {
  console.log("Fonction fléchées B : Instruction 1");
  console.log("Fonction fléchées B : Instruction 2");
};

fonctionFlecheeA();
fonctionFlecheeB();

/*************************************************************************************************
 * FUNCTIONS APPEL
 *************************************************************************************************/

const faireUneTache = (tache) => {
  console.log(`Je fais : ${tache}`);
};

// Appel de la function FaireUneTache
faireUneTache("+ Les courses");
faireUneTache("+ Le ménage");

function add5() {
  let z = 5;
  return z + 5;
}

// Appel de la function add5
add5();

/*************************************************************************************************
 * FUNCTIONS RETURN
 *************************************************************************************************/

/* Le RETURN met fin aux instructions et permet, quand la function est appelée DANS la console directement, de
 * renvoyer le résultat */

function calc(x, y) {
  return x + y;
}

// A écrire dans la console
calc(4, 9);

/*************************************************************************************************
 * FUNCTIONS APPEL AUTOMATIQUE AVEC ET SANS NOM
 *************************************************************************************************/

/* S'écrit comme suis :
 *
 *  (
 *    function name() {
 *      console.log("Function automatique : instruction 1");
 *      console.log("Function automatique : instruction 2");
 *    }()
 *  );
 *
 * */

(function automatix() {
  console.log(
    "Bienvenue, je suis la function qui s'appelle toute seule est mon nom est Automatix"
  );
})();

// Fonctionne meme sans nom
(function () {
  console.log(
    "Bonjour également, je suis la function ANONYME qui s'appelle toute seule mais je n'ai pas de nom !"
  );
})();

/*************************************************************************************************
 * FUNCTIONS APPEL AUTOMATIQUE & FLECHEES
 *************************************************************************************************/

/* Version Anonyme et fléchée
 *
 *  (
 *    () => {
 *      console.log("Je suis une fonction ANONYME et FLECHEE en meme temps, KESKETAAAAA !!!")
 *    }
 *  )();
 *
 * */

(() => {
  console.log(
    "Je suis une fonction ANONYME et FLECHEE en meme temps, KESKETAAAAA !!!"
  );
})();

/*************************************************************************************************
 * PORTEE DES VARIABLES
 *************************************************************************************************/

/* Il est possible de DECLARER une variable LET ou CONST à l'intérieur même d'une FUNCTION pour qu'elle n'empiète
 * pas ailleurs.
 * exemple :
 *
 * function add2 () {
 *   let a = 2;
 *   return a + 2;
 * };
 *
 * */

/*************************************************************************************************
 * CALCULETTE
 *************************************************************************************************/

let totalCalculette = 0;

//Reset
function reset() {
  totalCalculette = 0;
  return totalCalculette;
}

// Addition
function additionSimple(x, y) {
  totalCalculette = x + y;
  return totalCalculette;
}

function additionTotal(x) {
  totalCalculette += x;
  return totalCalculette;
}

// Soustraction
function soustractionSimple(x, y) {
  totalCalculette = x - y;
  return totalCalculette;
}

function soustractionTotal(x) {
  totalCalculette -= x;
  return totalCalculette;
}

// Multiplication
function multiplicationSimple(x, y) {
  totalCalculette = x - y;
  return totalCalculette;
}

function multiplicationTotal(x) {
  totalCalculette -= x;
  return totalCalculette;
}

// Division
function divisionSimple(x, y) {
  totalCalculette = x - y;
  return totalCalculette;
}

function divisionTotal(x) {
  totalCalculette -= x;
  return totalCalculette;
}

/* Console :
 *
 * additionSimple(5,10);
 * => 15
 *
 * additionTotal(10);
 * => 25
 *
 * reset();
 * => 0
 *
 * console.log(totalCalculette);
 * => 15 */

/*************************************************************************************************
 * DOM : SELECTEURS
 *************************************************************************************************/

// Sélectionner le bloc h1
document.querySelector("h1");

// Sélectionner la classe .productName
document.querySelector(".productName"); // OU
document.getElementsByClassName(".btn"); // BONNE PRATIQUE

// Sélectionner l'ID items
document.querySelector("#items"); // OU
document.getElementById("#btn-1"); // BONNE PRATIQUE

// Modifier le style d'un élément
document.querySelector("h1").style.color = "black";

// BONNE PRATIQUE :
const titre1 = document.querySelector("h1");

titre1.style.color = "black";

/*************************************************************************************************
 * CLICK EVENT
 *************************************************************************************************/

/* Admettons qu'il y ai un BUTTON avec la CLASS="CLICK-EVENT"
 * 1 - Créer la variable
 * 2 - Logger la variable pour VERIFIER si elle existe et qu'elle fonctionne
 * 3 - Ajouter des éléments/propriétés/class/... */

/* 1 */ const button = document.querySelector(".click-event"); // Création de la variable
/* 2 */ console.log(button); // Vérification de la variable
/* 3 */ button.style.color = "red"; // CHANGER LE STYLE
/* 3 */ button.classList.add("nomDeLaClasseDansCSS"); // Ajouter une classe CSS
/* 3 */ button.classList.remove("nomDeLaClasseDansCSS"); // Supprimer une classe CSS
/* 3 */ button.classList.toggle("nomDeLaClasseDansCSS"); // Active/Désactive la classe si elle y ai/pas

/* ATTENTION
 * Les "-" ne sont pas pris en compte en JS
 * border-radius devient ==> borderRadius */

/*************************************************************************************************
 * ADD EVENT LISTENER
 *************************************************************************************************/

/* Ajoute un événement sur un élément sélectionné
 * 4 - Sélectionner l'élément via sa variable (créée précédemment)
 * 5 - ajouter .addEventListener('')
 * 6 - addEventListener prend 2 paramètres
 *      - paramètre 1 : l'événement en question
 *      - paramètre 2 : une fonction déja codée en amont */

// button.addEventListener("événement", function);

/* button.            = variable : class=click-event
 * addEventListener   = "j'y ajoute un événement"
 * événement          = type de l'événement
 *                        - click
 *                        - mouse-move
 *                        - button
 *                        - scroll
 *                        - input
 *                        - submit
 * function           = Soit
 *                        - y mettre une fonction déjà créée
 *                        - y mettre une fonction fléchée
 *
 * JS va lire :
 * "Dès qu'il y a l'événement donné sur la variable button, je veux que tu applique la fonction" */

button.addEventListener("click", () => {
  console.log("Click !!!");
  button.style.color = "red";
  button.style.background = "black";
});

// BONNE PRATIQUE ---------------------------------------------------------------------------------------

/* Création d'une classe avec toutes les propriétés que l'on veut
 * 1 - Création d'une classe dans le STYLE.CSS
 * 2 - Ajouter la classe dans l'event */

button.addEventListener("click", () => {
  console.log("Click !!!");
  button.style.classList.add("nomDeLaClasseDansCSS");
});

// OU

button.addEventListener("click", () => {
  console.log("Click !!!");
  button.style.classList.toggle("nomDeLaClasseDansCSS");
});

// DEUX ELEMENTS ACTIVENT UN EVENEMENT --------------------------------------------------------------------

/* Admettons qu'une réponse (HTML, class= "answer") à une question soit en <p> en visibility= hidden (CSS)
 * et que l'on veuille la faire apparaître
 * et qu'il y a deux bouttons (HTML, class= "btn-1 et btn-2") de réponse (bonne réponse/mauvaise réponse) */

/* Création des variables */
const btn1 = document.getElementById("#btn-1");
const btn2 = document.getElementById("#btn-2");
const answer = document.getElementById("#answer");

/* Consolelog */
console.log(btn1);
console.log(btn2);
console.log(answer);

/* Création de l'EVENT */
btn1.addEventListener("click", () => {
  console.log("Click du btn 1");
  answer.style.visibility = "visible";
  answer.style.color = "green";
});

btn2.addEventListener("click", () => {
  console.log("Click du btn 2");
  answer.style.visibility = "visible";
  answer.style.color = "red";
});

/* Une bonne méthode est de créer une classe en CSS et de l'intégrer dans JS */

/*************************************************************************************************
 * API GET
 *************************************************************************************************/

/* Affiche la réponse dans la console mais ne donne pas les éléments récupérés */
fetch("https://api.github.com/users/aikansy").then((response) =>
  console.log(response)
);

/* Affiche la réponse et les éléments récupérés dans la console */
fetch("https://api.github.com/users/aikansy")
  .then((response) => response.json())
  .then((response2) => console.table(response2));

/* Affiche précisément un élément de la réponse */
fetch("https://api.github.com/users/aikansy")
  .then((response) => response.json())
  .then((response2) => console.table(response2.name));

/* Affiche la réponse et les éléments récupérés dans la console SINON une ERREUR dans la console */
fetch("https://api.github.com/users/aikansy").then((res) => {
  console.log(res);
  if (res.ok) {
    res.json().then((data) => console.table(data));
  } else {
    console.log("ERROR");
  }
});
