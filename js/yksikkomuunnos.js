const kysymykset = [                                 
    {
        kysymys: "Montako litraa on 100 desilitraa?",
        valinnat: ["1 litraa", "10 litraa", "0.1 litraa", "1 000 litraa"],
        vastaus: "10 litraa",
        ohjeet: "1 litra on 10 desilitraa, joten 100 / 10 = 10 litraa."
    },
    {
        kysymys: "Montako millilitraa on 30 desilitraa?",
        valinnat: ["300 millilitraa", "3 millilitraa", "3 000 millilitraa", "0.03 millilitraa"],
        vastaus: "3 000 millilitraa",
        ohjeet: "1 desilitra on 100 millilitraa, joten 30 * 100 = 3 000 millilitraa."
    },
    {
        kysymys: "Montako litraa on 12000 millilitraa?",
        valinnat: ["12 litraa", "1.2 litraa", "0.12 litraa", "120 litraa"],
        vastaus: "12 litraa",
        ohjeet: "1 litra on 1 000 millilitraa, joten 12 000 / 1000 = 12 litraa."
    },
    {
        kysymys: "Montako kilogrammaa on 700 grammaa?",
        valinnat: ["7 kilogrammaa", "0.7 kilogrammaa", "70 kilogrammaa", "0.07 kilogrammaa"],
        vastaus: "0.7 kilogrammaa",
        ohjeet: "1 000 grammaa on 1 kilogramma, joten 700 / 1 000 = 0.7 kilogrammaa."
    },
    {
        kysymys: "Montako milligrammaa on 50 grammaa?",
        valinnat: ["5 milligrammaa", "5 000 milligrammaa", "500 milligrammaa", "50 000 milligrammaa"],
        vastaus: "50 000 milligrammaa",
        ohjeet: "1 gramma on 1 000 milligrammaa, joten 50 * 1000 = 50 000 milligrammaa."
    },
    {
        kysymys: "Montako milligrammaa on 0.06 kilogrammaa?",
        valinnat: ["600 milligrammaa", "60 milligrammaa", "60 000 milligrammaa", "6 milligrammaa"],
        vastaus: "60 000 milligrammaa",
        ohjeet: "1 kilogramma on 1 000 000 milligrammaa, joten 0.06 * 1 000 000 = 60 000 milligrammaa."
    },
    {
        kysymys: "Montako millilitraa on 1 ruokalusikka",
        valinnat: ["5 milligrammaa", "20 milligrammaa", "3 milligrammaa", "15 milligrammaa"],
        vastaus: "15 milligrammaa",
        ohjeet: "1 ruokalusikka on 15 milligrammaa."
    },
    {
        kysymys: "Montako grammaa on 2.5 kilogrammaa?",
        valinnat: ["250 grammaa", "2 500 grammaa", "25 grammaa", "25 000 grammaa"],
        vastaus: "2 500 grammaa",
        ohjeet: "1 kilogramma on 1000 grammaa, joten 2.5 * 1000 = 2500 grammaa."
    },
    {
        kysymys: "Montako litraa on 2500 millilitraa?",
        valinnat: ["2.5 litraa", "25 litraa", "0.25 litraa", "250 litraa"],
        vastaus: "2.5 litraa",
        ohjeet: "1 litra on 1 000 millilitraa, joten 2500 / 1 000 = 2.5 litraa."
    },
    {
        kysymys: "Montako desilitraa on 0.75 litraa?",
        valinnat: ["7.5 desilitraa", "75 desilitraa", "0.75 desilitraa", "750 desilitraa"],
        vastaus: "7.5 desilitraa",
        ohjeet: "1 litra on 10 desilitraa, joten 0.75 * 10 = 7.5 desilitraa."
    }
    
]   //Lista mikä sisältää kysymykset, vaihtoehdot sekä vastaukset

let kysymysnumero = 0   //Laskuri joka kertoo monesko kysymys on menossa
let oikein = 0     //Laskuri joka laskee oikein saadut kysymykset
let pisteet = 0    //Lopulliset pisteet jotka tallenetaan sessionstorageen

const aloitaPeli = () => {      //Funktio jolla aloitetaan peli//
    document.getElementById("aloitus-ruutu").style.display = "none"     //Vaihtaa näkymäksi aloitusruudun
    document.getElementById("kysymys-ruutu").style.display = "block"    
    kysymysnumero = 0   //Nollaa laskurit, jos halutaan pelata peliä uudestaan
    oikein = 0
    kysymykset.sort(() => Math.random() - 0.5) //Sekoittaa kysymykset satunnaiseen järjestykseen
    paivitaPuhekupla("Noniin nyt aloitetaan! Valitse oikea vastaus!")
    tuoKysymys()
}

