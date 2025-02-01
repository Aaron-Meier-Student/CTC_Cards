const tabHolder = document.getElementById("tabs");
const tabButtons = document.querySelectorAll("#topbar .tabs > button");

for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener("click", () => {
        tabButtons.forEach((btn) => {
            btn.className = "";
        });
        tabButtons[i].className = "active";
        tabHolder.style.transform = `translateX(-${100 * i}%)`;
    });
}
