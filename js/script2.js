const quizData = [
  {
    question: 'Which of the following is not a web browser?',
    options: ['MOSAIC', 'WWW', 'Facebook', 'Netscape navigator'],
    answer: 'Facebook',
  },
  {
    question: 'In computer world, Trojan refer to:',
    options: ['Virus', 'Malware', 'Worm', 'Spyware'],
    answer: 'Malware',
  },
  {
    question: 'Which of the following is a programming language?',
    options: ['FTP', 'HPML', 'HTML', 'HTTP'],
    answer: 'HTML',
  },
  {
    question: 'Which protocol is used to receive email?',
    options: ['FTP', 'HTTP', 'POP3', 'SMTP'],
    answer: 'POP3',
  },
  {
    question: 'Which protocol is use to send emails?',
    options: [
      'HTTP',
      'POP3',
      'FTP',
      'SMTP',
    ],
    answer: 'SMTP',
  },
  {
    question: 'Which computer program converts assembly language to machine language',
    options: ['Comparator', 'Assembler', 'Compiler', 'Interpreter'],
    answer: 'Assembler',
  },
  {
    question: 'A computer use which type of number system to calculate and to store data:',
    options: [
      'Decimal',
      'Octal',
      'Binary',
      'Hexadecimal',
    ],
    answer: 'Binary',
  },
  {
    question: 'What is the extension type of the excel 2007 files?',
    options: ['None', '.xsl', '.xlsx', '.xls'],
    answer: '.xlsx',
  },
  {
    question: 'Linux is an example of:',
    options: [
      'Software',
      'Application',
      'Operating system',
      'None',
    ],
    answer: 'Operating system',
  },
  {
    question: 'Which one is an example of connectionless protocols?',
    options: ['UDP', 'Frame Relay', 'IPX/SPX', 'TCP'],
    answer: 'UDP',
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


