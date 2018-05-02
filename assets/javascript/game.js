"use strict";

// for scoring and timing the quiz
var qRight = 0;
var qWrong = 0;
var qUnanswered = 0;
var timeAllowed = 120;  // change this to change how much time the player has
var timeLeft = timeAllowed;

var quizStarted = false;

// first entry in object is the question, 2nd entry is the potential answers in an array of strings,
// and last entry is the index of the correct answer 
var quizQuestions = [
    {q: 'Why did Speaker D tell the two Hopeless Situation Warriors to be careful?', a: [" They let their guard down", " The is a big", " Space General was about to ambush them", " They almost missed their chance to escape a day after the fair"], c: 1, s: "https://youtu.be/XziLNeFm1ok?t=730"},
    {q: "What was Space General's response to Gold's insult?", a: [" Batter to death them", " I would be aller strong and big than anyone", " Smelly boy", " Heros is just bad guy"], c: 2, s: "https://youtu.be/XziLNeFm1ok?t=1145"},
    {q: 'Why did Ratio Tile not disembark with Gold after the crash landing?', a: [" He is uninterested to politics", " He dislikes Speaker D", " He had a mission to find Space General ", " He had Hopeless Situation Warrior duties to attend to"], c: 0, s: "https://youtu.be/XziLNeFm1ok?t=1447"},
    {q: 'Did you heard of the tragedy that reach the man?', a: [" Putting her walks ", " Do not send out the air tank why", " Darth Plagueis the Wise", " Not"], c: 3, s: "https://youtu.be/XziLNeFm1ok?t=2768"},
    {q: "What did Gold realize after Speaker D revealed his true identity?", a: [" Speaker D is the governor of this city", " Hopeless Situation Parliament asked Gold to spy on Speaker D", " The true reason Text How Big and the other Hopeless Situation Elders would not let Gold join Hopeless Situation Parliament", " The is still alive"], c: 0, s: "https://youtu.be/XziLNeFm1ok?t=3851"},
    {q: 'Complete the following:  "Reaching the man cloth space is the emperor.  He is so strong and big..."', a: [" He kill off all hopeless situation in the temples", " He even can use the original dint to create life", " That he must the square who study it the square", " He would be aller strong and big than anyone"], c: 1, s: "https://youtu.be/XziLNeFm1ok?t=2786"},
    {q: 'After Gold became Reaching the West of Reaches, he fought and lost to Ratio Tile.  Why?', a: [" The geography that Ratio Tile stood compared Reaching the West of Reaches superior", " Reaching the West of Reaches underrated Ratio Tile's ability", " Reaching the West of Reaches was blinded by the truth of Pure Hero's Ground", " The dark lord distorted Reaching the West of Reaches's heart"], c: 0, s: "https://youtu.be/XziLNeFm1ok?t=7163"},
    {q: "After Reaching the West of Reaches declared that Ratio Tile underrated his ability, what was Ratio Tile's last warning?", a: [" Let me killing your and is not your new empire?", " Everything ends, the peaceful is willing to", " Is", " Bring the world brilliance.  But is not to bring the blackness"], c: 2, s: "https://youtu.be/XziLNeFm1ok?t=7169"},
    {q: 'How Speaker D claim to have discovered the location of Space General?', a: [" The knowledge of the dark of the study hopeless, in the fire of water", " He looking am a civilization person", " West", " He beat the intelligence bureau the telephone"], c: 3, s: "https://youtu.be/XziLNeFm1ok?t=2594"},
    {q: "While on Space General's airship, after hearing Speaker D's warning, what did Ratio Tile say to reassure Speaker?", a: [" Don't you ever think to discovers here from I clues", " Like, this time do not calculate in fact", " Can be how like this?  Like this too wide of the mark, like this inequity?", " Mr. speaker, we are for the big"], c: 3, s: "https://youtu.be/XziLNeFm1ok?t=731"}];

var timer = setInterval(function() {
    if (timeLeft !== 0 && quizStarted === true) {
        $("#quizHeader").html("Backstroke of the West Quiz - Time left: <strong><font color='red'>" + timeLeft + "</font></strong>");
        timeLeft--;
    }
    else if (quizStarted === true) {
        $("#quizHeader").text("Out of time!  Your results...");
        scoreQuiz();
    };
}, 1000);

// starts the timer and calls renderQuiz to start the quiz
var startTimer = function() {
    quizStarted = true;
    renderQuiz();
};

// pauses the timer - might be called by other functions
var stopTimer = function() {
    clearInterval(timer);
    quizStarted = false;
};

// reset the state of the quiz - used if the user wants to try again
var restartQuiz = function() {
    qRight = 0;
    qWrong = 0;
    qUnanswered = 0;
    timeLeft = 120;
    renderWelcome();
};

