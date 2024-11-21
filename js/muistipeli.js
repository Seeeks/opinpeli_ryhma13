const ilona_canvas = document.getElementById("ilona_canvas");
const ctx = ilona_canvas.getContext("2d");
const muistipeli = document.getElementById("muistipeli");
const lisaaAikaa = document.getElementById("lisaaAikaa");
const tarkista = document.getElementById("tarkista");
const aloitaAlusta = document.getElementById("aloitaAlusta");
const infokupla = document.getElementById("infokupla");
let timer;//tätä ei määritellä alussa
let animationId = null
const ostos_vaihtoehdot = [
    {txt: "kevytmaito", img: "kevytmaito.png"},
    {txt: "banaanit", img: "banaani.png"},
    {txt: "folio", img: "folio.png"},
    {txt: "ilmapallot", img: "ilmapallot.png"},
    {txt: "jogurtti", img: "jogurtti.png"},
    {txt: "juustoraaste", img: "juustoraaste.png"},
    {txt: "kanan jauheliha", img: "kanan_jauheliha.png"},
    {txt: "kaurakerma", img: "kaurakerma.png"},
    {txt: "kauramaito", img: "kauramaito.png"},
    {txt: "kuohukerma", img: "kuohukerma.png"},
    {txt: "kurkku", img: "kurkku.png"},
    {txt: "laktoositon maito", img: "laktoositon_maito.png"},
    {txt: "leivinpaperi", img: "leivinpaperi.png"},
    {txt: "makkara", img: "makkara.png"},
    {txt: "munat", img: "munat.png"},
    {txt: "nakit", img: "nakit.png"},
    {txt: "naudan jauheliha", img: "naudan_jauheliha.png"},
    {txt: "omenat", img: "omena.png"},
    {txt: "raejuusto", img: "raejuusto.png"},
    {txt: "rasvaton maito", img: "rasvaton_maito.png"},
    {txt: "ruokakerma", img: "ruokakerma.png"},
    {txt: "ruokaöljy", img: "ruokaoljy.png"},
    {txt: "sokeri", img: "sokeri.png"},
    {txt: "suklaa", img: "suklaa.png"},
    {txt: "suola", img: "suola.png"},
    {txt: "tomaatit", img: "tomaatti.png"},
    {txt: "vegaanijuusto", img: "vegaanijuusto.png"},
    {txt: "vispikerma", img: "vispikerma.png"},
    {txt: "voi", img: "voi.png"}
]
let pystysuuntainenvenytys = 1
let muistilista;
let koko_lista;
var aikaa_jaljella = 20
const arvottava_koko = 8
const kokonaiskoko = 20
const maksimipisteet = 20
let tarkistuksia = 0

ctx.font = "16px Arial"
ctx.fillStyle = "#052b69"

function naytaTekstiNormaalisti() {
    ctx.save()
    ctx.font = "18px OpenDyslexic"
    ctx.fillStyle = "#052b69"
    ctx.scale(1, 1)
    muistilista.forEach((rivi, index) => {
        ctx.fillText(rivi.txt, 20, (index + 1) * 20 + 20)
    })
    ctx.restore()
}

function valutaTeksti() {
    ctx.clearRect(0, 0, ilona_canvas.width, ilona_canvas.height)
    ctx.save()
    
    ctx.scale(1, pystysuuntainenvenytys)

    muistilista.forEach((rivi, index) => {
        ctx.fillText(rivi.txt, 20, (index + 1) * 18)
    })

    pystysuuntainenvenytys = pystysuuntainenvenytys + 0.01

    ctx.restore()
    animationId = window.requestAnimationFrame(valutaTeksti)
}

function lopetaValutus() {
    if (animationId) {
        window.cancelAnimationFrame(animationId)
        animationId = null
    }
}

function naytaCountdown(i) {
    ctx.clearRect(0, 0, ilona_canvas.width, ilona_canvas.height)
    ctx.save()
    ctx.font = "30px Arial"
    ctx.fillStyle = "#052b69"
    ctx.fillText(i, ilona_canvas.width - 50, 40)

    naytaTekstiNormaalisti()

    ctx.restore()
}

