// Script JAVASCRIPT - index.html
console.log("Hello la console - Tests JS ci-dessous");

console.log("++++++++++ VARIABLES CONST, LET & CONCATENATION ++++++++++");

const prenom = "Frédéric";
const nom = "Giustini";
let age = 35;
let region = "Occitanie";
let ville = "Toulouse";
let codePostal = "31500";

let identite = `Identité du développeur : ${prenom} ${nom} ${age} ans ${region} ${ville} ${codePostal}`;

console.log(identite);

console.log("++++++++++ VARIABLES : TYPES ++++++++++");

let string = "Je suis une chaîne de caractère";
let number = 20;
let boolean = true;
let array = ["Prénom", "Nom", "Age", "Région", "ville", "Code Postal"];
let object = {
  firstName: "Céline",
  lastName: "Bouhafs",
  old: 24,
  site: "Occitanie",
  city: "Toulouse",
  postalCode: "31500",
};

console.log(array);
console.log(object);

console.log(`Type de valeur de la variable "string" : ${typeof string}`); // string
console.log(`Type de valeur de la variable "number" : ${typeof number}`); // number
console.log(`Type de valeur de la variable "boolean" : ${typeof boolean}`); // boolean
console.log(`Type de valeur de la variable "array" : ${typeof array}`); // object
console.log(`Type de valeur de la variable "object" : ${typeof object}`); // object

console.log("++++++++++ OPERATEURS MATHEMATIQUES ++++++++++");
console.log(`Addition : ${5 + 4}`); // 9
console.log(`Soustraction : ${5 - 4}`); // 1
console.log(`Multiplication : ${5 * 4}`); // 20
console.log(`Division : ${5 / 4}`); // 1.25
console.log(`Puissance : ${5 ** 4}`); // 625
console.log(`Modulo : ${5 % 4}`); // 1

let a = 1,
  b = 2,
  c = 3,
  d = 4,
  e = 5,
  f = 6;

console.log("++++++++++ OPERATEURS D'AFFECTATION ++++++++++");
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

let total = 0;

total++;
total++;
total++;
total++;

console.log("++++++++++ SUCCESSION D'OPERATEURS ++ ++++++++++");
console.log(`Total succession de ++ : ${total}`);

console.log("++++++++++ COMPARATEURS, OPERATEURS ET IF ELSE ++++++++++");
let heure = 9;

if (heure < 12) {
  console.log("Bonjour");
}

if (heure < 12) {
  console.log("Le soleil vient de se lever");
} else {
  console.log("Le soleil entame sa descente");
}

if (heure >= 0 && heure < 12) {
  console.log("C'est le matin");
} else if (heure === 12) {
  console.log("il est 12h pile");
} else if (heure > 12 && heure <= 18) {
  console.log("C'est l'après-midi");
} else if (heure > 18 && heure <= 24) {
  console.log("C'est le soir");
} else {
  console.log("La valeur entrée ne semble pas valide");
}

if (heure < 0 || heure > 24) {
  console.log("Format horaire invalide");
} else {
  console.log("Format horaire valide");
}

if (!heure >= 16) {
  console.log("Il est 16h ou plus");
} else {
  console.log("Il est moins de 16h");
}

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

heure == 24
  ? console.log(`Il est ${heure}h pile`)
  : console.log(`Il n'est pas minuit`);

console.log("++++++++++ FUNCTIONS : SIMPLE & FLECHEES ++++++++++");

function NomDeLaFonction() {
  console.log("Fonction simple : Instruction 1");
  console.log("Fonction simple : Instruction 2");
}

NomDeLaFonction();

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

console.log("++++++++++ FUNCTIONS APPEL ++++++++++");

const faireUneTache = (tache) => {
  console.log(`Je fais : ${tache}`);
};

// Appel de la function FaireUneTache
faireUneTache("+ Les courses");
faireUneTache("+ Le ménage");

function add5() {
  let z = 5;
  console.log(z);
  return z + 5;
}

// Appel de la function add5
add5();

console.log("++++++++++ FUNCTIONS RETURN ++++++++++");

// Return
function calc(x, y) {
  return x + y;
}

// A écrire dans la console
calc(4, 9);

console.log("++++++++++ FUNCTIONS APPEL AUTOMATIQUE ++++++++++");

(function automatix() {
  console.log(
    "Bienvenue, je suis la function qui s'appelle toute seule est mon nom est Automatix"
  );
})();

console.log("++++++++++ FUNCTIONS ANONYMES APPEL AUTOMATIQUE ++++++++++");

// Fonctionne meme sans nom
(function () {
  console.log(
    "Bonjour également, je suis la function ANONYME qui s'appelle toute seule mais je n'ai pas de nom !"
  );
})();

console.log(
  "++++++++++ FUNCTIONS ANONYMES FLECHEES APPEL AUTOMATIQUE ++++++++++"
);

// Version Anonyme et fléchée
(() => {
  console.log(
    "Je suis une fonction ANONYME et FLECHEE en meme temps, KESKETAAAAA !!!"
  );
})();

console.log("++++++++++ CALCULETTE ++++++++++");

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

console.log("++++++++++ DOM : SELECTORS ++++++++++");

const titre1 = document.querySelector("h1");
titre1.style.color = "black";

console.log("++++++++++ CLICK EVENT ++++++++++");

const button = document.querySelector(".click-event"); // Création de la variable
console.log(button); // Vérification de la variable

// Event
button.addEventListener("click", () => {
  console.log("Click !!!");
  button.style.color = "red";
  button.style.background = "black";
});
