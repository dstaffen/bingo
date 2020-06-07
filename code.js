document.addEventListener('DOMContentLoaded', () => {
  ////////////////////
  // Thought I'd better add some comments up in here to explain
  // some of the variables I'm using.
  // For my own reference, really.
  //
  // bingoNumbers = an array of an array of numbers, split into groups of 15
  //           all the standard numbers called in a bingo game
  //
  // cardNumbers = a second array of bingo numbers for manipulation
  // cardGrid = array of HTML objects that make up the card
  //
  // numBase = list of HTML objects that make up the called number display
  // numGrid = array of HTML objects that make up the called number display
  ////////////////////

  // Declare variables
  let calledNum=0;
  let gameCounter=0;
  let time=5000;
  let timerID;
  let gameTimerID;
  let btn=document.querySelector('#start-button');
  let currentGame;
  const bingo=['B','I','N','G','O'];
  let opponentNames = ['Jaclyn','Valentine','Alyce','Lon','Conchita','Adriana','Freeman','Meghann','Lyndia','Armanda','Tamara','Camie','Harriette','Alix','Graham','Flossie','Roxanne','Ruthanne','Valene','Junie','Leandra','Cherilyn','Yevette','Wendi','Kirstin','Maryln','Rosemary','Chauncey','Jonelle','Hsiu','Carry','Jonathon','Irena','Dione','Nathan','Katerine','Nelia','Penney','Silas','Thresa','Mirna','Londa','Many','Nick','Josiah','Melony','Bertha','Lona','Chuck','Blanca','Stormy','Ruthann','Liane','Kristian','Deetta','Nenita','Moon','Zenia','Yer','Thalia','Jeanetta','Williemae','Davina','Jasmine','Kristen','Yuki','Saturnina','Dorotha','Patria','Heidi','Gwyn','Maragret','Rosamaria','Millicent','Victorina','Nieves','Carli','Caron','Mara','Lenora','Viki','Alisha','Karole','Maricruz','Dixie','Marlys','Jennette','Marie','Estrella','Antonetta','Lavenia','Edna','Mariella','Bethel','Florance','Ana','Starr','Corliss','Zenobia','Yang'];
  let lineGame = [
    [1,1,1,1,1,
     0,0,0,0,0,
     0,0,0,0,0,
     0,0,0,0,0,
     0,0,0,0,0],
    [0,0,0,0,0,
     1,1,1,1,1,
     0,0,0,0,0,
     0,0,0,0,0,
     0,0,0,0,0],
    [0,0,0,0,0,
     0,0,0,0,0,
     1,1,1,1,1,
     0,0,0,0,0,
     0,0,0,0,0],
    [0,0,0,0,0,
     0,0,0,0,0,
     0,0,0,0,0,
     1,1,1,1,1,
     0,0,0,0,0],
    [0,0,0,0,0,
     0,0,0,0,0,
     0,0,0,0,0,
     0,0,0,0,0,
     1,1,1,1,1],
    [1,0,0,0,0,
     1,0,0,0,0,
     1,0,0,0,0,
     1,0,0,0,0,
     1,0,0,0,0],
    [0,1,0,0,0,
     0,1,0,0,0,
     0,1,0,0,0,
     0,1,0,0,0,
     0,1,0,0,0],
    [0,0,1,0,0,
     0,0,1,0,0,
     0,0,1,0,0,
     0,0,1,0,0,
     0,0,1,0,0],
    [0,0,0,1,0,
     0,0,0,1,0,
     0,0,0,1,0,
     0,0,0,1,0,
     0,0,0,1,0],
    [0,0,0,0,1,
     0,0,0,0,1,
     0,0,0,0,1,
     0,0,0,0,1,
     0,0,0,0,1],
    [1,0,0,0,0,
     0,1,0,0,0,
     0,0,1,0,0,
     0,0,0,1,0,
     0,0,0,0,1],
    [0,0,0,0,1,
     0,0,0,1,0,
     0,0,1,0,0,
     0,1,0,0,0,
     1,0,0,0,0],
    [1,0,0,0,1,
     0,0,0,0,0,
     0,0,0,0,0,
     0,0,0,0,0,
     1,0,0,0,1]
  ];
  let tGame = [
    [1,1,1,1,1,
     0,0,1,0,0,
     0,0,1,0,0,
     0,0,1,0,0,
     0,0,1,0,0],
    [0,0,0,0,1,
     0,0,0,0,1,
     1,1,1,1,1,
     0,0,0,0,1,
     0,0,0,0,1],
    [0,0,1,0,0,
     0,0,1,0,0,
     0,0,1,0,0,
     0,0,1,0,0,
     1,1,1,1,1],
    [1,0,0,0,0,
     1,0,0,0,0,
     1,1,1,1,1,
     1,0,0,0,0,
     1,0,0,0,0]
  ];
  let xGame = [
    [1,0,0,0,1,
     0,1,0,1,0,
     0,0,1,0,0,
     0,1,0,1,0,
     1,0,0,0,1]
  ];
  let bigBoxGame = [
    [1,1,1,1,1,
     1,0,0,0,1,
     1,0,0,0,1,
     1,0,0,0,1,
     1,1,1,1,1]
  ];
  let smallBoxGame = [
    [0,0,0,0,0,
     0,1,1,1,0,
     0,1,0,1,0,
     0,1,1,1,0,
     0,0,0,0,0]
  ];
  let blackoutGame = [
    [1,1,1,1,1,
     1,1,1,1,1,
     1,1,1,1,1,
     1,1,1,1,1,
     1,1,1,1,1]
  ];
  let checkerboardGame = [
    [1,0,1,0,1,
     0,1,0,1,0,
     1,0,1,0,1,
     0,1,0,1,0,
     1,0,1,0,1]
  ];
  let lGame = [
    [1,0,0,0,0,
     1,0,0,0,0,
     1,0,0,0,0,
     1,0,0,0,0,
     1,1,1,1,1],
    [1,1,1,1,1,
     1,0,0,0,0,
     1,0,0,0,0,
     1,0,0,0,0,
     1,0,0,0,0],
    [1,1,1,1,1,
     0,0,0,0,1,
     0,0,0,0,1,
     0,0,0,0,1,
     0,0,0,0,1],
    [0,0,0,0,1,
     0,0,0,0,1,
     0,0,0,0,1,
     0,0,0,0,1,
     1,1,1,1,1]
  ];

  let games = [lineGame,tGame,xGame,bigBoxGame,smallBoxGame,blackoutGame,checkerboardGame,lGame];


  // Loads divs into the page if they don't already exist
  loadDivs('#number-header',bingo.length);
  loadDivs('#numbers',75);
  loadDivs('#card-header',bingo.length);
  loadDivs('#card',25,12);
  loadDivs('#opponent1-card',25,12);
  loadDivs('#opponent2-card',25,12);
  loadDivs('#opponent3-card',25,12);
  loadDivs('#game',25);


  // Returns card divs as array of HTML objects
  let numHeaderGrid = getCardDivs('#number-header');
  let numGrid = getCardDivs('#numbers');
  let cardHeaderGrid = getCardDivs('#card-header');
  let cardGrid = getCardDivs('#card');
  let opponent1Grid = getCardDivs('#opponent1-card');
  let opponent2Grid = getCardDivs('#opponent2-card');
  let opponent3Grid = getCardDivs('#opponent3-card');
  let gameGrid = getCardDivs('#game');

  // Populate array of numbers
  const bingoNumbers=populateNumbers(75,5);
  let cardNumbers=populateNumbers(75,5);
  let drawNumbers=populateNumbers(75,1);
  let opponent1Numbers=populateNumbers(75,5);
  let opponent2Numbers=populateNumbers(75,5);
  let opponent3Numbers=populateNumbers(75,5);

  // Set numbers
  cardNumbers = generateCardNumbers(cardNumbers);
  drawNumbers = shuffleArray(drawNumbers);
  opponent1Numbers = generateCardNumbers(opponent1Numbers);
  opponent2Numbers = generateCardNumbers(opponent2Numbers);
  opponent3Numbers = generateCardNumbers(opponent3Numbers);
  opponentNames=shuffleArray(opponentNames,3)

  // Fill grids with numbers
  fillGrid(bingo,numHeaderGrid,'down');
  fillGrid(bingoNumbers,numGrid,'across');
  fillGrid(bingo,cardHeaderGrid,'across');
  fillGrid(cardNumbers,cardGrid,'down');
  fillGrid(opponent1Numbers,opponent1Grid,'down');
  fillGrid(opponent2Numbers,opponent2Grid,'down');
  fillGrid(opponent3Numbers,opponent3Grid,'down');
  document.querySelector('#opponent1-header').innerHTML=opponentNames[0];
  document.querySelector('#opponent2-header').innerHTML=opponentNames[1];
  document.querySelector('#opponent3-header').innerHTML=opponentNames[2];

  // Select Game
  selectGame();

  //Add event listeners to card
  addListeners(cardGrid);

  // Add event listener to button
  addButtonListener();











////////////////////
// Main Functions //
////////////////////

// Loads divs into card if divs don't already exist
// selector=the CSS selector to target
// num=the number of divs to create
function loadDivs(selector,num,free=0) {
  const card=document.querySelector(selector);
  let cardGrid=Array.from(document.querySelectorAll(selector+' div'));

  if(cardGrid.length == 0) {
    for(let i=0;i<num;i++) {

      if(i==free && i!=0) {
        card.innerHTML+='<div class=\"free-space\">FS</div>\n';
      }
      else {
        card.innerHTML+='<div></div>\n';
      }
    }
  }
}


// Returns card divs as array
function getCardDivs(selector) {
  return document.querySelectorAll(selector+' div');
}


// Populates an array of an array of numbers in groups of 15
// max = largest number in array
// group = number of groups required
function populateNumbers(max,group) {
  let num=[];
  let a=[];
  let increase=Math.floor(max/group);

  for(let x=0;x<max;x+=increase) {
    a=[];
    for(let y=1;y<=increase;y++) {
      a.push(x+y);
    }
    num.push(a);
  }

  if(num.length==1){
    return a;
  }
  else {
    return num;
  }
}


// Generate set of bingo card numbers
// a = two-dimensional array
function generateCardNumbers(a) {
  let newNum=[];

  for(let i=0;i<a.length;i++) {
    newNum.push(shuffleArray(a[i],5,'sort'));
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
        if(g[x+(y*c[x].length)].innerHTML!='FS') {
          g[x+(y*c[x].length)].innerHTML=c[x][y];
        }
      }
    }
  }
  else {
    for(let x=0;x<c.length;x++) {
      for(let y=0;y<c[x].length;y++) {
        if(g[(x*c[x].length)+y].innerHTML!='FS') {
          g[(x*c[x].length)+y].innerHTML=c[x][y];
        }
      }
    }
  }
}


