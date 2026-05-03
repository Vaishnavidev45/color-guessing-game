const colorCodeContainer = document.getElementById("color-code");
const optionContainer = document.getElementById("option-container");
const colorPreview = document.getElementById("color-preview");
const feedbackEl = document.getElementById("feedback");

let randomColor = null;
let score = 0;


score = parseInt(localStorage.getItem("score")) || 0;
document.getElementById("score").innerText = score;

function generateRandomNumberBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function generateRandomcolorRGB() {
    const red   = generateRandomNumberBetween(0, 255);
    const green = generateRandomNumberBetween(0, 255);
    const blue  = generateRandomNumberBetween(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function showFeedback(correct) {
    feedbackEl.textContent = correct ? "✓ Correct! Streak continues." : "✗ Wrong! Streak reset.";
    feedbackEl.className = `feedback ${correct ? "correct" : "wrong"}`;
    setTimeout(() => { feedbackEl.className = "feedback hidden"; }, 1200);
}

function validateResult(el) {
    const selectedColor = el.target.style.backgroundColor;
    const isCorrect = selectedColor === randomColor;

    
    el.target.classList.add(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
        incrementScore();
    } else {
        score = 0;
        document.getElementById("score").innerText = score;
    }

    showFeedback(isCorrect);
    localStorage.setItem("score", score);

    setTimeout(() => startGame(), 700);
}

function incrementScore() {
    score += 1;
    const scoreEl = document.getElementById("score");
    scoreEl.innerText = score;
    scoreEl.classList.remove("pop");
    void scoreEl.offsetWidth; 
    scoreEl.classList.add("pop");
}

function startGame() {
    optionContainer.innerHTML = "";
    feedbackEl.className = "feedback hidden";

    randomColor = generateRandomcolorRGB();
    colorCodeContainer.innerText = randomColor;
    colorPreview.style.backgroundColor = randomColor;

    const ansIndex = generateRandomNumberBetween(0, 5);

    for (let i = 0; i < 6; i++) {
        const div = document.createElement("div");
        div.addEventListener("click", validateResult);
        div.style.backgroundColor = (i === ansIndex) ? randomColor : generateRandomcolorRGB();
        div.style.animationDelay = `${i * 55}ms`;
        optionContainer.append(div);
    }
}

window.addEventListener("load", () => startGame());