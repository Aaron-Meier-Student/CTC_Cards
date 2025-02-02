const tabHolder = document.getElementById("tabs");
const tabButtons = document.querySelectorAll("#topbar .tabs > button");

const tabTooltips = {
    Shop: "Buy Packs & Upgrades!",
    Inventory: "View your personal collection of cards!",
};

for (let i = 0; i < tabButtons.length; i++) {
    const tabName = tabButtons[i].id.split("btn-")[1];
    tooltip({
        dom: tabButtons[i],
        text: tabTooltips[tabName],
    });
    tabButtons[i].addEventListener("click", () => {
        tabButtons.forEach((btn) => {
            btn.className = "";
        });
        tabButtons[i].className = "active";
        tabHolder.style.transform = `translateX(-${100 * i}%)`;
    });
}
