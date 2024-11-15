const ilona_canvas = document.getElementById("ilona_canvas");
const ctx = ilona_canvas.getContext("2d");
const muistipeli = document.getElementById("muistipeli");
const lisaaAikaa = document.getElementById("lisaaAikaa");
const tarkista = document.getElementById("tarkista");
const aloitaAlusta = document.getElementById("aloitaAlusta");
let timer;//tätä ei määritellä alussa
let animationId = null
const ostos_vaihtoehdot = [
    "kevytmaito",
    "banaanit",
    "folio",
    "ilmapallot",
    "jogurtti",
    "juustoraaste",
    "kanan jauheliha",
    "kaurakerma",
    "kauramaito",
    "kuohukerma",
    "kurkku",
    "laktoositon maito",
    "leivinpaperi",
    "makkara",
    "munat",
    "nakit",
    "naudan jauheliha",
    "omenat",
    "raejuusto",
    "rasvaton maito",
    "ruokakerma",
    "ruokaöljy",
    "sokeri",
    "suklaa",
    "suola",
    "tomaatit",
    "vegaanijuusto",
    "vispikerma",
    "voi"
]
let pystysuuntainenvenytys = 1
let muistilista;
let koko_lista;
var aikaa_jaljella = 20
const arvottava_koko = 8
const kokonaiskoko = 16

ctx.font = "16px Arial"
ctx.fillStyle = "#052b69"

function naytaTekstiNormaalisti() {
    ctx.save()
    ctx.font = "16px Arial"
    ctx.fillStyle = "#052b69"
    ctx.scale(1, 1)
    muistilista.forEach((rivi, index) => {
        ctx.fillText(rivi, 10, (index + 1) * 16)
    })
    ctx.restore()
}

function valutaTeksti() {
    ctx.clearRect(0, 0, ilona_canvas.width, ilona_canvas.height)
    ctx.save()
    
    ctx.scale(1, pystysuuntainenvenytys)

    muistilista.forEach((rivi, index) => {
        ctx.fillText(rivi, 10, (index + 1) * 16)
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

    
}

function lisaaPelikortit() {
    for (let i = 0; i < kokonaiskoko; i++) {
        const rivi = koko_lista[i]
        const div = document.createElement("div")
        div.classList.add("pelikortti")
        const span = document.createElement("span")
        span.textContent = rivi
        div.appendChild(span)
        muistipeli.appendChild(div)
        div.addEventListener("click", kortinKlikkaus)
    }
}

function kortinKlikkaus() {
    this.classList.toggle("fokusoitu")
    if (this.classList.contains("fokusoitu")) {
        const nappula_on = document.createElement("button")
        const nappula_ei = document.createElement("button")
        nappula_on.textContent = "On"
        nappula_ei.textContent = "Ei"
        nappula_on.classList.add("btn", "btn-primary")
        nappula_ei.classList.add("btn", "btn-danger")
        this.appendChild(nappula_on)
        this.appendChild(nappula_ei)
        nappula_on.addEventListener("click", (e) => {
            this.classList.remove("fokusoitu")
            this.classList.remove("ei-listalla")
            this.classList.add("on-listalla")
            e.stopPropagation()

            const nappulat = this.querySelectorAll("button")
            nappulat.forEach(nappula => {
                this.removeChild(nappula)
            })
        })
        nappula_ei.addEventListener("click", (e) => {
            this.classList.remove("fokusoitu")
            this.classList.remove("on-listalla")
            this.classList.add("ei-listalla")
            e.stopPropagation()

            const nappulat = this.querySelectorAll("button")
            nappulat.forEach(nappula => {
                this.removeChild(nappula)
            })
        })
    }
    else {
        const nappulat = this.querySelectorAll("button")
        nappulat.forEach(nappula => {
            this.removeChild(nappula)
        })
    }
}

function arvoMuistilista() {
    //Valitaan 10 satunnaista vaihtoehtoa listalta
    //Lähde: https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
    const satunnaistettuLista = ostos_vaihtoehdot.sort(() => 0.5 - Math.random())
    koko_lista = satunnaistettuLista.slice(0, kokonaiskoko)//Tämä sisältää myös vääriä vaihtoehtoja
    koko_lista = koko_lista.sort(() => 0.5 - Math.random())//Satunnaistetaan uudelleen
    return satunnaistettuLista.slice(0, arvottava_koko)//palautetaan 8 kohdan ostoslista
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
        if (muistilista.includes(teksti)) {
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
        if (muistilista.includes(teksti)) {
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

    kaynnista()
})

tarkista.addEventListener("click", () => {
    const tulos = tarkistaKortit()

    if (timer) {
        clearInterval(timer)
        timer = null
        lopetaValutus()
    }

    ctx.clearRect(0, 0, ilona_canvas.width, ilona_canvas.height)
    ctx.save()
    ctx.font = "16px Arial"
    ctx.fillStyle = "#052b69"
    ctx.fillText("Oikeita: " + tulos.oikeita, 10, 20)
    ctx.fillText("Vääriä: " + tulos.vaaria, 10, 40)
    ctx.restore()
})