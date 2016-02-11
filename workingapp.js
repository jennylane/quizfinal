(function() {
  var questions = [{
    question: "When working within a Kintera Thon event, where can you add the page wrapper to a stand alone webpage and add the link to the lefthand navigation of the event?",
    choices: ['Event Text', 'Website Features', 'Website Design'],
    correctAnswer: 1
  }, {
    question:'If you or a client are unable to view the custom HTML boxes located in website design, how can this be resolved? ',
	choices:['Update the event', 'Clear cache', 'Open the custom cookie tool'],
	correctAnswer: 2
  }, {
    question:'Where should the meta tags be added within a Kintera Thon event in order to customize what Facebook displays when the share button is chosen? ',
	choices:['Custom Header HTML', 'Google Analytics', 'Multi-Language Header HTML'],
	correctAnswer: 1
  }, {
    question:'A client would like to change text that is not editable through the UI and will likely require a custom script, where will you send the case? ',
	choices:['Tier 2 Design queue', 'Professional Services', 'The AE for scoping'],
	correctAnswer: 0
  }, {
    question:'A client is experiencing odd spacing issues on the homepage of their Kintera Thon event where additional spacing is at the top. What are your next steps? ',
	choices:['Submit to design tier 2 queue', 'Submit a CR', 'Check the Homepage text for custom coding and hard returns'],
	correctAnswer: 2
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // used :animated from jquery library to suspend during animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no selection is made show alert, else move to next question
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }

    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click #start for start over (resets)
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  
  // Creates and returns the div that contains the questions and answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'});
    //creates header text index of 1-5
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Gets value of selection and pushes the value to selections array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element 
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove(); //removes previous question

// If questionCounter is less than number of questions, display next question
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Hides prev button if questionCounter is at 0
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();