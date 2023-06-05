let dados = JSON.parse(localStorage.getItem("item")) || [];

let gastoaoano = document.getElementById("GastoAnual");
let gastopormes = document.getElementById("GastoMensal");

let gastoaoanoTotal = 0;
let gastopormesTotal = 0;

let mesAtual = new Date().getMonth() + 1;
let anoAtual = new Date().getFullYear();

dados.forEach((item, index) => {
    let valorInput = item.date;
    let partes = valorInput.split('-');
    if (partes[0] == anoAtual) {
        gastoaoanoTotal += parseInt(item.amount);
        console.log(mesAtual)
        if (partes[1] == mesAtual) {
            gastopormesTotal += parseInt(item.amount);
        }
    }
});

gastoaoano.innerHTML = `Gasto Anual Total: ${gastoaoanoTotal}L`;
gastopormes.innerHTML = `Gasto Mensal Total: ${gastopormesTotal}L`;