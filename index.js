// Element selectors

let parentElement = document.querySelector(".container-element");
let formElement = document.querySelector(".form-creation-container");
let chooseColor = document.querySelector("#chooseColor");
let resetGridBtn = document.querySelector("#reset-grid");
let colorsContainer = document.querySelector(".colorsContainer");
let colors = Array.from(document.querySelectorAll(".color"));
let eraser = document.querySelector("#eraser");
let previousColorSelected = document.querySelector("#color1");


// Constant values used throughout file
const widthOfEachSquare = 30;
const colorsArray = ["red", "blue", "green", "purple", "orange", "yellow",
              "lightBlue", "pink", "cyan"
            ];


// Boolean values used for conditional logic
let eraserSelected = false; 

colors.forEach((currentColorBox, index) => {
    currentColorBox.style.backgroundColor = colorsArray[index];    
});

function selectColor(event) { 
    // checks for keyboard number press to pick right color
    if (event.type == "keypress") {
        // Check to see if user pressed the e key so that we can enable erasing
            if (event.key == "e") {
                eraserSelected = true;
                previousColorSelected.style.outline = "3px solid black";
                eraser.style.outline = "3px solid white";

                // guard clause below so rest of the code doesn't run in this function
                return;
            } 

            // set eraserSelected to false so the drawing is enabled again
            eraserSelected = false;
            eraser.style.outline = "3px solid black";
            previousColorSelected.style.outline = "3px solid black";
            previousColorSelected = document.querySelector(`#color${event.key}`);
            document.querySelector(`#color${event.key}`).style.outline = "3px solid white";
    
    } 

    // checks to see if user picks a specific color via click.

    else if (event.type == "click") {
        
        // Checks to make sure the color box is being clicked and not the container for all colors
        // Also okay if the number itself gets clicked on the color box
            if (event.target.className == "color" || event.target.parentNode.className == "color") {

                // Store the id of the color being clicked in this colorID var
                let colorID;
                colorID = event.target.parentNode.className == "color" ? event.target.parentNode.id : event.target.id;
              
                // set previous color selected element back to default outline of black
                // therefore only one color element can be selected at a time
                previousColorSelected.style.outline = "3px solid black";
                previousColorSelected = document.querySelector(`#${colorID}`);

                // sets new color selected to white, showing user this is the one being draw with
                previousColorSelected.style.outline = "3px solid white";                   
            }
            
    
    }
}

// Event listeners
colorsContainer.addEventListener("click", (e) => {
    selectColor(e);
})


document.addEventListener("keypress", (e) => {
    let numberPressed = parseInt(e.key);

    if (numberPressed > 0 && numberPressed < 10 || e.key == "e") {
        selectColor(e);
    }
})


function populateContainerElement(numberOfSides) {
    let totalNumberOfSquares = numberOfSides * numberOfSides;

    for (let i = 0; i < totalNumberOfSquares; i++) {
        let childElement = document.createElement("div"); 
        childElement.className = "container-element-child";
        let originalColorChildElement = childElement.style.backgroundColor;
       
       // check if mouse is being clicked as well;
       parentElement.addEventListener("mouseover", (e) => {
            e.target.style.cursor = "pointer";

            // If left mouse is being clicked, this e.buttons value returns 1
            if (e.buttons == 1) {

                // We make sure that the eraserSelected variable is disable so that
                // the user can draw again
                if (!eraserSelected) {
                    e.target.style.backgroundColor = previousColorSelected.style.backgroundColor;
                    
                    // guard clause acting as an else statement basically
                    // if eraser is selected the line of code under this if condition will run
                    return;
                }

                e.target.style.backgroundColor = "white";

            } 
       });

       parentElement.addEventListener("click", (e) => {
        e.target.style.backgroundColor = previousColorSelected.style.backgroundColor;
         
        // check for single right click
         if (eraserSelected) {
            e.target.style.backgroundColor = "white";
         }
        });

        parentElement.appendChild(childElement);
    }

    // Set the total width of the container, to provide the container element
    // with the right number of rows
    parentElement.style.width = (numberOfSides * widthOfEachSquare) + "px";


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
    parentElement.style.opacity = "1";
    populateContainerElement(newNumberOfSides);   
});

resetGridBtn.addEventListener("click", (e) => {
    let grid_element_children = document.querySelectorAll(".container-element-child");
    grid_element_children.forEach(gridBox => {
        gridBox.style.backgroundColor = "white";
    });
});




