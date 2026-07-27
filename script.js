const root = document.documentElement;
const stage = document.querySelector(".orbit-stage");
const movingParts = document.querySelectorAll("[data-depth]");
const xValue = document.querySelector("#x-value");
const yValue = document.querySelector("#y-value");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updatePointer(clientX, clientY) {
  root.style.setProperty("--mx", `${clientX}px`);
  root.style.setProperty("--my", `${clientY}px`);

  if (!stage || reducedMotion.matches) return;

  const rect = stage.getBoundingClientRect();
  const normalizedX = Math.max(-1, Math.min(1, (clientX - rect.left - rect.width / 2) / (rect.width / 2)));
  const normalizedY = Math.max(-1, Math.min(1, (clientY - rect.top - rect.height / 2) / (rect.height / 2)));

  movingParts.forEach((part) => {
    const depth = Number(part.dataset.depth || 1);
    part.style.setProperty("--tx", `${normalizedX * 13 * depth}px`);
    part.style.setProperty("--ty", `${normalizedY * 13 * depth}px`);
  });

  xValue.textContent = String(Math.round((normalizedX + 1) * 50)).padStart(2, "0");
  yValue.textContent = String(Math.round((normalizedY + 1) * 50)).padStart(2, "0");
}

window.addEventListener("pointermove", (event) => updatePointer(event.clientX, event.clientY), { passive: true });
window.addEventListener("pointerleave", () => {
  movingParts.forEach((part) => {
    part.style.setProperty("--tx", "0px");
    part.style.setProperty("--ty", "0px");
  });
});
