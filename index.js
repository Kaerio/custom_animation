const animationContainer = document.getElementById("loading-animation");
const loaderContainer = document.getElementById("loader-container");
// animationContainer.style.width = window.innerWidth;

//réglages animation
const divWidth = document.body.offsetWidth < 500 ? 5 : 6;
const animationDuration = document.body.offsetWidth < 500 ? 800 : 900;
const numOfDivs = Math.ceil(document.body.offsetWidth / divWidth);
const timeout = animationDuration / numOfDivs; //interval entre chaque démarrage de div
const individualDivFadingDuration = document.body.offsetWidth < 500 ? 800 : 900; //plus rapide sur petit écran

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
  animationContainer.appendChild(divContainer);
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
    height: "0",
  },
];

//définition des options de l'animation
const options = {
  duration: individualDivFadingDuration,
  direction: "alternate",
  //   easing: "cubic-bezier(.59,.14,.3,1.0)",
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
  });
}, 100);

let initialWidth = loaderContainer.offsetWidth;
let counter = initialWidth;
console.log("counter: " + counter);
let opacity = 1;
const animationInterval = setInterval(() => {
  counter += initialWidth * 0.025;
  //   console.log(counter);

  loaderContainer.style.width = `${counter}px`;
  if (counter > initialWidth * 5) {
    opacity -= 0.07;
    counter *= 1.25;
    animationContainer.style.opacity = opacity;
    // document.body.style.opacity = opacity * -1;
  }

  if (opacity <= 0) {
    animationContainer.style.display = "none";
    clearInterval(animationInterval);
  }
}, 16);

// loaderContainer.style.width = `${counter}%`;
