document.addEventListener("DOMContentLoaded", () => {
    let timer;
    let isRunning = false;
    let remainingTime = 1500; // 5 minutes in seconds

    const timeLeftDisplay = document.getElementById("time-left");
    const startStopBtn = document.getElementById("start-stop-btn");
    const resetBtn = document.getElementById("reset-btn");
    const settingsBtn = document.getElementById("settings-btn");
    const settingsModal = document.getElementById("settings-modal");
    const closeBtn = document.querySelector(".close-btn");
    const workDurationInput = document.getElementById("work-duration");
    const saveBtn = document.getElementById("save-btn");

    function updateTimeDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timeLeftDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    startStopBtn.addEventListener("click", () => {
        if (isRunning) {
            clearInterval(timer);
            startStopBtn.textContent = "Start";
        } else {
            timer = setInterval(() => {
                if (remainingTime > 0) {
                    remainingTime--;
                    updateTimeDisplay();
                } else {
                    clearInterval(timer);
                    alert("Time's up!");
                }
            }, 1000);
            startStopBtn.textContent = "Stop";
        }
        isRunning = !isRunning;
    });

    resetBtn.addEventListener("click", () => {
        clearInterval(timer);
        isRunning = false;
        startStopBtn.textContent = "Start";
        remainingTime = workDurationInput.value * 60; // Reset to the set work duration
        updateTimeDisplay();
    });

    settingsBtn.addEventListener("click", () => {
        settingsModal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        settingsModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = "none";
        }
    });

    saveBtn.addEventListener("click", () => {
        remainingTime = workDurationInput.value * 60;
        updateTimeDisplay();
        settingsModal.style.display = "none";
    });

    updateTimeDisplay(); // Initialize the display
});
