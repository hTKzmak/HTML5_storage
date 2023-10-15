// ЗАДАНИЕ 1
function updateTable() {

    // очищает таблицу (удаляет все tr в tbody)
    var tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    // зачитывает данные из текущего хранилища
    var storage = getStorage();
    var keys = Object.keys(storage);

    // если данных нет, создаёт tr с emptyHeader
    if (keys.length === 0) {
        var emptyRow = document.createElement("tr");
        var emptyHeader = document.createElement("td");
        emptyHeader.setAttribute("colspan", "3");
        emptyRow.appendChild(emptyHeader);
        tbody.appendChild(emptyRow);
    }
    
    // если есть, в цикле заполняет таблицу данными
    else {
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = storage[key];

            var row = document.createElement("tr");
            var keyCell = document.createElement("td");
            var valueCell = document.createElement("td");
            var deleteCell = document.createElement("td");
            var deleteButton = document.createElement("button");

            keyCell.textContent = key;
            valueCell.textContent = value;
            deleteButton.textContent = "X";
            // в колонку "Удалить" вставить span с текстом 'X' и повесить на его onclick функцию deleteItem, передав в качестве параметра ключ текущей записи в хранилище
            deleteButton.onclick = function () {
                deleteItem(key);
            };

            deleteCell.appendChild(deleteButton);
            row.appendChild(keyCell);
            row.appendChild(valueCell);
            row.appendChild(deleteCell);
            tbody.appendChild(row);
        }
    }
}

// ЗАДАНИЕ 2
function getStorage() {
    let currentStorage;
    let storageList = document.querySelector('#storageList');
    let Option = storageList.options[storageList.selectedIndex].value;

    // выбирает текущее хранилище
    if (Option === 'local') {
        // записывает результат в currentStorage
        currentStorage = localStorage;
    }
    else if (Option === 'session') {
        currentStorage = sessionStorage;
    }

    return currentStorage;
}

// ЗАДАНИЕ 3
function saveItem() {
    // получает ключ и значение для новой записи
    let ValueKey = document.getElementById("ValueKey");

    var valueInput = document.getElementById("valueInput");
    var key = ValueKey.value;
    var value = valueInput.value;

    // добавляет новую запись в хранилище
    var storage = getStorage();
    storage.setItem(key, value);

    // вызывает updateTable()
    updateTable();
}

// ЗАДАНИЕ 4
// принимает в качестве параметра ключ текущей записи в хранилище
function deleteItem(key) {
    // спрашивает пользователя: "Вы уверены, что хотите удалить эту запись?"
    var confirmToDelete = confirm("Вы уверены, что хотите удалить эту запись?");

    // при положительном ответе пользователя удаляет запись из хранилища
    if (confirmToDelete) {
        let storage = getStorage();
        storage.removeItem(key);

        // вызывает updateTable()
        updateTable()
    }
}

// Описать функцию clearStorage, которая
function clearStorage() {
    // спрашивает пользователя: "Вы уверены, что хотите полностью очистить локальное хранилище?"

    var confirmToDeleteAll = confirm("Вы уверены, что хотите полностью очистить локальное хранилище?");

    if (confirmToDeleteAll) {
        let storage = getStorage();
        storage.clear();

        // вызывает updateTable()
        updateTable()
    }
}
