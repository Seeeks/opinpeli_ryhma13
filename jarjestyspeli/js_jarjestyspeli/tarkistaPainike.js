
const tarkista = () =>{
   //https://www.w3schools.com/js/js_htmldom_nodes.asp//
/*
    const tarkistus = document.createElement("div");
    tarkistus.classList.add("peliruutu");
    tarkistus.id = "tarkistus";
    const sisus = document.createTextNode("tarkistus")
    tarkistus.append(sisus);


    const peli= pelinTarkistus();

    /*Kirjasta Clean code in Javascript */
   /* const ul = document.createElement('ul');
    ul.id = "tarkistus_lista";

    peli.forEach(item => {

        const li =ul.appendChild(document.createElement('li'));
        const tarkistus = li.appendChild(document.createElement("div"));
        tarkistus.classList.add("tarkista_oikea")
        tarkistus.id = "tarkista_oikea"
        tarkistus.textContent = item;

    });
    tarkistus.append(ul);

    document.getElementById("pelin_hallinta").appendChild(tarkistus);*/
    document.getElementById("peli_tarkista").disabled = true;
    document.getElementById("peli_hallitse").disabled = false;

    tarkistaja();
}

function pelinTarkistus() {
    
    if (document.getElementById('mika_peli').innerHTML.substring(0, 9)=='Kierros 1'){
        return ["a","b","c","d"]    
        }

    if (document.getElementById('mika_peli').innerHTML.substring(0, 9)=='Kierros 2') {
        return ["a","b","c","d","e","f"]
        } 
}

function tarkistaja () {
    /*Haetaan pelaan vastaus listana*/
    let pelaajan_vastaus_ul = document.getElementById("pelaajan_lista");
    let pelaajan_vastaus = pelaajan_vastaus_ul.querySelectorAll(".pelaajan_vastaus");
    let pelaajan_vastaus_lista = [];

    console.log(pelaajan_vastaus);
    
    pelaajan_vastaus.forEach(item => {
        console.log(item.innerHTML);
        pelaajan_vastaus_lista.push(item.innerHTML);
    });
    
    /*Tarkistetaan vastaako lista oikeaa*/
    
    let peli = pelinTarkistus();

    const tarkistus = document.createElement("div");
    tarkistus.classList.add("peliruutu");
    tarkistus.id = "tarkistus";
    const sisus = document.createTextNode("tarkistus")
    tarkistus.append(sisus);

    const ul = document.createElement('ul');
    ul.id = "tarkistus_lista";
    
    let indeksi = 0;

    peli.forEach(item => {

        const li =ul.appendChild(document.createElement('li'));
        const tarkistus = li.appendChild(document.createElement("div"));
        tarkistus.classList.add("tarkista_oikea")
        tarkistus.id = "tarkista_oikea"
        tarkistus.textContent = item;
        if(item == pelaajan_vastaus_lista[indeksi]) {
            tarkistus.style.backgroundColor = "green";
        }
        else {
            tarkistus.style.backgroundColor = "red";
        }
        indeksi++;
    });
    tarkistus.append(ul);

    document.getElementById("pelin_hallinta").appendChild(tarkistus);
}