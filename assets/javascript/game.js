
// To be done:

/* 

HTML with "press 'Escape' to forfeit" (minor)
Display the phrase from a new game in the browser (minor)

set up guessLetter method (major):
    Make it impossible to guess the same letter twice (minor)
    Update properties and HTML test according to a new letter guess (moderate)

Implement game-win within guessLetter (moderate)
Implement game-loss within guessLetter (moderate)

(Check all work up to this point by completing several of the same game, across all four difficulty levels, with win, loss, and forfeit.) (Moderate)

Store quotes in an external file quotes.js all in one array (moderate -- I want over 100 short quotes and sayings)

Import array (minor)
Upon starting game, pull a random quote (moderate)
Play several games (moderate)

Show and hide content depending on isGame (moderate)
Display option for Expert difficulty upon completing Hard (moderate)

Clarify theme (moderate)
Style according to theme (major)
Add background music in an iframe player (moderate)



*/






















// 'var phraseDictionary' and put the phrases here???

var currentSession = {
    inGame: false,
    numberOfWins: 0,
    numberOfLosses: 0,
    difficulty: '',
    numberOfGuessesRemaining: 0,
    phraseThisRound: '', // e.g. "be the change you want to see in the world"
    phraseToGuess:'', // e.g. "b* th* chang* you want to s** in th* world"
    phraseGuessed: '', // e.g. "-e --e -----e --- ---- -- -ee -- --e -----"
   
    lettersToFind: [], // e.g. ['b', 't', 'h', 'c', 'a', 'n', 'g', 'y', 'o', 'u', 'w', 's', 'i', 'r', 'l', 'd']
    lettersAlreadyGuessed: [], // e.g. ['e']

    difficultyKey: {
        'Easy': 10,
        'Normal': 6,
        'Hard': 4,
        'Expert': 2
    },

    startGame: function(difficulty) {
        this.inGame = true;
        this.difficulty = difficulty;
        this.numberOfGuessesRemaining = this.difficultyKey[difficulty];

        // find a random phrase / quote
        this.phraseThisRound = "be the change you want to see in the world";

        // invoke toPhrase to create a string of blank letters
        this.phraseGuessed = '-- --- ------ --- ---- -- --- -- --- -----';

        // set up lettersAlreadyGuessed and lettersToGuess
        this.lettersAlreadyGuessed = [];
        this.lettersToFind = ['b', 'e', 't', 'h', 'c', 'a', 'n', 'g', 'y', 'o', 'u', 'w', 's', 'i', 'r', 'l', 'd'];

        document.getElementById('currentDifficulty').innerHTML = difficulty;
    },

    endGame: function(result) {

        this.inGame = false;
        if (result) {
            this.numberOfWins++;
            document.getElementById('yourWins').innerHTML = this.numberOfWins;
        } else {
            this.numberOfLosses++;
            document.getElementById('yourLosses').innerHTML = this.numberOfLosses;
        }

        // Reset difficulty
        this.difficulty = '',
        document.getElementById('currentDifficulty').innerHTML = '';

        this.numberOfGuessesRemaining = 0,
        this.phraseThisRound = '',
        this.phraseToGuess = '', 
        this.phraseGuessed = '',
        this.lettersToFind = [],
        this.lettersAlreadyGuessed = []
    }
}

document.getElementById('selectEasy').onclick = function (event) {
    if (!currentSession.inGame) {
        currentSession.startGame("Easy");
    }
}

document.getElementById('selectMedium').onclick = function (event) {
    if (!currentSession.inGame) {
        currentSession.startGame("Medium");
    }
}

document.getElementById('selectHard').onclick = function (event) {
    if (!currentSession.inGame) {
        currentSession.startGame("Hard");
    }
}

// All keypress events handled here
document.onkeyup = function (event) {
    console.log(event.key);
    // Start a new game on Expert difficulty level
    if (event.key.toLowerCase() == "x" && !currentSession.inGame) {
        currentSession.startGame("Expert");
    }
    
    // Forfeit an existing game
    if (event.key.toLowerCase() == "Escape" && currentSession.inGame) {
        currentSession.endGame(false);
    }
}


// display everything you need to know

// update object properties accordingly


// 'check status of game?' (Maybe as a method?)
    // when numberOfGuessesRemaining hits zero, lose the game
        // update losses, reset
        // Change the HTML

    // when length of lettersToGuess hits zero, win the game
        // update wins, reset
        // Change the HTML


