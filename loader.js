function startLoadingAnimation() {
  const animationContainer = document.getElementById("loading-animation");
  const loaderContainer = document.getElementById("loader-container");
  animationContainer.style.display = "flex";
  // animationContainer.style.width = window.innerWidth;

  //réglages animation
  const divWidth = document.body.offsetWidth < 500 ? 5 : 6; //plus petites sur petit écran
  const animationDuration = document.body.offsetWidth < 500 ? 800 : 900; //plus rapide sur petit écran
  const numOfDivs = Math.ceil(document.body.offsetWidth / divWidth);
  const timeout = animationDuration / numOfDivs; //interval entre chaque démarrage de div
  const individualDivFadingDuration =
    document.body.offsetWidth < 500 ? 800 : 900; //plus rapide sur petit écran

  function setVhUnit() {
    const vh = window.innerHeight * 0.01;
    document.body.style.setProperty("--vh", `${vh}px`);
  }

  window.addEventListener("resize", setVhUnit);
  setVhUnit();

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
    });
  });

  let initialWidth = loaderContainer.offsetWidth;
  let counter = initialWidth;
  console.log("counter: " + counter);
  let opacity = 1;
  const animationInterval = setInterval(() => {
    counter += initialWidth * 0.025;
    loaderContainer.style.width = `${counter}px`;

    if (counter > initialWidth * 6) {
      opacity -= 0.1;
      counter *= 1.25;
      animationContainer.style.opacity = opacity;
    }

    if (opacity <= 0) {
      animationContainer.style.display = "none";
      clearInterval(animationInterval);
    }
  }, 16);
}

// Démarre quand le DOM est prêt
// document.addEventListener("DOMContentLoaded", startLoadingAnimation);
startLoadingAnimation();
