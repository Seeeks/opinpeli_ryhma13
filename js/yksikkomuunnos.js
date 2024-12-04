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
        ohjeet: "1 desilitra on 100 millilitraa, joten 30 desilitraa on 30 * 100 = 3 000 millilitraa."
    },
    {
        kysymys: "Montako litraa on 12000 millilitraa?",
        valinnat: ["12 litraa", "1.2 litraa", "0.12 litraa", "120 litraa"],
        vastaus: "12 litraa",
        ohjeet: "1 litra on 1 000 millilitraa, joten 12 000 millilitraa on 12 000 / 1000 = 12 litraa."
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
        valinnat: ["600 milligrammaa", "60 milligrammaa", "60000 milligrammaa", "6 milligrammaa"],
        vastaus: "60000 milligrammaa",
        ohjeet: "1 kilogramma on 1 000 000 milligrammaa. Joten 0.06 kilogrammaa on 0.06 * 1 000 000 = 60 000 milligrammaa."
    },
    {
        kysymys: "Montako millilitraa on 1 ruokalusikka",
        valinnat: ["5 milligrammaa", "20 milligrammaa", "3 milligrammaa", "15 milligrammaa"],
        vastaus: "15 milligrammaa",
        ohjeet: "1 ruokalusikka on 15 milligrammaa."
    }
]   //Lista mikä sisältää kysymykset, vaihtoehdot sekä vastaukset//

let kysymysnumero = 0   //Laskuri joka kertoo monesko kysymys on menossa//
let pisteet = 0     //Laskuri joka laskee saadut pisteet//

const aloitaPeli = () => {      //Funktio jolla aloitetaan peli//
    document.getElementById("aloitus-ruutu").style.display = "none"     //Vaihtaa näkymäksi aloitusruudun//
    document.getElementById("kysymys-ruutu").style.display = "block"    
    kysymysnumero = 0   //Nollaa laskurit, jos halutaan pelata peliä uudestaan//
    pisteet = 0
    tuoKysymys()
}

const tuoKysymys = () => {      //Funktio joka hakee seuraavan kysymyksen sekä vastausvaihtoehdot
    document.getElementById("seuraava-painike").disabled = true     // Disabloi "seuraava" painikkeen jotta kysymystä ei voi vaihtaa ilman vastausta
    const kysymys = kysymykset[kysymysnumero]   //Hakee kysymyksen listasta, käyttäen kysymyslaskuria apuna
    document.getElementById("kysymys-teksti").innerText = kysymys.kysymys

    const valintaLaatikko = document.getElementById("valinta-laatikko")
    valintaLaatikko.innerHTML = ""

    kysymys.valinnat.forEach(valinta => {       //Luodaan valinnoille painikkeet//
        const painike = document.createElement("button")
        painike.innerText = valinta
        painike.classList.add("valinta-painike")
        painike.onclick = () => valitseVastaus(painike, valinta)
        valintaLaatikko.appendChild(painike)
    })
}

const valitseVastaus = (painike, valittuValinta) => {       //Tällä funktiolla käyttäjä valitsee vastauksen, tarkastaa ja päivittää käyttöliittymän sekä pelitilan sen mukaisesti
    const oikeaVastaus = kysymykset[kysymysnumero].vastaus  //Hakee oikean vastauksen listasta
    const ohjeet = kysymykset[kysymysnumero].ohjeet         //Hakee oikeat ohjeet listasta
    const palauteLaatikko = document.getElementById("palaute-laatikko")
    const ohjeetLaatikko = document.getElementById("ohjeet-laatikko")

    if (valittuValinta === oikeaVastaus) {      //Tarkastaa vastauksen, antaa pisteen jos vastaus on oikein. Vaihtaa painikkeen väriä sen mukaan onko vastaus oikein vai väärin.
        pisteet++
        painike.style.backgroundColor = "lightgreen"
        palauteLaatikko.innerText = "Oikein!"
    } else {
        painike.style.backgroundColor = "lightcoral"
        palauteLaatikko.innerText = `Väärin! Oikea vastaus on: ${oikeaVastaus}.`    //Kertoo oikean vastauksen jos vastaa väärin
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

const lopetaPeli = () => {  //Funktio jolla lopetetaan peli, ja siirrytään tulosruutuun.
    document.getElementById("kysymys-ruutu").style.display = "none" //Piilottaa kysymysruudun
    document.getElementById("tulos-ruutu").style.display = "block"  //Näyttää tulosruudun
    document.getElementById("tulos-teksti").innerText = `Sait ${pisteet} / ${kysymykset.length} oikein!` //Päivittää tulostekstin sen mukaan kuinka moneen käyttäjä on vastannut oikein.
}

const resetoiPeli = () => {     //Funktio jolla voidaan aloittaa peli uudestaan.
    document.getElementById("tulos-ruutu").style.display = "none"   //Piilottaa tulosruudun
    document.getElementById("aloitus-ruutu").style.display = "block"    //Näyttää aloitusruudun
}
