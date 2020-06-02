document.addEventListener('DOMContentLoaded', () => {
  // Define some values
  var numbers=[];

  for(let x=0;x<=60;x+=15) {
    let a=[];
    for(let y=1;y<=15;y++) {
      a.push(x+y);
    }
    numbers.push(a);
  }

  // Loads divs into card if they don't already exist
  loadCardDivs();

  // Returns card divs as array
  var [gridBase,grid] = getCardDivs();

  //Add event listener
  for(let i=0;i<gridBase.length;i++) {
    gridBase[i].addEventListener('click',(e) => {
      if(e.target.classList.contains('card-click')) {
        e.target.classList.remove('card-click');
      }
      else {
        e.target.classList.add('card-click');
      }
    });
    gridBase[i].addEventListener('mouseover',(e) => {
      if(!e.target.classList.contains('card-click')) {
        e.target.classList.add('card-hover');
      }
    });
    gridBase[i].addEventListener('mouseout',(e) => {
      if(!e.target.classList.contains('card-click')) {
        e.target.classList.remove('card-hover');
      }
    });
  }

  // Generate random bingo card
  var card=generateCard(numbers);

  // Display card numbers
  displayCard(card,grid);
})

// Loads divs into card if divs don't already exist
function loadCardDivs() {
  const card=document.querySelector('#card');
  let cardGrid=Array.from(document.querySelectorAll('#card div'));

  if(cardGrid.length == 0) {
    for(let i=0;i<25;i++) {

      if(i==12) {
        card.innerHTML+='<div class=\"free-space\"></div>\n';
      }
      else {
        card.innerHTML+='<div></div>\n';
      }
    }
  }
}

// Returns card divs as array
function getCardDivs() {
  return [document.querySelectorAll('#card div'),Array.from(document.querySelectorAll('#card div'))];
}

// Generate random bingo card
function generateCard(num) {
  let cardNumbers=num;
  let newNum=[];
  for(let i=0;i<cardNumbers.length;i++) {
    newNum.push(shuffleArray(cardNumbers[i],5));
  }
  return newNum;
}

// Display card numbers
function displayCard(c,g) {
  for(let x=0;x<c.length;x++) {
    for(let y=0;y<c[x].length;y++) {
      if(x==2 && y==2) {
        g[x+(y*5)].innerHTML='Free Space';
      }
      else {
        g[x+(y*5)].innerHTML=c[x][y];
      }
    }
  }
}

// Shuffles an array
// arr=array to be shuffled
// trim=trim array to specified number of elements (defaults to zero)
function shuffleArray(arr,trim=0) {
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

  arr.sort((a,b) => {return a-b})

  return arr;
}

// Event Listener
function selectNumber(e) {
  console.log(e.type);
  if(e.type='mouseover') {
    console.log('poo poo');
    e.target.classList.add('card-hover');
  }
  else if(e.type='mouseout') {
    console.log('poop');
    e.target.classList.remove('card-hover');
  }
}
