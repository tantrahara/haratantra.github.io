// membuat array todoList
const todoList = [];

// fungsi untuk memunculkan dan menghilangkan gambar empty list
function showHidePict(){
    const varPict = document.getElementById("backPict");
    const tlBody = document.getElementById("todoListBody");

    if(tlBody.childElementCount < 1){
        varPict.style.display = "block";
    }else{
        varPict.style.display = "none";
    }
}

// fungsi untuk menghapus class pada element tr sebelumnya
// agar animasi pada elemen sebelumnya tidak berulang
function clearPopAnimation() {
    const elementPop = document.querySelectorAll(".pop");
    const firstElementPop = elementPop[0]; //menyimpan elemen pertama dari class pop

    // menghapus elemen pertama jika jumlah elemen lebih dari 1
    if (elementPop.length > 0) {
        firstElementPop.classList.remove("pop");
    }
}

// fungsi ini berfungsi untuk menghapus inputan2 sebelumnya, agar inputan2 sebelumnya tidak ditampilkan lagi.
// jika masih bingung, hapus fungsi ini dan liat perbedaannya.
function clearTodoList() {
    const todoListBody = document.getElementById("todoListBody");
    while (todoListBody.firstChild) {
        todoListBody.removeChild(todoListBody.firstChild);
    }
}

// fungsi untuk menghapus array todoList berdasarkan index
function removeTodoList(index) {
    todoList.splice(index, 1); // method untuk menghapus array dimulai dari index berapa, dan 1 index yang dihapus
    displayTodoList(); // memanggil fungsi ini lagi untuk menampilkan ulang todoList

    clearPopAnimation();
    showHidePict();
}

// fungsi untuk menambahkan TodoList
function addTodoList(index, varTodo) {

    clearPopAnimation();

    // membuat element baru berupa table row
    const varTr = document.createElement("tr");
    // menambahkan class pop pada element tr, untuk menambahkan animasi
    varTr.classList.add("pop");

    // membuat element baru berupa table cell pertama
    const tdButton = document.createElement("td");
    // memasukan element td diatas ke dalam element tr diatas
    varTr.appendChild(tdButton);
    // membuat element button
    const buttonDone = document.createElement("button");
    buttonDone.type = "submit";
    buttonDone.classList.add("rounded-circle");
    buttonDone.classList.add("me-2");
    buttonDone.classList.add("myDoneButton");
    // membuat element image yang akan dimasukan kedalam element input diatas
    const tickIcon = document.createElement("img");
    tickIcon.setAttribute("src", "icon/tick.png");
    tickIcon.classList.add("tickIcon");
    buttonDone.appendChild(tickIcon);
    // menambahkan event pada button
    buttonDone.onclick = function () {
        // memanggil fungsi hapus isi todoList berdasarkan index array  
        removeTodoList(index);

        // membuat audio saat button diklik
        const varAudio = new Audio();
        varAudio.src = 'assets/sounds/click.mp3';
        varAudio.play();
    };
    // memasukan element button kedalam elemen cell pertama diatas ("tdButton")
    tdButton.appendChild(buttonDone);

    // membuat elemen baru berupa table cell kedua
    const tdTodo = document.createElement("td");
    // memasukan isi "varTodo" kedalam elemen cell kedua diatas
    tdTodo.textContent = varTodo;
    // memasukan element td kedua diatas kedalam element tr diatas ("varTr")
    varTr.appendChild(tdTodo);

    // memasukan elemen tr diatas kedalam elemen tbody
    const todoListBody = document.getElementById("todoListBody");
    todoListBody.appendChild(varTr);

    showHidePict();
}

// fungsi untuk menampilkan Todo List
function displayTodoList() {
    
    clearTodoList();

    // melakukan iterasi terhadap array "todoList"
    for (let i = 0; i < todoList.length; i++) {
        // menyimpan array "todoList" satu persatu ke dalam var "varTodo"
        const varTodo = todoList[i];

        // mengambil inputan search (inputan search di lowercase-kan) dan disimpan kedalam "searchText"
        const searchText = document
            .getElementById("search")
            .value.toLowerCase();

        // cek jika "varTodo" mengandung kata yang mirip dengan "searchText"
        if (varTodo.toLowerCase().includes(searchText)) {
            // memanggil fungsi untuk menambahkan/menampilkan Todo List
            addTodoList(i, varTodo);
        }
    }
}

// MAIN CODE

// Event untuk search bar saat diklik / focus
const mySearchDiv = document.querySelector(".mySearch-div"); 
const myIconSearch = document.querySelector(".myIcon-search");
const mySearch = document.querySelector(".mySearch"); 

mySearch.onfocus = function(){
    mySearchDiv.classList.add("mySearch-divFocus");
    myIconSearch.classList.add("myIcon-searchFocus");
    mySearch.classList.add("placeholderFocus");
    mySearch.classList.add("mySearchFocus");
};

mySearch.onblur = function(){
    mySearchDiv.classList.remove("mySearch-divFocus");
    myIconSearch.classList.remove("myIcon-searchFocus");
    mySearch.classList.remove("placeholderFocus");
    mySearch.classList.remove("mySearchFocus");
};

// Event saat input field kosong (input kosong maka tombol tidak bisa diklik)
const tambahButton = document.getElementById("tambahButton");
const todo = document.getElementById("todo");

todo.onkeyup = function(e){
    const isiInput = e.currentTarget.value;
    tambahButton.disabled = false;

    if(isiInput === ""){
        tambahButton.disabled = true;
    }
}
todo.onkeydown = function(e){
    const isiInput = e.currentTarget.value;
    tambahButton.disabled = false;

    if(isiInput === ""){
        tambahButton.disabled = true;
    }
}

// event saat tombol submit pada form "todoForm" diklik
document.forms["todoForm"].onsubmit = function (event) {
    event.preventDefault();
    // berfungsi untuk menangkal behaviour-nya form; yaitu saat form disubmit, secara default form akan merefresh halaman. tetapi dengan kode diatas, maka hal itu tidak akan terjadi.

    // menyimpan value dari input "todo" dari form "todoForm" kedalam var "varTodo"
    const varTodo = document.forms["todoForm"]["todo"].value;

    // memasukan value "varTodo" kedalam array "todoList"
    todoList.push(varTodo);

    //  mereset form (mengosongkan)
    document.forms["todoForm"].reset();

    // membuat tombol tidak bisa diklik lagi
    const tambahButton = document.getElementById("tambahButton");
    tambahButton.disabled = true;

    displayTodoList();
};

// event saat input search diketik
const searchInput = document.getElementById("search");
searchInput.onkeyup = function () {
    displayTodoList();
};
searchInput.onkeydown = function () {
    displayTodoList();
};

const varHToggle = document.getElementById("hideToggle");   // tombol cancel
const varSToggle = document.getElementById("showToggle");   // (div) tombol add todo list
const varFormToggle = document.getElementById("toggle");    // form add todo

// event saat tombol cancel diklik
varHToggle.onclick = function(){
    varFormToggle.style.display = "none";
    varSToggle.style.display = "block";
}

// event saat tombol "add Todo List" diklik
varSToggle.onclick = function(){
    varFormToggle.style.display = "block";
    varSToggle.style.display = "none";
}




