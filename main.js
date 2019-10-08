class Alien {
  hitPoints = 60;
  damageTaken = 12;
  isDead = false;
  isEnemy = true;
  isQueen = false;
  checkHP() {
    if (this.hitPoints <= 0) {
      this.isDead = true;
      console.log("I AM DEAD. BOTHER ME NO MORE");
    }
  }
  takeDamage() {
    console.log(`I have ${this.hitPoints} and have taken ${this.damageTaken}`);
    let newHP = this.hitPoints - this.damageTaken;
    this.hitPoints = newHP;
    console.log("my new HP is: " + this.hitPoints);
    this.checkHP();
  }
}

class Worker extends Alien {
  hitPoints = 68;
  damageTaken = 10;
}

class Drone extends Alien {}

class Queen extends Alien {
  isQueen = true;
  hitPoints = 80;
  damageTaken = 7;
}

class Ship {
  fireAtAlien() {
    this.alienSelected = Math.floor(Math.random() * 14) + 0;
    console.log("boom: ALIEN " + this.alienSelected + " IS NEXT");
    return this.alienSelected;
  }
}

const battleStarGalatica = new Ship();

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

  return [queen, workers, drones].flat();
};

const aliens = createAliens();

const checkAlien = (listOfAliens, alienHit) => {
  if (listOfAliens[alienHit].isDead) {
    console.log("ALIEN " + alienHit + " IS ALREADY DEAD");
    return false;
  } else {
    return true;
  }
};

const gameOver = () => {
  alert("game Over");
  location.reload();
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
    } else {
      fire(aliens);
    }
  }
};
