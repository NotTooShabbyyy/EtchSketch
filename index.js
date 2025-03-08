let parentElement = document.querySelector(".container-element");
let formElement = document.querySelector(".form-creation-container");
let currentColorSelected;

function populateContainerElement(numberOfSides) {
    let totalNumberOfSquares = numberOfSides * numberOfSides;

    for (let i = 0; i < totalNumberOfSquares; i++) {
        let childElement = document.createElement("div"); 
        childElement.className = "container-element-child";
        let originalColorChildElement = childElement.style.backgroundColor;
        childElement.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(randomColor());
            childElement.style.backgroundColor = randomColor();
        }); 


        
        // This event will handle the player erasing the square box
        childElement.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            childElement.style.backgroundColor = originalColorChildElement;
        })
        parentElement.appendChild(childElement);
    }

    // Set the total width of the container, to provide the container element
    // with the right number of rows
    parentElement.style.width = (numberOfSides * 100) + "px";

    console.log(parentElement.style.width);
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

populateContainerElement(16);  

function showPopup() {
    formElement.style.display = "block";
    parentElement.style.opacity = "0.2"; // setting this opacity to 0.2 will make the background darker which will give the form that is being shown a popup effect

} 

let createGridForm = document.querySelector("#gridCreate"); 
createGridForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let newNumberOfSides = parseInt(document.querySelector("#numberOfSides").value);
    console.log(newNumberOfSides.value);
    if (newNumberOfSides.value == 0|| newNumberOfSides.value > 99) {
        let error_sides = document.querySelector("#error_sides");
        error_sides.style.display = "block";
        return;
    }
    
    formElement.style.display = "none";
    parentElement.innerHTML = "";
    parentElement.style["justify-content"] = "flex-start";
    console.log(parentElement);
    parentElement.style.opacity = "1";
    populateContainerElement(newNumberOfSides);   
    console.log(e);
});

// This code will be for the paintbrush selector





