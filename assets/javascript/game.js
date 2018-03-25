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
        'Unlisted': 2
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

        this.difficulty = '',
        this.numberOfGuessesRemaining = 0,
        this.phraseThisRound = '',
        this.phraseToGuess = '', 
        this.phraseGuessed = '',
        this.lettersToFind = [],
        this.lettersAlreadyGuessed = []
    }
}
console.log(currentSession);

document.getElementById('selectEasy').onclick = function() {
    currentSession.startGame(this.innerHTML);
    console.log(currentSession);
    currentSession.endGame(false);
    console.log(currentSession);
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


