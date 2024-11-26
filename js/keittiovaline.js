let points = 0;
let answered = 5;
const RIGHT_ANSWER = "Vastauksesi on oikein! Hyvää työtä!";
const WRONG_ANSWER = "Vastauksesi on väärin!";
const ANSWER_ERROR = "Valitse vastaus ennen tarkistusta!";

function question1() {
    
    // Kysymyksen vaihtoehdot ja oikea vastaus
    let result = document.getElementById("answer-result1");
    let firstAnswer = document.getElementById("select1.1");
    let secondAnswer = document.getElementById("select1.2");
    let thirdAnswer = document.getElementById("select1.3");
    let fourthAnswer = document.getElementById("select1.4");
    let correctAnswer = document.getElementById("select1.3").checked;
    let wrongLabels = document.getElementsByClassName("first-labels");
    let correctLabel = document.getElementById("correct-first-label");
    result.innerHTML = "";
}

function question2() {
    // Kysymyksen vaihtoehdot ja oikea vastaus
    let result = document.getElementById("answer-result2");
    let firstAnswer = document.getElementById("select2.1");
    let secondAnswer = document.getElementById("select2.2");
    let thirdAnswer = document.getElementById("select2.3");
    let fourthAnswer = document.getElementById("select2.4");
    let correctAnswer = document.getElementById("select2.1").checked;
    let wrongLabels = document.getElementsByClassName("second-labels");
    let correctLabel = document.getElementById("correct-second-label");
    result.innerHTML = "";
    //Tarkistetaan onko jokin vastaus valittu
    if (firstAnswer.checked || secondAnswer.checked || thirdAnswer.checked || fourthAnswer.checked) {
        //Tarkistetaan onko jokin vastaus valittu, mikäli on, ajetaan funktiota eteenpäin, muuten virheviesti
        if (correctAnswer) {
            result.innerHTML = RIGHT_ANSWER;
            points++;
            correctLabel.style.backgroundColor = "lightgreen";
        } else {
            result.innerHTML = WRONG_ANSWER + " Oikea vastaus on lapinpöllö.";
            for (let i = 0; i < wrongLabels.length; i++) {
                wrongLabels[i].style.backgroundColor = "red";
            }
            correctLabel.style.backgroundColor = "lightgreen";
        }
        //Deaktivoidaan painikkeet kun vastaus on tarkistettu
        firstAnswer.disabled = true;
        secondAnswer.disabled = true;
        thirdAnswer.disabled = true;
        fourthAnswer.disabled = true;
        document.getElementById("check-btn2").disabled = true;
        answered--;
        document.getElementById("check-btn2").style.backgroundColor = "#e9a452";
    } else {
        result.innerHTML = ANSWER_ERROR;
    }
}

function question3() {
    // Kysymyksen vaihtoehdot ja oikea vastaus
    let result = document.getElementById("answer-result3");
    let firstAnswer = document.getElementById("select3.1");
    let secondAnswer = document.getElementById("select3.2");
    let thirdAnswer = document.getElementById("select3.3");
    let fourthAnswer = document.getElementById("select3.4");
    let correctAnswer = document.getElementById("select3.4").checked;
    let wrongLabels = document.getElementsByClassName("third-labels");
    let correctLabel = document.getElementById("correct-third-label");
    result.innerHTML = "";
    //Tarkistetaan onko jokin vastaus valittu
    if (firstAnswer.checked || secondAnswer.checked || thirdAnswer.checked || fourthAnswer.checked) {
        //Tarkistetaan onko jokin vastaus valittu, mikäli on, ajetaan funktiota eteenpäin, muuten virheviesti
        if (correctAnswer) {
            result.innerHTML = RIGHT_ANSWER;
            points++;
            correctLabel.style.backgroundColor = "lightgreen";
        } else {
            result.innerHTML = WRONG_ANSWER + " Oikea vastaus on joutsen.";
            for (let i = 0; i < wrongLabels.length; i++) {
                wrongLabels[i].style.backgroundColor = "red";
            }
            correctLabel.style.backgroundColor = "lightgreen";
        }
        //Deaktivoidaan painikkeet kun vastaus on tarkistettu
        firstAnswer.disabled = true;
        secondAnswer.disabled = true;
        thirdAnswer.disabled = true;
        fourthAnswer.disabled = true;
        document.getElementById("check-btn3").disabled = true;
        answered--;
        document.getElementById("check-btn3").style.backgroundColor = "#e9a452";
    } else {
        result.innerHTML = ANSWER_ERROR;
    }
}


