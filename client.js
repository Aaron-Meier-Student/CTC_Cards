let MoneyLock = true;
let CardStartX = 0;
let CardStartY = 0;
let MaxDistance = 200;
let CardDragging = false;
let CardPercentageX = 0;
let CardPercentageY = 0;
let LockScreen = false;

const CardsPerPack = 6;

let userData = { Money: "20.00", Cards: [] };
let changesDetected = false;

function updateInventory() {
    document.querySelector("#Inventory > div > div").innerHTML = "";
    userData.Cards.sort((a, b) => b.Price - a.Price);
    let index = 0;
    userData.Cards.forEach((card) => {
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

        newCard.setAttribute("card-index", index);
        for (let [key, value] of Object.entries(card.Changes)) {
            if (key == "filter") {
                const filter = getAccurateFilter(value, 1);
                CardPattern.style.filter = filter
                    .split("filter: ")[1]
                    .split(";")[0];
                continue;
            }
            newCard.style[key] = value;
        }

        CardPre.style.color = card.PreColor;
        CardPre.innerText = card.Pre;
        CardName.innerText = card.Display;
        CardSpecial.innerText = card.AltDisplay;
        CardPrice.innerText = `$${card.Price.toFixed(2)}`;
        CardPattern.style.backgroundImage = `url(${card.Pattern})`;
        document.querySelector("#Inventory > div > div").appendChild(newCard);
        index++;
    });
    getJsonSizeInKB(userData);
}

function SellMode() {
    LockScreen = true;
    document
        .getElementById("SellButton")
        .removeEventListener("click", SellMode);
    updateInventory();
    document.getElementById("SellButton").innerText = "SELL SELECTED (0)";
    let Indexes = [];
    function addToList(e) {
        let index = Number(e.currentTarget.getAttribute("card-index"));
        Indexes[index] = !Indexes[index];
        e.currentTarget.style.outline = Indexes[index] ? "8px solid red" : "";
        let total = 0;
        for (bool of Indexes) {
            if (bool) total++;
        }
        document.getElementById(
            "SellButton"
        ).innerText = `SELL SELECTED (${total})`;
    }

    document.querySelectorAll("#Inventory .card-back").forEach((element) => {
        element.style.cursor = "pointer";
        Indexes[Number(element.getAttribute("card-index"))] = false;
        element.addEventListener("click", addToList);
    });
    function sellHandler() {
        document
            .getElementById("SellButton")
            .removeEventListener("click", sellHandler);
        document.getElementById("SellButton").innerText = "SELL MODE";
        document
            .querySelectorAll("#Inventory .card-back")
            .forEach((element) => {
                element.style.cursor = "default";
                element.style.outline = "";
                element.removeEventListener("click", addToList);
            });

        let NewUserData = { Money: userData.Money, Cards: [] };
        for (let i = 0; i < userData.Cards.length; i++) {
            if (Indexes[i]) {
                Money(-userData.Cards[i].Price);
            } else {
                NewUserData.Cards.push(userData.Cards[i]);
            }
        }
        NewUserData.Money = userData.Money;
        userData = NewUserData;
        updateInventory();
        changesDetected = true;
        LockScreen = false;
        document
            .getElementById("SellButton")
            .addEventListener("click", SellMode);
        SaveUserData();
    }
    document
        .getElementById("SellButton")
        .addEventListener("click", sellHandler);
}

document.getElementById("SellButton").addEventListener("click", SellMode);

updateInventory();

function getJsonSizeInKB(json) {
    const jsonString = JSON.stringify(json);
    const sizeInBytes = new TextEncoder().encode(jsonString).length;
    const sizeInKB = sizeInBytes / 1024;
    const result = `${sizeInKB.toFixed(2)} kB`;
    document.getElementById("fileSize").innerText = result;
    return result;
}

