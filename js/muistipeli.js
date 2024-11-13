const ilona_canvas = document.getElementById("ilona_canvas");
const ctx = ilona_canvas.getContext("2d");
const lisaaAikaa = document.getElementById("lisaaAikaa");
let timer;//tätä ei määritellä alussa
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
let muistilista = ""
var aikaa_jaljella = 20

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
    window.requestAnimationFrame(valutaTeksti)
}

function naytaCountdown(i) {
    ctx.clearRect(0, 0, ilona_canvas.width, ilona_canvas.height)
    ctx.save()
    ctx.font = "30px Arial"
    ctx.fillStyle = "#052b69"
    ctx.fillText(i, ilona_canvas.width - 30, 40)

    naytaTekstiNormaalisti()

    ctx.restore()
}

function kaynnista() {
    muistilista = arvoMuistilista()
    
    aikaa_jaljella = 20

    naytaCountdown(aikaa_jaljella)

    if (timer) {
        clearInterval(timer)
    }

    timer = setInterval(() => {
        
        aikaa_jaljella--
        naytaCountdown(aikaa_jaljella)
        if (aikaa_jaljella < 0) {
            clearInterval(timer)
            window.requestAnimationFrame(valutaTeksti)
        }
    }, 1000)
}

function arvoMuistilista() {
    //Valitaan 10 satunnaista vaihtoehtoa listalta
    //Lähde: https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
    const satunnaistettuLista = ostos_vaihtoehdot.sort(() => 0.5 - Math.random())
    return satunnaistettuLista.slice(0, 10)
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
                window.requestAnimationFrame(valutaTeksti)
            }
        }, 1000)
    }
})


kaynnista()