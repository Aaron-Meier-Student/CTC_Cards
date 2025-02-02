const components = [
    "card",
    "roller",
    "pack",
    "prompt",
    "notification",
    "money",
    "tooltip",
];

const utils = ["version", "supabase"];
const scripts = ["client", "tabs"];

function loadScript(dir, component) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `${dir}/${component}.js`;
        script.async = true;

        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
    });
}

async function loadScripts(dir, files) {
    try {
        const scriptPromises = files.map((component) =>
            loadScript(dir, component)
        );
        await Promise.all(scriptPromises);
    } catch (error) {
        console.error("Error loading components!", error);
    }
}
async function loadAll() {
    await loadScripts("components", components);
    await loadScripts("utils", utils);
    await loadScripts("scripts", scripts);
}

loadAll();
