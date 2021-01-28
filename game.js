const rules = document.querySelector('.rules');
const bonus = document.querySelector('.info');
const holder = document.querySelector('.gameRings');
document.querySelector('.winnerBoard').classList.add('hidden');
let choices = ['rock', 'paper', 'scissors'];
let houseCard = '';
let counter = 0;
bonus.addEventListener('click', () => {
  if (!bonus.classList.contains('bonusGame')) {
    document.querySelector('.gameRings').innerHTML = '';
    bonus.classList.add('bonusGame');
    choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    bonusGame();
  } else {
    document.querySelector('.gameRings').innerHTML = '';
    bonus.classList.remove('bonusGame');
    choices = ['rock', 'paper', 'scissors'];
    mainGame();
  }
});

mainGame();
displayRules();

function mainGame() {
  document.querySelector('.result').innerText = '0';
  document.querySelector('.gameRings').innerHTML = '';
  document.querySelector('.gameRings').style.backgroundImage =
    "url('images/bg-triangle.svg')";
  let cardId = Math.floor(Math.random() * 3);
  houseCard = choices[cardId];
  displayGame();
}

function bonusGame() {
  document.querySelector('.result').innerText = '0';
  document.querySelector('.gameRings').innerHTML = '';
  document.querySelector('.gameRings').style.backgroundImage =
    "url('images/bg-pentagon.svg')";
  let cardId = Math.floor(Math.random() * 5);
  houseCard = choices[cardId];
  displayBonusGame();
}

function displayGame() {
  let normalPlay = '';
  let menuItems = document.querySelector('.gameSet').children;
  for (i = 0; i < menuItems.length; i++) {
    menuItems[i].style.fontSize = '250%';
    if (menuItems[i].classList.contains('bonus')) {
      menuItems[i].style.display = 'none';
    }
  }
  for (i = 0; i < choices.length; i++) {
    normalPlay = `<div data-id="${choices[i]}" class="card ${choices[i]} ${choices[i]}Main">
        <div data-id="${choices[i]}" class="ring"></div>
      </div>`;
    document.querySelector('.gameRings').innerHTML += normalPlay;
  }
  let playRings = document.querySelectorAll('.card');
  for (i = 0; i < playRings.length; i++) {
    playRings[i].addEventListener('click', chooseWinner);
  }
}

function displayBonusGame() {
  let bonusPlay = '';
  let menuItems = document.querySelector('.gameSet').children;
  for (i = 0; i < menuItems.length; i++) {
    menuItems[i].style.fontSize = '150%';
    if (menuItems[i].classList.contains('bonus')) {
      menuItems[i].style.display = 'block';
    }
  }
  for (i = 0; i < choices.length; i++) {
    bonusPlay = `<div data-id="${choices[i]}" class="card ${choices[i]} ${choices[i]}Bonus">
        <div data-id="${choices[i]}" class="ring"></div>
      </div>`;
    document.querySelector('.gameRings').innerHTML += bonusPlay;
  }
  let playRings = document.querySelectorAll('.card');
  for (i = 0; i < playRings.length; i++) {
    playRings[i].addEventListener('click', chooseWinner);
  }
}

function chooseWinner(e) {
  myCard = e.target.dataset.id;
  if (myCard == houseCard) {
    result = 'Tie';
    displayResults(myCard, houseCard, result);
  } else if (
    (myCard == 'scissors' && houseCard == 'paper') ||
    (myCard == 'scissors' && houseCard == 'lizard') ||
    (myCard == 'paper' && houseCard == 'rock') ||
    (myCard == 'paper' && houseCard == 'spock') ||
    (myCard == 'rock' && houseCard == 'lizard') ||
    (myCard == 'rock' && houseCard == 'scissors') ||
    (myCard == 'lizard' && houseCard == 'spock') ||
    (myCard == 'lizard' && houseCard == 'paper') ||
    (myCard == 'spock' && houseCard == 'scissors') ||
    (myCard == 'spock' && houseCard == 'rock')
  ) {
    result = 'You win';
    counter++;
    document.querySelector('.myCard').classList.add('winner');
    displayResults(myCard, houseCard, result);
  } else {
    result = 'You lose';
    counter--;
    document.querySelector('.houseCard').classList.add('winner');
    displayResults(myCard, houseCard, result);
  }
  document.querySelector('.result').innerText = counter;
}

function displayResults(myCard, houseCard, result) {
  console.log(myCard);
  console.log(houseCard);
  document.querySelector('.gameRings').classList.add('hidden');
  document.querySelector('.winnerBoard').classList.remove('hidden');
  document.querySelector('.myCard').classList.add(`${myCard}`);
  document.querySelector('.myCard').setAttribute('data-id', `${myCard}`);
  document.querySelector('.ringCard').setAttribute('data-id', `${myCard}`);
  document.querySelector('.houseCard').classList.add(`${houseCard}`);
  document.querySelector('.houseCard').setAttribute('data-id', `${houseCard}`);
  document
    .querySelector('.houseRingCard')
    .setAttribute('data-id', `${houseCard}`);
  document.querySelector('.won').innerText = result;
  startNewGame(myCard, houseCard);
}

function startNewGame(myCard, houseCard) {
  let newGame = document.querySelector('.playAgain');
  newGame.addEventListener('click', () => {
    document.querySelector('.gameRings').classList.remove('hidden');
    document.querySelector('.winnerBoard').classList.add('hidden');
    document.querySelector('.myCard').classList.remove(`${myCard}`);
    document.querySelector('.myCard').removeAttribute('data-id', `${myCard}`);
    document.querySelector('.ringCard').removeAttribute('data-id', `${myCard}`);
    document.querySelector('.houseCard').classList.remove(`${houseCard}`);
    document
      .querySelector('.houseCard')
      .removeAttribute('data-id', `${houseCard}`);
    document
      .querySelector('.houseRingCard')
      .removeAttribute('data-id', `${houseCard}`);
    document.querySelector('.myCard').classList.remove('winner');
    document.querySelector('.houseCard').classList.remove('winner');
  });
  if (bonus.classList.contains('bonusGame')) {
    bonusGame();
  } else {
    mainGame();
  }
}

function displayRules() {
  // Get the modal
  var modal = document.getElementById('myModal');
  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var img = document.getElementById('myImg');
  var modalImg = document.getElementById('img01');
  var captionText = document.getElementById('caption');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('close')[0];
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };

  rulesButton = document.querySelector('.rules');
  rulesButton.addEventListener('click', () => {
    if (bonus.classList.contains('bonusGame')) {
      document
        .getElementById('myImg')
        .setAttribute('src', 'images/image-rules-bonus.svg');
      modal.style.display = 'block';
      modalImg.src = 'images/image-rules-bonus.svg';
    } else {
      document
        .getElementById('myImg')
        .setAttribute('src', 'images/image-rules.svg');
      modal.style.display = 'block';
      modalImg.src = 'images/image-rules.svg';
    }
  });
}
