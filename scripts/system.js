// Must be updated when new componets are created.
const components = ["card", "roller", "pack", "tab"];

function loadScript(component) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `components/${component}.js`;
    script.async = true;

    script.onload = resolve;
    script.onerror = reject;

    document.body.appendChild(script);
  });
}

function loadScripts() {
  const scriptPromises = components.map((component) => loadScript(component));
  Promise.all(scriptPromises)
    .then(() => {
      Main();
    })
    .catch(() => {
      console.error("Error loading components!");
    });
}

document.addEventListener("DOMContentLoaded", loadScripts);

function Main() {}
