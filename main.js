document.addEventListener("DOMContentLoaded", function () {
    const letters = document.querySelectorAll(".letter");
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const popupTitle = document.getElementById("popup-title");
    const popupMessage = document.getElementById("popup-message");
    const closeBtn = document.getElementById("close-btn");
    const audio = document.getElementById("background-music");

    // Autoplay music with fallback
    let playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            document.addEventListener("click", () => audio.play(), { once: true });
        });
    }

    function openPopup(title, message) {
        popupTitle.innerText = title;
        popupMessage.innerHTML = message;
        overlay.style.display = "block";
        popup.style.display = "block";

        setTimeout(() => {
            overlay.style.opacity = "1";
            popup.style.transform = "translate(-50%, -50%) scale(1)";
            popup.style.opacity = "1";
        }, 10);
    }

    function closePopup() {
        popup.style.opacity = "0";
        popup.style.transform = "translate(-50%, -50%) scale(0.9)";
        overlay.style.opacity = "0";
        setTimeout(() => {
            popup.style.display = "none";
            overlay.style.display = "none";
        }, 300);
    }

    letters.forEach(letter => letter.addEventListener("click", function () {
        openPopup(this.getAttribute("data-title"), this.querySelector(".hidden-message").innerHTML);
    }));

    closeBtn.addEventListener("click", closePopup);
    overlay.addEventListener("click", closePopup);
});
