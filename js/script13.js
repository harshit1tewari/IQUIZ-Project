const quizData = [
    {
      question: 'The quality of physical education instructor is?',
      options: ['Civilised', 'Smart', 'Young', 'Best performance'],
      answer: 'Best performance',
    },
    {
      question: 'Main focus of physical education is?',
      options: ['Motion', 'Man in motion', 'Man', 'Fitness'],
      answer: 'Man in motion',
    },
    {
      question: 'For a student to remain fit what is necassary?',
      options: ['Aptitudes', 'Routines', 'Attitudes', 'Life'],
      answer: 'Routines',
    },
    {
      question: 'What reflects the true nature of physical educatin?',
      options: ['Movement', 'K2', 'Physical training', 'Athleticism'],
      answer: 'Physical training',
    },
    {
      question: 'How many times India won the World cup?',
      options: [
        '2',
        '1',
        '3',
        'None',
      ],
      answer: 'None',
    },
    {
      question: 'Who won the ICC CT in 2013',
      options: ['India', 'AUS', 'Pak', 'Eng'],
      answer: 'India',
    },
    {
      question: 'Who is the god of cricket?',
      options: [
        'Sachin',
        'MS ',
        'Virat',
        'Kapil',
      ],
      answer: 'Sachin',
    },
    {
      question: 'Dimension of cricket pitch?',
      options: ['22 yards', '32 yards', '12 yards', '21 yards'],
      answer: '22 yards',
    },
    {
      question: 'Total time taken in football?',
      options: [
        '90 min',
        '60 min',
        '100 min',
        '120 min',
      ],
      answer: '90 min',
    },
    {
      question: 'Most dangourous card in football?',
      options: ['Yellow', 'Blue', 'Green', 'Red'],
      answer: 'Red',
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