function selectGame() {
  currentGame=games[Math.floor(Math.random()*games.length)];
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






// Add event listener to button
function addButtonListener() {
  btn.addEventListener('click',()=>{
    if(timerID) {
      clearInterval(timerID);
      clearInterval(gameTimerID);
      timerID=null;
      gameTimerID=null;
      document.querySelector('button').innerHTML='Start';
    }
    else {
      drawNumber();
      displayGame();
      timerID=setInterval(drawNumber,time);
      gameTimerID=setInterval(displayGame,2000);
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
  let j;
  let temp;

  for(let i=arr.length-1;i>0;i--) {
    j=Math.floor(Math.random()*(i+1));
    temp=arr[i];
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

  // calledNum is a counter. drawNumbers is the shuffled list of numbers from 1-75.
  // numGrid is the 0-based array of HTML object sin the called number display.
  // drawNumbers[calledNum] will return a number from 1-75. We need to subtract 1
  // in order to get the index in a 0-based array.

  let match;
  let currentNum = drawNumbers[calledNum];
  let currentNumIndex = drawNumbers[calledNum]-1;
  let previousNum = drawNumbers[calledNum-1*(calledNum>0)];
  let previousNumIndex = drawNumbers[calledNum-1*(calledNum>0)]-1;

  // Mark the free space
  cardGrid[Array.from(cardGrid).findIndex(e => e.innerHTML=='FS')].classList.add('card-click');
  opponent1Grid[Array.from(opponent1Grid).findIndex(e => e.innerHTML=='FS')].classList.add('card-click');
  opponent2Grid[Array.from(opponent2Grid).findIndex(e => e.innerHTML=='FS')].classList.add('card-click');
  opponent3Grid[Array.from(opponent3Grid).findIndex(e => e.innerHTML=='FS')].classList.add('card-click');

  // Display the newly drawn number in the called number display
  // as soon as the start button is clicked
  // This is a one-time action
  numGrid[currentNumIndex].classList.add('new-number');

  document.querySelector('#current-number').innerHTML=bingo[Math.floor(currentNum/16)]+' '+currentNum;
  document.querySelector('#numbers-drawn').innerHTML='Ball Number: '+(calledNum+1);

  // Change the state of the previously called number
  if(calledNum!=0) {

    // Take these actions on the previous index
    numGrid[previousNumIndex].classList.remove('new-number');
    numGrid[previousNumIndex].classList.add('called-number');
  }

  match=Array.from(cardGrid).findIndex(e => e.innerHTML==drawNumbers[calledNum]);
  if(match>=0) {
    cardGrid[match].classList.add('card-click');
  }

  // Mark the called number on the opponent cards if the number exists
  match=Array.from(opponent1Grid).findIndex(e => e.innerHTML==drawNumbers[calledNum]);
  if(match>=0) {
    opponent1Grid[match].classList.add('card-click');
  }
  match=Array.from(opponent2Grid).findIndex(e => e.innerHTML==drawNumbers[calledNum]);
  if(match>=0) {
    opponent2Grid[match].classList.add('card-click');
  }
  match=Array.from(opponent3Grid).findIndex(e => e.innerHTML==drawNumbers[calledNum]);
  if(match>=0) {
    opponent3Grid[match].classList.add('card-click');
  }

  // increase the counter if there are still numbers to draw
  if(calledNum<74) {
    calledNum++;
  }
  else {
    clearInterval(timerID);
    clearInterval(gameTimerID);
    timerID=null;
    gameTimerID=null;
    document.querySelector('button').innerHTML='Start';
  }
}

function displayGame() {
//  gameGrid.forEach(e => e.classList.remove('card-click'));

  for(let i=0;i<gameGrid.length;i++) {
    gameGrid[i].classList.remove('card-click');
    if(currentGame[gameCounter][i]==1) {
      gameGrid[i].classList.add('card-click');
    }
  }

  if(gameCounter<currentGame.length-1) {
    gameCounter++;
  }
  else {
    gameCounter=0;
  }
}






});
