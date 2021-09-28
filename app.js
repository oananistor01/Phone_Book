var newNameInput = document.querySelector("#new-name");
var newNumberInput = document.querySelector("#new-number");
var contactList = document.querySelector("#contact-list");
var table = document.querySelector("#my-table");
var modifiedClicked = false;
var rowIndex;

function addContact() {
  if (modifiedClicked === true && inputValidation() == true) {
    //if modifiedClicked is true(the button modified is clicked) and the input data is correct,
    //then the first and second td of the exact rowIndex is edited with the new info from the input field
    document.querySelector("#my-table").children[
      rowIndex
    ].children[0].innerText = newNameInput.value;

    document.querySelector("#my-table").children[
      rowIndex
    ].children[1].innerText = newNumberInput.value;

    //clearing the input text
    newNameInput.value = "";
    newNumberInput.value = "";

    modifiedClicked = false;
    return;
  } else if (inputValidation() == true) {
    contactList.style.display = "block";

    //create a row
    var tr = document.createElement("tr");

    //create first td => name
    var td1 = tr.appendChild(document.createElement("td"));
    td1.innerHTML = newNameInput.value;

    //create second td => number
    var td2 = tr.appendChild(document.createElement("td"));
    td2.innerHTML = newNumberInput.value;

    //create third td => 1st button
    var td3 = tr.appendChild(document.createElement("td"));
    var btn = td3.appendChild(document.createElement("button"));
    btn.classList.add("hidden-btn");
    btn.innerText = "Modifica";

    //create forth td => 2nd button
    var td4 = tr.appendChild(document.createElement("td"));
    var btn = td4.appendChild(document.createElement("button"));
    btn.classList.add("hidden-btn", "remove");
    btn.innerText = "Sterge";

    //append entire row to table
    table.appendChild(tr);

    //clearing the input text
    newNameInput.value = "";
    newNumberInput.value = "";
  }
}

//function for validating the input data:
function inputValidation() {
  var result = true;
  var newNameValue = newNameInput.value;
  var newNumberValue = newNumberInput.value;

  //if the name is a number or the input is empty, an error (red border) is shown
  if (isNaN(newNameValue) === false || newNameValue == "") {
    newNameInput.classList.add("error");
    result = false;
  } else {
    newNameInput.classList.remove("error");
  }

  //if the phone number does not consist of 10 digits or is not an integer
  //or contains a space or the input is empty, an error (red border) is shown
  if (
    newNumberValue == "" ||
    newNumberValue.length != 10 ||
    newNumberValue.indexOf(" ") >= 0 ||
    newNumberValue.indexOf(".") >= 0
  ) {
    newNumberInput.classList.add("error");
    result = false;
    return;
  } else {
    newNumberInput.classList.remove("error");
  }
  return result;
}

//call function addContact() if focus is on input field 'phone number' and 'enter' key is pressed:
newNumberInput.addEventListener("keydown", keyEvent);
function keyEvent(e) {
  if (e.keyCode == 13) {
    addContact();
    e.preventDefault();
  }
}

//delete the row after clicking the button 'sterge' or edit the row after clicking the button 'modifica':
table.addEventListener("click", editOrDeleteContact);
function editOrDeleteContact(event) {
  var tr = event.target.parentElement.parentElement;

  if (event.target.innerText === "Sterge") {
    table.removeChild(tr);
  } else if (event.target.textContent === "Modifica") {
    modifiedClicked = true;
    rowIndex = event.target.parentElement.parentElement.rowIndex;
    // console.log(rowIndex);
    var td1 = tr.firstElementChild;
    var td2 = td1.nextSibling;

    //edit name or number
    newNameInput.value = td1.textContent;
    newNumberInput.value = td2.textContent;
  }
}
