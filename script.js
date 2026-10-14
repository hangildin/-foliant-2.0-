const modal = document.getElementById("briefModal");
const form = document.getElementById("briefForm");
const result = document.getElementById("briefResult");
const resultText = document.getElementById("briefText");
const copyButton = document.getElementById("copyBrief");
const closeButton = document.getElementById("closeBrief");

const presetProjectType = (path) => {
  const map = {
    full: "Книга под ключ",
    print: "Печать готового макета",
    tender: "Коммерческое предложение"
  };

  const value = map[path];
  if (!value) return;

  const input = form.querySelector(`input[value="${value}"]`);
  if (input) input.checked = true;
};

document.querySelectorAll(".js-open-brief").forEach((button) => {
  button.addEventListener("click", () => {
    presetProjectType(button.dataset.path);
    result.hidden = true;

    if (typeof modal.showModal === "function") {
      modal.showModal();
      document.body.classList.add("modal-open");
    }
  });
});

closeButton.addEventListener("click", () => modal.close());

modal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const projectType = data.get("projectType") || "Не указано";
  const company = (data.get("company") || "").trim() || "Не указано";
  const contact = (data.get("contact") || "").trim() || "Не указано";
  const run = data.get("run") || "Не указано";
  const deadline = data.get("deadline") || "Не указано";
  const task = (data.get("task") || "").trim() || "Не описана";

  const text =
`ЗАЯВКА В «ФОЛИАНТ»

Организация / имя: ${company}
Контакт: ${contact}
Задача: ${projectType}
Тираж: ${run}
Срок: ${deadline}

Описание:
${task}`;

  resultText.textContent = text;
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

copyButton.addEventListener("click", async () => {
  const text = resultText.textContent;

  try {
    await navigator.clipboard.writeText(text);
    const original = copyButton.textContent;
    copyButton.textContent = "Скопировано";
    setTimeout(() => {
      copyButton.textContent = original;
    }, 1400);
  } catch {
    copyButton.textContent = "Выделите текст выше";
  }
});

if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}
