document.addEventListener('DOMContentLoaded', function () {
    const sampleTexts = {
        easy: [
            "The quick brown fox jumps over the lazy dog.",
            "Hello world!",
            "Typing is fun."
        ],
        medium: [
            "JavaScript is a versatile programming language.",
            "Practice makes perfect.",
            "Coding challenges improve problem-solving skills."
        ],
        hard: [
            "Asynchronous programming can be tricky to understand.",
            "The quick brown fox jumps over the lazy dog multiple times.",
            "Complex algorithms require careful planning and execution."
        ]
    };

    const difficultySelect = document.getElementById('difficulty-select');
    const sampleTextElement = document.getElementById('sample-text');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const retryButton = document.getElementById('retry-button');
    const resultTimeElement = document.getElementById('result-time');
    let startTime, endTime;

    function getRandomText(difficulty) {
        const texts = sampleTexts[difficulty];
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    }

    function handleDifficultyChange() {
        const selectedDifficulty = difficultySelect.value;
        const randomText = getRandomText(selectedDifficulty);
        sampleTextElement.textContent = randomText;
    }

    function handleStartButtonClick() {
        startTime = new Date();
        startButton.disabled = true;
        stopButton.disabled = false;
        resultTimeElement.textContent = '';
    }

    function calculateWPM(sampleText, userInput, timeTaken) {
        const sampleWords = sampleText.split(' ');
        const userWords = userInput.split(' ');
        let correctWords = 0;

        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        const wpm = (correctWords / timeTaken) * 60; // words per minute
        return Math.round(wpm);
    }

    function handleStopButtonClick() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // time in seconds
        const userInput = document.getElementById('typing-box').value;
        const sampleText = sampleTextElement.textContent;
        const wpm = calculateWPM(sampleText, userInput, timeTaken);

        resultTimeElement.textContent = timeTaken.toFixed(2) + ' seconds';
        document.getElementById('result-wpm').textContent = wpm + ' WPM';
        document.getElementById('result-level').textContent = difficultySelect.value.charAt(0).toUpperCase() + difficultySelect.value.slice(1);

        startButton.disabled = false;
        stopButton.disabled = true;
    }

    function handleRetryButtonClick() {
        handleDifficultyChange();
        startButton.disabled = false;
        stopButton.disabled = true;
        resultTimeElement.textContent = '';
    }

    difficultySelect.addEventListener('change', handleDifficultyChange);
    startButton.addEventListener('click', handleStartButtonClick);
    stopButton.addEventListener('click', handleStopButtonClick);
    retryButton.addEventListener('click', handleRetryButtonClick);

    // Initialize with a random text from the default difficulty level
    handleDifficultyChange();
    stopButton.disabled = true;
});