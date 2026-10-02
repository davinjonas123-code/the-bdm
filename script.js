const opening = document.getElementById("opening");
const mainContent = document.getElementById("mainContent");

const envelope = document.getElementById("envelope");
const openButton = document.getElementById("openButton");

const music = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");

const closeModal = document.getElementById("closeModal");
const previousPhotoButton = document.getElementById("previousPhoto");
const nextPhotoButton = document.getElementById("nextPhoto");

const surpriseButton = document.getElementById("surpriseButton");
const surpriseModal = document.getElementById("surpriseModal");
const closeSurprise = document.getElementById("closeSurprise");


/* =================================
   PHOTOS
================================= */

const photos = [
    "images/mama1.jpg",
    "images/mama2.jpg",
    "images/mama3.jpg",
    "images/mama4.jpg"
];

let currentPhoto = 0;


/* =================================
   OPEN SURPRISE
================================= */

openButton.addEventListener("click", () => {

    envelope.classList.add("open");

    openButton.textContent = "Opening... ❤️";

    setTimeout(() => {

        opening.style.opacity = "0";

        opening.style.transition = "opacity 0.8s ease";

    }, 900);


    setTimeout(() => {

        opening.classList.add("hidden");

        mainContent.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        music.play().catch(() => {
            console.log("Music requires user interaction.");
        });

        musicButton.textContent = "🎵 Music Playing";

        createConfetti();

    }, 1500);

});


/* =================================
   MUSIC
================================= */

musicButton.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicButton.textContent = "🎵 Music Playing";

    } else {

        music.pause();

        musicButton.textContent = "🔇 Music Paused";

    }

});


/* =================================
   OPEN PHOTO
================================= */

document.querySelectorAll(".photo").forEach((photo) => {

    photo.addEventListener("click", () => {

        currentPhoto = Number(photo.dataset.photo);

        showPhoto();

    });

});


function showPhoto() {

    modalImage.src = photos[currentPhoto];

    photoModal.classList.add("active");

}


/* =================================
   CLOSE PHOTO
================================= */

closeModal.addEventListener("click", () => {

    photoModal.classList.remove("active");

});


/* =================================
   NEXT PHOTO
================================= */

nextPhotoButton.addEventListener("click", () => {

    currentPhoto++;

    if (currentPhoto >= photos.length) {
        currentPhoto = 0;
    }

    showPhoto();

});


/* =================================
   PREVIOUS PHOTO
================================= */

previousPhotoButton.addEventListener("click", () => {

    currentPhoto--;

    if (currentPhoto < 0) {
        currentPhoto = photos.length - 1;
    }

    showPhoto();

});


/* =================================
   CLICK OUTSIDE PHOTO
================================= */

photoModal.addEventListener("click", (event) => {

    if (event.target === photoModal) {

        photoModal.classList.remove("active");

    }

});


/* =================================
   KEYBOARD PHOTO NAVIGATION
================================= */

document.addEventListener("keydown", (event) => {

    if (!photoModal.classList.contains("active")) {
        return;
    }

    if (event.key === "ArrowRight") {

        currentPhoto++;

        if (currentPhoto >= photos.length) {
            currentPhoto = 0;
        }

        showPhoto();

    }

    if (event.key === "ArrowLeft") {

        currentPhoto--;

        if (currentPhoto < 0) {
            currentPhoto = photos.length - 1;
        }

        showPhoto();

    }

    if (event.key === "Escape") {

        photoModal.classList.remove("active");

    }

});


/* =================================
   FINAL SURPRISE
================================= */

surpriseButton.addEventListener("click", () => {

    surpriseModal.classList.add("active");

    createConfetti();

});


closeSurprise.addEventListener("click", () => {

    surpriseModal.classList.remove("active");

});


/* =================================
   CONFETTI / FLOWERS
================================= */

function createConfetti() {

    const symbols = [
        "❤️",
        "🌸",
        "🌷",
        "🌼",
        "✨"
    ];

    for (let i = 0; i < 45; i++) {

        const item = document.createElement("div");

        item.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        item.style.position = "fixed";

        item.style.left =
            Math.random() * 100 + "vw";

        item.style.top = "-40px";

        item.style.fontSize =
            Math.random() * 18 + 14 + "px";

        item.style.zIndex = "300";

        item.style.pointerEvents = "none";

        document.body.appendChild(item);


        const duration =
            Math.random() * 2500 + 2500;

        const rotation =
            Math.random() * 720 - 360;


        item.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",

                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh) rotate(${rotation}deg)`,

                    opacity: 0.2
                }
            ],
            {
                duration: duration,

                easing: "ease-in"
            }
        );


        setTimeout(() => {

            item.remove();

        }, duration);

    }

}