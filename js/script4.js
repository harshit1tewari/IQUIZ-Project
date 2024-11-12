const quizData = [
  {
    question: 'Which of the following is a large blood vessel that carries blood away from the heart?',
    options: ['Vein', 'Artery', 'Capillary', 'Nerve'],
    answer: 'Artery',
  },
  {
    question: 'Fungi are plants that lack:',
    options: ['Oxygen', 'Carbon dioxide', 'Chlorophyll', 'None of these'],
    answer: 'Chlorophyll',
  },
  {
    question: 'The rarest blood group is:',
    options: ['O negative', 'B negative', 'AB positive', 'AB negative'],
    answer: 'AB negative',
  },
  {
    question: 'The metal present in haemoglobin is:',
    options: ['Copper', 'Calcium', 'Iron', 'Aluminium'],
    answer: 'Iron',
  },
  {
    question: 'The largest and longest bone in the human body is:',
    options: [
      'Spinal Cord',
      'Humerus',
      'Fibula',
      'Femur',
    ],
    answer: 'Femur',
  },
  {
    question: 'Plants mainly receive nutrients from which medium?',
    options: ['Soil', 'Light', 'Water', 'Air'],
    answer: 'Soil',
  },
  {
    question: 'What does DNA stand for?',
    options: [
      'Duoxy nucleotide acid',
      'Deoxyribonucleic acid',
      'Deoxynitrifying amine',
      'Deoxynucleic acid',
    ],
    answer: 'Deoxyribonucleic acid',
  },
  {
    question: 'What term is used for the most basic classification of species?',
    options: ['Kingdom', 'Domain', 'Genus', 'Class'],
    answer: 'Kingdom',
  },
  {
    question: 'Photosynthesis requires carbon dioxide, chlorophyll, light and what other ingredient?',
    options: [
      'Glucose',
      'Protein',
      'Water',
      'Nitrates',
    ],
    answer: 'Water',
  },
  {
    question: 'What are single celled organisms called?',
    options: ['Unocellular organisms', 'Solocellular organisms', 'Unicellular organisms', 'Monocellular organisms'],
    answer: 'Unicellular organisms',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();


