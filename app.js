"use strict";

/* =========================================
   ULTRA SCHOOL — учебная демоверсия
   Данные хранятся локально в браузере.
========================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const STORAGE_KEY = "ultra-school-save-v1";

const AVATARS = ["🧑‍🚀", "🦊", "🐼", "🐱", "🦉", "🐉", "🦄", "🤖"];

const COURSES = [
  {
    id: "math",
    title: "Математика",
    icon: "🧮",
    category: "Точные науки",
    color: "#8b72ff",
    description: "Числа, дроби, проценты и интересные задачи.",
    lessons: [
      {
        title: "Обыкновенные дроби",
        text: "Дробь показывает часть целого. Например, 3/4 означает три части из четырёх равных частей.",
        question: "Чему равно 1/2 + 1/4?",
        answer: "3/4",
        explanation: "Приведём дроби к общему знаменателю: 1/2 = 2/4. Теперь складываем: 2/4 + 1/4 = 3/4."
      },
      {
        title: "Проценты",
        text: "Один процент — это одна сотая часть числа. Чтобы найти 10% от 200, вычисляем 200 × 10 / 100 = 20.",
        question: "Сколько будет 25% от 80?",
        answer: "20",
        explanation: "25% = 25/100 = 1/4. Четверть от 80 равна 80 ÷ 4 = 20."
      },
      {
        title: "Простые уравнения",
        text: "Уравнение содержит неизвестное число. Чтобы найти x в уравнении x + 5 = 12, вычитаем 5 из обеих частей.",
        question: "Найди x: x + 7 = 15",
        answer: "8",
        explanation: "Вычтем 7 из обеих частей: x = 15 − 7 = 8."
      }
    ]
  },
  {
    id: "english",
    title: "Английский язык",
    icon: "🌍",
    category: "Языки",
    color: "#54a9ff",
    description: "Слова, грамматика и практика общения.",
    lessons: [
      {
        title: "Приветствия",
        text: "Hello — привет. Good morning — доброе утро. How are you? — как дела?",
        question: "Как переводится слово Apple?",
        answer: "яблоко",
        explanation: "Apple переводится как «яблоко». Попробуй составить с этим словом предложение: I like apples."
      },
      {
        title: "Глагол to be",
        text: "В настоящем времени am используется с I, is — с he/she/it, are — с you/we/they.",
        question: "Заполни пропуск: She ___ happy. (is/are)",
        answer: "is",
        explanation: "С местоимением She используется форма is. Правильное предложение: She is happy."
      },
      {
        title: "Простые предложения",
        text: "В английском языке часто используется порядок слов: подлежащее + глагол + дополнение.",
        question: "Как переводится I read a book?",
        answer: "я читаю книгу",
        explanation: "I — я, read — читаю, a book — книгу. Всё предложение: «Я читаю книгу»."
      }
    ]
  },
  {
    id: "history",
    title: "История",
    icon: "🏛️",
    category: "Гуманитарные науки",
    color: "#ffb86b",
    description: "Цивилизации, открытия и события прошлого.",
    lessons: [
      {
        title: "Древние цивилизации",
        text: "Древний Египет развивался в долине реки Нил. Река помогала людям заниматься земледелием.",
        question: "Как называлась главная река Древнего Египта?",
        answer: "нил",
        explanation: "Это Нил. Ежегодные разливы реки оставляли плодородную почву, полезную для земледелия."
      },
      {
        title: "Шёлковый путь",
        text: "Шёлковый путь — сеть торговых маршрутов, соединявших регионы Азии, Европы и других территорий.",
        question: "Что перевозили по Шёлковому пути?",
        answer: "товары",
        explanation: "По этим маршрутам перевозили шёлк, специи, керамику и другие товары. Также распространялись идеи и знания."
      },
      {
        title: "Исторические источники",
        text: "Историки изучают документы, предметы, надписи и другие свидетельства, чтобы узнать о прошлом.",
        question: "Как называется наука, изучающая прошлое человечества?",
        answer: "история",
        explanation: "История изучает прошлое людей и обществ на основе различных исторических источников."
      }
    ]
  },
  {
    id: "informatics",
    title: "Информатика",
    icon: "💻",
    category: "Технологии",
    color: "#51d6a0",
    description: "Алгоритмы, информация и программирование.",
    lessons: [
      {
        title: "Алгоритмы",
        text: "Алгоритм — последовательность понятных шагов для решения задачи. Например, рецепт приготовления блюда.",
        question: "Как называется последовательность шагов для решения задачи?",
        answer: "алгоритм",
        explanation: "Алгоритм — это точная последовательность действий, приводящая к решению задачи."
      },
      {
        title: "Двоичная система",
        text: "Компьютеры используют двоичную систему счисления, в которой есть только две цифры: 0 и 1.",
        question: "Какие две цифры используются в двоичной системе?",
        answer: "0 и 1",
        explanation: "В двоичной системе используются только 0 и 1. Например, десятичное число 2 записывается как 10."
      },
      {
        title: "Переменные",
        text: "Переменная в программе — именованное место для хранения значения. Например, age = 12.",
        question: "Как называют именованное место для хранения значения в программе?",
        answer: "переменная",
        explanation: "Переменная позволяет хранить и использовать данные в программе."
      }
    ]
  },
  {
    id: "chess",
    title: "Шахматы",
    icon: "♟️",
    category: "Логика",
    color: "#d49aff",
    description: "Стратегия, тактика и логическое мышление.",
    lessons: [
      {
        title: "Шахматная доска",
        text: "Доска состоит из 64 клеток: восемь по горизонтали и восемь по вертикали.",
        question: "Сколько клеток на стандартной шахматной доске?",
        answer: "64",
        explanation: "На доске 8 рядов по 8 клеток. 8 × 8 = 64."
      },
      {
        title: "Ходы фигур",
        text: "Ладья ходит по горизонтали и вертикали на любое число свободных клеток.",
        question: "Как называется фигура, которая ходит по прямым линиям?",
        answer: "ладья",
        explanation: "Ладья перемещается по горизонтали или вертикали, если на пути нет других фигур."
      },
      {
        title: "Шах и мат",
        text: "Шах — угроза королю. Мат — положение, в котором король под шахом и не может избежать угрозы.",
        question: "Как называется ситуация, когда король не может спастись от шаха?",
        answer: "мат",
        explanation: "Мат завершает шахматную партию победой атакующей стороны."
      }
    ]
  },
  {
    id: "music",
    title: "Музыка",
    icon: "🎵",
    category: "Творчество",
    color: "#ff7fa7",
    description: "Ритм, ноты и музыкальная грамотность.",
    lessons: [
      {
        title: "Музыкальные ноты",
        text: "Основные названия нот: до, ре, ми, фа, соль, ля, си.",
        question: "Какая нота следует после ноты до?",
        answer: "ре",
        explanation: "Последовательность нот начинается так: до, ре, ми, фа, соль, ля, си."
      },
      {
        title: "Ритм",
        text: "Ритм организует звуки и паузы во времени. Он помогает музыке двигаться и сохранять структуру.",
        question: "Что организует длительность звуков и пауз в музыке?",
        answer: "ритм",
        explanation: "Ритм — это организация музыкальных звуков и пауз во времени."
      },
      {
        title: "Музыкальные инструменты",
        text: "Инструменты могут быть струнными, духовыми, ударными и клавишными.",
        question: "К какой группе относится барабан?",
        answer: "ударные",
        explanation: "Барабан относится к ударным инструментам: звук извлекают ударами."
      }
    ]
  }
];

const ACHIEVEMENTS = [
  {
    id: "first",
    icon: "🌟",
    title: "Первый шаг",
    description: "Заверши свой первый урок.",
    reward: 20,
    check: (s) => s.completed.length >= 1
  },
  {
    id: "five",
    icon: "📚",
    title: "Любознательный",
    description: "Заверши пять уроков.",
    reward: 30,
    check: (s) => s.completed.length >= 5
  },
  {
    id: "ten",
    icon: "🧠",
    title: "Знаток",
    description: "Заверши десять уроков.",
    reward: 50,
    check: (s) => s.completed.length >= 10
  },
  {
    id: "threeCourses",
    icon: "🗺️",
    title: "Исследователь",
    description: "Изучи уроки трёх разных курсов.",
    reward: 35,
    check: (s) => new Set(s.completed.map((x) => x.split(":")[0])).size >= 3
  },
  {
    id: "streak3",
    icon: "🔥",
    title: "Хорошая привычка",
    description: "Занимайся три дня подряд.",
    reward: 30,
    check: (s) => s.streak >= 3
  },
  {
    id: "xp100",
    icon: "⚡",
    title: "Энергия знаний",
    description: "Набери 100 очков опыта.",
    reward: 25,
    check: (s) => s.xp >= 100
  }
];

function createDefaultState() {
  return {
    name: "Исследователь",
    grade: "6",
    language: "ru",
    avatar: "🧑‍🚀",
    xp: 0,
    crystals: 100,
    completed: [],
    unlockedAchievements: [],
    claimedRewards: [],
    friends: [
      { name: "Алекс", avatar: "🦊", xp: 120 },
      { name: "София", avatar: "🐼", xp: 90 }
    ],
    streak: 0,
    lastVisit: "",
    lastRewardDate: "",
    offlineLessons: [],
    lessonAttempts: 0
  };
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return createDefaultState();

    const parsed = JSON.parse(saved);
    const defaults = createDefaultState();

    return {
      ...defaults,
      ...parsed,
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      friends: Array.isArray(parsed.friends) ? parsed.friends : defaults.friends,
      unlockedAchievements: Array.isArray(parsed.unlockedAchievements)
        ? parsed.unlockedAchievements : [],
      claimedRewards: Array.isArray(parsed.claimedRewards)
        ? parsed.claimedRewards : [],
      offlineLessons: Array.isArray(parsed.offlineLessons)
        ? parsed.offlineLessons : []
    };
  } catch (error) {
    console.warn("Не удалось прочитать сохранение.", error);
    return createDefaultState();
  }
}

let state = loadState();
let toastTimer;

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    showToast("Не удалось сохранить данные браузера.");
    console.warn(error);
  }
}

function todayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function yesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function updateDailyStreak() {
  const today = todayString();

  if (state.lastVisit !== today) {
    if (state.lastVisit === yesterdayString()) {
      state.streak += 1;
    } else if (state.lastVisit !== today) {
      state.streak = 1;
    }

    state.lastVisit = today;
    saveState();
  }
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function getLevel(xp = state.xp) {
  return Math.floor(Math.max(0, xp) / 100) + 1;
}

function getLevelProgress(xp = state.xp) {
  return Math.max(0, xp) % 100;
}

function getLevelName(level) {
  if (level >= 10) return "Легендарный исследователь";
  if (level >= 7) return "Мастер знаний";
  if (level >= 4) return "Опытный исследователь";
  if (level >= 2) return "Любознательный ученик";
  return "Начинающий исследователь";
}

function getCourse(id) {
  return COURSES.find((course) => course.id === id);
}

function getLessonKey(courseId, index) {
  return `${courseId}:${index}`;
}

function isLessonComplete(courseId, index) {
  return state.completed.includes(getLessonKey(courseId, index));
}

function getCourseProgress(course) {
  const done = course.lessons.filter((_, index) =>
    isLessonComplete(course.id, index)
  ).length;

  return {
    done,
    total: course.lessons.length,
    percent: Math.round(done / course.lessons.length * 100)
  };
}

function updateUI() {
  $("#topStreak").textContent = state.streak;
  $("#topCrystals").textContent = state.crystals;
  $("#topAvatar").textContent = state.avatar;
  $("#greetingName").textContent = state.name;
  $("#homeXP").textContent = `${state.xp} XP`;
  $("#homeStreak").textContent = `${state.streak} ${plural(state.streak, "день", "дня", "дней")}`;
  $("#homeLessons").textContent = state.completed.length;
  $("#homeAchievements").textContent = state.unlockedAchievements.length;

  const goal = Math.min(3, state.completed.length);
  $("#goalCount").textContent = `${goal} из 3 уроков`;
  $("#goalPercent").textContent = `${Math.round(goal / 3 * 100)}%`;
  $("#goalBar").style.width = `${goal / 3 * 100}%`;

  $("#profileAvatar").textContent = state.avatar;
  $("#profileDisplayName").textContent = state.name;
  $("#profileName").value = state.name;
  $("#profileGrade").value = state.grade;
  $("#profileLanguage").value = state.language;
  $("#profileXP").textContent = `${state.xp} XP`;
  $("#profileLevel").textContent = `Уровень ${getLevel()}`;
  $("#profileBar").style.width = `${getLevelProgress()}%`;
  $("#profileNextLevel").textContent =
    `До следующего уровня: ${100 - getLevelProgress()} XP`;

  $("#achievementCount").textContent = state.unlockedAchievements.length;
  $("#achievementXP").textContent = `${state.xp} XP`;
  $("#leagueLevel").textContent = getLevelName(getLevel());

  renderCourseCards($("#homeCourses"), COURSES.slice(0, 3));
  renderCourseCards($("#allCourses"), filterCourses());
  renderCourseCards(
    $("#offlineCourses"),
    COURSES.filter((course) => state.offlineLessons.includes(course.id))
  );

  renderAchievements();
  renderLeaderboard();
  renderFriends();
  renderAvatarOptions();
}

function plural(number, one, few, many) {
  const n = Math.abs(number) % 100;
  const last = n % 10;
  if (n > 10 && n < 20) return many;
  if (last > 1 && last < 5) return few;
  if (last === 1) return one;
  return many;
}

/* ---------- Навигация ---------- */

