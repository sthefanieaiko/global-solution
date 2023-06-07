let name = document.getElementById("name");
let date = document.getElementById("date");
let amount = document.getElementById("amount");

var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
let listagem = document.getElementById("listagem");
let style_pesquisa = document.getElementById("style_pesquisa");
let procurar = document.getElementById("procurar").addEventListener("keyup", (e) => {
    buscarCard(e.target.value);
});

let dados = JSON.parse(localStorage.getItem("item")) || [];

//Renderizar os cards
dados.forEach((item, index) => {
    listagem.appendChild(criarItem(item, index));
});

function salvar() {

    if (name.value == "" || date.value == "" || amount.value == "") {
        alert("Nâo deixe nenhum campo vazio");
        return false;
    }

    let dateInUse = dados.filter((item) => item.date == date.value);

    if (dateInUse.length > 0) {
        alert("Data já cadastrada");
        return false;
    }


    dados.push({
        id: dados.length + 1,
        name: name.value,
        date: date.value,
        amount: amount.value,
    })

    listagem.innerHTML = "";

    dados.forEach((item, index) => {
        listagem.appendChild(criarItem(item, index));
        myModal.hide();
    });

    localStorage.setItem("item", JSON.stringify(dados));

    limparCampos();
}

function criarBotao(item) {
    return `<button class="btn btn-danger" onClick="remover(${item.id})">Remover</button>`;
}

function buscarCard(search) {
    listagem.innerHTML = "";
    let searchType = style_pesquisa.value; // Get selected search type

    dados.forEach((item, index) => {
        if (item[searchType] && item[searchType].toString().includes(search)) {
            listagem.appendChild(criarItem(item, index));
        }
    });
}

function formatDateMonth(date) {
    let inputValue = date;
    let parts = inputValue.split('-');
    let brazilianFormat = parts.reverse().join('/');
    return brazilianFormat;
}



function criarItem(item, index) {


    let html = `
    <td>${item.name}</td>
    <td>${formatDateMonth(item.date)}</td>
    <td>${item.amount}L</td>
    <td>${criarBotao(item)}</td>
    `;


    let tr = document.createElement("tr");
    tr.innerHTML = html;
    return tr;
}

function limparCampos() {
    name.value = "";
    date.value = "";
    amount.value = "";
}

function remover(id) {
    dados = dados.filter((item) => item.id != id);
    listagem.innerHTML = "";

    dados.forEach((item, index) => {
        listagem.appendChild(criarItem(item, index));
    });

    localStorage.setItem("item", JSON.stringify(dados));
}

function aprovar(id) {
    dados = dados.map((item) => {
        if (item.id == id) {
            item.status = "Aprovado";
        }
        return item;
    });
    listagem.innerHTML = "";

    dados.forEach((item, index) => {
        listagem.appendChild(criarItem(item, index));
    });
}
