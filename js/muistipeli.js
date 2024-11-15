const ilona_canvas = document.getElementById("ilona_canvas");
const ctx = ilona_canvas.getContext("2d");
const muistipeli = document.getElementById("muistipeli");
const lisaaAikaa = document.getElementById("lisaaAikaa");
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
        }
    }, 1000)

    for (let i = 0; i < kokonaiskoko; i++) {
        const rivi = koko_lista[i]
        const div = document.createElement("div")
        div.textContent = rivi
        div.classList.add("pelikortti")
        muistipeli.appendChild(div)
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