const PAGE_NAMES = {
  home: "Главная",
  courses: "Мои курсы",
  assistant: "ИИ-помощник",
  offline: "Офлайн-уроки",
  achievements: "Достижения",
  league: "Лига учеников",
  friends: "Друзья",
  profile: "Мой профиль"
};

function showPage(pageName) {
  const page = PAGE_NAMES[pageName] ? pageName : "home";

  $$(".page").forEach((section) => {
    section.classList.toggle("active", section.id === `page-${page}`);
  });

  $$(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.page === page);
  });

  $("#breadcrumb").textContent = `Главная / ${PAGE_NAMES[page]}`;

  if (location.hash !== `#${page}`) {
    history.replaceState(null, "", `#${page}`);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-page]");
  if (!button) return;

  event.preventDefault();
  showPage(button.dataset.page);
});

window.addEventListener("hashchange", () => {
  showPage(location.hash.slice(1) || "home");
});

/* ---------- Карточки курсов ---------- */

function filterCourses() {
  const search = ($("#courseSearch")?.value || "").trim().toLowerCase();
  const grade = $("#gradeSelect")?.value || "all";

  return COURSES.filter((course) => {
    const matchesSearch = `${course.title} ${course.description} ${course.category}`
      .toLowerCase().includes(search);

    // Материалы демоверсии рассчитаны на разные уровни обучения.
    const matchesGrade = grade === "all" || true;

    return matchesSearch && matchesGrade;
  });
}

