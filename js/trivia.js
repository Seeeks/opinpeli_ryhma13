const questions = [
  {
    question: "Mikä raaka-aine on hyvä C-vitamiinin lähde?",
    options: ["Riisi", "Peruna", "Appelsiini", "Porkkana"],
    correct: 2
  },
  {
    question: "Mikä sisältää eniten kuitua?",
    options: ["Leipä", "Riisi", "Pavut", "Peruna"],
    correct: 2
  },
  {
    question: "Mikä ruoka on hyvä proteiinin lähde?",
    options: ["Banaani", "Kala", "Suklaa", "Maissi"],
    correct: 1
  },
  {
    question: "Mikä ruoka sisältää paljon rautaa?",
    options: ["Pinaatti", "Riisi", "Pasta", "Jogurtti"],
    correct: 0
  },
  {
    question: "Mikä on parasta aamupalaksi?",
    options: ["Suklaapatukka", "Kananmuna", "Kahvi", "Perunalastut"],
    correct: 1
  }
]
  
let currentQuestionIndex = 0
let score = 0
  
function loadQuestion() {
  const questionData = questions[currentQuestionIndex]
  document.querySelector(".question").textContent = questionData.question
  
  questionData.options.forEach((option, index) => {
    const button = document.getElementById(`opt${index + 1}`)
    button.textContent = option
    button.onclick = () => handleAnswer(index)
  })
  
  document.getElementById("currentQuestion").textContent = currentQuestionIndex + 1
  document.getElementById("score").textContent =  `${score}/${questions.length}`
}
  
function handleAnswer(selected) {
  const questionData = questions[currentQuestionIndex];

  if (selected === questionData.correct) {
    score++;
    alert("Hienoa, se on oikein!");
  } else {
    alert(`Väärin! Oikea vastaus oli: ${questionData.options[questionData.correct]}`);
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion()
  } else {
    endGame()
  }
}

function endGame() {
   // Tallennetaan pisteet session storageen
  sessionStorage.setItem("triviaPisteet", score)

  // Päivitetään pisteet näkyville
  const triviaContainer = document.querySelector(".status")
  triviaContainer.innerHTML = `
    <div>Kysymys meneillään: ${questions.length}/${questions.length}</div>
    <div>Kokonaisscore: <strong>${score}/${questions.length}</strong></div>
  `

  // Näytetään "Pelaa uudelleen" -painike
  document.getElementById("restartButton").classList.remove("d-none")
}

document.getElementById("restartButton").addEventListener("click", () => {
  resetGame()
  document.getElementById("restartButton").classList.add("d-none") // Piilotetaan painike uudelleen
})



document.addEventListener("DOMContentLoaded", loadQuestion)