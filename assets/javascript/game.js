// Clarified ``Oracle Request Line'' theme:
// You ask the oracle for wisdom, but you have to guess the letters or you will be overwhelmed by the sheer power of wisdom!

// Always displaying the h1, wins, and losses in the header
// Always displaying the Oracle in the bottom right (desktop) or at the bottom (mobile).
// The Easy/Medium/Hard toggle, and the initial p text collapses in game, at the bottom left (wipe down then up)
// The current game with all running stats and instructions, collapsible and at the bottom left (wipe up then down)


// TO BE DONE:

/*

Implement a custom font.
Implement Showing and Hiding
Implement color changes


Add background music in an iframe player (moderate)
*/


//       I tried to import from an external file -- the syntax didn't raise errors in VS Code but wouldn't render on the page.
// 'var phraseDictionary' and put the phrases here???
// import { quoteBank } from '/quotes.js';
// import { numberOfQuotes } from '/quotes.js';

var currentSession = {
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    inGame: false,
    numberOfWins: 0,
    numberOfLosses: 0,
    difficulty: '',
    numberOfLivesRemaining: 0,
    phraseThisRound: '', // e.g. "be the change you want to see in the world"
    phraseGuessed: '', // e.g. "-e --e -----e --- ---- -- -ee -- --e -----"
   
    lettersToFind: [], // e.g. ['b', 't', 'h', 'c', 'a', 'n', 'g', 'y', 'o', 'u', 'w', 's', 'i', 'r', 'l', 'd']
    lettersAlreadyGuessed: [], // e.g. ['e']

    difficultyKey: {
        'Easy': 5,
        'Medium': 3,
        'Hard': 2,
        'Expert': 1
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
                currentSession.numberOfLivesRemaining -= 1;
                document.getElementById('livesRemaining').innerHTML = currentSession.numberOfLivesRemaining;
            }
                
            // Lose the game at 0 lives
            if (currentSession.numberOfLivesRemaining == 0) {
                currentSession.endGame(false);
            }
        }
    },

        // bank of phrases and short quotes hard-coded in an array

        quoteBank: [
            'be the change you want to see in the world',
            'an apple a day keeps the doctor away',
            'life is a beautiful struggle',
            'live for yourself',
            'live and let live',
            'work hard dream big',
            'live passionately',
            'life is a one time offer use it well',
            'the trouble is you think you have time',
            'whatever you are be a good one',
            'everything happens for a reason',
            'live travel adventure bless and dont be sorry',
            'everyone dies but not everyone lives',
            'smile while you still have teeth',
            'live each day as if it is your last',
            'try and fail but never fail to try',
            'life is wasted on the living',
            'the journey is my home',
            'let you memory be your travel bag',
            'to travel is worth any cost or sacrifice',
            'to travel is to possess the world',
            'to travel is to take a journey into yourself',
            'life is either a daring adventure or nothing',
            'i have not been everywhere but it is on my list',
            'he travels fastest who travels alone',
            'traveling tends to magnify all human emotions',
            'jet lag is for amateurs',
            'travel teaches toleration',
            'put a ding in the universe',
            'travel is only glamorous in retrospect',
            'life is a voyage of discovery',
            'adventure is worthwhile',
            'we accept the love we think we deserve',
            'love harder than any pain you have ever felt',
            'love is friendship set on fire',
            'love is never wrong',
            'the giving of love is an education in itself',
            'if a thing loves it is infinite',
            'love comforteth like sunshine after rain',
            'if music be the food of love play on',
            'unable are the loved to die for love is immortality',
            'you may encounter many defeats but you must not be defeated',
            'never never never give up',
            'follow your bliss',
            'hope is a walking dream',
            'action is the foundational key to all success',
            'do one thing every day that scares you',
            'eighty percent of success is showing up',
            'a jug fills drop by drop',
            'the best revenge is massive success',
            'a friend asks only for your time not your money',
            'your high minded principles spell success',
            'people are naturally attracted to you',
            'your shoes will make you happy today',
            'land is always on the mind of a fying bird',
            'the man or woman you desire feels the same about you',
            'a very attractive person has a message for you',
            'adversity is the parent of virtue',
            'serious trouble will bypass you',
            'wealth awaits you very soon',
            'jealousy does not open doors it closes them',
            'let the deeds speak',
            'fortune favors the brave',
            'an upward movement initiated in time can counteract fate',
            'stop wishing start doing',
            'happiness is an activity',
            'hone your competitive instincts',
            'when hungry order more chinese food',
            'all your fingers cannot be the same length',
            'rivers need springs',
            'it never pays to kick a skunk',
            'you will soon witness a miracle',
            'you are a person of culture',
            'poverty is no disgrace',
            'a feeling is an idea with roots',
            'solitude has its own very strange beauty to it',
            'the world is a strange and wonderful place',
            'searchers after horror haunt strange far places',
            'they certainly give strange names to diseases',
            'a lot of hacking is playing with people',
            'politics makes atrange bedfellows',
            'i feel i am strange to all but the birds of america',
        ],

    startGame: function(difficulty) {
        this.inGame = true;

        document.getElementById('gameExplanation').innerHTML = "Press any key to display that letter";

        // Set and display difficulty and number of guesses
        this.difficulty = difficulty;
        document.getElementById('currentDifficulty').innerHTML = difficulty;
        this.numberOfLivesRemaining = this.difficultyKey[difficulty];
        document.getElementById('livesRemaining').innerHTML = this.difficultyKey[difficulty];

        // find a random phrase / quote
        var randomIndex = Math.floor(Math.random() * this.quoteBank.length);
        this.phraseThisRound = this.quoteBank[randomIndex];
        this.lettersToFind = this.findLettersInPhrase(this.phraseThisRound);
        this.lettersAlreadyGuessed = [];

        // invoke dashify to create a string of blank letters
        this.phraseGuessed = this.dashify(this.phraseThisRound);
        document.getElementById('currentPhrase').innerHTML = this.phraseGuessed;

        document.getElementById('indicateExpert').innerHTML = '';
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

        // If the user completes 'Hard' they can try 'Expert'
        if (result && this.difficulty == 'Hard') {
            document.getElementById('gameExplanation').innerHTML = "You have won enlightenment on the Hard difficulty. What else could a bold traveler ask for? Except for more wisdom... Care to try e(X)pert?";
        } else if (result) {
            document.getElementById('gameExplanation').innerHTML = "You have won enlightnemnt on the " + this.difficulty + " difficulty. What else could a bold traveler ask for? Except for more wisdom... ";
        } else {
            document.getElementById('gameExplanation').innerHTML = "AND YOU THOUGHT IT WOULD BE EASY?!?!?! Well, try again, traveler, you're already here.";
        }

        // Reset difficulty
        this.difficulty = '';
        document.getElementById('currentDifficulty').innerHTML = '';

        this.numberOfLivesRemaining = 0;
        document.getElementById('livesRemaining').innerHTML = '';

        this.phraseThisRound = '';
        this.phraseGuessed = '';
        document.getElementById('currentPhrase').innerHTML = "";

        this.lettersToFind = [];
        this.lettersAlreadyGuessed = [];
        document.getElementById('lettersGuessed').innerHTML = "";
    },

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
    // Start a new game on Expert difficulty level
    if (event.key.toLowerCase() == "x" && !currentSession.inGame) {
        currentSession.startGame("Expert");
    } else if (event.key.toLowerCase() == "escape" && currentSession.inGame) {
        currentSession.endGame(false);
    } else if (currentSession.inGame) {
        currentSession.guessLetter(event.key);
    }

    
}