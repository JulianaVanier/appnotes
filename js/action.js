// function sending action to my_connection to call php function to bring all notes from user in DB
function loadNotes() {
    fetch("php/my_connection.php?action=notes")
        .then((res) => res.json())
        .then((data) => {
            checkReturnDB(data);
        });
}

loadNotes();

// get value with add button
const $btn_add = document.getElementById("btn_add");

$btn_add.addEventListener("click", (event) => {
    showBoxInput();
    openBoxInput(event);
    // hiddeButton();
});

// ********************NEW***********************

function confirmAction() {
    if (confirm("Are you sure you want to delete all notes?")) {
        deleteNote();
    } else {
        alert("Delete action was canceled.");
    }
};

function deleteNote() {
    fetch("php/my_connection.php?action=delete")
        .then((res) => res.json())
        .then((data) => {
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error deleting notes:", error);
        });
}


// get value with add button in footer
const $btn_add_footer = document.getElementById("btn_add_footer");

$btn_add_footer.addEventListener("click", (event) => {
    showBoxInput();
    openBoxInput(event);
    // hiddeButton();
});

//hidde button big circle in the middle
// function hiddeButton() {
//     let btn = document.querySelector(".btn");
//     btn.style.display = "none";
// }

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
    // box.innerHTML = "";
    box.appendChild(newDiv);
    //****************************//

    //create div container for open box para input//
    let newDivContainer = document.createElement("form");
    newDivContainer.classList = "box_container";
    //The enctype attribute specifies how the form-data should be encoded when submitting it to the server.Note: The enctype attribute can be used only if method="post".
    newDivContainer.enctype = "multipart/form-data";
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
    // labelImg.textContent = "Image";
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

    //create button to close//
    let inputButtonClose = document.createElement("button");
    inputButtonClose.classList = "input_btn_close";
    inputButtonClose.type = "button";
    inputButtonClose.id = "input_close";
    inputButtonClose.textContent = "Cancel";

    newDivContainer.appendChild(inputTitle);
    newDivContainer.appendChild(inputNote);
    newDivContainer.appendChild(labelImg);
    newDivContainer.appendChild(inputButton);
    newDivContainer.appendChild(inputButtonClose);

    // get value with submit button
    inputButton.addEventListener("click", (event) => {
        executeValue();
    });

    // get value with close button
    inputButtonClose.addEventListener("click", (event) => {
        hiddeBoxInput();
    });
}

// function to check value
function executeValue() {

    let title = document.querySelector(".input_title").value;
    inputTitle = document.querySelector("#title");

    if (title == "") {
        inputTitle.placeholder = "PLEASE ENTER A TITLE!";
    } else {
        // hiddeBoxInput();
        sendValues();
    }
}

// function to send values to database
function sendValues() {
    var title = document.querySelector(".input_title").value;
    var notes = document.querySelector(".input_note").value;
    var image = document.querySelector(".input_img").files[0];
    //create condition to continue if there is no file
    // var IDUser = document.querySelector(".user_id").value;
    // console.log(IDUser);
    var operation = "create";

    // console.log(image);

    var currentDate = new Date().toISOString().slice(0, 19).replace("T", " "); //var created to save date from server, formating date to insert in DB "YYYY-MM-DD HH:MM:SS"

    var formData = new FormData();
    formData.append("title", title);
    formData.append("notes", notes);
    formData.append("currentDate", currentDate);
    //resize function for image
    formData.append("image", image);
    // formData.append("IDUser", IDUser);
    formData.append("create", operation);

    fetch("php/my_connection.php?action=create", {
        body: formData,
        method: "POST",
    })
        .then((res) => res.json())
        .then((data) => {
            checkReturnDB(data);
        });
}

function checkReturnDB(list) {
    hiddeBoxInput();
    for (let i = 0; i < list.length; i++) {
        console.log("i", list[i]);
        saveValues(list[i]);
    }

    // if (!isNaN(parseInt(data))) {
    //     hiddeBoxInput();
    //     saveValues(data);
    // }
    // } else {
    //     //create function to show box with error
    //     alert("Connection failure");
    // }
}

// function to hidde the box for input note after click in submit
function hiddeBoxInput() {
    let boxInput = document.querySelector(".box");
    boxInput.style.display = "none";
}

let result;

function saveValues(data) {
    let notesSaved = document.querySelector(".notes");

    //create div with open box para input//
    let newNotes = document.createElement("div");
    newNotes.classList.add("notes_saved");
    //insert data received from db in notes_saved
    // newNotes.setAttribute("data-id", data);

    let titleElement = document.createElement("h1");
    titleElement.textContent = `${data.title}`;
    // titleElement.textContent = title;
    newNotes.appendChild(titleElement);

    let lineElement = document.createElement("hr");
    newNotes.appendChild(lineElement);

    let notesElement = document.createElement("p");
    notesElement.textContent = `${data.note}`;
    newNotes.appendChild(notesElement);

    let imageElement = document.createElement("img");
    imageElement.src = `data:text/plain;base64,${data.image}`;
    newNotes.appendChild(imageElement);

    newNotes.addEventListener("click", (event) => {
        // alert("1");
        // getDatabase();
    });
    // prepend aplied to insert notes at the top
    notesSaved.prepend(newNotes);
}
