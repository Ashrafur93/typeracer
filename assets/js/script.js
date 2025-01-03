document.addEventListener('DOMContentLoaded', function () {
    const sampleTexts = {
        easy: [
            "Practice makes perfect.",
            "Hello world!",
            "Typing is fun.",
            "The cat sat on the mat.",
            "I love my new hat.",
            "Dogs bark at strangers.",
            "The sun is bright today.",
            "She has a red ball.",
            "We eat lunch at noon.",
            "The book is on the table.",
            "He drives a big car.",
            "She sings a lovely song.",
            "They run in the park."
        ],

        medium: [
            "JavaScript is a versatile programming language.",
            "The quick brown fox jumps over the lazy dog.",
            "Coding challenges improve problem-solving skills.",
            "She enjoys reading books on rainy afternoons.",
            "The bakery on Main Street sells delicious pastries.",
            "He borrowed a novel from the local library.",
            "They are planning a vacation to the mountains next summer.",
            "My sister 's new kitten is playful and curious.",
            "The chef prepared a gourmet meal for the guests.",
            "He built a model airplane from scratch.",
            "The children played outside until the sun set.",
            "She painted a beautiful landscape of the countryside.",
            "The quick brown fox jumps over the lazy dog multiple times."
        ],

        hard: [
            "Asynchronous programming can be tricky to understand.",
            "Complex algorithms require careful planning and execution.",
            "She meticulously arranged the multicolored marbles in a symmetrical pattern.",
            "The ancient manuscript contained cryptic symbols that puzzled the archaeologists.",
            "Completing the intricate jigsaw puzzle required not only patience but also keen observation skills.",
            "His eloquent speech captivated the audience, leaving a lasting impression on everyone present.",
            "Despite the complexity of the mathematical equation, she solved it with remarkable ease.",
            "The breathtaking scenery along the coastal highway left travelers in awe.",
            "He navigated the bustling city streets with a confident stride, unfazed by the chaos around him.",
            "The ambitious project required the collaboration of multiple departments and extensive planning.",
            "Immersed in the enchanting world of the novel, she lost track of time entirely.",
            "The sophisticated software application streamlined the workflow, enhancing productivity."
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