function renderCourseCards(container, courses) {
  if (!container) return;

  if (courses.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div style="font-size:30px">📚</div>
        <p>Здесь пока нет материалов. Попробуй другой поиск или добавь курс в офлайн-раздел.</p>
        <button class="btn btn-secondary" data-page="courses">Посмотреть курсы</button>
      </div>`;
    return;
  }

  container.innerHTML = courses.map((course) => {
    const progress = getCourseProgress(course);
    const savedOffline = state.offlineLessons.includes(course.id);

    return `
      <article class="course-card">
        <div class="course-top">
          <div class="course-icon" style="background:${course.color}20">
            ${course.icon}
          </div>
          <span class="course-badge">${escapeHTML(course.category)}</span>
        </div>
        <h3>${escapeHTML(course.title)}</h3>
        <p>${escapeHTML(course.description)}</p>
        <div class="course-meta">
          <span>📖 ${course.lessons.length} урока</span>
          <span>${progress.done}/${progress.total} завершено</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${progress.percent}%"></div>
        </div>
        <button class="btn btn-secondary" data-course="${course.id}">
          ${progress.done === progress.total ? "Повторить уроки" : "Открыть курс"} →
        </button>
        <button class="text-button" data-offline="${course.id}">
          ${savedOffline ? "✓ Сохранено в офлайн" : "↓ Сохранить материалы"}
        </button>
      </article>`;
  }).join("");
}

$("#courseSearch").addEventListener("input", () => {
  renderCourseCards($("#allCourses"), filterCourses());
});

$("#gradeSelect").addEventListener("change", () => {
  renderCourseCards($("#allCourses"), filterCourses());
});

document.addEventListener("click", (event) => {
  const courseButton = event.target.closest("[data-course]");
  if (courseButton) {
    openCourse(courseButton.dataset.course);
  }

  const offlineButton = event.target.closest("[data-offline]");
  if (offlineButton) {
    toggleOfflineCourse(offlineButton.dataset.offline);
  }
});

/* ---------- Уроки ---------- */

function openCourse(courseId) {
  const course = getCourse(courseId);
  if (!course) return;

  const completedCount = course.lessons.filter((_, index) =>
    isLessonComplete(course.id, index)
  ).length;

  const options = course.lessons.map((lesson, index) => {
    const completed = isLessonComplete(course.id, index);

    return `
      <div class="panel" style="margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:12px">
          <div class="course-icon" style="background:${course.color}20">
            ${completed ? "✅" : course.icon}
          </div>
          <div style="flex:1">
            <strong>${escapeHTML(lesson.title)}</strong>
            <div class="muted">${completed ? "Урок завершён" : "Новый урок"}</div>
          </div>
          <button class="btn btn-primary" data-start-lesson="${course.id}:${index}">
            ${completed ? "Повторить" : "Начать"}
          </button>
        </div>
      </div>`;
  }).join("");

  openModal(`
    <div class="modal-heading">
      <div class="course-icon" style="background:${course.color}20">${course.icon}</div>
      <div>
        <div class="eyebrow">${escapeHTML(course.category)}</div>
        <h2>${escapeHTML(course.title)}</h2>
        <p>${completedCount} из ${course.lessons.length} уроков завершено</p>
      </div>
    </div>
    <p>${escapeHTML(course.description)}</p>
    ${options}
  `);

  $("#modalContent").querySelectorAll("[data-start-lesson]").forEach((button) => {
    button.addEventListener("click", () => {
      const [id, index] = button.dataset.startLesson.split(":");
      openLesson(id, Number(index));
    });
  });
}

function openLesson(courseId, index) {
  const course = getCourse(courseId);
  const lesson = course?.lessons[index];

  if (!course || !lesson) return;

  openModal(`
    <div class="eyebrow">${escapeHTML(course.title)} · УРОК ${index + 1}</div>
    <h2>${escapeHTML(lesson.title)}</h2>
    <div class="lesson-explanation">${escapeHTML(lesson.text)}</div>
    <div class="notice">
      <span>💡</span>
      <div>
        <strong>Проверь себя</strong>
        <p>${escapeHTML(lesson.question)}</p>
      </div>
    </div>
    <form id="lessonAnswerForm" class="profile-form">
      <label>Твой ответ
        <input id="lessonAnswer" autocomplete="off" maxlength="100" required
          placeholder="Напиши ответ здесь...">
      </label>
      <button class="btn btn-primary" type="submit">Проверить ответ</button>
    </form>
    <div id="lessonFeedback" style="margin-top:15px"></div>
  `);

  $("#lessonAnswerForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const input = $("#lessonAnswer");
    const feedback = $("#lessonFeedback");
    const userAnswer = normalizeAnswer(input.value);
    const expected = normalizeAnswer(lesson.answer);

    if (userAnswer === expected) {
      const key = getLessonKey(courseId, index);
      const isNew = !state.completed.includes(key);

      if (isNew) {
        state.completed.push(key);
        state.xp += 20;
        state.crystals += 10;
        state.lessonAttempts += 1;
        checkAchievements();
        saveState();
        updateUI();
      }

      feedback.innerHTML = `
        <div class="notice" style="border-color:#51d6a044">
          <span>🎉</span><div>
            <strong>Правильно! Молодец!</strong>
            <p>${escapeHTML(lesson.explanation)}</p>
            <p>${isNew ? "Награда: +20 XP и +10 кристаллов." : "Этот урок уже засчитан. Ты можешь повторить его."}</p>
          </div>
        </div>
        <button class="btn btn-primary" id="nextLessonButton">Продолжить →</button>
      `;

      $("#nextLessonButton").addEventListener("click", () => {
        closeModal();

        if (index + 1 < course.lessons.length) {
          openLesson(courseId, index + 1);
        } else {
          showToast("Ты дошёл до конца курса! Отличная работа.");
          openCourse(courseId);
        }
      });
    } else {
      feedback.innerHTML = `
        <div class="notice" style="border-color:#ffb86b44">
          <span>💡</span><div>
            <strong>Попробуй ещё раз!</strong>
            <p>Внимательно прочитай объяснение и подумай над вопросом.
            Ошибки — это часть обучения.</p>
            <button class="text-button" id="showHint">Показать подсказку</button>
            <p id="lessonHint" hidden>${escapeHTML(lesson.explanation)}</p>
          </div>
        </div>`;

      $("#showHint").addEventListener("click", () => {
        $("#lessonHint").hidden = false;
        $("#showHint").hidden = true;
      });
    }
  });
}

function normalizeAnswer(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/ё/g, "е")
    .replace(/\s+/g, "")
    .replace(/[.,!?]/g, "");
}

/* ---------- Модальное окно ---------- */

function openModal(html) {
  closeModal();

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "activeModal";

  overlay.innerHTML = `
    <div class="modal-window" role="dialog" aria-modal="true"
      aria-label="Учебное окно">
      <button class="modal-close" aria-label="Закрыть">×</button>
      <div id="modalContent">${html}</div>
    </div>`;

  document.body.appendChild(overlay);

  overlay.querySelector(".modal-close").addEventListener("click", closeModal);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeModal();
  });

  const closeOnEscape = (event) => {
    if (event.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", closeOnEscape);
    }
  };

  document.addEventListener("keydown", closeOnEscape);
}

function closeModal() {
  $("#activeModal")?.remove();
}

/* ---------- Офлайн-материалы ---------- */

function toggleOfflineCourse(courseId) {
  const course = getCourse(courseId);
  if (!course) return;

  const index = state.offlineLessons.indexOf(courseId);

  if (index >= 0) {
    state.offlineLessons.splice(index, 1);
    showToast("Курс удалён из списка офлайн-материалов.");
  } else {
    state.offlineLessons.push(courseId);
    showToast("Материалы курса сохранены в этом браузере.");
  }

  saveState();
  updateUI();
}

/* ---------- Достижения ---------- */

function checkAchievements() {
  ACHIEVEMENTS.forEach((achievement) => {
    if (
      achievement.check(state) &&
      !state.unlockedAchievements.includes(achievement.id)
    ) {
      state.unlockedAchievements.push(achievement.id);

      if (!state.claimedRewards.includes(achievement.id)) {
        state.claimedRewards.push(achievement.id);
        state.crystals += achievement.reward;
      }

      showToast(`Новое достижение: ${achievement.title}! +${achievement.reward} 💎`);
    }
  });
}

function renderAchievements() {
  const container = $("#achievementGrid");
  if (!container) return;

  container.innerHTML = ACHIEVEMENTS.map((achievement) => {
    const unlocked = state.unlockedAchievements.includes(achievement.id);

    return `
      <article class="achievement-card ${unlocked ? "" : "locked"}">
        <div class="medal">${unlocked ? achievement.icon : "🔒"}</div>
        <h3>${escapeHTML(achievement.title)}</h3>
        <p>${escapeHTML(achievement.description)}</p>
        <span class="reward">
          ${unlocked ? "✓ Открыто" : `Награда: ${achievement.reward} 💎`}
        </span>
      </article>`;
  }).join("");
}

/* ---------- Лига ---------- */

function renderLeaderboard() {
  const demoUsers = [
    { name: "Алекс", avatar: "🦊", xp: 120 },
    { name: "София", avatar: "🐼", xp: 90 },
    { name: "Макс", avatar: "🤖", xp: 70 }
  ];

  const participants = [
    ...state.friends.map((friend) => ({ ...friend, demo: true })),
    { name: state.name, avatar: state.avatar, xp: state.xp, isMe: true }
  ];

  // Не добавляем одинаковых демонстрационных участников повторно.
  const seen = new Set();
  const uniqueParticipants = participants.filter((person) => {
    const key = `${person.name.toLowerCase()}:${person.isMe ? "me" : "friend"}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  demoUsers.forEach((user) => {
    if (!uniqueParticipants.some((person) => person.name === user.name)) {
      uniqueParticipants.push(user);
    }
  });

  uniqueParticipants.sort((a, b) => b.xp - a.xp);

  $("#leaderboard").innerHTML = uniqueParticipants.map((person, index) => `
    <div class="leader-row ${person.isMe ? "is-me" : ""}">
      <div class="leader-rank">${index + 1}</div>
      <div class="leader-avatar">${person.avatar || "🙂"}</div>
      <div class="leader-info">
        <strong>${escapeHTML(person.name)}${person.isMe ? " (ты)" : ""}</strong>
        <span>${getLevelName(getLevel(person.xp))}</span>
      </div>
      <div class="leader-xp">${person.xp} XP</div>
    </div>
  `).join("");
}

/* ---------- Друзья и подарки ---------- */

function renderFriends() {
  const container = $("#friendGrid");
  if (!container) return;

  if (state.friends.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div style="font-size:32px">👥</div>
        <p>Пока нет друзей. Добавь первого друга!</p>
      </div>`;
    return;
  }

  container.innerHTML = state.friends.map((friend, index) => `
    <article class="friend-card">
      <div class="friend-avatar">${friend.avatar || "🙂"}</div>
      <h3>${escapeHTML(friend.name)}</h3>
      <p>Уровень ${getLevel(friend.xp || 0)} · ${friend.xp || 0} XP</p>
      <button class="btn btn-secondary" data-gift="${index}">
        🎁 Подарить 10 💎
      </button>
      <button class="text-button" data-remove-friend="${index}">
        Удалить из списка
      </button>
    </article>
  `).join("");
}

$("#friendForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const input = $("#friendName");
  const name = input.value.trim();

  if (!name) return;

  if (name.toLowerCase() === state.name.toLowerCase()) {
    showToast("Это твоё имя. Попробуй добавить другого участника.");
    return;
  }

  if (state.friends.some((friend) => friend.name.toLowerCase() === name.toLowerCase())) {
    showToast("Такой друг уже есть в твоём списке.");
    return;
  }

  state.friends.push({
    name,
    avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    xp: 0
  });

  input.value = "";
  saveState();
  updateUI();
  showToast(`Друг ${name} добавлен!`);
});

document.addEventListener("click", (event) => {
  const giftButton = event.target.closest("[data-gift]");

  if (giftButton) {
    const index = Number(giftButton.dataset.gift);
    const friend = state.friends[index];

    if (!friend) return;

    if (state.crystals < 10) {
      showToast("Не хватает кристаллов для подарка.");
      return;
    }

    state.crystals -= 10;
    saveState();
    updateUI();
    showToast(`🎁 Подарок для ${friend.name} отправлен в деморежиме!`);
  }

  const removeButton = event.target.closest("[data-remove-friend]");

  if (removeButton) {
    const index = Number(removeButton.dataset.removeFriend);
    const friend = state.friends[index];

    if (!friend) return;

    if (!confirm(`Убрать ${friend.name} из списка друзей?`)) return;

    state.friends.splice(index, 1);
    saveState();
    updateUI();
    showToast("Друг удалён из списка.");
  }
});

/* ---------- Аватары ---------- */

function renderAvatarOptions() {
  const container = $("#avatarOptions");
  if (!container) return;

  container.innerHTML = AVATARS.map((avatar) => `
    <button class="avatar-option ${avatar === state.avatar ? "selected" : ""}"
      data-avatar="${avatar}" aria-label="Выбрать аватар ${avatar}">
      ${avatar}
    </button>
  `).join("");
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-avatar]");
  if (!button) return;

  state.avatar = button.dataset.avatar;
  saveState();
  updateUI();
  showToast("Аватар обновлён!");
});

$("#profileForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = $("#profileName").value.trim();

  if (!name) {
    showToast("Введи имя для профиля.");
    return;
  }

  state.name = name;
  state.grade = $("#profileGrade").value;
  state.language = $("#profileLanguage").value;

  saveState();
  updateUI();

  showToast("Профиль сохранён!");
});

/* ---------- Учебный помощник ---------- */

/*
  В демоверсии нет облачной нейросети.
  Ответы формируются локально по учебным правилам.
*/

function addMessage(text, role) {
  const container = $("#chatMessages");
  const message = document.createElement("div");

  message.className = `message ${role === "user" ? "user-message" : "assistant-message"}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = role === "user" ? state.avatar : "✦";

  const body = document.createElement("div");
  body.className = "message-body";

  const title = document.createElement("strong");
  title.textContent = role === "user" ? state.name : "Ultra AI";

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  body.append(title, paragraph);
  message.append(avatar, body);
  container.appendChild(message);

  container.scrollTop = container.scrollHeight;
}

function generateAssistantAnswer(input) {
  const text = input.toLowerCase().replace(/ё/g, "е").trim();

  if (/привет|здравствуй|добрый день|hello/.test(text)) {
    return "Привет! 😊 Давай учиться вместе. Я могу объяснить школьную тему, показать пример решения или предложить небольшую викторину.";
  }

  if (/дроб|1\/2|1\/4|обыкновенн/.test(text)) {
    return "Дробь показывает часть целого.\n\nНапример, 1/2 — это одна из двух равных частей, а 3/4 — три из четырёх.\n\nЧтобы сложить 1/2 и 1/4:\n1. Приведём к общему знаменателю: 1/2 = 2/4.\n2. Складываем числители: 2/4 + 1/4 = 3/4.\n\nОтвет: 3/4.";
  }

  if (/процент/.test(text)) {
    return "Процент — это одна сотая часть числа.\n\nПример: найдём 20% от 150.\n1. Запишем формулу: число × процент ÷ 100.\n2. 150 × 20 ÷ 100 = 30.\n\nОтвет: 30.\n\nТеперь попробуй самостоятельно найти 10% от 70!";
  }

  if (/уравнен|найди x|найти x/.test(text)) {
    return "Разберём пример: x + 7 = 15.\n\nШаг 1. Нужно оставить x отдельно.\nШаг 2. Вычитаем 7 из обеих частей: x = 15 − 7.\nШаг 3. Вычисляем: x = 8.\n\nПроверка: 8 + 7 = 15. Всё верно!\n\nПопробуй решить: x + 4 = 12.";
  }

  if (/двоич|информат/.test(text)) {
    return "В двоичной системе используются две цифры: 0 и 1.\n\nКомпьютеры представляют информацию с помощью двоичных данных.\n\nПример перевода числа 5 в двоичную систему:\n5 = 4 + 1 = 2² + 2⁰.\nПоэтому 5 в двоичной системе записывается как 101.\n\nХочешь, попробуем перевести другое число?";
  }

  if (/истори|егип|нил|цивилизац/.test(text)) {
    return "История изучает прошлое человечества. Историки используют документы, предметы, надписи и другие источники.\n\nИнтересный факт: река Нил играла огромную роль в жизни Древнего Египта. Её воды помогали выращивать урожай.\n\nПроверь себя: почему реки были важны для древних цивилизаций?";
  }

  if (/шахмат|ладья|корол|шах и мат/.test(text)) {
    return "Шахматы — игра, в которой важны стратегия и расчёт ходов.\n\nЛадья перемещается по горизонтали и вертикали. Слон — по диагонали. Конь ходит буквой «Г».\n\nСовет: перед каждым ходом проверь, какие фигуры соперника атакуют твою позицию.\n\nХочешь разобрать правила конкретной фигуры?";
  }

  if (/ноты|музык|ритм/.test(text)) {
    return "Основные названия нот: до, ре, ми, фа, соль, ля, си.\n\nРитм — это организация звуков и пауз во времени. Он помогает музыке сохранять движение.\n\nНебольшое упражнение: назови семь основных нот по порядку.";
  }

  if (/логик|викторин|задач/.test(text)) {
    return "Вот небольшая задача на логику!\n\nУ Маши было 3 коробки. В каждой лежало по 4 карандаша. Она подарила 2 карандаша. Сколько карандашей осталось?\n\nПодсказка: сначала умножь число коробок на количество карандашей в каждой, а затем вычти подаренные.";
  }

  if (/пример|вычисл|посчитай|сколько будет|реши/.test(text)) {
    const arithmetic = tryArithmetic(text);

    if (arithmetic !== null) {
      return `Разберём вычисление по шагам.\n\nВыражение: ${arithmetic.expression}\n\nРезультат: ${arithmetic.result}\n\nСовет: сначала выполняй действия в скобках, затем умножение и деление, а после — сложение и вычитание.`;
    }

    return "Я помогу разобраться! Напиши математическое выражение отдельно, например: 24 / 6 + 3.\n\nЕсли это текстовая задача, пришли её условие целиком. Мы выделим известные данные, выберем действие и проверим результат.";
  }

  if (/объясни|что такое|расскажи|почему|как решить/.test(text)) {
    return "Давай разберёмся вместе! 😊\n\nЧтобы объяснение было понятнее, попробуй написать:\n1. Название темы или точный вопрос.\n2. Пример из учебника, если он есть.\n3. Какую часть ты уже понял и где возникла трудность.\n\nЯ смогу подобрать объяснение и показать похожий пример.";
  }

  return "Я пока работаю в локальном учебном режиме и знаю несколько школьных тем.\n\nПопробуй спросить:\n• «Объясни дроби».\n• «Как находить проценты?».\n• «Как решать уравнения?».\n• «Расскажи про двоичную систему».\n• «Дай задачу на логику».\n\nДля ответов на любые вопросы потребуется подключить настоящую ИИ-модель через сервер.";
}

/*
  Безопасный разбор простых арифметических выражений.
  Код не использует eval() и Function().
*/

function tryArithmetic(input) {
  const match = input.match(/[-+]?\d+(?:[.,]\d+)?(?:\s*[-+*/×÷]\s*[-+]?\d+(?:[.,]\d+)?|\s*[()+*/×÷-]\s*\d+(?:[.,]\d+)?|\s*[()+-])*/);

  if (!match) return null;

  let expression = match[0].trim();

  if (!/\d/.test(expression)) return null;

  expression = expression
    .replace(/,/g, ".")
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\s+/g, "");

  if (!/^[\d.+\-*/()]+$/.test(expression)) return null;
  if (expression.length > 100) return null;

  const tokens = expression.match(/\d+(?:\.\d+)?|[()+\-*/]/g);
  if (!tokens || tokens.join("") !== expression) return null;

  let pos = 0;

  function parseExpression() {
    let value = parseTerm();

    while (tokens[pos] === "+" || tokens[pos] === "-") {
      const op = tokens[pos++];
      const right = parseTerm();
      value = op === "+" ? value + right : value - right;
    }

    return value;
  }

  function parseTerm() {
    let value = parseFactor();

    while (tokens[pos] === "*" || tokens[pos] === "/") {
      const op = tokens[pos++];
      const right = parseFactor();

      if (op === "/" && right === 0) {
        throw new Error("Деление на ноль");
      }

      value = op === "*" ? value * right : value / right;
    }

    return value;
  }

  function parseFactor() {
    if (tokens[pos] === "+") {
      pos++;
      return parseFactor();
    }

    if (tokens[pos] === "-") {
      pos++;
      return -parseFactor();
    }

    if (tokens[pos] === "(") {
      pos++;
      const value = parseExpression();

      if (tokens[pos] !== ")") throw new Error("Нет закрывающей скобки");
      pos++;

      return value;
    }

    const token = tokens[pos++];

    if (token === undefined || !/^\d+(?:\.\d+)?$/.test(token)) {
      throw new Error("Ожидалось число");
    }

    return Number(token);
  }

  try {
    const result = parseExpression();

    if (pos !== tokens.length || !Number.isFinite(result)) return null;

    const formatted = Number(result.toFixed(8)).toString();

    return {
      expression,
      result: formatted
    };
  } catch {
    return null;
  }
}

$("#chatForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const input = $("#chatInput");
  const question = input.value.trim();

  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  // Демо-ответ формируется на устройстве, без отправки вопроса на сервер.
  window.setTimeout(() => {
    addMessage(generateAssistantAnswer(question), "assistant");
  }, 180);
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-prompt]");
  if (!button) return;

  showPage("assistant");
  $("#chatInput").value = button.dataset.prompt;
  $("#chatInput").focus();
});

$("#clearChat").addEventListener("click", () => {
  $("#chatMessages").innerHTML = "";
  addMessage(
    "Чат очищен! 😊 Задай новый вопрос — попробуем разобраться вместе.",
    "assistant"
  );
});

/* ---------- Сброс прогресса ---------- */

$("#resetProgress").addEventListener("click", () => {
  const confirmed = confirm(
    "Точно сбросить прогресс Ultra School? Будут удалены сохранённые в этом браузере результаты, кристаллы и настройки."
  );

  if (!confirmed) return;

  state = createDefaultState();
  updateDailyStreak();
  saveState();
  updateUI();
  showPage("home");
  showToast("Прогресс сброшен.");
});

/* ---------- Запуск приложения ---------- */

function init() {
  updateDailyStreak();
  checkAchievements();
  updateUI();

  const requestedPage = location.hash.slice(1);
  showPage(PAGE_NAMES[requestedPage] ? requestedPage : "home");

  // Если браузер поддерживает PWA-кэширование, оно подключается отдельно.
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Сайт продолжает работать и без Service Worker.
    });
  }
}

init();