const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add('unflipped');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// -------------------------------------------------------------
let totalTries = 0;
let finishedPairs = 0;
let storedPair = [];
let firstCard = storedPair[0];
let secondCard = storedPair[1];

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  console.log('The Length is Currently ' + storedPair.length); // confirm starting arr length

  console.log('I Just Clicked '+ `${event.target.classList}`); // confirm what i just clicked

  console.log(`${event.target.classList[0]}`); // confirm what the first class of what I clicked is

  if (storedPair.length < 1 && event.target.classList.contains('unflipped')) { // Picking Card 1
    storedPair.push(event.target); // Store That Card Value In Arr
    event.target.classList.toggle('unflipped'); // toggle unflipped
    console.log('I Just Clicked '+ `${event.target.classList}`); // confirm it changed class
  } else if (storedPair.length < 2 && event.target.classList.contains('unflipped')) { // Picking Card 2
    storedPair.push(event.target); // Store That Card Value In Arr
    event.target.classList.toggle('unflipped');

  }

  console.log('This is my Current Pair ' + storedPair);

  console.log(storedPair);
  
  console.log('The Length is Currently ' + storedPair.length);
  let matchedCards = document.querySelectorAll('.matched');

  if (storedPair.length == 2) { // Compare

    if (storedPair[0].classList[0] === storedPair[1].classList[0]) { // If They Match Do X
      console.log('Yes We Match'); // Confirm We Know Its A Match
      storedPair = []; // Reset Arr
      totalTries++;
      finishedPairs++;
      console.log(storedPair);
      console.log(totalTries);
    } else { // If They Don't Match Do Y
      console.log("We Don't Match"); // Confirm We Know Its Not A Match

      setTimeout( () => {
        storedPair[0].classList.toggle('unflipped');
        storedPair[1].classList.toggle('unflipped');
        storedPair = []; // Reset 
      }, 100);
      totalTries++;
      console.log(storedPair);
      console.log(totalTries);
    }
    
  }

  if (finishedPairs == 5) {
    setTimeout( () => {
    alert(`Awesome Job, It Took You ${totalTries} Tries To Win. Press Okay To Play Again`);
    window.location.reload();
  }, 500)
  }
  
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */