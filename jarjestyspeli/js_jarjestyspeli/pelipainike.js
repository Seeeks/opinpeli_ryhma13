let kierros = 1;


const uusipeli = () => {
    
    
    let peli= pelinKasittely(kierros);
    kierros ++;

    /*Kirjasta Clean code in Javascript */
    const ul = document.createElement('ul');
    ul.id = "pelaajan_lista";

    peli.forEach(item => {

        const li =ul.appendChild(document.createElement('li'));
        const tarkistus = li.appendChild(document.createElement("div"));
        tarkistus.classList.add("pelaajan_vastaus")
        tarkistus.id = "pelaajan_vastaus"
        tarkistus.textContent = item;

    });
    
    document.getElementById('peliruutu').append(ul);

    document.getElementById("peli_hallitse").disabled = true;
    document.getElementById("peli_hallitse").innerHTML = "Pelaa, kierros 2"
    document.getElementById("peli_tarkista").disabled = false;

}

function piilotaTarkistus() {
    document.getElementById("tarkistus").remove();
    document.getElementById("pelaajan_lista").remove();
}

function pelinKasittely(luku) {
    console.log("aaa")
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