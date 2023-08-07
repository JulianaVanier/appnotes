// get value with add button
const $btn_add = document.getElementById("btn_add");

$btn_add.addEventListener("click", (event) => {
    showBoxInput();
    openBoxInput(event);
    hiddeButton();
});

// get value with add button in footer
const $btn_add_footer = document.getElementById("btn_add_footer");

$btn_add_footer.addEventListener("click", (event) => {
    showBoxInput();
    openBoxInput(event);
    hiddeButton();
});

// get value with submit button
document.addEventListener("click", (event) => {
    if (event.target.id === "input_submit") {
        // sendValues(event);
        executeValue(event);
    }
});

//hidde button big circle in the middle
function hiddeButton() {
    let btn = document.querySelector(".btn");
    btn.style.display = "none";
}

// show box to user input note
function showBoxInput() {
    let boxInput2 = document.querySelector(".box");
    boxInput2.style.display = "flex";
}

//create box to user input note
function openBoxInput(event) {
    let box = document.querySelector(".box");

    box.innerHTML = "";

    //create div with open box para input//
    let newDiv = document.createElement("div");
    newDiv.classList = "boxinput";
    box.appendChild(newDiv);
    //****************************//

    //create div container for open box para input//
    let newDivContainer = document.createElement("form");
    newDivContainer.classList = "box_container";
    newDivContainer.id = "post";
    newDiv.appendChild(newDivContainer);
    //****************************//

    //create input title//
    let inputTitle = document.createElement("textarea");
    inputTitle.classList = "input_title";
    inputTitle.type = "text";
    inputTitle.name = "title";
    inputTitle.id = "title";
    inputTitle.cols = "40";
    inputTitle.rows = "1";
    inputTitle.placeholder = "Title:";

    //create input note//
    let inputNote = document.createElement("textarea");
    inputNote.classList = "input_note";
    inputNote.type = "text";
    inputNote.name = "note";
    inputNote.id = "note";
    inputNote.cols = "40";
    inputNote.rows = "10";
    inputNote.placeholder = "Note:";

    //create input image//
    let labelImg = document.createElement("label");
    let inputImg = document.createElement("input");
    labelImg.for = "img";
    labelImg.classList = "custom_file";
    inputImg.classList = "input_img";
    inputImg.type = "file";
    inputImg.accept = ".jpg, .jpeg, .png, .gif, .svg";
    inputImg.name = "image";
    inputImg.id = "img";

    labelImg.appendChild(inputImg);


    //create button to submit//
    let inputButton = document.createElement("button");
    inputButton.classList = "input_btn";
    inputButton.type = "button";
    inputButton.id = "input_submit";
    inputButton.textContent = "Submit";

    newDivContainer.appendChild(inputTitle);
    newDivContainer.appendChild(inputNote);
    newDivContainer.appendChild(labelImg);
    newDivContainer.appendChild(inputButton);
}


// function to check value
function executeValue(event) {
    // console.log("Event", event);
    let title = document.querySelector(".input_title").value;
    inputTitle = document.querySelector("#title");

    if (title == "") {
        inputTitle.placeholder = "PLEASE ENTER A TITLE!";        
    } else {
        hiddeBoxInput();
        saveValues(event);
    }
}

// function to hidde the box for input note after click in submit
function hiddeBoxInput() {
    let boxInput = document.querySelector(".box");
    boxInput.style.display = "none";
}


function saveValues(event) {
    let notesSaved = document.querySelector(".notes");

    var title = document.querySelector(".input_title").value;
    var notes = document.querySelector(".input_note").value;
    var image = document.querySelector(".input_img").files[0];

    //create div with open box para input//
    let newNotes = document.createElement("div");
    newNotes.classList.add("notes_saved");

    let titleElement = document.createElement("h1");
    titleElement.textContent = title;
    newNotes.appendChild(titleElement);

    let lineElement = document.createElement("hr");
    newNotes.appendChild(lineElement);

    let notesElement = document.createElement("p");
    notesElement.textContent = notes;
    newNotes.appendChild(notesElement);

    //create div to save img inside//
    let boxImg = document.createElement("div");
    boxImg.classList.add("box_img");
    newNotes.appendChild(boxImg);

    let imageElement = document.createElement("img");
    imageElement.src = URL.createObjectURL(image);
    boxImg.style.backgroundImage = "url(" + imageElement.src + ")";
    boxImg.style.backgroundPosition = "center";
    boxImg.style.backgroundSize = "cover";
    // }

    newNotes.addEventListener("click", (event) => {
        alert("1");
    });

    notesSaved.appendChild(newNotes);


    //****************************//
    // clearValues();
}



// image carrier var
// let imgCarrier;

// localStorage.setItem("app-memory", "");

// const formImg = document.querySelector('#img');

// function processfile(file) {
//     console.log(file.type)
//     if( !( /image/i ).test( file.type ) ) {
//       alert( "File "+ file.name +" is not an image." );
//       return false;
//     }
//     console.log(file.name);
//     labelImg.append(file.name);

//     // read the files
//     var reader = new FileReader();
//     reader.readAsArrayBuffer(file);
    
//     reader.onload = function (event) {
//       // blob stuff
//       var blob = new Blob([event.target.result]); // create blob...
//       window.URL = window.URL || window.webkitURL;
//       var blobURL = window.URL.createObjectURL(blob); // and get it's URL
      
//       // helper Image object
//       var image = new Image();
//       image.src = blobURL;
//       //preview.appendChild(image); // preview commented out, I am using the canvas instead
//       imgCarrier = image;

//       labelImg.style.backgroundImage = "url(" + blobURL + ")";
      
//     };
//   }

// function readfiles(files) {
//     for (var i = 0; i < files.length; i++) {
//       processfile(files[i]); // process each file at once
//     }
//     formImg.value = ""; //remove the original files from fileinput
// }


