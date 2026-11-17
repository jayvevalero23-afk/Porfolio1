document.documentElement.classList.add("js");

/* Personal content is grouped here so it is easy to update without changing the layout. */
const PROFILE = {
  // Add only real public profile URLs. Leave any field blank to keep it hidden.
  links: {
    github: "",
    linkedin: "",
    email: "",
    facebook: "",
    otherLabel: "",
    otherUrl: "",
  },
  // Paste a real form-service endpoint here after you have configured one.
  formEndpoint: "",
};

const skillAreas = [
  {
    category: "Programming",
    name: "Programming fundamentals",
    detail:
      "Building a stronger foundation in coding concepts, syntax, and logic.",
    status: "Learning",
    icon: "{ }",
  },
  {
    category: "Programming",
    name: "Algorithms & problem-solving",
    detail: "Practicing how to break a challenge into smaller, workable steps.",
    status: "Practicing",
    icon: "⌘",
  },
  {
    category: "Web development",
    name: "Web development",
    detail:
      "Exploring how websites are structured, styled, and made responsive.",
    status: "Learning",
    icon: "</>",
  },
  {
    category: "Software development",
    name: "Application development",
    detail: "Learning how ideas can become useful software and applications.",
    status: "Learning",
    icon: "▣",
  },
  {
    category: "Game development",
    name: "Game mechanics",
    detail:
      "Exploring the rules and systems that make an interactive world engaging.",
    status: "Learning",
    icon: "✳",
  },
  {
    category: "Game development",
    name: "Game design concepts",
    detail:
      "Thinking about characters, environments, play, and memorable experiences.",
    status: "Learning",
    icon: "◇",
  },
];

const gameGenres = [
  "Action & adventure",
  "Open-world",
  "Strategy & competitive",
  "Role-playing",
  "Sandbox & creative",
  "Fighting",
  "Indie",
];

const projects = [
  {
    title: "Personal Portfolio Website",
    status: "Built",
    art: "portfolio",
    icon: "JV",
    artTitle: "MY DIGITAL WORLD",
    description:
      "A personal home for my programming journey, gaming interests, and future work.",
    technologies: ["HTML5", "CSS3", "Vanilla JavaScript"],
    features:
      "Responsive sections, a Philippine Time clock, interactive game collection, project ideas, and an editable personal roadmap.",
    repository: "",
    demo: "",
  },
  {
    title: "Student Management System",
    status: "Idea",
    art: "student",
    icon: "▤",
    artTitle: "STUDENT SYSTEM",
    description:
      "An application concept for organizing student information and academic records.",
    technologies: ["To be chosen"],
    features:
      "Possible features include student profiles, course records, and a simple search. Plan the data model before choosing a stack.",
    repository: "",
    demo: "",
  },
  {
    title: "Weather Application",
    status: "Idea",
    art: "weather",
    icon: "☼",
    artTitle: "WEATHER APP",
    description:
      "A weather app concept for showing local conditions and helpful recommendations.",
    technologies: ["To be chosen"],
    features:
      "A future version could use a weather API, location search, and accessible forecast summaries. An API service would need to be configured.",
    repository: "",
    demo: "",
  },
  {
    title: "Game Development Project",
    status: "Idea",
    art: "game",
    icon: "△",
    artTitle: "PLAYABLE WORLD",
    description:
      "A future prototype for exploring gameplay, controls, and interactive systems.",
    technologies: ["Game engine to be chosen"],
    features:
      "Start with one playable mechanic, then build the controls and world around it. No prototype is claimed yet.",
    repository: "",
    demo: "",
  },
  {
    title: "Creative Programming Experiments",
    status: "Idea",
    art: "experiment",
    icon: "✳",
    artTitle: "TRY SOMETHING",
    description:
      "A collection for small coding exercises and experiments as they take shape.",
    technologies: ["Add as projects are built"],
    features:
      "Use this space for real experiments once they exist; add a short description and links in script.js.",
    repository: "",
    demo: "",
  },
];

const goals = {
  short: [
    "Improve my programming fundamentals.",
    "Build more websites and software projects.",
    "Practice algorithms, debugging, and problem-solving.",
    "Learn more about software development tools.",
    "Create small, playable games.",
  ],
  long: [
    "Become a professional game developer.",
    "Develop original games with unique mechanics and memorable experiences.",
    "Improve my software engineering skills.",
    "Collaborate with other developers and creative people.",
    "Publish projects that people can use and enjoy.",
  ],
};

