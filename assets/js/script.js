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
    const retryButton = document.getElementById('retry-button');
    const resultTimeElement = document.getElementById('result-time');
    const typingBox = document.getElementById('typing-box');
    let startTime, endTime;
    let testStarted = false;

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

    function handleTypingStart(event) {
        if (!testStarted) {
            startTime = new Date();
            testStarted = true;
            resultTimeElement.textContent = '';
            retryButton.disabled = true;
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            handleTypingStop();
        }
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

    function handleTypingStop() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // time in seconds
        const userInput = typingBox.value;
        const sampleText = sampleTextElement.textContent;
        const wpm = calculateWPM(sampleText, userInput, timeTaken);

        resultTimeElement.textContent = timeTaken.toFixed(2) + ' seconds';
        document.getElementById('result-wpm').textContent = wpm + ' WPM';
        document.getElementById('result-level').textContent = difficultySelect.value.charAt(0).toUpperCase() + difficultySelect.value.slice(1);

        typingBox.disabled = true;
        testStarted = false;
        retryButton.disabled = false;
    }

    function handleRetryButtonClick() {
        handleDifficultyChange();
        resultTimeElement.textContent = '';
        typingBox.value = '';
        typingBox.disabled = false;
        typingBox.focus();
        testStarted = false;
        retryButton.disabled = true;
    }

    function updateTypingFeedback() {
        const sampleWords = sampleTextElement.textContent.split(' ');
        const userWords = typingBox.value.split(' ');

        let feedbackHTML = '';

        for (let i = 0; i < sampleWords.length; i++) {
            if (userWords[i] === undefined) {
                feedbackHTML += `<span>${sampleWords[i]}</span> `;
            } else if (userWords[i] === sampleWords[i]) {
                feedbackHTML += `<span style="color: blue;">${sampleWords[i]}</span> `;
            } else {
                feedbackHTML += `<span style="color: red;">${sampleWords[i]}</span> `;
            }
        }

        sampleTextElement.innerHTML = feedbackHTML.trim();
    }

    difficultySelect.addEventListener('change', handleDifficultyChange);
    retryButton.addEventListener('click', handleRetryButtonClick);
    typingBox.addEventListener('input', handleTypingStart);
    typingBox.addEventListener('input', updateTypingFeedback);
    typingBox.addEventListener('keydown', handleTypingStart);

    // Initialize with a random text from the default difficulty level
    handleDifficultyChange();
    typingBox.disabled = false;
    retryButton.disabled = true;
});