const quizData = [
    {
      question: 'Who is the father of C language?',
      options: ['Steave Jobs', 'James Gosling', 'Dennis Ritchie', 'Rasmus Lerdord'],
      answer: 'Dennis Ritchie',
    },
    {
      question: 'Which of the following is not a valid C variable name?',
      options: ['int number;', 'fkoat rate;', 'int variable_count;', 'int $main;'],
      answer: 'int $main;',
    },
    {
      question: 'All keywords in C are :',
      options: ['Lowercase', 'Uppercase', 'Camelcase', 'None'],
      answer: 'Lowercase',
    },
    {
      question: 'Which of the following cannot be a variable name in C?',
      options: ['Volatile', 'True', 'Friend', 'Export'],
      answer: 'Volatile',
    },
    {
      question: 'What is an example of iteration in C ?',
      options: [
        'for',
        'while ',
        'do while',
        'All',
      ],
      answer: 'All',
    },
    {
      question: 'Which of the following is not an operator in C',
      options: [',', 'sizeof()', '-', 'None'],
      answer: 'None',
    },
    {
      question: 'What is the sizeof(char) in a 32 bit compiler?',
      options: [
        '1 bit',
        '2 bits',
        '1 byte',
        '2 bytes',
      ],
      answer: '1 byte',
    },
    {
      question: 'What is meant by a in C?',
      options: ['Attach', 'Append', 'Apprehend', 'Add'],
      answer: 'Append',
    },
    {
      question: 'Functions can return enumeration constant in C?',
      options: [
        'true',
        'false',
        'depends on the compiler',
        'depends on the standard',
      ],
      answer: 'true',
    },
    {
      question: 'Funtions in C language are always ______?',
      options: ['Internal ', 'External', 'Both', 'None'],
      answer: 'External',
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
