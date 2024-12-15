
const tarkista = () =>{
   //https://www.w3schools.com/js/js_htmldom_nodes.asp//
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
    
    let pelaajan_vastaus = document.querySelectorAll("select");
    let pelaajan_vastaus_lista = [];
   
    pelaajan_vastaus.forEach(item => {
        pelaajan_vastaus_lista.push(item.value);
    });
    
    let pelaajan_vastaus_teksti = document.querySelectorAll(".pelaajan_vastaus");
    let pelaajan_teksti_lista = [];

    pelaajan_vastaus_teksti.forEach(item => {
        pelaajan_teksti_lista.push(item.innerHTML);
    });

    //toimii tähän asti

    /*Tarkistetaan vastaako lista oikeaa*/
    
    let peli = pelinTarkistus();

    const tarkistus = document.createElement("div");
    tarkistus.classList.add("peliruutu");
    tarkistus.id = "tarkistus";
    const sisus = document.createTextNode("tarkistus")
    tarkistus.append(sisus);

    const ul = document.createElement('ul');
    ul.id = "tarkistus_lista";
    
    /*tästä eteenpäin tarkistus */
    let indeksi = 0;

    peli.forEach(item => {

        const li =ul.appendChild(document.createElement('li'));
        const tarkistus = li.appendChild(document.createElement("div"));
        tarkistus.classList.add("tarkista_oikea")
        tarkistus.id = "tarkista_oikea"
        tarkistus.textContent = item;
        

        pelaajan_teksti_lista.forEach(item2 => {
           
            if (item2 == tarkistus.textContent){
                let teksti_indeksi = pelaajan_teksti_lista.indexOf(item2);
                let vastaus_indeksi = pelaajan_vastaus_lista[teksti_indeksi];

                console.log(indeksi);
                console.log(vastaus_indeksi);

                if(indeksi == vastaus_indeksi-1) {
                    tarkistus.style.backgroundColor = "green";
                }
                else {
                    tarkistus.style.backgroundColor = "red";
                }
            }
        });

        indeksi++;
    });
    tarkistus.append(ul);

    document.getElementById("pelin_hallinta").appendChild(tarkistus);
}

