const search = {
    input: document.querySelector('.search-input'),
    button: document.querySelector('.search-button'),
}
const fileInput = document.querySelector('#file-input');
const main = document.querySelector('#main');
const editButtons = document.getElementsByClassName('edit-button');

let BORDER_WIDTH = 3;

let searchQuery = '';

let text;

let rows = [];

let elems = [];


search.button.onmousedown = search.input.onsearch = function () {
    if (search.input.value !== '') {
        makeSearchRequest();
    }
}

search.input.oninput = function () {
    if (search.input.value !== '') {
        search.button.style.opacity = '0.8';
    }
    else {
        search.button.style.opacity = '0.4';
    }
}

function makeSearchRequest() {
    searchQuery = search.input.value;
}


fileInput.onchange = function () {
    let fileList = this.files;
    let textFile = fileList[0];
    // Проверяем тип файла (текстовой файл)
    if (textFile.type == 'text/plain') {
        // Создаём новый FileReader, который и будет читать наш файл
        let reader = new FileReader();
        // Событие успешного чтения
        reader.onloadend = function (event) {
            text = event.target.result;
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
                elems[i].editButton.onmousedown = describeEditButton.bind({ index: i });
                elems[i].saveButton.onmousedown = describeSaveButton.bind({ index: i });
            }
            for (let i = 0; i < elems.length; i++) {
                rows.push(createCasualRow(i))
                main.appendChild(rows[rows.length - 1]);
                addSpaceForRow();
            }
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
};

function describeEditButton() {
    main.replaceChild(createEditableRow(this.index), rows[this.index]);
}

function describeSaveButton() {
    let temp = document.getElementsByClassName('row')[this.index];
    elems[this.index] = {
        id: this.index,
        name1: temp.children[1].value,
        name2: temp.children[2].value,
        c1: temp.children[3].value,
        c2: temp.children[4].value,
        c3: temp.children[5].value,
        c4: temp.children[6].value,
        c5: temp.children[7].value,
        c6: temp.children[8].value,
        c7: temp.children[9].value,
        editButton: elems[this.index].editButton,
        saveButton: elems[this.index].saveButton,
    }
    let newRow = createCasualRow(this.index);
    main.replaceChild(newRow, temp);
    rows[this.index] = newRow;
}

function createCasualRow(index) {
    let row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
        <div class="id">#${elems[index].id}</div>
        <div class="name1">${elems[index].name1}</div> 
        <div class="name2">${elems[index].name2}</div>
        <div class="c1">${elems[index].c1}</div>
        <div class="c2">${elems[index].c2}</div>
        <div class="c3">${elems[index].c3}</div>
        <div class="c4">${elems[index].c4}</div>
        <div class="c5">${elems[index].c5}</div>
        <div class="c6">${elems[index].c6}</div>
        <div class="c7">${elems[index].c7}</div>
    `
    row.appendChild(elems[index].editButton);
    return row;
}

function createEditableRow(index) {
    let row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
        <div class="id">#${elems[index].id}</div>
        <textarea class="name1">${elems[index].name1}</textarea> 
        <textarea class="name2">${elems[index].name2}</textarea>
        <textarea class="c1">${elems[index].c1}</textarea>
        <textarea class="c2">${elems[index].c2}</textarea>
        <textarea class="c3">${elems[index].c3}</textarea>
        <textarea class="c4">${elems[index].c4}</textarea>
        <textarea class="c5">${elems[index].c5}</textarea>
        <textarea class="c6">${elems[index].c6}</textarea>
        <textarea class="c7">${elems[index].c7}</textarea>
    `
    row.appendChild(elems[index].saveButton);
    return row;
}

function addSpaceForRow() {
    main.style.height = main.clientHeight + 60 + 2 * BORDER_WIDTH + 'px';
}