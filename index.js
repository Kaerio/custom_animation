const body = document.body;

//réglages animation
const divWidth = body.offsetWidth < 500 ? 3 : 6;
const animationDuration = body.offsetWidth < 800 ? 600 : 700;
const numOfDivs = Math.ceil(body.offsetWidth / divWidth);
const timeout = animationDuration / numOfDivs; //interval entre chaque démarrage de div
const individualDivFadingDuration = body.offsetWidth < 800 ? 600 : 700; //plus rapide sur petit écran

console.log("numOfDivs: " + numOfDivs);

// Création des divs
for (let i = 0; i < numOfDivs; i++) {
  const divContainer = document.createElement("div");
  divContainer.className = "div-container";
  divContainer.style.width = `${divWidth}px`;

  const divToFade = document.createElement("div");
  divToFade.className = "div-to-fade";
  divToFade.id = `div-to-fade-${i}`;

  divContainer.appendChild(divToFade);
  body.appendChild(divContainer);
}

//Creation array de nombre aléatoires uniques
let numbers = [];
for (let i = 0; i < numOfDivs; i++) {
  let random;
  do {
    random = Math.floor(Math.random() * numOfDivs);
  } while (numbers.includes(random));
  numbers.push(random);
}
console.log(numbers);

//définition de l'animation
const reducing = [
  {
    height: 0,
  },
];

//définition des options de l'animation
const options = {
  // keyframe options
  duration: individualDivFadingDuration,
  direction: "alternate",
  //easing: "cubic-bezier(.59,.14,.3,1.0)",
  easing: "ease",
  fill: "forwards",
  iterations: Infinity,
};

setTimeout(() => {
  numbers.forEach((number, i) => {
    setTimeout(() => {
      const divToFade = document.querySelector(`#div-to-fade-${number}`);
      divToFade.animate(reducing, options);
    }, i * timeout);
    console.log(numOfDivs, timeout);
  });
});