var randomNum;
var generateRandom = function(howMany) {
    randomNum = Math.floor(Math.random()*howMany);
};

// this function should take the data contained in this JS file and render the quiz in the html
var renderQuiz = function() {
    // clear out the area where the quiz is to be inserted
    $("#quizBody").empty();
    // this allows us to randomize the order we present the questions in
    var randomizeArray = [];
    for (var i = 0; i < quizQuestions.length; i++) {
        while (randomizeArray.length < quizQuestions.length) {
            generateRandom(quizQuestions.length);
            if (randomizeArray.indexOf(randomNum) === -1) {
                randomizeArray.push(randomNum);
            };
        };
        // pull data from our array of objects using the array we built
        var quizQuestion = quizQuestions[randomizeArray[i]].q;
        var quizOptions = quizQuestions[randomizeArray[i]].a;
        
        // build the html for the question being asked
        var quizBlock = $("<form>");
        quizBlock.attr("id", "question"+randomizeArray[i]);
        quizBlock.addClass("quizQuestion");
        quizBlock.html("<br><strong>" + quizQuestion + "</strong><br>");
        // appending the question
        $("#quizBody").append(quizBlock);

        // allows us to randomize the order we present the options for each question
        var randomizeArray2 = [];
            while (randomizeArray2.length < quizOptions.length) {
                generateRandom(quizOptions.length);
                if (randomizeArray2.indexOf(randomNum) === -1) {
                    randomizeArray2.push(randomNum);
                };
            };

        // build the html for the radio buttons
        for (var j = 0; j < quizOptions.length; j++) {
            // Just wow, what is this... ugly... thing.  There's gotta be a better way.
            var quizButton = $('<input type="radio" name="'+randomizeArray[i]+'" id="q'+randomizeArray[i]+'O'+randomizeArray2[j]+'" value="'+randomizeArray2[j]+'">'+'<label class="labelAnswer" for="q'+randomizeArray[i]+'O'+randomizeArray2[j]+'">'+quizOptions[randomizeArray2[j]]+'</label><br>');
            // append the radio button
            $("#quizBody").append(quizButton);
        };
        
        // always cite your sources for the nonbelievers
        $("#quizBody").append('<em>Source: <a href="'+quizQuestions[i].s+'" target="_blank">'+quizQuestions[i].s+'</a></em><br>')
    };
    $("#quizBody").append("<br><button type='button' id='clickToScoreQuiz'>Click to score the quiz</button>")
};

// this renders the welcome screen before the quiz
var renderWelcome = function () {
    $("#quizHeader").text("Backstroke of the West Quiz");
    $("#quizBody").html("<center><button type='button' id='clickToStartQuiz'>Click to begin</button></center>");
};

// this function should score the quiz (# correct, incorrect, unanswered).  It also stops the timer.
var scoreQuiz = function() {
    stopTimer();
    // if nothing's checked, increment qUnanswered
    for (var i = 0; i < quizQuestions.length; i++) {
        if (document.getElementById("q"+i+"O0").checked === false &&
            document.getElementById("q"+i+"O1").checked === false &&
            document.getElementById("q"+i+"O2").checked === false &&
            document.getElementById("q"+i+"O3").checked === false) {
                qUnanswered++;
        }
        // else if the correct answer is checked, increment qRight
        else if (document.getElementById("q"+i+"O"+quizQuestions[i].c).checked === true)  {
            qRight++;
        }
        // else, increment qWrong
        else {
            qWrong++;
        };
    };
    console.log("unanswered: " + qUnanswered);
    console.log("correct: " + qRight);
    console.log("incorrect: " + qWrong);
    renderScoreScreen();
};

// this clears away the quiz and renders the score screen
var renderScoreScreen = function() {
    var timeSpent = timeAllowed - timeLeft;
    $("#quizHeader").text("Quiz finished!  Your results...");
    $("#quizBody").html("Questions unanswered: <strong>" + qUnanswered + "</strong><br>Questions correct: <strong>" + qRight + "</strong><br>Questions incorrect: <strong>" + qWrong + "</strong><br>You took <strong>" + timeSpent+"</strong> seconds.<br><center><button type='button' id='clickToRestartQuiz'>Try again?</button></center>");
};

// this listens to the button press on the welcome screen to start the quiz
$(document).on("click", "#clickToStartQuiz", function() {
    startTimer();
});

// user can press this button to end the quiz early
$(document).on("click", "#clickToScoreQuiz", function() {
    scoreQuiz();
});

// user can press this button to restart the quiz - who the heck would want to do that?
$(document).on("click", "#clickToRestartQuiz", function() {
    restartQuiz();
});

// ---------------------------------------------------------------------------------

renderWelcome();