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

    const filter = getAccurateFilter(`rgb(${card.BaseColor})`, 1);
    CardPattern.style.filter = filter.split("filter: ")[1].split(";")[0];

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

document.getElementById("setChanges").addEventListener("click", () => {
    updateCard({
        Display: document.getElementById("edit-Display").value,
        AltDisplay: document.getElementById("edit-AltDisplay").value,
        Pre: document.getElementById("edit-Pre").value,
        PreColor: document.getElementById("edit-PreColor").value,
        BaseColor: formatDataString(document.getElementById("edit-BaseColor").value),
        Pattern: document.getElementById("edit-Pattern").value,
        Changes: document.getElementById("edit-Changes").value,
        Price: Number(document.getElementById("edit-Price").value),
    });
});
