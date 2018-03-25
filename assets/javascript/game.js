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
    numberOfLosses: 0,
    difficulty: '',
    phrase: '',
    numberOfGuessesRemaining: difficultyLevel,
    lettersAlreadyGuessed: [],
    lettersToGuess: []
}

// initialize session

// initialize game after pressing any key to begin

// display everything you need to know

// listen for key presses...

// update object properties accordingly


// 'check status of game?' (Maybe as a method?)
    // when numberOfGuessesRemaining hits zero, lose the game
        // update losses, reset, enter between-games mode
        // Change the HTML

    // when length of lettersToGuess hits zero, win the game
        // update wins, reset, enter between-games mode
        // Change the HTML


