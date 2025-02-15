function determinePrice(variants) {
    let price = 0;
    for (let variant of variants) {
        for (let factor of variant.priceFactor) {
            if (factor[0] === "+") {
                price += Number(factor.slice(1));
            } else if (factor[0] === "-") {
                price -= Number(factor.slice(1));
            } else if (factor[0] === "*") {
                price *= Number(factor.slice(1));
            } else if (factor[0] === "/") {
                price /= Number(factor.slice(1));
            }
        }
    }
}

function formatRNGString(string, base) {
    if (base) base = base.replace(/<RNG>/g, () => Math.floor(Math.random() * 254) + 1);
    string = string.replace(/<RNG>/g, () => Math.floor(Math.random() * 254) + 1);
    string = string.replace(/<BASE>/g, () => base);
    return string;
}

function card({ Display, Variants, Count = 1 }) {
    const cardBase = document.createElement("div");
    cardBase.className = "cardBase";
    const card = document.createElement("div");
    cardBase.appendChild(card);
    const displayH = document.createElement("h3");
    displayH.innerText = Display;
    displayH.className = "display";
    card.appendChild(displayH);
    const traitHolder = document.createElement("div");
    traitHolder.className = "traitHolder";
    card.appendChild(traitHolder);
    card.className = "card";

    const price = determinePrice(Variants);
    const priceTag = document.createElement("h5");
    priceTag.className = "price";
    priceTag.innerText = `$${price.toFixed(2)}`;
    card.appendChild(priceTag);

    for (let variant of Variants) {
        const variantData = dataVariants[variant];

        if (variantData.builtInComponents) {
            for (let [key, value] of Object.entries(
                variantData.builtInComponents
            )) {
                if (key == "trait") {
                    const trait = document.createElement("div");
                    let traitColor = variantData.builtInComponents.traitColor;
                    trait.className = "trait";
                    trait.innerText = value;
                    trait.style.backgroundColor = traitColor
                        ? formatRNGString(traitColor)
                        : "#ffffff";
                    traitHolder.appendChild(trait);
                }
            }
        }

        if (variantData.styleComponents) {
            for (let [selector, styles] of Object.entries(
                variantData.styleComponents
            )) {
                for (let [name, style] of Object.entries(styles)) {
                    cardBase.querySelector(selector).style[name] =
                        formatRNGString(style);
                }
            }
        }

        if (variantData.customComponents) {
            for (let [location, value] of Object.entries(variantData.customComponents)) {
                let component = document.createElement("div");
                component.innerHTML = value.html;
                for (let [selector, styles] of Object.entries(value.styles)) {
                    for (let [name, style] of Object.entries(styles)) {
                        component.querySelector(selector).style[name] =
                            formatRNGString(style);
                    }
                }
                cardBase.querySelector(location).appendChild(component);
            }
        }
    }

    if (Count > 1) {
        const countH = document.createElement("h5");
        countH.innerText = `${Count}x`;
        countH.className = "count";
        card.appendChild(countH);
    }

    return cardBase;
}
