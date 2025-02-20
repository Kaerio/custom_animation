const header = document.querySelector("header");

//animation settings (you can modify them)
const divWidth = Math.min(25, header.offsetWidth / 15)
//console.log(divWidth)
console.log(header.offsetWidth)
const animationDuration = header.offsetWidth < 800 ? 600 : 800
const numOfDivs = Math.ceil(header.offsetWidth / divWidth) // can be assigned manually with a number
const timeout = animationDuration / numOfDivs //interval between each div starting fading, can be assigned manually with a number
const individualDivFadingDuration = 120

//Divs creation
for (let i = 0; i < numOfDivs; i++) {
    const div = document.createElement("div")
    div.className = "div-container"
    div.style.width = `${divWidth}px`

    const divToFade = document.createElement("div")
    divToFade.className = "divToFade"
    divToFade.id = `divToFade-${i}`

    div.appendChild(divToFade)
    header.appendChild(div)
}

let numbers = []
for (let i = 0; i < numOfDivs; i++) {
    let random = Math.floor(Math.random() * numOfDivs)
    do {
        random = Math.floor(Math.random() * numOfDivs)
    }
    while (numbers.includes(random))
    numbers.push(random)
}
console.log(numbers)

//animation definitions
const reducing = [
    {
        height: 0,
    }
];

const options = {
    // keyframe options
    duration: individualDivFadingDuration,
    direction: "normal",
    easing: "cubic-bezier(.59,.14,.3,1.0)",
    fill: "forwards",
    iterations: 1,
}

//starting animation 
setTimeout(() => {
    numbers.forEach((number, i) => {
        setTimeout(() => {
            const div = document.querySelector(`#divToFade-${number}`);
            div.animate(reducing, options);
        }, i * timeout)
        console.log(numOfDivs, timeout)
    })
}, 500)

