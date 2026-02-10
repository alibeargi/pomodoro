document.addEventListener("DOMContentLoaded", function() {
    
    let workDuration = 10;
    let breakDuration = 5;
    let mode = "work";
    let timeLeft = workDuration;
    let intervalId = null;
    let sessionsCompleted = 0;
    const maxSessions = 4;

    const timerDisplay = document.getElementById("timer");
    const container = document.getElementById("tomato-container");
    const startBtn = document.getElementById("start");
    const resetBtn = document.getElementById("reset");

    function renderTime() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    function createTomato() {
        const tomato = document.createElement("div");
        tomato.classList.add("tomato");
        tomato.style.backgroundColor = "green";

        const doodle = document.createElement("img");
        doodle.classList.add("tomato-doodle");
        doodle.src = "tomato-ripening.png";
        tomato.appendChild(doodle);

        container.appendChild(tomato);
    }

    createTomato();

    startBtn.addEventListener("click", function() {
        if (intervalId) return;

        intervalId = setInterval(() => {
            timeLeft--;
            renderTime();

            if (mode === "work") {
                const tomatoes = document.querySelectorAll(".tomato");
                if (tomatoes.length > 0) {
                    const currentTomato = tomatoes[tomatoes.length - 1];
                    const progress = 1 - timeLeft / workDuration;

                   
                    currentTomato.style.backgroundColor =
                        progress < 0.33 ? "green" :
                        progress < 0.66 ? "orange" :
                        "red";

                    if (progress >= 0.66) {
                        const doodleImg = currentTomato.querySelector(".tomato-doodle");
                        doodleImg.src = "tomato-ripe.png";
                    }
                }
            }


            if (timeLeft <= 0) {
                if (mode === "work") {
                    const bell = document.getElementById("bell-sound");
                    bell.currentTime = 0;
                    bell.play();

                    sessionsCompleted++;
                    if (sessionsCompleted >= maxSessions) {
                        clearInterval(intervalId);
                        intervalId = null;
                        alert("Pomodoro complete! Take a long break.");
                        return;
                    }

                    mode = "break";
                    timeLeft = breakDuration;

                } else if (mode === "break") {
                    mode = "work";
                    timeLeft = workDuration;
                    createTomato();
                    const pop = document.getElementById("tomato-sound");
                    pop.currentTime = 0;
                    pop.play();
                }
            }

        }, 1000);
    });

    resetBtn.addEventListener("click", function() {
        clearInterval(intervalId);
        intervalId = null;
        mode = "work";
        timeLeft = workDuration;
        sessionsCompleted = 0;
        renderTime();
        container.innerHTML = "";

        createTomato();
    });

    renderTime();
});