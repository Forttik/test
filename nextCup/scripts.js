function addQuestion() {
  const questionBlock = document.createElement("div");
  questionBlock.classList.add("question");

  const questionLabel = document.createElement("label");
  questionLabel.innerHTML = "Питання:";
  const questionInput = document.createElement("input");
  questionInput.type = "text";
  questionInput.placeholder = "Введіть питання";

  const answersLabel = document.createElement("label");
  answersLabel.innerHTML = "Варіанти відповідей:";

  const answersBlock = document.createElement("div");

  // Додавання варіантів відповідей
  for (let i = 0; i < 4; i++) {
    const answerDiv = document.createElement("div");
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.placeholder = `Варіант ${i + 1}`;

    const correctAnswerCheckbox = document.createElement("input");
    correctAnswerCheckbox.type = "checkbox";
    correctAnswerCheckbox.classList.add("correct-answer");

    answerDiv.appendChild(answerInput);
    answerDiv.appendChild(correctAnswerCheckbox);
    answersBlock.appendChild(answerDiv);
  }

  questionBlock.appendChild(questionLabel);
  questionBlock.appendChild(questionInput);
  questionBlock.appendChild(answersLabel);
  questionBlock.appendChild(answersBlock);

  document.getElementById("questions-block").appendChild(questionBlock);
}

function saveTest() {
  const testName = document.getElementById("test-name").value;
  const questions = document.querySelectorAll("#questions-block .question");

  const testData = {
    name: testName,
    questions: [],
  };

  questions.forEach((questionBlock) => {
    const questionText =
      questionBlock.querySelector("input[type='text']").value;
    const answers = questionBlock.querySelectorAll(".question div");

    const answersArray = [];
    answers.forEach((answerDiv) => {
      const answerText = answerDiv.querySelector("input[type='text']").value;
      const isCorrect = answerDiv.querySelector(".correct-answer").checked;
      answersArray.push({ answer: answerText, correct: isCorrect });
    });

    testData.questions.push({ question: questionText, answers: answersArray });
  });

  const filename = prompt("Введіть назву файлу для збереження:");

  if (filename) {
    const fileBlob = new Blob([JSON.stringify(testData, null, 2)], {
      type: "application/json",
    });
    const fileLink = document.createElement("a");
    fileLink.href = URL.createObjectURL(fileBlob);
    fileLink.download = filename + ".json";
    fileLink.click();
  } else {
    alert("Будь ласка, введіть назву файлу.");
  }
}
function loadTest() {
  alert("Функція завантаження тесту наразі не реалізована.");
}
