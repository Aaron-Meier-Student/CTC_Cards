function notification({ title, description, delay }) {
    const notification = document.createElement("div");
    const progressBar = document.createElement("div");
    notification.innerHTML = `<h4>${title}</h4><hr><p>${description}</p>`;
    notification.style.transition = "250ms";
    notification.style.opacity = "0";
    progressBar.style.background =
        "linear-gradient(90deg, #0059ff 50%, #00000000 50%)";
    progressBar.style.backgroundSize = "200% 100%";
    progressBar.style.backgroundPositionX = "0%";
    progressBar.style.transition = `${delay}s`;
    notification.appendChild(progressBar);
    setTimeout(() => {
        notification.style.opacity = "1";
        progressBar.style.backgroundPositionX = "100%";
    }, 10);
    setTimeout(() => {
        notification.style.opacity = "0";
    }, delay * 1000);
    setTimeout(() => {
        notification.remove();
    }, delay * 1000 + 250);
    document.getElementById("notificationHolder").appendChild(notification);
}
