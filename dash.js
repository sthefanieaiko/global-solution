let dados = JSON.parse(localStorage.getItem("item")) || [];

let consumoAno = document.getElementById("gastoporAno");
let consumoMes = document.getElementById("gastoaoMes");

let consumoAnoTotal = 0;
let consumoMesTotal = 0;

let currentMonth = new Date().getMonth() + 1;
let currentYear = new Date().getFullYear();

dados.forEach((item, index) => {
    let inputValue = item.date;
    let parts = inputValue.split('-');
    if (parts[0] == currentYear) {
        consumoAnoTotal += parseInt(item.amount);
        console.log(currentMonth)
        if (parts[1] == currentMonth) {
            consumoMesTotal += parseInt(item.amount);
        }
    }
});

consumoAno.innerHTML = `${consumoAnoTotal}L`;
consumoMes.innerHTML = `${consumoMesTotal}L`; 