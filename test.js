function updateCard(card) {
    document.querySelector("#opener > section > div > div").innerHTML = "";

    let newCard = document.createElement("div");
    let CardPre = document.createElement("h4");
    let CardName = document.createElement("h4");
    let CardSpecial = document.createElement("h4");
    let CardPrice = document.createElement("h4");
    let CardPattern = document.createElement("div");
    newCard.appendChild(CardPre);
    newCard.appendChild(CardName);
    newCard.appendChild(CardSpecial);
    newCard.appendChild(CardPrice);
    newCard.appendChild(CardPattern);

    newCard.className = "card-back";
    let changes = tryParseJSON(card.Changes);
    changes = changes ? changes : {};

    newCard.style.border = `6px solid rgb(${card.BaseColor})`;

    for (let [key, value] of Object.entries(changes)) {
        if (key == "filter") {
            continue;
        }
        newCard.style[key] = value;
    }

    /*const filter = getAccurateFilter(`rgb(${card.BaseColor})`, 1);
    CardPattern.style.filter = filter.split("filter: ")[1].split(";")[0];*/

    CardPre.style.color = `rgb(${card.PreColor})`;
    CardPre.innerText = card.Pre;
    CardName.innerText = card.Display;
    CardSpecial.innerText = card.AltDisplay;
    CardPrice.innerText = `$${card.Price.toFixed(2)}`;
    CardPattern.style.backgroundImage = `url(${card.Pattern})`;

    newCard.style.transform = "rotateY(0)";
    document
        .querySelector("#opener > section > div > div")
        .appendChild(newCard);
}

function formatDataString(str) {
    let updatedStr = str.replace(/<RANDOM:(\d+)-(\d+)>/g, (_, min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + Number(min);
    });
    return updatedStr;
}

function getAccurateFilter(value, attempts) {
    const rgb = typeof value == "string" ? parseRgbString(value) : value;
    const filter = new Solver(new Color(rgb[0], rgb[1], rgb[2])).solve();
    if (attempts >= 20) console.log("MAX ATTEMPTS");
    return attempts >= 20
        ? filter.filter
        : filter.loss > 0.3
        ? getAccurateFilter(rgb, attempts + 1)
        : filter.filter;
}

function tryParseJSON(jsonString, defaultValue = null) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return null;
    }
}

updateCard({
    Display: "Student Name",
    AltDisplay: "",
    Pre: "",
    PreColor: "",
    BaseColor: "255,255,255",
    Pattern: "",
    Changes: "{}",
    Price: 1,
});

document.getElementById("set").addEventListener("click", () => {
    updateCard({
        Display: "Student Name",
        AltDisplay: document.querySelector("#display input").value,
        Pre: document.querySelector("#pre input").value,
        PreColor: hexToRgb(document.querySelector("#base input").value),
        BaseColor: hexToRgb(document.querySelector("#base input").value),
        Pattern: document.querySelector("#pattern input").value,
        Changes: document.querySelector("#json input").value,
        Price: 1,
    });
});
document.getElementById("export").addEventListener("click", () => {
    CardData = {
        Display: "Student Name",
        AltDisplay: document.querySelector("#display input").value,
        Pre: document.querySelector("#pre input").value,
        PreColor: hexToRgb(document.querySelector("#base input").value),
        BaseColor: hexToRgb(document.querySelector("#base input").value),
        Pattern: document.querySelector("#pattern input").value,
        Changes: document.querySelector("#json input").value,
        Price: 1,
    };
    Result = `\`\`\`New_Variant: {
            Display: "${CardData.Pre}",
            AltDisplay: "${CardData.AltDisplay}",
            AddedValue: DO_NOT_EDIT,
            Chance: DO_NOT_EDIT,
            Multiplier: DO_NOT_EDIT,
            Shared: DO_NOT_EDIT,
            BaseColor: "rgb(${CardData.BaseColor})",
            Pattern: "${CardData.Pattern}",
            Changes: ${CardData.Changes},
            // ${document.querySelector("#note input").value}
        }\`\`\``;
    navigator.clipboard
        .writeText(Result)
        .then(function () {})
        .catch(function (err) {
            console.warn(`Couldn't copy to clipboard; ERROR: ${err};
                RESULT: ${Result}`);
        });
});