function Money(x) {
    let tempMoney = Number(userData.Money);
    if (typeof x == "boolean") MoneyLock = x;
    if (MoneyLock) return;
    if (x > tempMoney) return false;
    tempMoney -= x;
    userData.Money = tempMoney.toFixed(2);
    document.getElementById("money").innerText = `$${userData.Money}`;
    changesDetected = x != 0 ? true : changesDetected == true ? true : false;
    return true;
}
Money(0);

function CheckChance(chance) {
    return Math.floor(Math.random() * chance) === 1;
}

function SwapPage(name) {
    if (LockScreen) return;
    let mult = 0;
    let found = false;
    Array.from(document.querySelector("nav div").children).forEach((button) => {
        button.className = "";
        if (button.innerText == name || found) {
            found = true;
            return;
        }
        mult++;
    });
    document.getElementById(`btn-${name}`).className = "active";
    document.getElementById("scroller").style.right = `${100 * mult}%`;
}

SwapPage("Information");

const cardTemplate = `
    <div class="card notshown">
        <div class="card-inner">
            <div class="card-front"><h3>PACK NAME</h3></div>
            <div class="card-back">
                <h4>PRE</h4>
                <h4>Card Name</h4>
                <h4>Special</h4>
                <h4>Price</h4>
                <div></div>
            </div>
        </div>
    </div>
`;

function cardDragX(e) {
    CardDragging = true;
    CardStartX = e.clientX;
}

