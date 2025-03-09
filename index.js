let parentElement = document.querySelector(".container-element");
let formElement = document.querySelector(".form-creation-container");
let chooseColor = document.querySelector("#chooseColor");
let resetGridBtn = document.querySelector("#reset-grid");
let widthOfEachSquare = 30;
const colorsArray = ["red", "blue", "green", "purple", "orange", "yellow",
              "lightBlue", "pink", "cyan"
            ];
let previousColorSelected = document.querySelector("#color1");

let ableToDraw = true;


let colorsContainer = document.querySelector(".colorsContainer");
let colors = Array.from(document.querySelectorAll(".color"));

colors.forEach((currentColorBox, index) => {
    currentColorBox.style.backgroundColor = colorsArray[index];    
});

function selectColor(event) { 
    // checks for keyboard number press to pick right color

    
    if (event.type == "keypress") {
        // if user presses on container element we exit out of this functio

    

            console.log(event.key)
            previousColorSelected.style.outline = "3px solid black";
            previousColorSelected = document.querySelector(`#color${event.key}`);
            document.querySelector(`#color${event.key}`).style.outline = "3px solid white";
    
    } 

    else if (event.type == "click") {
        console.log("color is being pressed on");

        

        
        // Checks to make sure its the color box being clicked and not the parent container element
            if (event.target.className == "color" || event.target.parentNode.className == "color") {

                let colorID;
                colorID = event.target.parentNode.className == "color" ? event.target.parentNode.id : event.target.id;
                console.log(colorID);
                console.log("superr");
                previousColorSelected.style.outline = "3px solid black";
                previousColorSelected = document.querySelector(`#${colorID}`);
                previousColorSelected.style.outline = "3px solid white";

                console.log(previousColorSelected)
                

                
            

                   
            }
            
    
    }
}

colorsContainer.addEventListener("click", (e) => {
    selectColor(e);
})


// binds numbers on keyboard to color selector box

document.addEventListener("keypress", (e) => {
    selectColor(e);
})














function populateContainerElement(numberOfSides) {
    let totalNumberOfSquares = numberOfSides * numberOfSides;

    for (let i = 0; i < totalNumberOfSquares; i++) {
        let childElement = document.createElement("div"); 
        childElement.className = "container-element-child";
        let originalColorChildElement = childElement.style.backgroundColor;
    
   

        // check if mouse is being clicked as well;
       parentElement.addEventListener("mouseover", (e) => {
        // sees if left mouse btn is being clicked
            e.target.style.cursor = "pointer";

          
          
            if (e.buttons == 1) {
                e.target.style.backgroundColor = previousColorSelected.style.backgroundColor;

                console.log("left thing has been clicked");
            } 
            
            else if (e.buttons === 2) {
                e.target.style.backgroundColor = "white";
                e.target.setAttribute("data-colorSaved", "false")
            }
       });

       parentElement.addEventListener("mouseout", (e) => {
      

        
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


// chooseColor.addEventListener("input", (event) => {
//     currentColor = event.target.value;
// })

resetGridBtn.addEventListener("click", (e) => {
    let grid_element_children = document.querySelectorAll(".container-element-child");
    grid_element_children.forEach(gridBox => {
        gridBox.style.backgroundColor = "white";
    })
})

// This code will be for the paintbrush selector