const storage = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (_) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) {
      return false;
    }
  },
};

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderFilters(host, items, selected, onSelect, prefix) {
  host.replaceChildren();
  const all = ["All", ...items];
  all.forEach(function (item) {
    const button = makeElement("button", "filter-chip", item);
    button.type = "button";
    button.setAttribute("aria-pressed", String(item === selected));
    button.addEventListener("click", function () {
      onSelect(item);
      host.querySelectorAll("button").forEach(function (chip) {
        chip.setAttribute("aria-pressed", String(chip === button));
      });
    });
    button.dataset.filterPrefix = prefix;
    host.append(button);
  });
}

/* Filterable learning areas: adjust skillAreas above as your experience changes. */
const skillHost = document.getElementById("skill-grid");
const skillFilters = document.getElementById("skill-filters");
let activeSkillCategory = "All";
const skillCategories = [
  ...new Set(
    skillAreas.map(function (skill) {
      return skill.category;
    }),
  ),
];

function renderSkills() {
  skillHost.replaceChildren();
  const visible = skillAreas.filter(function (skill) {
    return (
      activeSkillCategory === "All" || skill.category === activeSkillCategory
    );
  });
  visible.forEach(function (skill) {
    const card = makeElement("article", "skill-card");
    const icon = makeElement("div", "skill-icon", skill.icon);
    icon.setAttribute("aria-hidden", "true");
    const category = makeElement("div", "skill-category", skill.category);
    const title = makeElement("h3", "", skill.name);
    const description = makeElement("p", "", skill.detail);
    const status = makeElement(
      "span",
      "skill-status status-" + skill.status.toLowerCase(),
      skill.status,
    );
    card.append(icon, category, title, description, status);
    skillHost.append(card);
  });
}
renderFilters(
  skillFilters,
  skillCategories,
  activeSkillCategory,
  function (value) {
    activeSkillCategory = value;
    renderSkills();
  },
  "skill",
);
renderSkills();

/* The collection begins empty. Add only games Jayve actually plays or enjoys. */
let games = storage.get("jayvePortfolioGames", []);
if (!Array.isArray(games)) games = [];
let activeGameGenre = "All";
const gameHost = document.getElementById("game-grid");
const gameSearch = document.getElementById("game-search");
const gameFilters = document.getElementById("game-filters");
const gameGenreSelect = document.querySelector(
  "#game-form-panel select[name='genre']",
);

function renderGameFilters() {
  renderFilters(
    gameFilters,
    gameGenres,
    activeGameGenre,
    function (value) {
      activeGameGenre = value;
      renderGames();
    },
    "game",
  );
}
function renderGames() {
  const query = gameSearch.value.trim().toLowerCase();
  const visible = games.filter(function (game) {
    const matchesGenre =
      activeGameGenre === "All" || game.genre === activeGameGenre;
    const matchesSearch =
      !query ||
      (game.title + " " + game.genre + " " + (game.description || ""))
        .toLowerCase()
        .includes(query);
    return matchesGenre && matchesSearch;
  });
  gameHost.replaceChildren();
  if (visible.length === 0) {
    const empty = makeElement("div", "empty-state");
    const content = document.createElement("div");
    content.append(
      makeElement(
        "span",
        "empty-state-mark",
        query || activeGameGenre !== "All" ? "⌕" : "＋",
      ),
    );
    content.append(
      makeElement(
        "strong",
        "",
        query
          ? "No games match that search."
          : games.length
            ? "No games in this genre yet."
            : "Your gaming collection starts here.",
      ),
    );
    content.append(
      makeElement(
        "p",
        "",
        games.length
          ? "Try another search or genre, or add a title to your collection."
          : "Add a game you actually play or enjoy. Nothing is pre-filled.",
      ),
    );
    empty.append(content);
    gameHost.append(empty);
    return;
  }
  visible.forEach(function (game) {
    const card = makeElement("article", "game-card");
    const top = makeElement("div", "game-card-top");
    top.append(makeElement("span", "game-genre", game.genre));
    const remove = makeElement("button", "game-delete", "Remove");
    remove.type = "button";
    remove.setAttribute(
      "aria-label",
      "Remove " + game.title + " from collection",
    );
    remove.addEventListener("click", function () {
      games = games.filter(function (item) {
        return item.id !== game.id;
      });
      storage.set("jayvePortfolioGames", games);
      renderGames();
    });
    top.append(remove);
    card.append(top, makeElement("h3", "", game.title));
    if (game.description) card.append(makeElement("p", "", game.description));
    gameHost.append(card);
  });
}
gameGenres.forEach(function (genre) {
  const option = makeElement("option", "", genre);
  option.value = genre;
  gameGenreSelect.append(option);
});
renderGameFilters();
renderGames();
gameSearch.addEventListener("input", renderGames);

