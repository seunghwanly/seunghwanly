const root = document.documentElement;
const system = document.querySelector(".solar-system");
const movingParts = document.querySelectorAll("[data-depth]");
const stackName = document.querySelector("#stack-name");
const stackDetail = document.querySelector("#stack-detail");
const planets = document.querySelectorAll("[data-stack]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updatePointer(clientX, clientY) {
  root.style.setProperty("--mx", `${clientX}px`);
  root.style.setProperty("--my", `${clientY}px`);
  if (!system || reducedMotion.matches) return;

  const rect = system.getBoundingClientRect();
  const x = Math.max(-1, Math.min(1, (clientX - rect.left - rect.width / 2) / (rect.width / 2)));
  const y = Math.max(-1, Math.min(1, (clientY - rect.top - rect.height / 2) / (rect.height / 2)));

  system.style.setProperty("--rx", `${y * -5}deg`);
  system.style.setProperty("--ry", `${x * 6}deg`);
  movingParts.forEach((part) => {
    const depth = Number(part.dataset.depth || 1);
    part.style.setProperty("--tx", `${x * 7 * depth}px`);
    part.style.setProperty("--ty", `${y * 7 * depth}px`);
  });
}

function showStack(planet) {
  stackName.textContent = planet.dataset.stack;
  stackDetail.textContent = planet.dataset.detail;
}

window.addEventListener("pointermove", (event) => updatePointer(event.clientX, event.clientY), { passive: true });
system?.addEventListener("pointerleave", () => {
  system.style.setProperty("--rx", "0deg");
  system.style.setProperty("--ry", "0deg");
});
planets.forEach((planet) => {
  planet.addEventListener("pointerenter", () => showStack(planet));
  planet.addEventListener("focus", () => showStack(planet));
  planet.addEventListener("click", () => showStack(planet));
});
