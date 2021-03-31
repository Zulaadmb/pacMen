let pos = 0;
let updateInterval = null;
let mouthInterval = null;
const pacArray = [
  ['./static/images/PacMan1.png', './static/images/PacMan2.png'],
  ['./static/images/PacMan3.png', './static/images/PacMan4.png'],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac(id) {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(30); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.className = `pacman-${id}`
  newimg.style.position = 'absolute';
  newimg.src = "./static/images/PacMan1.png";
  newimg.width = 100;
  var pac = {direction: 0, pos: 0};
  // TODO: set position here
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';
  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    pac
  };
}

function mouthControl() {
    pacMen.forEach((pacman) => {
        pacman.pac.pos = 1 - pacman.pac.pos;
    } )
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.src = pacArray[item.pac.direction][item.pac.pos]
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    // item.pac.pos = 1 - item.pac.pos;
    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';
    item.newimg.src = item.src;
  }); 
}
function start() {
    updateInterval = setInterval(update, 30);
    mouthInterval = setInterval(mouthControl, 250);
}

function stop() {
    clearInterval(updateInterval);
}
function remove() {
    if (pacMen.length == 0) {
        return
    }
    let removedPacMan = pacMen.pop();
    let removedClass = removedPacMan.newimg.className;
    let game = document.getElementById('game');
    let imageToRemove = document.getElementsByClassName(removedClass)
    console.log(imageToRemove)
    game.removeChild(imageToRemove[0])
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  if (item.position.x + item.newimg.width > window.innerWidth ||
      item.position.x + item.velocity.x < 0
      ) {
      item.velocity.x = -item.velocity.x;
      item.pac.direction = 1 - item.pac.direction;
      }
      if (
        item.position.y + item.newimg.height > window.innerHeight ||
        item.position.y + item.velocity.y < 0
      )
      item.velocity.y = -item.velocity.y;
};

function makeOne() {
  let id = pacMen.length + 1;
  let newpacman = makePac(id);
  pacMen.push(newpacman); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
