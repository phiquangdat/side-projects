<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <title>Form a Story</title>
  </head>
  <body>
    <section id="top">
      <img src="https://content.codecademy.com/courses/learn-html-forms/formAStoryLogo.svg" alt="Form A Story Logo">
    </section>

    <section id="main">
      <h1>Complete the Form -<br> Complete the Story!</h1>
      <hr>
      <!--Add your form below:-->
      <form action="story.html" method="GET">

        <!--Add your form below:-->
        <label for="animal-1">Animal</label>
        <input type="text" id="animal-1" name="animal-1" required>
        <br>
        <!--Add your form below:-->
        <label for="animal-2">Another Animal</label>
        <input type="text" id="animal-2" name="animal-2" required>
        <br>

        <!--Add your form below:-->
        <label for="animal-3">One More Animal</label>
        <input type="text" id="animal-3" name="animal-3" required>
        <br>

        <!--Add your form below:-->
        <label for="adj-1">Adjective (ends in -ed)</label>
        <input type="text" id="adj-1" name="adj-1" required>
        <br>

        <!--Add your form below:-->
        <label for="verb-1">Verbs (ends in -ing)</label>
        <input type="text" id="verb-1" name="adj-1" required>
        <br>

        <!--Add your form below:-->
        <label for="num-1">Number: </label>
        <input type="number" id="num-1" name="num-1" required>
        <br>
        
        <!--Add your form below:-->
        <span>Yes or No</span>
        <input type="radio" id="yes" name="answer" value="yes" required>
        <label for="yes">Yes</label>
        <input type="radio" id="no" name="answer" value="yes" required>
        <label for="yes">No</label>
        <br>

        <label for="speed">Relative speed (ends in -er):</label>
        <select id="speed" name="speed" required>
          <option value="slow">Slow</option>
          <option value="fast">Fast</option>
          <option value="faster">Faster</option>
        </select>
        <br>

        <label for="quote">Motivational Quote: </label>
        <input id="quote" name="quote" type="text" required list ="quote-choices">
        <datalist id="quote-choices">
          <option value="winner gets ice cream!"></option>
          <option value="never give up!"></option>
          <option value="reach for the stars!"></option>
        </datalist>
        <br>

        <label for="message">Meaningful Message: </label>
        <textarea id="message" name="message" required minlength="8" maxlength="40"></textarea>
        <br>
        <input type="submit" value="Form My Story!">
      </form>
    </section>
  </body>
</html>