const tuoKysymys = () => {      //Funktio joka hakee seuraavan kysymyksen sekä vastausvaihtoehdot
    document.getElementById("seuraava-painike").disabled = true     // Disabloi "seuraava" painikkeen jotta kysymystä ei voi vaihtaa ilman vastausta
    const kysymys = kysymykset[kysymysnumero]   //Hakee kysymyksen listasta, käyttäen kysymyslaskuria apuna
    document.getElementById("kysymys-teksti").innerText = kysymys.kysymys

    const valintaLaatikko = document.getElementById("valinta-laatikko")
    valintaLaatikko.innerHTML = ""

    kysymys.valinnat.forEach(valinta => {       //Luodaan valinnoille painikkeet
        const painike = document.createElement("button")
        painike.innerText = valinta
        painike.classList.add("valinta-painike")
        painike.onclick = () => valitseVastaus(painike, valinta)
        valintaLaatikko.appendChild(painike)
    })
    paivitaPuhekupla("Valitse oikea vaihtoehto!")
}

const valitseVastaus = (painike, valittuValinta) => {       //Tällä funktiolla käyttäjä valitsee vastauksen, tarkastaa ja päivittää käyttöliittymän sekä pelitilan sen mukaisesti
    const oikeaVastaus = kysymykset[kysymysnumero].vastaus  //Hakee oikean vastauksen listasta
    const ohjeet = kysymykset[kysymysnumero].ohjeet         //Hakee oikeat ohjeet listasta
    const palauteLaatikko = document.getElementById("palaute-laatikko")
    const ohjeetLaatikko = document.getElementById("ohjeet-laatikko")

    if (valittuValinta === oikeaVastaus) {      //Tarkastaa vastauksen, antaa pisteen jos vastaus on oikein. Vaihtaa painikkeen väriä sen mukaan onko vastaus oikein vai väärin.
        oikein++
        painike.style.backgroundColor = "lightgreen"
        palauteLaatikko.innerText = "Oikein!"
        paivitaPuhekupla("Hienoa! Oikein meni!")
    } else {
        painike.style.backgroundColor = "lightcoral"
        palauteLaatikko.innerText = `Väärin! Oikea vastaus on: ${oikeaVastaus}.`    //Kertoo oikean vastauksen jos vastaa väärin
        paivitaPuhekupla("Voi ei, väärin meni. Ei hätää, katso ohjeet miten tehtävä lasketaan")
        ohjeetLaatikko.innerText = `${ohjeet}`  //Kertoo ohjeet kuinka oikea vastaus lasketaan.
    }

    document.querySelectorAll(".valinta-painike").forEach(painike1 => painike1.disabled = true) //Valinnan jälkeen disabloi muiden vaihtoehtojen painikkeet
    document.getElementById("seuraava-painike").disabled = false    //Aktivoi "seuraava" painikkeen
}

const seuraavaKysymys = () => {     //Funktio joka kutsuu tuoKysymys funktiota jos kysymyksiä on vielä jäljellä. Jos ei niin kutsuu lopetaPeli funktiota.
    kysymysnumero++         //Lisää kysymyslaskuriin yhden numeron
    const palauteLaatikko = document.getElementById("palaute-laatikko")
    const ohjeetLaatikko = document.getElementById("ohjeet-laatikko")
    palauteLaatikko.innerText = ""  //Tyhjentää palautelaatikon ennen seuraavaa kysymystä
    ohjeetLaatikko.innerText = ""   //Tyhjentää ohjelaatikon ennen seuraavaa kysymystä

    if (kysymysnumero < kysymykset.length) {        //Tarkastaa onko kysymyksiä vielä jäljellä
        tuoKysymys()
    } else {
        lopetaPeli()
    }
}

const lopetaPeli = () => {  
    document.getElementById("kysymys-ruutu").style.display = "none"
    document.getElementById("tulos-ruutu").style.display = "block"
    pisteet = oikein*2 // Määrittää lopulliset pisteet

    let tulosteksti = ""

    if (pisteet >= 16) {                //Tulostaa tulos-tekstin pelaajan suorituksen mukaan
        tulosteksti = `Uskomatonta! Sait ${oikein} / ${kysymykset.length} oikein! Olet mestari!`
        paivitaPuhekupla("Olet todellinen mestari!")

    } else if (pisteet >= 10) {
        tulosteksti = `Hyvin tehty! Sait ${oikein} / ${kysymykset.length} oikein. Harjoittelemalla voit parantaa vielä enemmän.`
        paivitaPuhekupla("Hienoa työtä, jatka harjoittelua!")
    } else {
        tulosteksti = `Voi ei! Sait ${oikein} / ${kysymykset.length} oikein. Ei hätää, harjoittelu tekee mestarin! Kokeile uudelleen ja paranna tulostasi.`
        paivitaPuhekupla("Ei hätää, harjoittelu auttaa!"); 
    }

    document.getElementById("tulos-teksti").innerText = tulosteksti
    tallennaSessionStorageen("yksikkomuunnosPisteet", pisteet) // Tallentaa pisteet session storageen funktion avulla joka löytyy shared.js
}

const resetoiPeli = () => {     //Funktio jolla voidaan aloittaa peli uudestaan.
    document.getElementById("tulos-ruutu").style.display = "none"   //Piilottaa tulosruudun
    document.getElementById("aloitus-ruutu").style.display = "block"    //Näyttää aloitusruudun
}

const paivitaPuhekupla = (teksti) => {
    document.getElementById("tekstikupla").innerText = teksti
}
