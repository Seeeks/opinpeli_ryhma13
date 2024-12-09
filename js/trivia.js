const questions = [
    {
      question: "Mikä raaka-aine on hyvä C-vitamiinin lähde?",
      options: ["Riisi", "Peruna", "Appelsiini", "Porkkana"],
      correct: 2 // Indeksi oikealle vastaukselle
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
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let totalAnswered = 0;
  
  function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.querySelector(".question").textContent = questionData.question;
  
    questionData.options.forEach((option, index) => {
      const button = document.getElementById(`opt${index + 1}`);
      button.textContent = option;
      button.onclick = () => handleAnswer(index);
    });
  
    document.getElementById("currentQuestion").textContent = currentQuestionIndex + 1;
    document.getElementById("score").textContent = `${score}/${totalAnswered}`;
  }
  
  function handleAnswer(selected) {
    const questionData = questions[currentQuestionIndex];
  
    totalAnswered++; // Lisää vastattujen kysymysten määrää
    if (selected === questionData.correct) {
      score++; // Lisää pisteitä vain, jos vastaus on oikein
      alert("Hienoa, se on oikein!");
    } else {
      alert(`Väärin! Oikea vastaus oli: ${questionData.options[questionData.correct]}`);
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();  // Lataa seuraava kysymys
    } else {
      alert(`Peli ohi! Kokonaisscore: ${score}/${questions.length}`);
      resetGame();
    }
  }
  
  function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    totalAnswered = 0;
    loadQuestion();
  }
  
  document.addEventListener("DOMContentLoaded", loadQuestion);
  