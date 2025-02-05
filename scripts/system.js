const components = [
    "card",
    "roller",
    "pack",
    "customPrompt",
    "notification",
    "money",
    "tooltip",
];

const utils = ["version", "supabase"];
const scripts = ["client", "tabs", "packShop"];
const assets = ["cards", "variants", "packs"];
const styles = ["main", "topbar", "notification", "store", "prompt", "roller", "card"]

function deepFreeze(obj) {
    Object.freeze(obj);
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            deepFreeze(obj[key]);
        }
    });
}

function loadFile(dir, component, type) {
    return new Promise((resolve, reject) => {
        const tag = document.createElement(type);
        tag[type == "script" ? "src" : "href"] = `./${dir}/${component}.${type == "script" ? "js" : "css"}`;
        if (type == "link") tag.rel = "stylesheet";
        tag.async = true;

        tag.onload = resolve;
        tag.onerror = reject;

        document.head.appendChild(tag);
    });
}

async function loadFiles(dir, files, type = "script") {
    try {
        const scriptPromises = files.map((component) =>
            loadFile(dir, component, type)
        );
        await Promise.all(scriptPromises);
    } catch (error) {
        console.error("Error loading components!", error);
    }
}

async function loadAll() {
    await loadFiles("styles", styles, "link");
    await loadFiles("assets", assets);
    await loadFiles("utils", utils);
    await loadFiles("components", components);
    await loadFiles("scripts", scripts);
}

loadAll();