const gamePanel = document.getElementById("game-form-panel");
const gameToggle = document.getElementById("toggle-game-form");
gameToggle.addEventListener("click", function () {
  const opening = gamePanel.hidden;
  gamePanel.hidden = !opening;
  gameToggle.setAttribute("aria-expanded", String(opening));
  if (opening) gamePanel.querySelector("input[name='title']").focus();
});
gamePanel.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!gamePanel.reportValidity()) return;
  const data = new FormData(gamePanel);
  games.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    title: String(data.get("title")).trim(),
    genre: String(data.get("genre")),
    description: String(data.get("description")).trim(),
  });
  storage.set("jayvePortfolioGames", games);
  gamePanel.reset();
  gamePanel.hidden = true;
  gameToggle.setAttribute("aria-expanded", "false");
  activeGameGenre = "All";
  renderGameFilters();
  renderGames();
  gameHost.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "center",
  });
});

const gamingProfileForm = document.getElementById("gaming-profile-form");
const profileNote = document.getElementById("gaming-profile-note");
const savedGamingProfile = storage.get("jayvePortfolioProfile", {});
Object.entries(savedGamingProfile || {}).forEach(function (entry) {
  const input = gamingProfileForm.elements.namedItem(entry[0]);
  if (input) input.value = entry[1];
});
gamingProfileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(gamingProfileForm).entries());
  const saved = storage.set("jayvePortfolioProfile", data);
  profileNote.textContent = saved
    ? "Saved in this browser."
    : "Browser storage is unavailable.";
  window.setTimeout(function () {
    profileNote.textContent = "";
  }, 3500);
});

/* Project cards use CSS artwork so the page has no broken or remote image links. */
const projectHost = document.getElementById("project-grid");
projects.forEach(function (project) {
  const article = makeElement("article", "project-card reveal");
  const art = makeElement("div", "project-art art-" + project.art);
  art.setAttribute("aria-hidden", "true");
  const artInner = makeElement("div", "project-art-inner");
  artInner.append(
    makeElement("span", "project-art-icon", project.icon),
    makeElement("span", "project-art-title", project.artTitle),
  );
  art.append(artInner);
  const body = makeElement("div", "project-card-body");
  const row = makeElement("div", "project-title-row");
  const title = makeElement("h3", "", project.title);
  const status = makeElement(
    "span",
    "status-pill " + (project.status === "Idea" ? "status-idea" : ""),
    project.status.toUpperCase(),
  );
  row.append(title, status);
  body.append(row, makeElement("p", "", project.description));
  const details = document.createElement("details");
  details.className = "project-extra";
  const summary = makeElement("summary", "", "View project details");
  const content = makeElement("div", "project-extra-content");
  content.append(makeElement("h4", "", "TECHNOLOGIES"));
  const tags = makeElement("div", "project-tags");
  project.technologies.forEach(function (technology) {
    tags.append(makeElement("span", "", technology));
  });
  content.append(
    tags,
    makeElement("h4", "", "FEATURES / NEXT STEP"),
    makeElement("p", "", project.features),
  );
  const links = makeElement("div", "project-links");
  if (project.repository && isSafeHttpUrl(project.repository)) {
    const repository = makeElement("a", "", "GitHub repository ↗");
    repository.href = project.repository;
    repository.target = "_blank";
    repository.rel = "noreferrer";
    links.append(repository);
  }
  if (project.demo && isSafeHttpUrl(project.demo)) {
    const demo = makeElement("a", "", "Live demo ↗");
    demo.href = project.demo;
    demo.target = "_blank";
    demo.rel = "noreferrer";
    links.append(demo);
  }
  if (links.childElementCount) content.append(links);
  details.append(summary, content);
  body.append(details);
  article.append(art, body);
  projectHost.append(article);
});

function isSafeHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch (_) {
    return false;
  }
}

/* Checkable roadmap milestones are stored locally on this device. */
function renderGoals(host, items, group) {
  const checked = storage.get("jayvePortfolioGoals", {});
  items.forEach(function (label, index) {
    const row = makeElement("div", "goal-item");
    const input = document.createElement("input");
    const id = "goal-" + group + "-" + index;
    input.type = "checkbox";
    input.id = id;
    input.checked = Boolean(checked[id]);
    const text = makeElement("label", "", label);
    text.htmlFor = id;
    input.addEventListener("change", function () {
      const current = storage.get("jayvePortfolioGoals", {});
      current[id] = input.checked;
      storage.set("jayvePortfolioGoals", current);
    });
    row.append(input, text);
    host.append(row);
  });
}
renderGoals(document.getElementById("short-goals"), goals.short, "short");
renderGoals(document.getElementById("long-goals"), goals.long, "long");

/* Social links are created only after real addresses are entered in PROFILE. */
const socialHost = document.getElementById("social-links");
const socialHint = document.getElementById("social-hint");
const socialItems = [
  ["github", "GitHub", "↗"],
  ["linkedin", "LinkedIn", "↗"],
  ["email", "Email", "↗"],
  ["facebook", "Facebook", "↗"],
];
let shownProfiles = 0;
socialItems.forEach(function (item) {
  const value = PROFILE.links[item[0]].trim();
  if (!value) return;
  let href = value;
  if (item[0] === "email") {
    const at = value.indexOf("@");
    const dot = value.lastIndexOf(".");
    if (
      at < 1 ||
      dot < at + 2 ||
      dot >= value.length - 1 ||
      value.includes(" ")
    )
      return;
    href = "mailto:" + value;
  } else if (!isSafeHttpUrl(value)) {
    return;
  }
  const link = makeElement("a", "social-link");
  link.href = href;
  link.append(document.createTextNode(item[1] + " "));
  link.append(makeElement("span", "", item[2]));
  if (item[0] !== "email") {
    link.target = "_blank";
    link.rel = "noreferrer";
  }
  socialHost.append(link);
  shownProfiles += 1;
});
if (
  PROFILE.links.otherLabel.trim() &&
  isSafeHttpUrl(PROFILE.links.otherUrl.trim())
) {
  const link = makeElement("a", "social-link");
  link.href = PROFILE.links.otherUrl.trim();
  link.target = "_blank";
  link.rel = "noreferrer";
  link.append(document.createTextNode(PROFILE.links.otherLabel.trim() + " "));
  link.append(makeElement("span", "", "↗"));
  socialHost.append(link);
  shownProfiles += 1;
}
if (shownProfiles) socialHint.hidden = true;

/* The contact form validates locally and reports clearly when no sender is configured. */
const contactForm = document.getElementById("contact-form");
const contactFeedback = document.getElementById("contact-feedback");
contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  contactFeedback.classList.remove("error");
  if (!contactForm.reportValidity()) {
    contactFeedback.textContent =
      "Please complete the required fields with a valid email address.";
    contactFeedback.classList.add("error");
    return;
  }
  if (!PROFILE.formEndpoint.trim()) {
    contactFeedback.textContent =
      "Your message is valid, but no form service is connected, so it was not sent. Add your own endpoint in script.js.";
    return;
  }
  if (!isSafeHttpUrl(PROFILE.formEndpoint)) {
    contactFeedback.textContent =
      "The configured form endpoint must use a valid HTTP or HTTPS URL.";
    contactFeedback.classList.add("error");
    return;
  }
  const submit = contactForm.querySelector("button[type='submit']");
  submit.disabled = true;
  submit.textContent = "Sending…";
  try {
    const response = await fetch(PROFILE.formEndpoint, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });
    if (!response.ok)
      throw new Error("The form service did not accept the message.");
    contactFeedback.textContent = "Message sent. Thank you for reaching out!";
    contactForm.reset();
  } catch (_) {
    contactFeedback.textContent =
      "The form service could not send this message. Please check the configured endpoint.";
    contactFeedback.classList.add("error");
  } finally {
    submit.disabled = false;
    submit.innerHTML = 'Check message <span aria-hidden="true">↗</span>';
  }
});

