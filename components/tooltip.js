function tooltip({ text, dom, delay = 1 }) {
    const tooltip = document.createElement("div");
    tooltip.style.opacity = "0";
    tooltip.style.padding = "5px 10px";
    tooltip.style.backgroundColor = "#1F2329";
    tooltip.style.position = "absolute";
    tooltip.style.pointerEvents = "none";
    tooltip.style.transform = "translateX(-50%)";
    tooltip.style.top = "calc(100% + 12px)";
    tooltip.style.left = "50%";
    tooltip.style.textWrap = "nowrap";
    tooltip.style.fontSize = "14px";
    tooltip.style.borderRadius = "4px";
    tooltip.style.transition = "250ms";

    const tooltipArrow = document.createElement("div");
    tooltipArrow.style.position = "absolute";
    tooltipArrow.style.border = "8px solid transparent";
    tooltipArrow.style.borderBottomColor = "#1F2329";
    tooltipArrow.style.bottom = "100%";
    tooltipArrow.style.left = "50%";
    tooltipArrow.style.transform = "translateX(-50%)";
    tooltipArrow.style.content = " ";

    tooltip.innerText = text;

    dom.style.position = "relative";
    dom.appendChild(tooltip);
    tooltip.appendChild(tooltipArrow);

    let hoverTimeout;

    function showTooltip(e) {
        tooltip.style.opacity = 1;
    }

    function hideTooltip() {
        clearTimeout(hoverTimeout);
        tooltip.style.opacity = 0;
    }

    dom.addEventListener("mouseenter", (e) => {
        hoverTimeout = setTimeout(showTooltip, delay * 1000);
    });
    dom.addEventListener("mouseleave", hideTooltip);

    return tooltip;
}
