let kierros = 1;
//https://stackoverflow.com/questions/20325763/browser-sessionstorage-share-between-tabs

const uusipeli = () => {
    
    if(kierros <= 2) {
    let peli= pelinKasittely(kierros);
    
        
    /*
    Kirjasta Clean code in Javascript -> erinomainen teos
    sieltä sai keinon tuohon kuinka luupata asiat lista näkyviin
    */
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
        //Dropdown sovellettu sivun ohjeen mukaan.
        //ID haasteiden ja listan hallinnan takia ei kannattanut toteuttaa erillisenä funktiona, vaikka niin olisi selkeämpi
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
    //Funktioiden lopussa painikkeiden hallintaa
    document.getElementById("peli_hallitse").disabled = true;
    document.getElementById("peli_hallitse").innerHTML = "Pelaa, kierros 2"
    document.getElementById("peli_tarkista").disabled = false;
    }

    kierros ++;
    
    //kierroksia kaksi, joten kolmas voi aloittaa uuden
    if(kierros == 3) {
        document.getElementById("peli_hallitse").innerHTML = "Uusipeli";
    }
    
    //varsinainen uusi kierros alkaa tästä
    if(kierros == 4) {
        document.getElementById("peli_hallitse").innerHTML = "Pelaa, kierros 1";
        document.getElementById("jarjestyspuhekupla").innerHTML ="Voi minua nakkisormea! Laitoin vahingossa reseptit pesukoneeseen kokkiveitsien kanssa ja reseptit pilkkoutuivat uudelleen"
        piilotaTarkistus();
        kierros = 1;
    }
    
}
//tarkistus piilotetaan tällä funktiolla, tai paremminkin poistetaan
function piilotaTarkistus() {
    document.getElementById("tarkistus").remove();
    document.getElementById("pelaajan_lista").remove();
}

//Tällä arvotaan mikä peli tulee. Hieman satunaistamista randomilla
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
                return [
                    "Kuori ja pilko perunat",
                    "Laita vesi kiehumaan",
                    "Laita perunat kiehuvaan veteen ja keitä kypsäksi",
                    "Kaada vesi pois ja kaada tilalle sama määrä maitoa, lämmitä mutta älä keitä!"
                ];
            break;
        
            case 2:
                return [
                    "Kaada vesi pois ja kaada tilalle sama määrä maitoa, lämmitä mutta älä keitä!",
                    "Kuori ja pilko perunat",
                    "Laita perunat kiehuvaan veteen ja keitä kypsäksi",
                    "Laita vesi kiehumaan",
                ];
            break;
        
            case 3:
                return [
                    "Laita vesi kiehumaan",
                    "Kaada vesi pois ja kaada tilalle sama määrä maitoa, lämmitä mutta älä keitä!",
                    "Kuori ja pilko perunat",
                    "Laita perunat kiehuvaan veteen ja keitä kypsäksi"
                ];
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
                return [
                    "Tee ruistaikina vedestä, suolasta ja ruisjauhoista. Paremman sitkon leivontaa ajatellen saat, kun laitat taikinaan alkuvaiheessa pari desiä vehnäjauhoja",
                    "Ota kukko uunista, voitele halutessa kuorta voilla. Kääri kalakukko folioon ja laske uunin lämpötila noin  150- asteeseen. Paista noin 6 tuntia",
                    "Laita pellille kukko/ leivinpaperi ja foliot johon kukko kääritään. Paista kukkoa uunissa kunnes kuoreen tulee ruskeita laikkuja",
                    "Laita uuni lämpiämään 225-asteeseen. Kauli taikinasta niin suuri levy, että saat muotoiltua siitä koko kalakukon",
                    "Arvioi kalakukon pohjan koko. Laita riisiä/ohrasuurimoja/makaronia koko pohja alueelle. Lado kala (ja liha jos käytät) kerroksiin maustaen kerrokset suolalla.",
                    "Käännä taikina kalakukon päälle ja tilkitse kuoren aukot ja kolot taikinalla"
                ]
            break;
        
            case 2:
                return [
                    "Käännä taikina kalakukon päälle ja tilkitse kuoren aukot ja kolot taikinalla",
                    "Laita pellille kukko/ leivinpaperi ja foliot johon kukko kääritään. Paista kukkoa uunissa kunnes kuoreen tulee ruskeita laikkuja",
                    "Laita uuni lämpiämään 225-asteeseen. Kauli taikinasta niin suuri levy, että saat muotoiltua siitä koko kalakukon",
                    "Arvioi kalakukon pohjan koko. Laita riisiä/ohrasuurimoja/makaronia koko pohja alueelle. Lado kala (ja liha jos käytät) kerroksiin maustaen kerrokset suolalla.",
                    "Ota kukko uunista, voitele halutessa kuorta voilla. Kääri kalakukko folioon ja laske uunin lämpötila noin  150- asteeseen. Paista noin 6 tuntia",
                    "Tee ruistaikina vedestä, suolasta ja ruisjauhoista. Paremman sitkon leivontaa ajatellen saat, kun laitat taikinaan alkuvaiheessa pari desiä vehnäjauhoja"
                    
                ]
            break;
        
            case 3:
                return [
                    "Ota kukko uunista, voitele halutessa kuorta voilla. Kääri kalakukko folioon ja laske uunin lämpötila noin  150- asteeseen. Paista noin 6 tuntia",
                    "Arvioi kalakukon pohjan koko. Laita riisiä/ohrasuurimoja/makaronia koko pohja alueelle. Lado kala (ja liha jos käytät) kerroksiin maustaen kerrokset suolalla.",
                    "Käännä taikina kalakukon päälle ja tilkitse kuoren aukot ja kolot taikinalla",
                    "Tee ruistaikina vedestä, suolasta ja ruisjauhoista. Paremman sitkon leivontaa ajatellen saat, kun laitat taikinaan alkuvaiheessa pari desiä vehnäjauhoja",
                    "Laita uuni lämpiämään 225-asteeseen. Kauli taikinasta niin suuri levy, että saat muotoiltua siitä koko kalakukon",
                    "Laita pellille kukko/ leivinpaperi ja foliot johon kukko kääritään. Paista kukkoa uunissa kunnes kuoreen tulee ruskeita laikkuja"
                ]
            break;      

        } 
        return ["a"]
    }

}
