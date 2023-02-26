const express = require("express");
const path = require("path");

const helpers = require("./helpers");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/out')));

let disneyData = [];

// Fetch data before starting the app
helpers._fetchData()
    .then(data => {disneyData = data})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`\n⚡Server running on ${PORT}\n`);
        });
})

let currentQuestionNumber = 1;
let numberCorrectAnswers = 0;

const alreadySelectedCharacters = [];


app.post('/api/submitAnswer', (req, res) => {
    console.log("\nReceived answer submission with body:", req.body);
    const { imageUrl, answer } = req.body;

    const characterData = disneyData.find(character => character.imageUrl == imageUrl);

    // Add character to list of already answered questions so that they don't repeat
    alreadySelectedCharacters.push(characterData.name);

    const isCorrect = characterData.shows.includes(answer);
    let endGame = false;

    currentQuestionNumber++;

    if (isCorrect) {
        numberCorrectAnswers++;
    }

    if (currentQuestionNumber > 10) {
        endGame = true;
    }

    res.send({ isCorrect, endGame, numberCorrectAnswers });

    // Reset values if the game has ended
    if (endGame) {
        currentQuestionNumber = 1;
        numberCorrectAnswers = 0
    }
})

app.get('/api/fetchQuestion', (req,res) => {
    console.log("\nReceived request to fetch question");
    // Collate list of all possible answers
    const allPossibleAnswers = [];
    disneyData.forEach(character => allPossibleAnswers.push(...character.shows));
    
    // remove null/undefined values
    const filteredAnswers = allPossibleAnswers.filter(answer => answer);

    let character;

    // Randomly choose a new character (that hasn't already been selected)
    while (!character || alreadySelectedCharacters.includes(character.name)) {
        const randomCharacterIndex = Math.floor(Math.random() * disneyData.length);
        character = disneyData[randomCharacterIndex];
    }

    // Randomly select 3 incorrect answers
    const allIncorrectAnswers = filteredAnswers.filter(answer => !character.shows.includes(answer));
    const randomIncorrectAnswers = allIncorrectAnswers.sort(() => .5 - Math.random()).slice(0, 3);


    // Randomly select 1 correct answer from the characters show list
    const index = Math.floor(Math.random() * character.shows.length);
    const correctAnswer = character.shows[index];

    const answers = randomIncorrectAnswers.concat([correctAnswer])
        .sort(() => 0.5 - Math.random());

    res.send({
        currentQuestionNumber,
        imageUrl: character.imageUrl,
        answers
    });
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/out/index.html'));
})

// app.listen(PORT, () => {
//     console.log(`\n⚡Server running on ${PORT}\n`);
// });