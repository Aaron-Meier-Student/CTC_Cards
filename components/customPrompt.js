function customPrompt({ title, inputs }) {
    const promptHolder = document.getElementById("promptHolder");
    const customPrompt = document.getElementById("promptDisplay");
    customPrompt.innerHTML = `<h2>${title}</h2>`;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].includes("input")) {
            customPrompt.innerHTML += `
                <div class="input">
                    ${inputs[i]}
                    <div></div>
                </div>
            `
            continue;
        }
        if (typeof inputs[i] == "object") {
            customPrompt.insertAdjacentHTML(
                "beforeend",
                inputs[i][0]
            );
            const btn = customPrompt.lastElementChild;
            btn.addEventListener("click", () => {
                inputs[i][1](customPrompt)
            });
            continue;
        }
        customPrompt.innerHTML += inputs[i];
    }

    promptHolder.className = "fadeOut";
    setTimeout(() => {
        promptHolder.className = "fadeIn";
    }, 100);
}

function closeCustomPrompt() {
    promptHolder.className = "fadeOut";
    setTimeout(() => {
        promptHolder.className = "fadeOut hidden";
    }, 500);
}

document.getElementById("promptHolder").addEventListener("click", (e) => {
    if (e.target != document.getElementById("promptHolder")) return;
    closeCustomPrompt();
})