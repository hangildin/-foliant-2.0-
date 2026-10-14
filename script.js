const modal = document.getElementById("briefModal");
const form = document.getElementById("briefForm");
const result = document.getElementById("briefResult");
const resultText = document.getElementById("briefText");
const copyButton = document.getElementById("copyBrief");

document.querySelectorAll(".js-open-brief").forEach((button) => {
  button.addEventListener("click", () => {
    const path = button.dataset.path;

    if (path === "print") {
      const input = form.querySelector('input[value="Печать готового макета"]');
      if (input) input.checked = true;
    } else if (path === "full") {
      const input = form.querySelector('input[value="Книга под ключ"]');
      if (input) input.checked = true;
    }

    result.hidden = true;
    modal.showModal();
    document.body.classList.add("modal-open");
  });
});

modal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

modal.addEventListener("click", (event) => {
  const bounds = modal.getBoundingClientRect();
  const clickedOutside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (clickedOutside) modal.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const projectType = data.get("projectType") || "Не указано";
  const run = data.get("run") || "Не указано";
  const deadline = data.get("deadline") || "Не указано";
  const task = (data.get("task") || "").trim() || "Не описана";

  const text =
`ЗАЯВКА В «ФОЛИАНТ»

Задача: ${projectType}
Тираж: ${run}
Срок: ${deadline}

Описание:
${task}

Контакт: ____________________`;

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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
