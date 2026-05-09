let currencyFirst = document.querySelector("#currency-first");
let currencySecond = document.querySelector("#currency-second");
let worthFirst = document.querySelector("#worth-first");
let worthSecond = document.querySelector("#worth-second");
let exchange = document.querySelector("#exchange-rate");

currencyFirst.value = sessionStorage.getItem("currencyFirst") || "USD";
currencySecond.value = sessionStorage.getItem("currencySecond") || "EGP";
worthFirst.value = sessionStorage.getItem("worthFirst") || "1";

GetTheApi()
// Creat function for get the exchange rate from real api
function GetTheApi() {
    fetch(
        `https://v6.exchangerate-api.com/v6/5722fa311f1a8b7938289e7a/latest/${currencyFirst.value}`,
    )
    .then((res) => res.json())
    .then((myCurrencies) => {
        let myExchange = myCurrencies.conversion_rates[currencySecond.value];
        exchange.innerHTML = `1 ${currencyFirst.value} = ${myExchange.toFixed(2) + " " + currencySecond.value} `;
        worthSecond.value = `${(worthFirst.value * myExchange).toFixed(2)}`
    });

    sessionStorage.setItem("currencyFirst", currencyFirst.value);
    sessionStorage.setItem("currencySecond", currencySecond.value);
    sessionStorage.setItem("worthFirst", worthFirst.value);
}

currencyFirst.addEventListener("change", GetTheApi);
currencySecond.addEventListener("change", GetTheApi);
worthFirst.addEventListener("input", GetTheApi);
