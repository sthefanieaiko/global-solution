let Nome = document.getElementById("nome");
let Data = document.getElementById("data");
let quantidade = document.getElementById("quantidade");

var myModal = new bootstrap.Modal(document.getElementById('modelodeexemplo'))
let listar = document.getElementById("listados");
let pesquisa_feita = document.getElementById("pesquisa_feita");
let Procurar = document.getElementById("procurado").addEventListener("keyup", (e) => {
    buscarCard(e.target.value);
});

let dados = JSON.parse(localStorage.getItem("item")) || [];


dados.forEach((item, index) => {
    listados.appendChild(Item(item, index));
});

function save() {

    if (nome.value == "" || data.value == "" || quantidade.value == "") {
        alert("Não deixe nenhum campo sem resposta");
        return false;
    }

    let dateInUse = dados.filter((item) => item.date == date.value);

    if (dateInUse.length > 0) {
        alert("Data registrada");
        return false;
    }


    dados.push({
        id: dados.length + 1,
        nome: nome.value,
        data: data.value,
        quantidade: quantidade.value,
    })

    listados.innerHTML = "";

    dados.forEach((item, index) => {
        listados.appendChild(Item(item, index));
        myModal.hide();
    });

    localStorage.setItem("item", JSON.stringify(dados));

    apagarCampos();
}

function Botao(item) {
    return `<button class="btn btn-danger" onClick="remover(${item.id})">Remover</button>`;
}

function Card(search) {
    listados.innerHTML = "";
    let searchType = pesquisa_feita.value; 

    dados.forEach((item, index) => {
        if (item[searchType] && item[searchType].toString().includes(search)) {
            listar.appendChild(Item(item, index));
        }
    });
}

function formatDateMonth(date) {
    let inputValue = date;
    let parts = inputValue.split('-');
    let brazilianFormat = parts.reverse().join('/');
    return brazilianFormat;
}



function Item(item, index) {


    let html = `
    <td>${item.name}</td>
    <td>${formatDateMonth(item.date)}</td>
    <td>${item.amount}L</td>
    <td>${Botao(item)}</td>
    `;


    let tr = document.createElement("tr");
    tr.innerHTML = html;
    return tr;
}

function apagarCampos() {
    name.value = "";
    date.value = "";
    amount.value = "";
}

function remove(id) {
    dados = dados.filter((item) => item.id != id);
    listados.innerHTML = "";

    dados.forEach((item, index) => {
        listados.appendChild(Item(item, index));
    });

    localStorage.setItem("item", JSON.stringify(dados));
}

function permitir(id) {
    dados = dados.map((item) => {
        if (item.id == id) {
            item.status = "Permitido";
        }
        return item;
    });
    listados.innerHTML = "";

    dados.forEach((item, index) => {
        listados.appendChild(Item(item, index));
    });
}