function kaynnista() {
    muistilista = arvoMuistilista()
    
    aikaa_jaljella = 20

    lisaaAikaa.classList.remove("d-none")

    naytaCountdown(aikaa_jaljella)//tämä kutsuu myös näytä teksti normaalisti

    if (timer) {
        clearInterval(timer)
    }

    timer = setInterval(() => {
        
        aikaa_jaljella--
        naytaCountdown(aikaa_jaljella)
        if (aikaa_jaljella < 0) {
            clearInterval(timer)
            lisaaAikaa.classList.add("d-none")
            window.requestAnimationFrame(valutaTeksti)
            lisaaPelikortit()
        }
    }, 1000)

    aloitaAlusta.textContent = "Aloita alusta"
}

function lisaaPelikortit() {
    for (let i = 0; i < kokonaiskoko; i++) {
        const rivi = koko_lista[i]
        const div = document.createElement("div")
        div.classList.add("pelikortti")
        const span = document.createElement("span")
        span.textContent = rivi.txt
        const kuva = document.createElement("img")
        kuva.src = "./kuvat/" + rivi.img
        div.appendChild(span)
        div.appendChild(kuva)
        muistipeli.appendChild(div)
        div.addEventListener("click", kortinKlikkaus)
    }

    displayStatus()
}

function kortinKlikkaus() {
    this.classList.toggle("fokusoitu")
    if (this.classList.contains("fokusoitu")) {
        const flexrow = document.createElement("div")
        flexrow.classList.add("flex-row", "nappula-container", "justify-content-center")
        const nappula_on = document.createElement("button")
        const nappula_ei = document.createElement("button")
        nappula_on.textContent = "On"
        nappula_ei.textContent = "Ei"
        nappula_on.classList.add("btn", "btn-primary")
        nappula_ei.classList.add("btn", "btn-danger")
        this.appendChild(flexrow)
        flexrow.appendChild(nappula_on)
        flexrow.appendChild(nappula_ei)
        nappula_on.addEventListener("click", (e) => {
            this.classList.remove("fokusoitu")
            this.classList.remove("ei-listalla")
            this.classList.add("on-listalla")
            e.stopPropagation()

            const parentDiv = nappula_on.parentNode
            parentDiv.remove()

            displayStatus()
        })
        nappula_ei.addEventListener("click", (e) => {
            this.classList.remove("fokusoitu")
            this.classList.remove("on-listalla")
            this.classList.add("ei-listalla")
            e.stopPropagation()

            const parentDiv = nappula_ei.parentNode
            parentDiv.remove()

            displayStatus()
        })

        const kaikkiPelikortit = muistipeli.querySelectorAll(".pelikortti")
        for (let i = 0; i < kaikkiPelikortit.length; i++) {
            if (kaikkiPelikortit[i] !== this) {
                kaikkiPelikortit[i].classList.remove("fokusoitu")
                const row = kaikkiPelikortit[i].querySelector(".nappula-container")
                if (row) kaikkiPelikortit[i].removeChild(row)
            }
        }
    }
    else {
        const row = this.querySelector(".nappula-container")
        this.removeChild(row)
    }
}

function displayStatus() {
    const lajiteltu = korttejaLajiteltu()
    if (lajiteltu===koko_lista.length) {
        tarkista.classList.remove("disabled")
    }

    const statusDisplay = document.getElementById("statusDisplay")
    statusDisplay.textContent = `Korteista lajiteltu: ${lajiteltu}/${koko_lista.length}`
}

function arvoMuistilista() {
    //Valitaan 10 satunnaista vaihtoehtoa listalta
    //Lähde: https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
    const satunnaistettuLista = ostos_vaihtoehdot.sort(() => 0.5 - Math.random())
    koko_lista = satunnaistettuLista.slice(0, kokonaiskoko)//Tämä sisältää myös vääriä vaihtoehtoja
    koko_lista = koko_lista.sort(() => 0.5 - Math.random())//Satunnaistetaan uudelleen
    return satunnaistettuLista.slice(0, arvottava_koko)//palautetaan 8 kohdan ostoslista
}

function korttejaLajiteltu() {
    const kortit = muistipeli.querySelectorAll(".pelikortti")
    let lajiteltuLaskuri = 0
    for (let i = 0; i < kortit.length; i++) {
        if (kortit[i].classList.contains("on-listalla") || kortit[i].classList.contains("ei-listalla")) {
            lajiteltuLaskuri++
        }
    }
    return lajiteltuLaskuri
}

