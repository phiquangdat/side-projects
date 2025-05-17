const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();
// ------------------------------
// Initialization
// ------------------------------
const backPages = new Stack();
const nextPages = new Stack();
let currentPage = 'Start Page';
// ------------------------------
// Helper Functions
// ------------------------------
const showCurrentPage = action => {
  console.log(`${action}`);
  console.log(`${currentPage}`);
  console.log(`${backPages.peek()}`);
  console.log(`${nextPages.peek()}`);
}

const newPage = page => {
  backPages.push(currentPage);
  currentPage = page;

  while(!nextPages.isEmpty()){
    nextPages.pop();
  }

  showCurrentPage("");
}

const backPage = () => {
  nextPages.push(currentPage);
  currentPage = backPages.pop();

  showCurrentPage("BACK: ");
}
const nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPages.pop();

  showCurrentPage("NEXT: ");  
}

/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------
let finish = false;
let showBack = false;
let showNext = false;
showCurrentPage("DEFAULT: ");
while(!finish){
  let instructions = baseInfo;
  if(!backPages.isEmpty()){
    instructions += ',' + backInfo;
    showBack = true;
  }
  else{
    showBack = false;
  }if(!nextPages.isEmpty()){
    instructions += ',' + nextInfo;
    showNext = true;
  }
  else{
    showNext = false;
  }
  console.log(instructions + quitInfo);
  const answer = prompt(question);
  let lowerCaseAnswer = answer.toLowerCase();
  if((lowerCaseAnswer !== 'b') && (lowerCaseAnswer !== 'n') && (lowerCaseAnswer !== 'q')){
    newPage(answer);
  }
  else if((lowerCaseAnswer === 'n') && showNext === true){
    nextPage();
  }
  else if((lowerCaseAnswer === 'b') && showBack === true){
    backPage();
  }
  else if((lowerCaseAnswer === 'q')){
    finish = true;
  }
  else{
    console.log("Action is not available");
  }

}

  // ------------------------------
  // User Interface Part 2
  // ------------------------------
  