function cardDragY(e) {
    CardDragging = true;
    CardStartY = e.clientY;
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

function RollPack(PACK, Cards) {
    Money(true);
    document.getElementById("opener").className = "active";
    let current = 1;
    function NextCard() {
        document.querySelector(
            "#opener section > h2"
        ).innerText = `${current}/${CardsPerPack}`;
        CardPercentageX = 0;
        CardPercentageY = 0;
        let weightedCards = Cards.map((name) => ({
            name,
            weight: (() => {
                const card = GameData.Cards.find((c) => c[0] == name);
                return card ? card[1] : 0;
            })(),
        }));
        let totalWeight = 0;
        for (let card of weightedCards) {
            if (!card) continue;
            totalWeight += 1 / card.weight;
        }
        const random = Math.random() * totalWeight;
        let addedWeight = 0;
        let picked;
        for (let card of weightedCards) {
            if (!card) continue;
            addedWeight += 1 / card.weight;
            if (random < addedWeight) {
                picked = {
                    Display: card.name,
                    AltDisplay: "",
                    Price: card.weight,
                    Pre: "",
                    Pattern: "",
                    PreColor: "#ffffff",
                    Changes: {},
                };
                break;
            }
        }
        let multi = 1;
        let pickedNonShared = false;
        for (let chance of Object.values(GameData.Chances)) {
            if (!CheckChance(chance.Chance)) continue;
            if (chance.Shared == false && pickedNonShared == true) continue;
            if (chance.Shared == false) pickedNonShared = true;
            picked.Price += chance.AddedValue;
            multi += chance.Multiplier - 1;
            picked.Pre = chance.Display == "" ? picked.Pre : chance.Display;
            picked.PreColor =
                chance.Display == "" ? picked.PreColor : chance.BaseColor;
            picked.AltDisplay =
                chance.AltDisplay == "" ? picked.AltDisplay : chance.AltDisplay;
            picked.Pattern =
                chance.Pattern == "" ? picked.Pattern : chance.Pattern;
            let basecolor = formatDataString(chance.BaseColor);
            for (let [key, value] of Object.entries(chance.Changes)) {
                picked.Changes[key] = formatDataString(
                    value.replace(/<BASE>/g, basecolor)
                );
            }
        }

        picked.Price *= multi;

        userData.Cards.push(picked);

        current++;
        CardPercentage = 0;
        document.querySelector("#opener section div").innerHTML = cardTemplate;
        let card = document.querySelector("#opener section div > div");
        let innercard = card.querySelector("div");
        for (let [key, value] of Object.entries(picked.Changes)) {
            if (key == "filter") {
                const filter = getAccurateFilter(value, 1);
                card.querySelector("div > .card-back > div").style.filter =
                    filter.split("filter: ")[1].split(";")[0];
                card.querySelector(
                    "div > .card-back > div"
                ).style.backgroundImage = `url(${picked.Pattern})`;
                continue;
            }
            card.querySelector("div > .card-back").style[key] = value;
        }
        card.querySelector("div > .card-front h3").innerText = PACK;
        card.querySelector("div > .card-back h4:first-child").innerText =
            picked.Pre;
        card.querySelector("div > .card-back h4:first-child").style.color =
            picked.PreColor;
        card.querySelector("div > .card-back h4:nth-child(2)").innerText =
            picked.Display;
        card.querySelector("div > .card-back h4:nth-child(3)").innerText =
            picked.AltDisplay;
        card.querySelector(
            "div > .card-back h4:nth-child(4)"
        ).innerText = `$${picked.Price.toFixed(2)}`;

        innercard.addEventListener("mousedown", cardDragX);
        let XDone = false;
        let checkerX = setInterval(() => {
            card.className = "card shown";
            innercard.style.transform = `rotateY(${
                (CardPercentageX / 100) * 180
            }deg)`;
            if (!CardDragging && CardPercentageX >= 75) {
                XDone = true;
                clearInterval(checkerX);
                CardPercentageY = 0;
                innercard.removeEventListener("mousedown", cardDragX);
                innercard.addEventListener("mousedown", cardDragY);
            }
        }, 10);
        let checkerY = setInterval(() => {
            if (!XDone) return;
            innercard.style.transform = `translateY(${
                (CardPercentageY / 100) * -100
            }px) rotateY(180deg)`;
            if (!CardDragging && CardPercentageY >= 75) {
                clearInterval(checkerY);
                innercard.removeEventListener("mousedown", cardDragY);
                setTimeout(() => {
                    card.className = "card notshown";
                }, 100);
                setTimeout(() => {
                    if (current > CardsPerPack) {
                        document.getElementById("opener").className = "";
                        updateInventory();
                        Money(false);
                        changesDetected = true;
                        SaveUserData();
                        return;
                    } else {
                        NextCard();
                    }
                }, 400);
            }
        }, 10);
    }
    NextCard();
}

Array.from(document.querySelector("nav div").children).forEach((button) => {
    if (!button.id.includes("btn")) return;
    button.addEventListener("click", () => {
        SwapPage(button.innerText);
    });
});

Object.values(GameData.Packs).forEach((pack) => {
    let newStoreItem = document.querySelector("#Store .preset").cloneNode(true);
    newStoreItem.className = "";
    newStoreItem.querySelector("h3:first-child").innerText = pack.Display;
    newStoreItem.querySelector("h3:last-child").innerText = `$${pack.Price}`;
    document.querySelector("#Store div").appendChild(newStoreItem);
    newStoreItem.addEventListener("click", () => {
        if (Money(pack.Price)) {
            Money(true);
            RollPack(pack.Display, pack.Cards);
        }
    });
});

document.addEventListener("mousemove", (e) => {
    if (CardDragging) {
        let distanceMovedX = e.clientX - CardStartX;
        let distanceMovedY = CardStartY - e.clientY;

        if (distanceMovedX > MaxDistance) {
            distanceMovedX = MaxDistance;
        } else if (distanceMovedX < 0) {
            distanceMovedX = 0;
        }

        if (distanceMovedY > MaxDistance) {
            distanceMovedY = MaxDistance;
        } else if (distanceMovedY < 0) {
            distanceMovedY = 0;
        }

        CardPercentageX = (distanceMovedX / MaxDistance) * 100;
        CardPercentageY = (distanceMovedY / MaxDistance) * 100;
    }
});

document.addEventListener("mouseup", () => {
    CardDragging = false;
    CardPercentageX = CardPercentageX >= 75 ? 100 : 0;
    CardPercentageY = CardPercentageY >= 75 ? 100 : 0;
});

document.addEventListener("keydown", function (event) {
    if (event.key === " " || event.key === "Spacebar") {
        CardPercentageX = 100;
        CardPercentageY = 100;
    }
});
