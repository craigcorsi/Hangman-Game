var difficultyKey = {
    'Easy': 10,
    'Normal': 6,
    'Hard': 4,
    'Unlisted': 2
}

var difficultyLevel = difficultyKey['Normal'];

var currentSession = {
    inGame: false,
    numberOfWins: 0,
    numberOfLosses: 0
}

class ThisGame {
    constructor(difficulty, phrase) {
        this.difficulty = difficulty;
        this.phrase = phrase;
    }
    // numberOfGuessesRemaining: difficultyLevel,
    // lettersAlreadyGuessed: []
}

