class Alien {
    hitPoints = 60;
    damageTaken = 12; 
    takeHit(){
        console.log("OUCH")

    } 
    isDead = false; 
    isEnemy = true;
}

class Worker extends Alien {
    hitPoints = 68;
    damageTaken = 10;

}

class Drone extends Alien{

}

class Queen extends Alien{
    hitPoints = 80;
    damageTaken = 7;
}

class Ship {
  
    
    fireAtAlien (){
        this.alienSelected = Math.floor(Math.random() * 14) + 0;
        console.log("boom");
        return this.alienSelected;
        

    }

   
}



    const battleStarGalatica = new Ship;
    

const createAliens = () => {

    const numQueen = 1;
    const numWorker = 5;
    const numDrone = 8;

    const brianMay = new Queen;
    let queen = [];
    let workers = [];
    let drones = []; 
    // const worker = new Worker;
    
    queen.push(brianMay);


    for (let i = 0; i<numWorker; i++){
        let worker = new Worker;
        workers.push(worker);
    }

    
    for (let i = 0; i<numDrone; i++){
        let drone = new Drone;
        drones.push(drone);
        
    }

    
    return [queen, workers, drones ].flat();
}


    

const aliens = createAliens();


const fire =(aliens)=> {
    const listOfAliens = aliens;
    let alienHit = battleStarGalatica.fireAtAlien();
    console.log(alienHit);
    //    listOfAliens[alienHit].takeHit();
    //    console.log(listOfAliens[alienHit]);

}
// element = document.getElementById('ship');
// console.log(element);
// element.addEventListener('click', fire(aliens), false);
// console.log(aliens);



