class Alien {
  hitPoints = 60;
  damageTaken = 12;
  isDead = false;
  checkHP() {
    if (this.hitPoints <= 0) {
      this.isDead = true;
    }
  }
  takeDamage() {
    let newHP = this.hitPoints - this.damageTaken;
    this.hitPoints = newHP;
    this.checkHP();
  }
}

class Worker extends Alien {
  hitPoints = 68;
  damageTaken = 10;
}

class Drone extends Alien {
  //drones are currently just generic aliens for now
}

class Queen extends Alien {
  hitPoints = 80;
  damageTaken = 7;
}

class Ship {
  fireAtAlien() {
    this.alienSelected = Math.floor(Math.random() * 14) + 0;
    return this.alienSelected;
  }
}

const battleStarGalatica = new Ship();

const initialiseScoresOnScreen = arrayOfAliens => {
  let elements = [...document.getElementsByClassName("hitpoints")];

  for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML = arrayOfAliens[i].hitPoints;
  }
};

const createAliens = () => {
  const numQueen = 1;
  const numWorker = 5;
  const numDrone = 8;

  const brianMay = new Queen();
  let queen = [];
  let workers = [];
  let drones = [];
  // const worker = new Worker;

  queen.push(brianMay);

  for (let i = 0; i < numWorker; i++) {
    let worker = new Worker();
    workers.push(worker);
  }

  for (let i = 0; i < numDrone; i++) {
    let drone = new Drone();
    drones.push(drone);
  }

  arrayOfAliens = [queen, workers, drones].flat();
  initialiseScoresOnScreen(arrayOfAliens);
  return arrayOfAliens;
};

const aliens = createAliens();

const checkAlien = (listOfAliens, alienHit) => {
  if (listOfAliens[alienHit].isDead) {
    let elements = [...document.getElementsByTagName("p")];
    elements[alienHit].classList.add("isDead");
    return false;
  } else {
    return true;
  }
};

const gameOver = () => {
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";
  span.onclick = function() {
    modal.style.display = "none";
    location.reload();
  };
};

const updateHTMLWithPoints = (listOfAliens, alienHit) => {
  let elements = [...document.getElementsByClassName("hitpoints")];
  elements[alienHit].innerHTML = listOfAliens[alienHit].hitPoints;
  elements[alienHit].classList.add("hitpoints-explosion");
  setTimeout(function() {
    elements[alienHit].classList.remove("hitpoints-explosion");
  }, 1000);
};

const fire = aliens => {
  const listOfAliens = aliens;
  let alienHit = battleStarGalatica.fireAtAlien();
  let canInflictDamage = checkAlien(listOfAliens, alienHit);
  //check if queen is dead
  if (listOfAliens[0].isDead) {
    gameOver();
  } else {
    if (canInflictDamage) {
      listOfAliens[alienHit].takeDamage();
      checkAlien(listOfAliens, alienHit);
      updateHTMLWithPoints(listOfAliens, alienHit);
    } else {
      fire(aliens);
    }
  }
};
