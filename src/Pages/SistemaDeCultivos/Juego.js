export default class Juego {

/*--Code Start----------------------------------------------------------------------------------------------------------------------------------------*/
// window.oncontextmenu = (e) => { e.preventDefault(); };
// window.onload = initialLoader;
// window.onresize = () => { resize(false);};

// Data //

// let playerData = 
// { up: new Image(),
//   down: new Image(),
//   left: new Image(),
//   right: new Image(),
//   direction: "up"
// }

// playerData.up.src = "image/hero-up.png";
// playerData.down.src = "image/hero-down.png";
// playerData.left.src = "image/hero-left.png";
// playerData.right.src = "image/hero-right.png";


// let visitedImg = new Image();
// visitedImg.src = "image/grass.png";
// let trapImg = new Image();
// trapImg.src = "image/trap.png";
// let healthImg = new Image();
// healthImg.src = "image/health.png";
// let treasureImg = new Image();
// treasureImg.src = "image/treasure.png";

constructor() 
{
this.player = { health: 0, score: 0, x: 0, y: 0 };
this.carte = [];
this.blockCommand = false;
this.dungeon = {width : 10, height: 15}
this.VISITED_ID = 0;
this.TRAP_ID = 1;
this.TREASURE_ID = 2;
this.HEALTH_ID = 3;
this.VISITED_IN_MAP = 20;
this.HEALTH_IN_MAP = 10;
this.TREASURES_IN_MAP = 38;
}

// var soundTreasure = new Audio("sound/coin.wav");
//     soundTreasure.preload = 'auto';
//     soundTreasure.load();

// var soundHit = new Audio("sound/hit.wav");
// soundHit.preload = 'auto';
// soundHit.load();

// Start //

// initialLoader() {
// //   resize(true);
// // this.initGame();
// //   drawGame();
// //   addEvent();
// }

// Resize //
// function resize(init) {
//   let gameCanvas = document.querySelector(".this.dungeon-explorer-canvas");
//   gameCanvas.width = (window.innerHeight / 2) * this.dungeon.width / 15;
//   gameCanvas.height = window.innerHeight / 2;
//   if (!init) drawGame();
// }

// Updates //

// function updateScore(newScore) {
//   let scoreValue = document.querySelector(".score-value");
//   scoreValue.innerHTML = "Score: " + newScore + " points";
// }

// function updateHealth(health) {
//   let bar = document.querySelector(".bar");
//   let healthValue = document.querySelector(".health-value");
//   let ratio = health / 40;
//   healthValue.innerHTML = health + "/40";
//   bar.style.width = ratio * 100 + "%";
// }

// function countTreasures()
// {
//   let treasures = 0;
//   for (let xx = 0; xx < this.dungeon.width; xx++) 
//     for (let yy = 0; yy < this.dungeon.height; yy++)
//       {
//       if (this.carte[xx][yy] === this.TREASURE_ID) treasures++;      
//       }    
//   return treasures;
// }

randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize //

initGame() {  

  this.carte = [];  
  this.player.score = 0;
  this.player.health = 40;
  this.player.x = 0;
  this.player.y = 0;

//   updateHealth(this.player.health);
//   updateScore(this.player.score);
  
  for (let xx = 0; xx < this.dungeon.width; xx++) {    
    let a = [];
    for (let yy = 0; yy < this.dungeon.height; yy++)
      {    
      a.push(this.TRAP_ID);
      }
    this.carte.push(a);
  }

  for (let i = 0; i < this.TREASURES_IN_MAP; i++) {
    let ready = false;
    while (!ready) {
      let y = this.randomNumber(0, this.dungeon.height-1);
      let x = this.randomNumber(0, this.dungeon.width-1);
      if (y === this.player.x && x === this.player.y) continue;
      if (this.carte[x][y] === this.TRAP_ID) {
        ready = true;
        this.carte[x][y] = this.TREASURE_ID;
      }
    }
  }

  for (let i = 0; i < this.HEALTH_IN_MAP; i++) {
    let ready = false;
    while (!ready) {
      let y = this.randomNumber(0, this.dungeon.height-1);
      let x = this.randomNumber(0, this.dungeon.width-1);
      if (y === this.player.x && x === this.player.y) continue;
      if (this.carte[x][y] === this.TRAP_ID) {
        ready = true;
        this.carte[x][y] = this.HEALTH_ID;
      }
    }
  }

  for (let i = 0; i < this.VISITED_IN_MAP; i++) {
    let ready = false;
    while (!ready) {
      let y = this.randomNumber(0, this.dungeon.height-1);
      let x = this.randomNumber(0, this.dungeon.width-1);
      if (y === this.player.x && x === this.player.y) continue;
      if (this.carte[x][y] === this.TRAP_ID) {
        ready = true;
        this.carte[x][y] = this.VISITED_ID;
      }
    }
  }

  this.carte[this.player.x][this.player.y] = this.VISITED_ID;  
}

// // Game Over //

// function gameOver() {
//   let gameOverScore = document.querySelector(
//     "#dungeon-explorer-game-over-score"
//   );
//   let gameOverMask = document.querySelector(".dungeon-explorer-game-over-mask");
//   gameOverScore.innerHTML = "Score: " + player.score + " points";
//   gameOverMask.style.display = "block";
//   this.blockCommand = true;
// }

// // Restart Game //

// function restartGame() {
//   let gameOverMask = document.querySelector(".dungeon-explorer-game-over-mask");
//   gameOverMask.style.display = "none";
//   this.blockCommand = false;
//   initGame();
//   drawGame();
// }

}
