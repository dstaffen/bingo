document.addEventListener('DOMContentLoaded', () => {
  ////////////////////
  // Thought I'd better add some comments up in here to explain
  // some of the variables I'm using.
  // For my own reference, really.
  //
  // bingoNumbers = an array of an array of numbers, split into groups of 15
  //           all the standard numbers called in a bingo game
  // cardNumbers = a second array of bingo numbers for manipulation
  // gridBase = list of HTML objects
  //            the DIVs that make up the card
  // grid = the array of the DIVs that make up the card
  // card = array of array of numbers on the card
  // numBase = list of HTML objects that make up the called number display
  // numGrid = the array of the DIVs that make up the called number display
  ////////////////////

  // Declare variables
  var called=0;


  // Populate array of numbers
  const bingoNumbers=populateNumbers();
  const cardNumbers=populateNumbers();
  let drawNumbers=[];

  for(let i=0;i<bingoNumbers.length;i++) {
    drawNumbers=drawNumbers.concat(bingoNumbers[i]);
  }
  drawNumbers=shuffleArray(drawNumbers);




  // Loads divs into card if they don't already exist
  loadDivs('#card',25,12);

  // Returns card divs as array
  var [gridBase,grid] = getCardDivs('#card');

  //Add event listeners to card
  addListeners(gridBase);

  // Generate random bingo card
  var card=generateCard();

  // Display card numbers
  fillGrid(card,grid,'down');

  // Loads divs into number counter if they don't already exist
  loadDivs('#numbers',75);

  // Returns called number display divs as array
  var [numBase,numGrid] = getCardDivs('#numbers');

  // Fill numbers in called number display
  fillGrid(bingoNumbers,numGrid,'across');

  // Shuffle the bingo cardNumbers
  shuffleArray(bingoNumbers)

  // Add event listener to button
  addButtonListener();











////////////////////
// Main Functions //
////////////////////

// Populates an array of an array of numbers in groups of 15
function populateNumbers() {
  let num=[];

  for(let x=0;x<=60;x+=15) {
    let a=[];
    for(let y=1;y<=15;y++) {
      a.push(x+y);
    }
    num.push(a);
  }

  return num;
}


// Loads divs into card if divs don't already exist
// selector=the CSS selector to target
// num=the number of divs to create
function loadDivs(selector,num,free=0) {
  const card=document.querySelector(selector);
  let cardGrid=Array.from(document.querySelectorAll(selector+' div'));

  if(cardGrid.length == 0) {
    for(let i=0;i<num;i++) {

      if(i==free && i!=0) {
        card.innerHTML+='<div class=\"free-space\">Free Space</div>\n';
      }
      else {
        card.innerHTML+='<div></div>\n';
      }
    }
  }
}


// Returns card divs as array
function getCardDivs(selector) {
  return [document.querySelectorAll(selector+' div'),Array.from(document.querySelectorAll(selector+' div'))];
}


// Add event listeners
function addListeners(g) {
  for(let i=0;i<g.length;i++) {
    g[i].addEventListener('click',(e) => {
      if(e.target.classList.contains('card-click')) {
        e.target.classList.remove('card-click');
      }
      else {
        e.target.classList.add('card-click');
      }
    });
    g[i].addEventListener('mouseover',(e) => {
      if(!e.target.classList.contains('card-click')) {
        e.target.classList.add('card-hover');
      }
    });
    g[i].addEventListener('mouseout',(e) => {
      if(!e.target.classList.contains('card-click')) {
        e.target.classList.remove('card-hover');
      }
    });
  }

}


// Generate random bingo card
function generateCard() {
  let newNum=[];
  for(let i=0;i<cardNumbers.length;i++) {
    newNum.push(shuffleArray(cardNumbers[i],5,'sort'));
  }
  return newNum;
}


// Display card numbers
// c=array of array of numbers
// g=grid of HTML objects
// d=direction (down or across)
function fillGrid(c,g,d) {
  if(d=='down') {
    for(let x=0;x<c.length;x++) {
      for(let y=0;y<c[x].length;y++) {
        if(g[x+(y*c[x].length)].innerHTML!='Free Space') {
          g[x+(y*c[x].length)].innerHTML=c[x][y];
        }
      }
    }
  }
  else {
    for(let x=0;x<c.length;x++) {
      for(let y=0;y<c[x].length;y++) {
        if(g[(x*c[x].length)+y].innerHTML!='Free Space') {
          g[(x*c[x].length)+y].innerHTML=c[x][y];
        }
      }
    }
  }
}


// Add event listener to button
function addButtonListener() {
  let timerID;
  let btn=document.querySelector('#start-button');
  btn.addEventListener('click',()=>{
    if(timerID) {
      clearInterval(timerID);
      timerID=null;
      document.querySelector('button').innerHTML='Start';
    }
    else {
      timerID=setInterval(drawNumber, 3000);
      document.querySelector('button').innerHTML='Stop';
    }
  })
}


///////////////////////
// Utility Functions //
///////////////////////

// Shuffles an array
// arr=array to be shuffled
// trim=trim array to specified number of elements (defaults to zero)
function shuffleArray(arr,trim=0,sort='') {
  for(let i=arr.length-1;i>0;i--) {
    let j=Math.floor(Math.random()*(i+1));
    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
  }

  if(trim<0) {
    trim=0;
  }
  else if(trim>arr.length) {
    trim=arr.length;
  }

  if(trim>0) {
    arr=arr.slice(0,trim);
  }

  if(sort=='sort') {
    arr.sort((a,b) => {return a-b})
  }

  return arr;
}


// Draws a random bingo number
function drawNumber() {
  numBase[drawNumbers[called]].classList.add('new-number');
  if(called!=0) {
    numBase[drawNumbers[called-1]].classList.remove('new-number');
    numBase[drawNumbers[called-1]].classList.add('called-number');
  }

  if(called<74) {
    called++;
  }
}








});
