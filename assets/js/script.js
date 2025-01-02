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

    function getRandomText(difficulty) {
        const texts = sampleTexts[difficulty];
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
    }

    difficultySelect.addEventListener('change', function () {
        const selectedDifficulty = difficultySelect.value;
        const randomText = getRandomText(selectedDifficulty);
        sampleTextElement.textContent = randomText;
    });

    // Initialize with a random text from the default difficulty level
    sampleTextElement.textContent = getRandomText(difficultySelect.value);
});