/* Philippine Time uses the Asia/Manila timezone regardless of the visitor's device. */
function updatePhilippineClock() {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const date = new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  document.getElementById("philippine-clock").textContent = time.format(now);
  document.getElementById("philippine-date").textContent = date.format(now);
}
updatePhilippineClock();
window.setInterval(updatePhilippineClock, 1000);

/* Decorative status text cycles without affecting the site's content or controls. */
const typingMessages = [
  "Initializing developer mode...",
  "Loading creativity...",
  "Building new ideas...",
  "Compiling the future...",
  "Ready to create.",
];
const heroTyping = document.getElementById("typing-text");
const workspaceTyping = document.getElementById("workspace-typing");
if (reduceMotion) {
  heroTyping.textContent = "Ready to create.";
  workspaceTyping.textContent = "Ready to create.";
} else {
  let typingIndex = 0;
  let characterIndex = 0;
  let deletingText = false;
  function cycleTyping() {
    const message = typingMessages[typingIndex];
    characterIndex += deletingText ? -1 : 1;
    const visibleText = message.slice(0, characterIndex);
    heroTyping.textContent = visibleText;
    workspaceTyping.textContent = visibleText;
    if (!deletingText && characterIndex >= message.length) {
      deletingText = true;
      window.setTimeout(cycleTyping, 950);
      return;
    }
    if (deletingText && characterIndex <= 0) {
      deletingText = false;
      typingIndex = (typingIndex + 1) % typingMessages.length;
    }
    window.setTimeout(cycleTyping, deletingText ? 28 : 58);
  }
  cycleTyping();
}

/* Mobile navigation supports touch, keyboard, and the Escape key. */
const menuToggle = document.getElementById("menu-toggle");
const primaryNav = document.getElementById("primary-nav");
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  primaryNav.classList.remove("is-open");
  primaryNav.inert = window.matchMedia("(max-width: 700px)").matches;
  document.body.classList.remove("menu-open");
}
primaryNav.inert = window.matchMedia("(max-width: 700px)").matches;
menuToggle.addEventListener("click", function () {
  const opening = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(opening));
  menuToggle.setAttribute(
    "aria-label",
    opening ? "Close navigation" : "Open navigation",
  );
  primaryNav.inert =
    !opening && window.matchMedia("(max-width: 700px)").matches;
  primaryNav.classList.toggle("is-open", opening);
  document.body.classList.toggle("menu-open", opening);
});
primaryNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});
document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuToggle.focus();
  }
});
window.addEventListener("resize", function () {
  if (window.innerWidth > 700) closeMenu();
});

/* Keep the top progress indicator and gentle section reveals in sync with scrolling. */
function updateScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const amount = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  document.getElementById("progress-bar").style.width = amount + "%";
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

const revealItems = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach(function (item) {
    item.classList.add("is-visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -35px 0px", threshold: 0.05 },
  );
  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
}

/* Small, low-contrast background particles; no animation is started for reduced motion. */
(function startParticles() {
  const canvas = document.getElementById("particles");
  const context = canvas.getContext && canvas.getContext("2d");
  if (!context || reduceMotion) return;
  let width = 0,
    height = 0,
    points = [];
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(45, Math.max(18, Math.floor(width / 29)));
    points = Array.from({ length: count }, function () {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.15 + 0.25,
        vy: Math.random() * 0.12 + 0.035,
        vx: (Math.random() - 0.5) * 0.07,
        a: Math.random() * 0.25 + 0.07,
      };
    });
  }
  function draw() {
    context.clearRect(0, 0, width, height);
    points.forEach(function (point) {
      point.y += point.vy;
      point.x += point.vx;
      if (point.y > height + 3) {
        point.y = -3;
        point.x = Math.random() * width;
      }
      if (point.x < -3) point.x = width + 3;
      if (point.x > width + 3) point.x = -3;
      context.beginPath();
      context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      context.fillStyle = "rgba(164,186,218," + point.a + ")";
      context.fill();
    });
    window.requestAnimationFrame(draw);
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });
  draw();
})();
