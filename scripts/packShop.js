function getPacks(index) {
    index = Math.abs(index);
    const arr = Object.values(dataPacks);
    const prev = arr[(index - 1 + arr.length) % arr.length];
    const current = arr[index % arr.length];
    const next = arr[(index + 1) % arr.length];
    return [prev, current, next];
}

const packShop = document.getElementById("packShop");
let selectedPack = 0;
let packSwapDebounce = false;

function clearListeners() {
    document.querySelectorAll("#packShop .pack").forEach((pack) => {
        pack.removeEventListener("click", swapClickHandler);
        pack.removeEventListener("click", purchaseClickHandler);
    });
}

function purchaseHandler() {}

function renderPackDisplay() {
    packShop.innerHTML = "";
    const packsToDisplay = getPacks(selectedPack);
    for (let i = 0; i < 3; i++) {
        const newPack = document.createElement("div");
        newPack.className = `display${i} pack ${i == 1 ? "" : "behind"}`;
        newPack.style.transform = `translate(${
            i == 2 ? "160px, 25px" : i == 0 ? "-160px, 25px" : ""
        })`;
        newPack.style.zIndex = `${i == 1 ? "2" : "1"}`;
        newPack.innerText = packsToDisplay[i].Display;

        packShop.appendChild(newPack);
        if (i == 1) {
            newPack.addEventListener("click", purchaseHandler);
        } else {
            newPack.addEventListener("click", () => {
                if (packSwapDebounce) return;
                const dir = i == 0 ? -1 : 1;
                selectedPack  = selectedPack + dir < 0 ? Object.keys(dataPacks).length-1 : selectedPack += dir;
                swapPackDisplay(dir);
            });
        }
    }
}

function swapPackDisplay(direction) {
    packSwapDebounce = true;
    const newPacksToDisplay = getPacks(selectedPack);
    for (let i = 0; i < 3; i++) {
        const pack = document.querySelector(`#packShop .display${i}`);
        if (direction > 0) {
            pack.className = `display${i} pack ${i == 2 ? "" : "behind"}`;
            pack.style.transform = `translate(${
                i == 0 ? "160px, 25px" : i == 1 ? "-160px, 25px" : "0"
            })`;
            pack.style.zIndex = `${i == 2 ? "2" : "1"}`;
            setTimeout(() => {
                if (i == 0) pack.innerText = newPacksToDisplay[2].Display;
            }, 250);
        } else {
            pack.className = `display${i} pack ${i == 0 ? "" : "behind"}`;
            pack.style.transform = `translate(${
                i == 1 ? "160px, 25px" : i == 2 ? "-160px, 25px" : "0"
            })`;
            pack.style.zIndex = `${i == 0 ? "2" : "1"}`;
            setTimeout(() => {
                if (i == 2) pack.innerText = newPacksToDisplay[0].Display;
            }, 100);
        }
    }
    setTimeout(() => {
        packSwapDebounce = false;
        renderPackDisplay();
    }, 500);
}

renderPackDisplay();