function tarkistaKortit() {
    const merkitty_on_listalla = muistipeli.querySelectorAll(".on-listalla")
    const merkitty_ei_listalla = muistipeli.querySelectorAll(".ei-listalla")
    const on_listalla_koko = merkitty_on_listalla.length
    const ei_listalla_koko = merkitty_ei_listalla.length
    let oikeita = 0
    let vaaria = 0

    for (let i = 0; i < on_listalla_koko; i++) {
        const kortti = merkitty_on_listalla[i]
        const span = kortti.querySelector("span")
        const teksti = span.textContent
        //some metodi on saatu tekoälyltä korvaamaan includes metodin kun array muutettiin käyttämään sisäisiä objekteja plaintekstin sijaan.
        if (muistilista.some(item => item.txt === teksti)) {
            oikeita ++
        }
        else {
            vaaria++
        }
    }

    for (let i = 0; i < ei_listalla_koko; i++) {
        const kortti = merkitty_ei_listalla[i]
        const span = kortti.querySelector("span")
        const teksti = span.textContent
        if (muistilista.some(item => item.txt === teksti)) {
            vaaria++
        }
        else {
            oikeita++
        }
    }

    return {
        oikeita: oikeita,
        vaaria: vaaria
    }
}


lisaaAikaa.addEventListener("click", () => {
    if (aikaa_jaljella > 0) {
        clearInterval(timer)
        aikaa_jaljella = 20
        naytaCountdown(aikaa_jaljella)
        timer = setInterval(() => {
            aikaa_jaljella--
            naytaCountdown(aikaa_jaljella)

            if (aikaa_jaljella < 0) {
                clearInterval(timer)
                lisaaAikaa.classList.add("d-none")
                window.requestAnimationFrame(valutaTeksti)
            }
        }, 1000)
    }
})

aloitaAlusta.addEventListener("click", () => {
    muistipeli.innerHTML = ""
    if (timer) {
        clearInterval(timer)
        timer = null
        aikaa_jaljella = 20
        lopetaValutus()
    }
    muistilista = []
    koko_lista = []
    lisaaAikaa.classList.remove("d-none")
    tarkista.classList.add("disabled")
    tarkistuksia = 0
    infokupla.textContent = "Lue kauppalista ennen kuin se sulaa sateessa. Lajittele tuotteet sen mukaan, olivatko ne listalla vai ei?"

    kaynnista()
})

tarkista.addEventListener("click", () => {
    const tulos = tarkistaKortit()

    if (timer) {
        clearInterval(timer)
        timer = null
        lopetaValutus()
    }

    let pisteet = Math.floor(tulos.oikeita * (maksimipisteet-tarkistuksia) / kokonaiskoko)
    tallennaSessionStorageen("muistipelinPisteet", pisteet)//Tämä funktio on määritelty shared.js tiedostossa

    ctx.clearRect(0, 0, ilona_canvas.width, ilona_canvas.height)
    ctx.save()
    ctx.font = "18px OpenDyslexic"
    ctx.fillStyle = "#052b69"
    ctx.fillText("Oikein: " + tulos.oikeita, 20, 40)
    ctx.fillText("Väärin: " + tulos.vaaria, 20, 60)
    ctx.fillText("Pisteet: " + pisteet, 20, 100)
    ctx.restore()

    if (pisteet === maksimipisteet) {
        infokupla.textContent = "Onneksi olkoon! Sait täydet pisteet!"
    }
    else if (pisteet === maksimipisteet-tarkistuksia) {
        infokupla.textContent = "Sait kaikki oikein, mutta maksimipisteiden saaminen vaatii onnistumista yhdellä tarkistuksella. Voit yrittää onneasi uudestaan tai siirtyä toiselle sivulle."
    }
    else infokupla.textContent = "Et saanut kaikkia oikein. Voit korjata vastauksiasi ja tarkistaa uudestaan, mutta varo: Joka kerran kun tarkistat, korkein mahdollinen pistemäärä laskee yhdellä. Uskallatko ottaa riskin?"

    tarkistuksia++

    
})