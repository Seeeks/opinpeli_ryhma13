const tarkista = () =>{
   //https://www.w3schools.com/js/js_htmldom_nodes.asp//

    const tarkistus = document.createElement("div");
    tarkistus.classList.add("peliruutu");
    const sisus = document.createTextNode("tarkistus")
    tarkistus.append(sisus);

    document.getElementById("pelin_hallinta").appendChild(tarkistus);
    document.getElementById("peli_tarkista").disabled = true;
}