const quizData = [
  // Figma
  {
    question: "Apa fungsi utama dari Figma?",
    options: [
      "Desain UI/UX",
      "Edit video",
      "Pemrograman back-end",
      "Mengelola database",
    ],
    answer: "Desain UI/UX",
  },
  {
    question: "Figma termasuk dalam jenis aplikasi?",
    options: ["Desktop-only", "Web-based", "Mobile-only", "Command line"],
    answer: "Web-based",
  },
  {
    question: "Apa nama fitur kolaborasi real-time di Figma?",
    options: [
      "Live Design",
      "MultiView",
      "Team Share",
      "Collaborative Editing",
    ],
    answer: "Collaborative Editing",
  },
  {
    question: "Ekstensi file hasil export desain dari Figma ke gambar adalah?",
    options: [".fig", ".png", ".psd", ".ai"],
    answer: ".png",
  },
  {
    question: "Fitur prototyping di Figma digunakan untuk?",
    options: [
      "Membuat animasi",
      "Simulasi interaksi halaman",
      "Menulis kode",
      "Hosting website",
    ],
    answer: "Simulasi interaksi halaman",
  },

  // Kabel LAN / Jaringan
  {
    question: "Apa kepanjangan dari LAN?",
    options: [
      "Local Area Network",
      "Large Access Network",
      "Line and Node",
      "Link Assigned Network",
    ],
    answer: "Local Area Network",
  },
  {
    question: "Konektor standar kabel LAN tipe RJ-45 memiliki berapa pin?",
    options: ["6", "8", "4", "10"],
    answer: "8",
  },
  {
    question: "Jenis kabel LAN yang paling umum digunakan saat ini adalah?",
    options: ["Coaxial", "Fiber Optic", "UTP", "STP"],
    answer: "UTP",
  },
  {
    question:
      "Perangkat yang menghubungkan beberapa komputer dalam jaringan LAN disebut?",
    options: ["Switch", "Router", "Firewall", "Modem"],
    answer: "Switch",
  },
  {
    question: "Alamat IP dalam jaringan digunakan untuk?",
    options: [
      "Mengelola warna",
      "Menentukan posisi mouse",
      "Identifikasi perangkat",
      "Mengubah kecepatan internet",
    ],
    answer: "Identifikasi perangkat",
  },

  // HTML / CSS / JS
  {
    question: "Tag HTML untuk membuat heading tingkat pertama adalah?",
    options: ["<h1>", "<head>", "<header>", "<title>"],
    answer: "<h1>",
  },
  {
    question: "Properti CSS untuk mengatur warna teks adalah?",
    options: ["color", "background", "font-weight", "text-align"],
    answer: "color",
  },
  {
    question: "Apa arti singkatan CSS?",
    options: [
      "Computer Style Sheet",
      "Creative Styling Script",
      "Cascading Style Sheets",
      "Color Style Selector",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Perintah JavaScript untuk menampilkan pesan popup adalah?",
    options: ["console.log()", "alert()", "print()", "msg()"],
    answer: "alert()",
  },
  {
    question:
      "Selector CSS yang memilih berdasarkan id menggunakan karakter apa?",
    options: [".", "#", "*", "/"],
    answer: "#",
  },
  {
    question: "Bagaimana cara menambahkan file JavaScript ke HTML?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    answer: "<script>",
  },
  {
    question: 'Apa output dari `2 + "2"` di JavaScript?',
    options: ["4", '"22"', "undefined", "NaN"],
    answer: '"22"',
  },

  // Website Statis
  {
    question: "Website statis biasanya dibuat menggunakan?",
    options: [
      "HTML, CSS, JS",
      "PHP dan MySQL",
      "Java dan Spring",
      "Python dan Flask",
    ],
    answer: "HTML, CSS, JS",
  },
  {
    question: "Keunggulan utama website statis adalah?",
    options: [
      "Cepat dan ringan",
      "Dinamis dan kompleks",
      "Butuh database",
      "Perlu server khusus",
    ],
    answer: "Cepat dan ringan",
  },
  {
    question: "Website statis tidak dapat melakukan?",
    options: [
      "Tampilan teks dan gambar",
      "Login dinamis",
      "Menampilkan halaman info",
      "Navigasi sederhana",
    ],
    answer: "Login dinamis",
  },
  {
    question: "Tools seperti Netlify atau GitHub Pages digunakan untuk?",
    options: [
      "Hosting website statis",
      "Mengedit video",
      "Membuat game",
      "Menjalankan server database",
    ],
    answer: "Hosting website statis",
  },

  // WordPress / XAMPP
  {
    question: "WordPress ditulis menggunakan bahasa pemrograman?",
    options: ["Java", "Python", "PHP", "Ruby"],
    answer: "PHP",
  },
  {
    question: "XAMPP adalah paket yang menyediakan?",
    options: [
      "Server lokal lengkap",
      "Editor gambar",
      "Framework JavaScript",
      "Database online",
    ],
    answer: "Server lokal lengkap",
  },
  {
    question: "Untuk menjalankan WordPress secara lokal, kita butuh?",
    options: ["Netlify", "XAMPP", "Visual Studio", "Canva"],
    answer: "XAMPP",
  },
  {
    question: "Dashboard WordPress digunakan untuk?",
    options: [
      "Mengelola konten dan tampilan",
      "Mengatur IP jaringan",
      "Mendesain kabel LAN",
      "Membuat file audio",
    ],
    answer: "Mengelola konten dan tampilan",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");
const timerContainer = document.getElementById("timer"); // Tambahkan elemen ini di HTML

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
let timer;
let timeLeft = 10;

// 🌀 Acak urutan soal
shuffleArray(quizData);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function displayQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      handleTimeout();
    }
  }, 1000);

  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = escapeHTML(questionData.question);

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function updateTimer() {
  timerContainer.innerHTML = `⏱️ Waktu tersisa: ${timeLeft} detik`;
}

function handleTimeout() {
  clearInterval(timer);
  incorrectAnswers.push({
    question: quizData[currentQuestion].question,
    incorrectAnswer: "(tidak dijawab)",
    correctAnswer: quizData[currentQuestion].answer,
  });
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    displayQuestion();
  } else {
    displayResult();
  }
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  clearInterval(timer);
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
  } else {
    // Tidak dijawab
    incorrectAnswers.push({
      question: quizData[currentQuestion].question,
      incorrectAnswer: "(tidak dijawab)",
      correctAnswer: quizData[currentQuestion].answer,
    });
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    displayQuestion();
  } else {
    displayResult();
  }
}

function displayResult() {
  clearInterval(timer);
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  timerContainer.innerHTML = "";
  resultContainer.innerHTML = `✅ Skor kamu: ${score} dari ${quizData.length}`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  shuffleArray(quizData);
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";
  timerContainer.innerHTML = "";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${escapeHTML(
          incorrectAnswers[i].question
        )}<br>
        <strong>Your Answer:</strong> ${escapeHTML(
          incorrectAnswers[i].incorrectAnswer
        )}<br>
        <strong>Correct Answer:</strong> ${escapeHTML(
          incorrectAnswers[i].correctAnswer
        )}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>Skor kamu: ${score} dari ${quizData.length}</p>
    ${incorrectAnswers.length > 0 ? "<h3>Jawaban Salah:</h3>" : ""}
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

// Mulai kuis
displayQuestion();
