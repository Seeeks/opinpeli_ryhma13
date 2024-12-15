let kierros = 1;
//https://stackoverflow.com/questions/20325763/browser-sessionstorage-share-between-tabs

const uusipeli = () => {
    
    if(kierros <= 2) {
    let peli= pelinKasittely(kierros);
    

    /*Kirjasta Clean code in Javascript */
    const ul = document.createElement('ul');
    ul.id = "pelaajan_lista";

    document.getElementById('peliruutu').append(ul);
    let erottaja = 1;

    peli.forEach(item => {

        const li =ul.appendChild(document.createElement('li'));
        const tarkistus = li.appendChild(document.createElement("div"));
        tarkistus.classList.add("pelaajan_vastaus_div")

        const pala = tarkistus.appendChild(document.createElement("div"));
        pala.classList.add("pelaajan_vastaus");
        pala.textContent = item;

        //https://www.w3schools.com/howto/howto_js_cascading_dropdown.asp
        const alasveto = tarkistus.appendChild(document.createElement("div"));
        const valittavat = alasveto.appendChild(document.createElement("select"));
        valittavat.id = "select"+erottaja;
        let arvo = valittavat.appendChild(document.createElement("option"));
        arvo.textContent = "1";
        arvo = valittavat.appendChild(document.createElement("option"));
        arvo.textContent = "2";
        arvo = valittavat.appendChild(document.createElement("option"));
        arvo.textContent = "3";
        arvo = valittavat.appendChild(document.createElement("option"));
        arvo.textContent = "4";
        if (kierros > 1){
            arvo = valittavat.appendChild(document.createElement("option"));
            arvo.textContent = "5";
            arvo = valittavat.appendChild(document.createElement("option"));
            arvo.textContent = "6";
        }
        arvo = valittavat.appendChild(document.createElement("option"));
        arvo.selected = "selected";
        arvo.textContent = "Valitse";
        erottaja++;
    });
    document.getElementById("peli_hallitse").disabled = true;
    document.getElementById("peli_hallitse").innerHTML = "Pelaa, kierros 2"
    document.getElementById("peli_tarkista").disabled = false;
    }

    kierros ++;
    
    if(kierros == 3) {
        document.getElementById("peli_hallitse").innerHTML = "Uusipeli";
    }
    
    if(kierros == 4) {
        document.getElementById("peli_hallitse").innerHTML = "Pelaa, kierros 1";
        document.getElementById("jarjestyspuhekupla").innerHTML ="Voi minua nakkisormea! Laitoin vahingossa reseptit pesukoneeseen kokkiveitsien kanssa ja reseptit pilkkoutuivat uudelleen"
        piilotaTarkistus();
        kierros = 1;
    }
    
}

function tallennaPisteet() {
   console.log("tallenna");
}


function piilotaTarkistus() {
    document.getElementById("tarkistus").remove();
    document.getElementById("pelaajan_lista").remove();
}

function pelinKasittely(luku) {
    if (luku ==1) {
        
        let arvo = 0;
        do {
            arvo = Math.random()*10
        }
        while (arvo < 1|| arvo > 3);

        arvo = arvo.toFixed(0);
        document.getElementById('mika_peli').innerHTML= "Kierros 1, Peli "+arvo;
        
        switch (parseInt(arvo)) {
            case 1:
                return ["a","b","c","d"]
            break;
        
            case 2:
                return ["b","b","c","a"]
            break;
        
            case 3:
                return ["a","d","a","b"]
            break;      

        }
    }

    if (luku ==2) {

        piilotaTarkistus()

        let arvo = 0;
        do {
            arvo = Math.random()*10
        }
        while (arvo < 1 || arvo > 3);

        arvo = arvo.toFixed(0);
        document.getElementById('mika_peli').innerHTML= "Kierros 2, Peli "+arvo;
        
        switch (parseInt(arvo)) {
            case 1:
                return ["a","b","c","d","e","f"]
            break;
        
            case 2:
                return ["b","c","d","e","f","a"]
            break;
        
            case 3:
                return ["c","d","e","f","a","b"]
            break;      

        } 
        return ["a"]
    }

}
