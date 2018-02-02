const search = {
    input: document.querySelector('.search-input'),
    button: document.querySelector('#search-button'),
}
const fileInput = document.querySelector('#file-input');
const main = document.querySelector('#main');
const editButtons = document.getElementsByClassName('edit-button');
const refreshButton = document.querySelector('#refresh-button');
const saveFileButton = document.querySelector('#file-save-button');

let BORDER_WIDTH = 3;

let textFile;

let elems = [];


search.button.onmousedown = search.input.onsearch = function () {
    if (search.input.value !== '') {
        makeSearchRequest();
    }
}

function makeSearchRequest() {
    let searchQuery = search.input.value;
    let newElemsArray = [];
    elems.forEach((el) => {
        if (el.name1.includes(searchQuery) || el.name2.includes(searchQuery)) {
            newElemsArray.push(el);
        }
    });
    renderArray(newElemsArray);
}

search.input.oninput = function () {
    if (search.input.value !== '') {
        search.button.style.opacity = '0.8';
    }
    else {
        renderArray(elems);
        search.button.style.opacity = '0.4';
    }
}

fileInput.onchange = function () {
    let fileList = this.files;
    textFile = fileList[0];
    allowAdditionalFeatures();
    loadFile();
}

function allowAdditionalFeatures() {
    search.input.disabled = false;
    search.input.placeholder = 'Поиск...';
    refreshButton.style.opacity = '0.8';
    refreshButton.onclick = loadFile;
    saveFileButton.style.opacity = '0.8';
    saveFileButton.onclick = saveFile;
}

function loadFile() {
    // Проверяем тип файла (текстовой файл)
    if (textFile.type == 'text/plain') {
        // Создаём новый FileReader, который и будет читать наш файл
        let reader = new FileReader();
        // Событие успешного чтения
        reader.onloadend = function (event) {
            elems = [];
            let text = event.target.result;
            // Ваши любые манипуляции с данными.
            elems = text.split('\n');
            for (let i = 0; i < elems.length; i++) {
                let temp = elems[i].split('\t');
                let edtBttn = document.createElement('div');
                edtBttn.setAttribute('class', 'edit-button button');
                let svBttn = document.createElement('div');
                svBttn.setAttribute('class', 'save-button button');
                elems[i] = {
                    id: i,
                    name1: temp[0],
                    name2: temp[1],
                    c1: temp[2],
                    c2: temp[3],
                    c3: temp[4],
                    c4: temp[5],
                    c5: temp[6],
                    c6: temp[7],
                    c7: temp[8],
                    editButton: edtBttn,
                    saveButton: svBttn,
                }
                elems[i].editButton.onmousedown = describeEditButton.bind({ element: elems[i] });
                elems[i].saveButton.onmousedown = describeSaveButton.bind({ element: elems[i] });
            }
            renderArray(elems);
        };
        // Событие ошибки
        reader.onerror = function () {
            alert('Ошибка чтения файла!');
        };
        // Читаем наш файл как текст
        reader.readAsText(textFile);
    } else {
        alert('Это не текстовой файл!');
    }
}

function renderArray(array) {
    clearMain();
    array = sortArray(array);
    let newRowsArray = [];
    array.forEach((el) => {
        newRowsArray.push(createCasualRow(el));
        main.appendChild(newRowsArray[newRowsArray.length - 1]);
        addSpaceForRow();
    });
}

function sortArray(array) {
    array = array.sort((a, b) => { return a.name1.localeCompare(b.name1); });
    return array;
}

function clearMain() {
    main.style.height = '0px';
    main.innerHTML = '';
}

function describeEditButton() {
    let index = elems.findIndex((el) => { return el.id === this.element.id; });
    this.element = elems[index];
    main.replaceChild(createEditableRow(this.element), document.getElementById(this.element.id));
}

function describeSaveButton() {
    let oldRow = document.getElementById(this.element.id);
    let index = elems.findIndex((el) => { return el.id === this.element.id; });
    elems[index] = {
        id: this.element.id,
        name1: oldRow.children[1].value,
        name2: oldRow.children[2].value,
        c1: oldRow.children[3].value,
        c2: oldRow.children[4].value,
        c3: oldRow.children[5].value,
        c4: oldRow.children[6].value,
        c5: oldRow.children[7].value,
        c6: oldRow.children[8].value,
        c7: oldRow.children[9].value,
        editButton: elems[index].editButton,
        saveButton: elems[index].saveButton,
    }
    this.element = elems[index];
    let newRow = createCasualRow(this.element);
    main.replaceChild(newRow, oldRow);
    toggleRerender();
}

function toggleRerender() {
    let rows = document.querySelectorAll('.row');
    let newIDsArr = [];
    rows.forEach((item) => {
        newIDsArr.push(item.children[0].innerHTML);
    });
    let newElemsArr = [];
    newIDsArr.forEach((ID) => {
        newElemsArr.push(elems[elems.findIndex((el) => { return '#' + el.id === ID })]);
    });
    renderArray(newElemsArr);
}

function createCasualRow(element) {
    let row = document.createElement('div');
    row.className = 'row';
    row.id = element.id;
    row.innerHTML = `
        <div class="id">#${element.id}</div>
        <div class="name1">${element.name1}</div> 
        <div class="name2">${element.name2}</div>
        <div class="c1">${element.c1}</div>
        <div class="c2">${element.c2}</div>
        <div class="c3">${element.c3}</div>
        <div class="c4">${element.c4}</div>
        <div class="c5">${element.c5}</div>
        <div class="c6">${element.c6}</div>
        <div class="c7">${element.c7}</div>
    `
    row.appendChild(element.editButton);
    return row;
}

function createEditableRow(element) {
    let row = document.createElement('div');
    row.className = 'row';
    row.id = element.id;
    row.innerHTML = `
        <div class="id">#${element.id}</div>
        <textarea class="name1">${element.name1}</textarea> 
        <textarea class="name2">${element.name2}</textarea>
        <textarea class="c1">${element.c1}</textarea>
        <textarea class="c2">${element.c2}</textarea>
        <textarea class="c3">${element.c3}</textarea>
        <textarea class="c4">${element.c4}</textarea>
        <textarea class="c5">${element.c5}</textarea>
        <textarea class="c6">${element.c6}</textarea>
        <textarea class="c7">${element.c7}</textarea>
    `
    row.appendChild(element.saveButton);
    return row;
}

function addSpaceForRow() {
    main.style.height = main.clientHeight + 60 + 2 * BORDER_WIDTH + 'px';
}

function putInfoIntoTextFile() {
    let text = "";
    for (let i = 0; i < elems.length; i++) {
        text += elems[i].name1 + "\t"
            + elems[i].name2 + "\t"
            + elems[i].c1 + "\t"
            + elems[i].c2 + "\t"
            + elems[i].c3 + "\t"
            + elems[i].c4 + "\t"
            + elems[i].c5 + "\t"
            + elems[i].c6 + "\t"
            + elems[i].c7.replace('\n', '') + "\n";
    }
    return text;
}

function saveFile() {
    var textToSave = putInfoIntoTextFile();
    var textToSaveAsBlob = new Blob([textToSave], { type: "text/plain" });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = "source";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.style.display = "none";

    downloadLink.click();
}