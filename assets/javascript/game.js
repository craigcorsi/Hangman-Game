
// To be done:

/*

Find 25 more quotes, maybe weirder ones? (minor)

Import array (minor)
Upon starting game, pull a random quote (moderate)
Play several games (moderate)

Show and hide content depending on isGame (moderate)
Display option for Expert difficulty upon completing Hard (moderate)

Refactor "guesses" as "mistakes" (minor)


Clarify theme (moderate)
Change difficulty settings according to theme
Style according to theme (major)
Add background music in an iframe player (moderate)

*/



// 'var phraseDictionary' and put the phrases here???

var currentSession = {
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    inGame: false,
    numberOfWins: 0,
    numberOfLosses: 0,
    difficulty: '',
    numberOfGuessesRemaining: 0,
    phraseThisRound: '', // e.g. "be the change you want to see in the world"
    phraseGuessed: '', // e.g. "-e --e -----e --- ---- -- -ee -- --e -----"
   
    lettersToFind: [], // e.g. ['b', 't', 'h', 'c', 'a', 'n', 'g', 'y', 'o', 'u', 'w', 's', 'i', 'r', 'l', 'd']
    lettersAlreadyGuessed: [], // e.g. ['e']

    difficultyKey: {
        'Easy': 10,
        'Medium': 6,
        'Hard': 4,
        'Expert': 2
    },

    // produce an array of all the letters appearing in a lowercase string, without repetition
    findLettersInPhrase: function(string) {
        var letterList = [];
        string = string.replace(/ /g, "");
        while (string != "") {
            letter = string[0];

            // add new letter to the list
            letterList.push(letter);
            // remove all instances of a letter from the string
            while (string.indexOf(letter) > -1) {
                string = string.replace(letter, '');
            }
        }
        return letterList;
    },

    dashify: function(string) {
        for (var i = 0; i < string.length; i++) {
            if (string[i] != " ") {
                string = string.replace(string[i], "-");
            }
        }
        return string;
    },

    updateGuessedLetters: function(key) {
        // add the key to the letters already guessed
        this.lettersAlreadyGuessed.push(key);
        var oldDisplay = document.getElementById('lettersGuessed').innerHTML;
        document.getElementById('lettersGuessed').innerHTML = oldDisplay + key + " ";
    },

    guessLetter: function(key) {
        key = key.toLowerCase();

        // Do nothing if the letter was already guessed
        if (this.lettersAlreadyGuessed.indexOf(key) > -1) {
            
        // If the guessed letter is in the phrase...
        } else if (this.lettersToFind.indexOf(key) > -1) {
            // update the dashed phrase with instances of the guessed letter
            for (i = 0; i < this.phraseThisRound.length; i++) {
                if (this.phraseThisRound[i] == key) {
                    this.phraseGuessed = this.phraseGuessed.slice(0,i) + key + this.phraseGuessed.slice(i + 1);
                }
            }
            document.getElementById('currentPhrase').innerHTML = this.phraseGuessed;

            // if the input is a letter, updates guessed letters
            if (this.alphabet.indexOf(key) > -1) {
                this.updateGuessedLetters(key);
            }

            // remove the key from the letters to be found
            this.lettersToFind.splice(this.lettersToFind.indexOf(key), 1);

            // win the game when the list of letters to be guessed is empty
            if (this.lettersToFind.length === 0) {
                this.endGame(true);
            }

        // Otherwise the guessed letter is not in the phrase...
        } else {
            if (this.alphabet.indexOf(key) > -1) {
                // add the key to the letters already guessed
                this.updateGuessedLetters(key);

                // Lose one life
                currentSession.numberOfGuessesRemaining -= 1;
                document.getElementById('guessesRemaining').innerHTML = currentSession.numberOfGuessesRemaining;
            }
                
            // Lose the game at 0 lives
            if (currentSession.numberOfGuessesRemaining == 0) {
                currentSession.endGame(false);
            }
        }
    },

    startGame: function(difficulty) {
        this.inGame = true;

        // Set and display difficulty and number of guesses
        this.difficulty = difficulty;
        document.getElementById('currentDifficulty').innerHTML = difficulty;
        this.numberOfGuessesRemaining = this.difficultyKey[difficulty];
        document.getElementById('guessesRemaining').innerHTML = this.difficultyKey[difficulty];

        // find a random phrase / quote
        this.phraseThisRound = "be the change you want to see in the world";
        this.lettersToFind = this.findLettersInPhrase(this.phraseThisRound);
        this.lettersAlreadyGuessed = [];

        // invoke dashify to create a string of blank letters
        this.phraseGuessed = this.dashify(this.phraseThisRound);
        document.getElementById('currentPhrase').innerHTML = this.phraseGuessed;
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
        this.difficulty = '';
        document.getElementById('currentDifficulty').innerHTML = '';

        this.numberOfGuessesRemaining = 0;
        document.getElementById('guessesRemaining').innerHTML = '';

        this.phraseThisRound = '';
        this.phraseGuessed = '';
        document.getElementById('currentPhrase').innerHTML = "";

        this.lettersToFind = [];
        this.lettersAlreadyGuessed = [];
        document.getElementById('lettersGuessed').innerHTML = "";
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
    } else if (event.key.toLowerCase() == "escape" && currentSession.inGame) {
        currentSession.endGame(false);
    } else if (currentSession.inGame) {
        currentSession.guessLetter(event.key);
    }
}