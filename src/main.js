import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';


/*document.addEventListener("keydown", enter);
window.onload = function () {/*document.getElementById('').addEventListener("click", function(){
    removeFinished();
})*//*
    document.getElementById('allCompleted').addEventListener("click", function () {
        showCompleted();
    });
    document.getElementById('allSelected').addEventListener("click", function () {
        showAll();
    });
    document.getElementById('allActive').addEventListener("click", function () {
        showUncompleted();
    });
    document.getElementById('selectAll').addEventListener("click", function () {
        checkAll();
    });
}

function enter(e) {
    if (e.keyCode == '13') {
        if (validate()) {
            addListElement();
        }
    }
}

let listCount = 0;
let totalListCount = 0;
let itemId = 0;
let itemsLeft = ' items left';
let itemLeft = ' item left';
let view = 'all';
let checked = false;

function template() {
    let currentId = itemId;
    let text = document.getElementById("add");
    let parent = document.getElementById('todoList');
    let child = document.createElement('li');
    let input = document.createElement('input');
    input.setAttribute('id', 'checkBox' + currentId);
    input.type = 'checkbox';
    input.addEventListener('click', function () {
        checkIt(currentId);
    });
    let checkBoxLabel = document.createElement('label');
    checkBoxLabel.setAttribute('class', 'checkBoxLabel');
    checkBoxLabel.setAttribute('for', 'checkBox' + currentId);
    let label = document.createElement('label');
    label.setAttribute('class', 'listItemLabel')
    label.setAttribute('id', 'listLabel' + currentId);
    label.text = text.value;
    label.value = text.value;
    label.textContent = text.value;
    let button = document.createElement('button');
    button.setAttribute('id', 'buttonItem' + currentId);
    child.appendChild(input);
    child.appendChild(checkBoxLabel);
    child.appendChild(label);
    child.appendChild(button);
    child.setAttribute('id', 'listItem' + currentId);
    child.setAttribute('class', 'listItem');
    if (view == 'completed') {
        child.setAttribute('style', 'display: none');
    }
    parent.appendChild(child);
    document.getElementById('buttonItem' + currentId).addEventListener('click', function () {
        removeListElement(currentId);
    });
    listCount++;
    totalListCount++
    text.value = "";
}

function addListElement() {
    itemId++;
    template();
    updateCount();
}
function removeListElement(Id) {
    if (isChecked(Id) == false) {
        listCount--;
        totalListCount--;
    }
    let listItemId = 'listItem' + Id;
    let parent = document.getElementById('todoList');
    let element = document.getElementById(listItemId);
    parent.removeChild(element);
    updateCount();
}

function validate() {
    let text = document.getElementById("add");
    if (text.value == "" || text.value == null || text.value == " ") {
        return false;
    }
    else {
        return true;
    }
}

function updateCount() {
    if (listCount == 0 && totalListCount == 0) {
        let parent = document.getElementById('mvcFooter');
        parent.setAttribute('style', 'display: none');
    }
    else {
        let labelDiv = document.getElementById('divLabel')
        labelDiv.textContent = listCount + itemLeft;
        let parent = document.getElementById('mvcFooter');
        parent.setAttribute('style', 'display: block');
    }
}

function isChecked(Id) {
    let checkboxId = "checkBox" + Id;
    let element = document.getElementById(checkboxId);
    if (element.checked == true) {
        return true;
    }
    else {
        return false;
    }
}

function checkIt(Id) {
    let checkboxId = "checkBox" + Id;
    let element = document.getElementById(checkboxId);
    if (element.checked == true) {
        let label = document.getElementById("listLabel" + Id)
        label.setAttribute('class', 'strike');
        listCount--;
        updateCount();
    }
    else {
        let label = document.getElementById("listLabel" + Id)
        label.setAttribute('class', 'listItemLabel');
        listCount++;
        updateCount();
        checked = false;
    }
}

function removeFinished() {
    let array = document.getElementsByClassName('listItem');
    for (i = 0; i < array.length; i++) {
        let elementId = array[i].id;
        elementId = elementId.slice(8);
        if (isChecked(elementId) == true) {
            let listItemId = 'listItem' + elementId;
            let parent = document.getElementById('todoList');
            let element = document.getElementById(listItemId);
            parent.removeChild(element);
        }
    }
}

function showCompleted() {
    let array = document.getElementsByClassName('listItem');

    for (i = 0; i < array.length; i++) {
        let elementId = array[i].id;
        elementId = elementId.slice(8);
        if (isChecked(elementId) == false) {
            array[i].setAttribute('style', 'display: none');
        }
        else {
            array[i].setAttribute('style', 'display: list-item');
        }
    }
    view = 'completed';
}

function showAll() {
    let array = document.getElementsByClassName('listItem');
    for (i = 0; i < array.length; i++) {
        let elementId = array[i].id;
        elementId = elementId.slice(8);
        let listItemId = 'listItem' + elementId;
        let element = document.getElementById(listItemId);
        element.setAttribute('style', 'display: list-item');
    }
    view = 'all';
}

function showUncompleted() {
    let array = document.getElementsByClassName('listItem');
    for (i = 0; i < array.length; i++) {
        let elementId = array[i].id;
        elementId = elementId.slice(8);
        if (isChecked(elementId) == true) {
            let listItemId = 'listItem' + elementId;
            let element = document.getElementById(listItemId);
            element.setAttribute('style', 'display: none');
        }
        else {
            let listItemId = 'listItem' + elementId;
            let element = document.getElementById(listItemId);
            element.setAttribute('style', 'display: list-item');
        }
    }
    view = 'active';
}

function checkAll() {
    let array = document.getElementsByClassName('listItem');
    if (checked == false) {
        for (i = 0; i < array.length; i++) {
            let elementId = array[i].id;
            elementId = elementId.slice(8);
            if (isChecked(elementId) == false) {
                let checkboxId = "checkBox" + elementId;
                let element = document.getElementById(checkboxId);
                element.checked = true;
                let label = document.getElementById("listLabel" + elementId)
                label.setAttribute('class', 'strike');
                listCount--;
                updateCount();

                if (view == 'completed') {
                    let list = document.getElementById('listItem' + elementId);
                    list.setAttribute('style', 'display: list-item');
                }
                else if (view == 'active'){
                    let list = document.getElementById('listItem' + elementId);
                    list.setAttribute('style', 'display: none');
                }
            }
        }
        checked = true;
    }
    else {
        for (i = 0; i < array.length; i++) {
            let elementId = array[i].id;
            elementId = elementId.slice(8);
            if (isChecked(elementId) == true) {
                let checkboxId = "checkBox" + elementId;
                let element = document.getElementById(checkboxId);
                element.checked = false;
                let label = document.getElementById("listLabel" + elementId)
                label.setAttribute('class', 'listItemLabel');
                listCount++;
                updateCount();

                if (view == 'completed') {
                    let list = document.getElementById('listItem' + elementId);
                    list.setAttribute('style', 'display: none');
                }
                else if (view == 'active'){
                    let list = document.getElementById('listItem' + elementId);
                    list.setAttribute('style', 'display: list-item');
                }
            }
        }
        checked = false;
    }
}
*/
// ===========================================
ReactDOM.render(
    <Todo />,
    document.getElementById('root')
  );