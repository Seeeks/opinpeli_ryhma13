
let kokonaispisteet = 0;
//tarvitaan avuksi arvioimaan kierroksen 2pisteitä
let aateapu = 0;

const tarkista = () =>{
   //https://www.w3schools.com/js/js_htmldom_nodes.asp//
    document.getElementById("peli_tarkista").disabled = true;
    document.getElementById("peli_hallitse").disabled = false;
    
    tarkistaja();
    kaninAatteet();

    tallennaSessionStorageen("jarjestysPisteet", kokonaispisteet)
}


// Yksinkertainen ehto tarkistaa onko kierros 1 vai 2
function pelinTarkistus() {
    //Hieman merkkijono kikkailua, muuttujan siirtäminen js filestä toiseen vaatisi export kikkailua
    if (document.getElementById('mika_peli').innerHTML.substring(0, 9)=='Kierros 1'){
            return [
                "Laita vesi kiehumaan",
                "Kuori ja pilko perunat",
                "Laita perunat kiehuvaan veteen ja keitä kypsäksi",
                "Kaada vesi pois ja kaada tilalle sama määrä maitoa, lämmitä mutta älä keitä!"
            ];    
        }

    if (document.getElementById('mika_peli').innerHTML.substring(0, 9)=='Kierros 2') {
        aateapu = kokonaispisteet;
            return [
                "Tee ruistaikina vedestä, suolasta ja ruisjauhoista. Paremman sitkon leivontaa ajatellen saat, kun laitat taikinaan alkuvaiheessa pari desiä vehnäjauhoja",
                "Laita uuni lämpiämään 225-asteeseen. Kauli taikinasta niin suuri levy, että saat muotoiltua siitä koko kalakukon",
                "Arvioi kalakukon pohjan koko. Laita riisiä/ohrasuurimoja/makaronia koko pohja alueelle. Lado kala (ja liha jos käytät) kerroksiin maustaen kerrokset suolalla.",
                "Käännä taikina kalakukon päälle ja tilkitse kuoren aukot ja kolot taikinalla",
                "Laita pellille kukko/ leivinpaperi ja foliot johon kukko kääritään. Paista kukkoa uunissa kunnes kuoreen tulee ruskeita laikkuja",
                "Ota kukko uunista, voitele halutessa kuorta voilla. Kääri kalakukko folioon ja laske uunin lämpötila noin  150- asteeseen. Paista noin 6 tuntia"
            ]
        } 
}
 
//Hieman väriä eri kierroksille laittamalla Kokkikani puhelemaan
function kaninAatteet(){
    if (document.getElementById('mika_peli').innerHTML.substring(0, 9)=='Kierros 1'){
            if (kokonaispisteet==0){
                document.getElementById("jarjestyspuhekupla").innerHTML =
                "Hmmm.... voisi kai että tällä ohjeella kalakeittokin menee pipariksi...."
            }
            else if (kokonaispisteet == 4) {
                document.getElementById("jarjestyspuhekupla").innerHTML =
                "Erinomaista! Niin sanottu pottukolikko ei ole herraskainen herkku, mutta nälkää lykkää silläkin"
            }
            else{
                document.getElementById("jarjestyspuhekupla").innerHTML =
                "Noh, edes osa oikein, nälkäinen ei tosin harmittele, vaikka hampaissa natisee perunankuoret tai puuttuva maito liemestä!"
            }   
        }

    if (document.getElementById('mika_peli').innerHTML.substring(0, 9)=='Kierros 2') {
        if (kokonaispisteet-aateapu==0){
            document.getElementById("jarjestyspuhekupla").innerHTML =
            "Kalakukosta ei tiedä onko se lintu vai kala, ja tällä reseptillä mysteeri ei  valitettavasti ratkea"
        }
        else if (kokonaispisteet-aateapu == 6) {
            document.getElementById("jarjestyspuhekupla").innerHTML =
            "Tämä savolaisherkku vie kielen mennessään, varsinkin kun palaset osuneet kohdalleen"
        }
        else{
            document.getElementById("jarjestyspuhekupla").innerHTML =
            "Ehkäpä kalat ja possun palat eivät järjestyksestä välitä, mutta leipomishommat vasta uuniin laiton jälkeen kuulostavat hikisille"
        }  
        } 
}

function tarkistaja () {
    /*Haetaan pelaan vastaus listana*/
    /*Selectien sisällöt */
    let pelaajan_vastaus = document.querySelectorAll("select");
    let pelaajan_vastaus_lista = [];
   
   /*Isossa kuvassa kannattaa karsia listoista turha, tässä tapauksessa tarvittin vain selectien arvot */
    pelaajan_vastaus.forEach(item => {
        pelaajan_vastaus_lista.push(item.value);
    });
    
    /*Koska järjestyksiä on satunaistettua, on pelaajan arvauksen lisäksi tiedettävä mitä osaa pelaaja arpoo */
    let pelaajan_vastaus_teksti = document.querySelectorAll(".pelaajan_vastaus");
    let pelaajan_teksti_lista = [];

    /*Haluamme tutkia vain pelaajan näkemää järjestystä */
    pelaajan_vastaus_teksti.forEach(item => {
        pelaajan_teksti_lista.push(item.innerHTML);
    });

    /*Tarkistetaan vastaako lista oikeaa*/
    /*Tästä eteenpäin luodaan tarkistus näkymää*/
    let peli = pelinTarkistus();

    const tarkistus = document.createElement("div");
    tarkistus.classList.add("peliruutu");
    tarkistus.id = "tarkistus";
    const sisus = document.createTextNode("Oikea vastaus")
    tarkistus.append(sisus);

    const ul = document.createElement('ul');
    ul.id = "tarkistus_lista";
    
    /*tästä eteenpäin tarkistus */
    let indeksi = 0;
    /*tutkitaan pelaajan vastaus oikeaa listaa vasten */
    peli.forEach(item => {

        const li =ul.appendChild(document.createElement('li'));
        const tarkistus = li.appendChild(document.createElement("div"));
        tarkistus.classList.add("tarkista_oikea")
        tarkistus.id = "tarkista_oikea"
        tarkistus.textContent = item;
        /*
        Tutkitaan pelaajan näkemää sekoitettua listaa
        Koska asiat luodaan ja luetaan järjestykseen html documenttiin
        voidaan tutkia asioita indeksejä soveltamalla
        */
        pelaajan_teksti_lista.forEach(item2 => {
           
            if (item2 == tarkistus.textContent){
                let teksti_indeksi = pelaajan_teksti_lista.indexOf(item2);
                let vastaus_indeksi = pelaajan_vastaus_lista[teksti_indeksi];
                /*array alkaa aina indeksistä 0 */
                if(indeksi == vastaus_indeksi-1) {
                    tarkistus.style.backgroundColor = "rgb(77, 218, 77)";
                    kokonaispisteet++;
                }
                else {
                    tarkistus.style.backgroundColor = "rgb(237, 117, 117)";
                }
            }
        });

        indeksi++;
    });

    tarkistus.append(ul);
    document.getElementById("pelin_hallinta").insertBefore(tarkistus, document.getElementById("ohjeruutu"));

    document.getElementById("kokonaispisteet").innerHTML="Kokonaispisteesi: " + kokonaispisteet;

}

