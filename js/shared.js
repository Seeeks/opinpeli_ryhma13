function tallennaSessionStorageen(muistipaikka, tieto) {
    //Kuinka käyttää tätä funktiota:
    //muuttujaan muistipaikka laita string, joka viittaa oman pelisi nimeen, esim muistipelissä "muistipelinPisteet"
    //muuttujaan tieto laita haluamasi arvo
    sessionStorage.setItem(muistipaikka, tieto);
}

function haeTietoSessionStoragesta(muistipaikka) {
    const haettuItem = sessionStorage.getItem(muistipaikka);
    if (haettuItem === null) {
        console.warn(`Yritetty hakea SessionStoragesta avaimella ${muistipaikka}, mutta muistipaikkaa ei ole olemassa.`)
        return null
    }
    return haettuItem
}

function laskeYhteispisteet() {
    const haettavatMuistipaikat = ["muistipelinPisteet", "yksikkomuunnosPisteet", "keittiovalinePisteet", "kaloripeliPisteet"]
    //Jokainen käy lisäämässä listan jatkoksi oman muuttujansa nimen, esim "aapelinPisteet", "beepelinPisteet" jne.
    let yhteispisteet = 0
    for (let i = 0; i < haettavatMuistipaikat.length; i++) {
        const haettuItem = haeTietoSessionStoragesta(haettavatMuistipaikat[i])
        if (haettuItem === null) {
            continue
        }
        yhteispisteet += Number(haettuItem)
    }

    return yhteispisteet
}