const yhtPisteetOutput = document.getElementById("yhtPisteet");

const muistiPisteetOutput = document.getElementById("muistiPisteet");
const yksikkomuunnosPisteetOutput = document.getElementById("yksikkoPisteet");
const keittiovalinePisteetOutput = document.getElementById("valinePisteet");
const kaloriPisteetOutput = document.getElementById("kaloriPisteet");
const jarjestysPeliPisteetOutput = document.getElementById("jarjestysPisteet");
const triviaPeliPisteetOutput = document.getElementById("triviaPisteet");
//Lisätkää tähän omien outputtienne referenssit. Id:t näkee pisteet.html. Niitä saa muuttaa omalta kohdaltaan jos haluaa


document.addEventListener("DOMContentLoaded", function () {
    muistiPisteetOutput.textContent = haeTietoSessionStoragesta("muistipelinPisteet") || "--";
    yksikkomuunnosPisteetOutput.textContent = haeTietoSessionStoragesta("yksikkomuunnosPisteet") || "--";
    keittiovalinePisteetOutput.textContent = haeTietoSessionStoragesta("keittiovalinePisteet") || "--";
    yhtPisteetOutput.textContent = laskeYhteispisteet() || "--";
    kaloriPisteetOutput.textContent = haeTietoSessionStoragesta("kaloripeliPisteet") || "--";
    jarjestysPeliPisteetOutput.textContent = haeTietoSessionStoragesta("jarjestysPisteet") || "--";
    triviaPeliPisteetOutput.textContent = haeTietoSessionStoragesta("triviaPisteet") || "--";
});